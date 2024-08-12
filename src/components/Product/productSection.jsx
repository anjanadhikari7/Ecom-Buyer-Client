import React, { useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "./productCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductSection = () => {
  const { products } = useSelector((state) => state.product);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="light"
        onClick={scrollLeft}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          zIndex: "1",
        }}
      >
        <FaArrowLeft />
      </Button>

      <div
        style={{
          overflowX: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
        }}
        ref={scrollRef}
      >
        <Row className="flex-nowrap gap-5" style={{ margin: "0" }}>
          {products.map((product) => (
            <Col
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{
                display: "inline-block",
                minWidth: "18rem",
                maxWidth: "18rem",
              }}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <Button
        variant="light"
        onClick={scrollRight}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          zIndex: "1",
        }}
      >
        <FaArrowRight />
      </Button>
    </div>
  );
};

export default ProductSection;
