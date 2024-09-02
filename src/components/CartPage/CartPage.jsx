import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import "./CartPage.css";

const CartPage = () => {
  // Get cart items from Redux state
  const items = useSelector((state) => state.cart.items || []);

  // Calculate the total price of items in the cart
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <h1>Your Cart</h1>
          {items.length === 0 ? (
            <p>Your cart is empty. Start shopping to add items here!</p>
          ) : (
            <ListGroup>
              {items.map((item) => (
                <ListGroup.Item
                  key={item.sku} // Using SKU as the key since it's unique
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.thumbnail} // Changed from image to thumbnail if necessary
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5>{item.name}</h5>
                      <p>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Cart Summary</Card.Header>
            <Card.Body>
              <h5>Total Price</h5>
              <p>${totalPrice.toFixed(2)}</p>
              <Button
                variant="primary"
                className="w-100"
                disabled={items.length === 0} // Disable button if cart is empty
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
