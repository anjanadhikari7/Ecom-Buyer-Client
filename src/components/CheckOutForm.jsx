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

const CheckOutForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // check if stripe config is valid
    if (!stripe || !elements) {
      return toast.error("Not ready for payment processing, Please wait!");
    }

    setIsLoading(true);

    // now make payment request to stripe
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_APP_BASE_URL}/payment-success`,
      },
    });
    setIsLoading(false);
    if (result?.error) {
      return toast.error(result?.error?.message || "Could not process payment");
    }

    // successful payment
    toast.success("Thank you for your payment!");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow-lg rounded border-0">
            <Card.Body>
              <h3 className="text-center mb-4">Complete Your Payment</h3>
              <Form onSubmit={handleOnSubmit}>
                <PaymentElement />
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
