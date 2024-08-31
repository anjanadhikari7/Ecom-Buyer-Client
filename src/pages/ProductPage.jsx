import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ProductPage.css"; // Assuming you have some custom styles

const ProductPage = (props) => {
  const { product } = props;

  // Determine if the product is on sale
  const isOnSale = product.salesPrice < product.price;

  return (
    <div className="product-page">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.thumbnail} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div className="price">
                {isOnSale ? (
                  <>
                    <span className="original-price">${product.price}</span>
                    <span className="sale-price">${product.salesPrice}</span>
                  </>
                ) : (
                  <span className="price">${product.price}</span>
                )}
              </div>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <div className="product-gallery">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
