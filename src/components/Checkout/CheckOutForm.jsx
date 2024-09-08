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

const CheckOutForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // Utility function to generate a unique order ID
  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!stripe || !elements) {
      return toast.error("Stripe is not yet loaded.");
    }

    // Prepare order data
    const orderData = {
      orderId: generateOrderId(),
      products: items.map((item) => ({
        productId: item._id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      userId: user._id,
      address: user.address,
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
      // Confirm payment without redirecting
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: user.email,
        },
        redirect: "if_required",
      });

      if (error) {
        // Handle error from Stripe
        throw new Error(error.message || "Could not process payment");
      }

      // If payment is successful, send order data to backend
      dispatch(createOrderAction(orderData));
      // Navigate to order success page
      navigate("/payment-success");
      toast.success("Thank you for your payment!");
    } catch (error) {
      // Handle any errors
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container fluid className="px-5 py-4">
      <Row className="gx-3 gy-4 d-flex align-items-start">
        <Col md={5} className="p-0">
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
