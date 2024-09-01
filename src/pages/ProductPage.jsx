import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Button,
  Row,
  Col,
  Image,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductAction } from "../redux/product/productActions";

const ProductPage = () => {
  const { sku } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.product.product);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    dispatch(getProductAction(sku));
  }, [dispatch, sku]);

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleMouseEnter = (image) => {
    setMainImage(image);
  };

  const handleMouseLeave = () => {
    setMainImage(product.thumbnail);
  };

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
    <div
      className="product-page"
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      <Row className="product-details" style={{ display: "flex" }}>
        <Col md={2}>
          <div className="product-gallery" style={{ marginRight: "20px" }}>
            <Row
              className="gallery-images"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {product.images && product.images.length > 0 && (
                <>
                  <Col>
                    <Image
                      src={product.thumbnail}
                      thumbnail
                      onMouseEnter={() => handleMouseEnter(product.thumbnail)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: "pointer",
                        border: "2px solid transparent",
                        width: "100%",
                      }}
                      className="hover-indicator"
                    />
                  </Col>
                  {product.images.map((image, index) => (
                    <Col key={index}>
                      <Image
                        src={image}
                        thumbnail
                        onMouseEnter={() => handleMouseEnter(image)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          cursor: "pointer",
                          border: "2px solid transparent",
                          width: "100%",
                        }}
                        className="hover-indicator"
                      />
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </div>
        </Col>
        <Col md={5}>
          <div
            className="product-image"
            style={{
              width: "auto",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={mainImage}
              style={{
                height: "100%",
                width: "auto",
                maxWidth: "400px",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
        <Col md={5}>
          <div
            className="product-info"
            style={{ marginLeft: "20px", flexGrow: "1" }}
          >
            <h2>{product.name}</h2>
            <div className="product-brand">{product.brand}</div>
            <p className="product-description">{product.description}</p>
            <div
              className="product-price"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              {productIsOnSale ? (
                <>
                  <span style={{ color: "red", fontSize: "1.4rem" }}>
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
            </div>
            {/* Quantity Selector and Add to Cart Button */}
            <Row className="align-items-center justify-content-center">
              <Col xs="auto">
                <InputGroup
                  className="mb-3"
                  style={{ width: "100%", maxWidth: "8rem" }}
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
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#007bff")
                    }
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
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#007bff")
                    }
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
                    padding: "0.5rem 1.2rem",
                    borderRadius: "50px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007bff")
                  }
                  // onClick={handleAddtoCart}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
