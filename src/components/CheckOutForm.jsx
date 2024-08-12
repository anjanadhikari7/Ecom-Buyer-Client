import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
const CheckOutForm = () => {
  const [isLoading, setisLoading] = useState(false);
  // Stripe hooks

  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // check if stripe consfig is valid or not

    if (!stripe || !elements) {
      return toast.error("Not ready for payment processing, Please wait!!");
    }

    setisLoading(true);

    // now make payment request to stripe

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_APP_BASE_URL}/payment-success`,
      },
    });
    setisLoading(false);
    if (result?.error) {
      return toast.error(
        result?.error?.message || "Counld not process message"
      );
    }

    // successful payment
    toast.success("Thank you for your payment! ");
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Card className="p-4 shadow-lg rounded">
        <PaymentElement />
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            "Pay now"
          )}
        </Button>
      </Card>
    </Form>
  );
};

export default CheckOutForm;
