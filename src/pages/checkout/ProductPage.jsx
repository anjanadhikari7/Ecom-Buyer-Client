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
import { toast } from "react-toastify";
import Product from "../../components/Product/product";

const ProductPage = () => {
  const { sku } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [warningMessage, setWarningMessage] = useState("");

  const product = useSelector((state) => state.product.product);
  const { products } = useSelector((state) => state.product);
  const [relatedProducts, setRelatedProducts] = useState([]);

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

  useEffect(() => {
    if (products && product) {
      const similarProducts = products.filter(
        (p) =>
          p.parentCategory === product.parentCategory && p.sku !== product.sku
      );
      setRelatedProducts(similarProducts);
    }
  }, [products, product]);

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

    const existingItemIndex = items.findIndex((i) => i.sku === product.sku);

    let updatedItems;
    if (existingItemIndex !== -1) {
      updatedItems = items.map((i, index) =>
        index === existingItemIndex
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      updatedItems = [...items, item];
      toast.success("Item added to cart!");
    }

    const newTotalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    dispatch(addItemToCartAction(updatedItems));
    dispatch(setTotalQuantity(newTotalQuantity));

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
    <div className="product-page" style={{ padding: "20px" }}>
      <Row>
        <Col md={2}>
          <div className="product-gallery">
            <Row>
              {product.images &&
                product.images.map((image, index) => (
                  <Col key={index} className="mb-2">
                    <Image
                      src={image}
                      thumbnail
                      onMouseEnter={() => handleMouseEnter(image)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={5}>
          <Image
            src={mainImage}
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
            }}
          />
        </Col>
        <Col md={5}>
          <h2>{product.name}</h2>
          <div>{product.brand}</div>
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
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
          <Button
            onClick={handleAddtoCart}
            disabled={isAddToCartDisabled}
            style={{ width: "100%" }}
          >
            Add to Cart
          </Button>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </Col>
      </Row>

      {/* You May Also Like Section */}
      <Row>
        <Col>
          <h3 className="mt-4">You may also like</h3>
          <Row className="g-2">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <p>No similar products available.</p>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
