import { useLocation } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import {
  Spinner,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CartComponent from "../Cart/CartComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for backend request
import { createOrderAction } from "../../redux/order/orderAction";
import { updateProductAction } from "../../redux/product/productActions";

const CheckOutForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get form data from navigation state
  const { formData } = state || {}; // Destructure formData from state
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  // Utility function to generate a unique order ID
  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  // Handle form submission for payment and order processing
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Ensure Stripe is properly loaded
    if (!stripe || !elements) {
      return toast.error("Stripe is not yet loaded.");
    }

    // Generate order ID and prepare order data
    const orderId = generateOrderId();
    const orderData = {
      orderId,
      products: items.map((item) => ({
        productId: item._id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      userId: user._id,
      address: formData.address || user.address, // Use address from formData if available
      date: new Date(),
      totalPrice: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      status: "pending",
    };

    console.log(orderData);
    setIsLoading(true);

    try {
      // Confirm payment without redirecting to Stripe's own success page
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: formData.email || user.email, // Use email from formData if available
        },
        redirect: "if_required",
      });

      // If error occurs in Stripe payment
      if (error) {
        throw new Error(error.message || "Could not process payment");
      }

      // Dispatch order creation action
      dispatch(createOrderAction(orderData));
      // Update product quantities
      orderData.products.forEach((orderProduct) => {
        // Find the product to update
        const productToUpdate = products.find(
          (product) => product._id === orderProduct.productId
        );

        if (productToUpdate) {
          // Create the updated product object
          const updatedProduct = {
            ...productToUpdate,
            quantity: productToUpdate.quantity - orderProduct.quantity,
          };

          // Dispatch action to update the product quantity
          dispatch(updateProductAction(updatedProduct));
        }
      });

      // Navigate to payment success page with the orderId passed in state
      navigate("/payment-success", { state: { orderId } });
      toast.success("Thank you for your payment!");
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate the total amount from cart items
  const totalAmount = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container fluid className="px-5 py-4">
      <Row className="gx-3 gy-4 d-flex align-items-start">
        <Col md={5} className="p-0">
          {/* CartComponent to display cart items */}
          <CartComponent
            className="flex-grow-1"
            style={{ height: "100vh", width: "30vw" }}
          />
        </Col>
        <Col md={7}>
          <Card
            className="p-4 shadow-lg rounded-3 border-0"
            style={{ height: "auto", width: "50vw" }}
          >
            <Card.Body>
              <h3 className="text-center mb-4">Complete Your Payment</h3>
              <Form onSubmit={handleOnSubmit}>
                {/* Stripe's PaymentElement for payment form */}
                <PaymentElement />
                <Form.Group className="mt-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={`$${totalAmount}`}
                    readOnly
                    className="text-center"
                  />
                </Form.Group>
                {/* Submit button with loading spinner */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutForm;
