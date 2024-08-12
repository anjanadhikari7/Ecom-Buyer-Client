import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <div
        style={{
          height: "200px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>Price: ${product.price}</strong>
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
