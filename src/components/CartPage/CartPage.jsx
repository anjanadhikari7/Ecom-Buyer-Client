import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { addItemToCartAction } from "../../redux/cart/cartAction";
import { setTotalQuantity } from "../../redux/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items || []);
  const [editedItems, setEditedItems] = useState({});
  const [warningMessage, setWarningMessage] = useState(""); // State for warning message

  const handleQuantityChange = (sku, quantity, availableStock) => {
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > availableStock) {
      setWarningMessage(`Only ${availableStock} of this item is available.`);
      quantity = availableStock;
    } else {
      setWarningMessage(""); // Clear warning if valid
    }

    setEditedItems({
      ...editedItems,
      [sku]: quantity,
    });
  };

  const handleUpdateQuantity = () => {
    // Create a copy of the items array and update it based on editedItems
    const updatedItems = items.map((item) => {
      // Check if this item is in the editedItems
      if (editedItems[item.sku] !== undefined) {
        return {
          ...item,
          quantity: editedItems[item.sku], // Update quantity to the new value
        };
      }
      return item;
    });

    // Calculate the new total quantity
    const newTotalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Dispatch actions to update cart and total quantity
    dispatch(addItemToCartAction(updatedItems));
    dispatch(setTotalQuantity(newTotalQuantity));

    // Clear the edited items state
    setEditedItems({});
  };

  const handleRemoveItem = (sku) => {
    const updatedItems = items.filter((item) => item.sku !== sku);
    // Calculate the new total quantity
    const newTotalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    // Dispatch actions to update cart and total quantity
    dispatch(addItemToCartAction(updatedItems));
    dispatch(setTotalQuantity(newTotalQuantity));
  };

  const updatedTotalPrice = items.reduce((acc, item) => {
    const quantity = editedItems[item.sku] || item.quantity;
    return acc + item.price * quantity;
  }, 0);

  const isUpdateDisabled = Object.keys(editedItems).every(
    (sku) =>
      editedItems[sku] === items.find((item) => item.sku === sku)?.quantity
  );

  return (
    <Container className="my-4 cart-container">
      <Row>
        <Col md={8}>
          <h1>Your Cart</h1>
          {items.length === 0 ? (
            <>
              <p>Your cart is empty. Start shopping to add items here!</p>
              <Button
                variant="primary"
                className="vibrant-shop-button mt-3"
                onClick={() => navigate("/shop")}
              >
                Go to Shop
              </Button>
            </>
          ) : (
            <>
              <ListGroup className="cart-list">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Product</strong>
                  <strong>Price</strong>
                  <strong>Quantity</strong>
                  <strong>Total</strong>
                  <strong> </strong>
                </ListGroup.Item>
                {items.map((item) => (
                  <ListGroup.Item
                    key={item.sku}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="cart-thumbnail"
                      />
                      <div className="cart-item-details">
                        <h5>{item.name}</h5>
                      </div>
                    </div>
                    <div className="cart-price">${item.price.toFixed(2)}</div>
                    <div className="cart-quantity d-flex align-items-center">
                      <Button
                        variant="light"
                        onClick={() =>
                          handleQuantityChange(
                            item.sku,
                            Math.max(
                              1,
                              (editedItems[item.sku] || item.quantity) - 1
                            ),
                            item.availableStock
                          )
                        }
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.availableStock}
                        value={editedItems[item.sku] || item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.sku,
                            parseInt(e.target.value),
                            item.availableStock
                          )
                        }
                        className="cart-quantity-input mx-2 no-arrow"
                      />
                      <Button
                        variant="light"
                        onClick={() =>
                          handleQuantityChange(
                            item.sku,
                            (editedItems[item.sku] || item.quantity) + 1,
                            item.availableStock
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                    <div className="cart-item-total">
                      <strong>
                        $
                        {(
                          item.price * (editedItems[item.sku] || item.quantity)
                        ).toFixed(2)}
                      </strong>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.sku)}
                      className="cart-delete-btn"
                    >
                      <FaTrashAlt />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {warningMessage && (
                <Alert variant="warning" className="mt-3">
                  {warningMessage}
                </Alert>
              )}
              <Button
                variant="dark"
                onClick={handleUpdateQuantity}
                className="mt-3"
                disabled={isUpdateDisabled}
              >
                <FaCheck /> Update Cart
              </Button>

              <Button
                variant="primary"
                className="mt-3 mx-4"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </>
          )}
        </Col>
        <Col md={4}>
          <Card className="cart-summary">
            <Card.Header className="bg-light">
              <strong>Cart Summary</strong>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {items.map((item) => (
                  <ListGroup.Item
                    key={item.sku}
                    className="d-flex justify-content-between"
                  >
                    <div>
                      {item.name} (x{editedItems[item.sku] || item.quantity})
                    </div>
                    <div>
                      $
                      {(
                        item.price * (editedItems[item.sku] || item.quantity)
                      ).toFixed(2)}
                    </div>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between mt-3">
                  <strong>Total</strong>
                  <strong>${updatedTotalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="primary"
                className="w-100 mt-3"
                disabled={items.length === 0}
                onClick={() => navigate("/checkout")}
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
