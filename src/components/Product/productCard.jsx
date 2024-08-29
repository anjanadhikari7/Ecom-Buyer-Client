import React, { useState } from "react";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTotalQuantity } from "../../redux/cart/cartSlice";

const ProductCard = ({ product }) => {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= product.quantity) {
      setQuantity(value);
    } else if (value > product.quantity) {
      setQuantity(product.quantity);
    } else {
      setQuantity(1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const salesStartDate = new Date(product.salesStartDate).getTime();
  const salesEndDate = new Date(product.salesEndDate).getTime();
  const now = Date.now();

  const productIsOnSale = salesStartDate <= now && salesEndDate >= now;
  const discountPercentage = productIsOnSale
    ? Math.round(((product.price - product.salesPrice) / product.price) * 100)
    : 0;

  const handleAddtoCart = () => {
    const existingItem = items.find((item) => item._id === product._id);
    if (!existingItem) {
      dispatch(setTotalQuantity(totalQuantity + 1));
    }
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "16rem", // Further reduced size
          margin: "15px",
          borderRadius: "15px",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          height: "380px", // Reduced height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}
        className="product-card"
      >
        <div
          style={{
            height: "240px", // Increased height for thumbnail
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Card.Img
            variant="top"
            src={product.thumbnail}
            alt={product.name}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
            className="product-image"
          />
        </div>
        <Card.Body
          style={{
            padding: "10px", // Adjusted padding
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centered content
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Card.Title
              style={{
                fontSize: "1.1rem", // Slightly smaller font size
                fontWeight: "bold",
                color: "#333",
                marginBottom: "0.25rem",
              }}
            >
              {product.name}
            </Card.Title>
            <Card.Text
              style={{
                fontSize: "1rem", // Adjusted font size
                fontWeight: "bold",
                color: "#28a745",
                marginBottom: "0.5rem",
              }}
            >
              {productIsOnSale ? (
                <>
                  <span style={{ color: "red", fontSize: "1.1rem" }}>
                    ${product.salesPrice}
                  </span>{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#6c757d",
                      fontSize: "0.9rem",
                    }}
                  >
                    ${product.price}
                  </span>{" "}
                  <Badge bg="danger" className="ms-2">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              ) : (
                <span>${product.price}</span>
              )}
            </Card.Text>
          </div>

          {/* Quantity Selector and Add to Cart Button */}
          <Row className="align-items-center justify-content-center">
            <Col xs="auto">
              <InputGroup
                className="mb-3"
                style={{ width: "100%", maxWidth: "8rem" }} // Adjusted max width
              >
                <Button
                  variant="outline-secondary"
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "1.2rem",
                    padding: "0.4rem",
                    transition: "color 0.3s",
                  }}
                  onClick={decreaseQuantity}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#007bff")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
                >
                  -
                </Button>
                <FormControl
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="no-arrow"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "2px solid #ced4da",
                    fontSize: "1.1rem",
                    width: "2.5rem",
                  }}
                  min="1"
                  max={product.quantity}
                />
                <Button
                  variant="outline-secondary"
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "1.2rem",
                    padding: "0.4rem",
                    transition: "color 0.3s",
                  }}
                  onClick={increaseQuantity}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#007bff")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
                >
                  +
                </Button>
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                style={{
                  width: "100%",
                  backgroundColor: "#007bff",
                  border: "none",
                  padding: "0.5rem 1.2rem", // Adjusted padding
                  borderRadius: "50px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007bff")
                }
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <style jsx>{`
        .product-card:hover {
          box-shadow: 0 10px 30px rgba(20, 128, 255, 0.5);
        }

        .product-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
