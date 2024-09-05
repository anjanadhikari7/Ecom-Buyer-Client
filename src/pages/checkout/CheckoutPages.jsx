import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../components/CheckOutForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Container, Stack } from "react-bootstrap";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_APP_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };
  const totalAmountInDollar = 20;
  //call api to create a payment Intent as soon as we

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_APP_API_BASE_URL}/create-payment-intent`, {
        amount: totalAmountInDollar * 100,
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  return (
    <Container>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Stack
            gap={2}
            className=" d-flex align-items-center justify-content-center mt-5"
          >
            <Alert key="primary" variant="primary">
              <h2>Payment Checkout Form</h2>
              <CheckOutForm />
            </Alert>
          </Stack>
        </Elements>
      )}
    </Container>
  );
};

export default CheckoutPage;
