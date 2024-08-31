import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const salesStartDate = new Date(product.salesStartDate).getTime();
  const salesEndDate = new Date(product.salesEndDate).getTime();
  const now = Date.now();

  const productIsOnSale = salesStartDate <= now && salesEndDate >= now;
  const discountPercentage = productIsOnSale
    ? Math.round(((product.price - product.salesPrice) / product.price) * 100)
    : 0;

  const [hovered, setHovered] = useState(false);

  // Function to handle product click and navigate to the ProductPage
  const handleViewProduct = () => {
    navigate(`/product/${product.sku}`); // Navigate to the ProductPage with the product SKU
  };

  return (
    <div
      className="product-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="product-card" onClick={handleViewProduct}>
        <div className="product-image-container">
          <Card.Img
            variant="top"
            src={product.thumbnail}
            alt={product.name}
            className="product-image"
          />
        </div>
        <Card.Body className="product-details">
          <Card.Title className="product-name">{product.name}</Card.Title>
          <div className="price-view">
            <Card.Text className={`price ${hovered ? "hidden" : "show"}`}>
              {productIsOnSale ? (
                <>
                  <span className="sales-price">${product.salesPrice}</span>{" "}
                  <span className="original-price">${product.price}</span>{" "}
                  <Badge bg="danger" className="ms-2">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              ) : (
                <span className="normal-price">${product.price}</span>
              )}
            </Card.Text>
            <div className={`view-product ${hovered ? "show" : "hidden"}`}>
              View Product
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
