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

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

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

  return (
    <Card
      style={{
        width: "20rem",
        margin: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          height: "250px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px 10px 0 0",
          backgroundColor: "#f8f9fa",
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
          }}
        />
      </div>
      <Card.Body style={{ padding: "20px" }}>
        <Card.Title style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {product.name}
        </Card.Title>
        <Card.Text
          style={{
            color: "#6c757d",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limits the text to 3 lines
          }}
        >
          {product.description}
        </Card.Text>
        <Card.Text style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          {productIsOnSale ? (
            <>
              <span style={{ color: "red", fontSize: "1.2rem" }}>
                ${product.salesPrice}
              </span>{" "}
              <span
                style={{ textDecoration: "line-through", color: "#6c757d" }}
              >
                ${product.price}
              </span>{" "}
              <Badge bg="danger" className="ms-2">
                {discountPercentage}% OFF
              </Badge>
            </>
          ) : (
            <span style={{ color: "#28a745" }}>${product.price}</span>
          )}{" "}
          | QTY: {product.quantity}
        </Card.Text>

        {/* Quantity Selector and Add to Cart Button */}
        <Row className="align-items-center">
          <Col xs="auto">
            <InputGroup
              className="mb-3"
              style={{ width: "100%", maxWidth: "10rem" }}
            >
              <Button
                variant="outline-secondary"
                style={{
                  border: "none",
                  borderRadius: "0.25rem",
                  backgroundColor: "#f8f9fa",
                  fontSize: "1.5rem",
                  padding: "0.5rem",
                  transition: "background-color 0.3s",
                }}
                onClick={decreaseQuantity}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e9ecef")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
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
                  backgroundColor: "#fff",
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  fontSize: "1.2rem",
                  width: "3rem", // Increased width for better visibility
                }}
                min="1"
                max={product.quantity}
              />
              <Button
                variant="outline-secondary"
                style={{
                  border: "none",
                  borderRadius: "0.25rem",
                  backgroundColor: "#f8f9fa",
                  fontSize: "1.5rem",
                  padding: "0.5rem",
                  transition: "background-color 0.3s",
                }}
                onClick={increaseQuantity}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e9ecef")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
              >
                +
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <Button variant="success" style={{ width: "100%" }}>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
