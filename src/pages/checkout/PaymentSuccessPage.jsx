import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { orderId } = location.state || {}; // Get orderId from state

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Payment Successful!</h1>
          <p>Your order has been successfully processed.</p>
          {orderId && (
            <p>
              Order Number: <strong>{orderId}</strong>
            </p>
          )}
          <p>Thank you for shopping with us!</p>
          <Link to="/shop">
            <Button variant="outline-success">Continue Shopping</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
