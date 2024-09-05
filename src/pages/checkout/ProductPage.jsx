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
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductAction } from "../../redux/product/productActions";
import { addItemToCartAction } from "../../redux/cart/cartAction";
import { setTotalQuantity } from "../../redux/cart/cartSlice";

const ProductPage = () => {
  const { sku } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [warningMessage, setWarningMessage] = useState("");

  const product = useSelector((state) => state.product.product);
  const { items } = useSelector((state) => state.cart);

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
    const totalInCart = items.reduce(
      (total, item) =>
        item.sku === product.sku ? total + item.quantity : total,
      0
    );
    const availableQuantity = product.quantity - totalInCart;

    if (!isNaN(value) && value > 0) {
      if (value <= availableQuantity) {
        setQuantity(value);
        setWarningMessage(""); // Clear warning if valid
      } else {
        setQuantity(availableQuantity);
        setWarningMessage(
          availableQuantity === 0
            ? "Out of Stock"
            : `Only ${availableQuantity} of this item is available.`
        );
      }
    } else {
      setQuantity(1); // Reset to 1 if invalid value
      setWarningMessage(""); // Clear warning if invalid value
    }
  };

  const increaseQuantity = () => {
    const totalInCart = items.reduce(
      (total, item) =>
        item.sku === product.sku ? total + item.quantity : total,
      0
    );
    const availableQuantity = product.quantity - totalInCart;

    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
      setWarningMessage("");
    } else {
      setWarningMessage(`Only ${availableQuantity} of this item is available.`);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setWarningMessage("");
    }
  };

  const handleAddtoCart = () => {
    const item = {
      _id: product._id,
      sku: product.sku,
      name: product.name,
      price: productIsOnSale ? product.salesPrice : product.price,
      quantity,
      thumbnail: product.thumbnail,
      availableStock: product.quantity,
    };

    // Update cart items
    const existingItemIndex = items.findIndex((i) => i.sku === product.sku);

    let updatedItems;
    if (existingItemIndex !== -1) {
      // Item exists in the cart, update quantity
      updatedItems = items.map((i, index) =>
        index === existingItemIndex
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      // New item to be added to the cart
      updatedItems = [...items, item];
    }

    // Calculate the new total quantity
    const newTotalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Dispatch actions
    dispatch(addItemToCartAction(updatedItems));
    dispatch(setTotalQuantity(newTotalQuantity));

    // Reset quantity to 1
    setQuantity(1);
  };

  const salesStartDate = new Date(product.salesStartDate).getTime();
  const salesEndDate = new Date(product.salesEndDate).getTime();
  const now = Date.now();
  const productIsOnSale = salesStartDate <= now && salesEndDate >= now;
  const discountPercentage = productIsOnSale
    ? Math.round(((product.price - product.salesPrice) / product.price) * 100)
    : 0;

  const totalInCart = items.reduce(
    (total, item) => (item.sku === product.sku ? total + item.quantity : total),
    0
  );
  const availableQuantity = product.quantity - totalInCart;
  const isAddToCartDisabled = availableQuantity <= 0;

  return (
    <div
      className="product-page"
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "20px",
        margin: "0px",
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
            {warningMessage && (
              <Alert variant="warning" className="mb-3">
                {warningMessage}
              </Alert>
            )}
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
                  onClick={handleAddtoCart}
                  disabled={isAddToCartDisabled}
                  style={{ width: "100%" }}
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
