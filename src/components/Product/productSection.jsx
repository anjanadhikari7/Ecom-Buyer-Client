import React, { useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "./productCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductSection = () => {
  const { products } = useSelector((state) => state.product);
  const scrollRefs = useRef({});

  // Group products by parentCategory
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.parentCategory;
    if (category) {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
    }
    return acc;
  }, {});

  // Add "All Products" category at the beginning
  groupedProducts["All Products"] = products;

  const orderedCategories = [
    "All Products",
    ...Object.keys(groupedProducts).filter(
      (category) => category !== "All Products"
    ),
  ];

  const scrollLeft = (category) => {
    scrollRefs.current[category].scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (category) => {
    scrollRefs.current[category].scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div>
      {orderedCategories.map((category) => {
        const products = groupedProducts[category];
        const showArrows = products.length > 4;

        return (
          <div
            key={category}
            style={{ marginBottom: "2rem", position: "relative" }}
          >
            <h2>{category}</h2>

            {showArrows && (
              <Button
                variant="light"
                onClick={() => scrollLeft(category)}
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
            )}

            <div
              style={{
                overflowX: "hidden",
                whiteSpace: "nowrap",
                display: "flex",
              }}
              ref={(el) => (scrollRefs.current[category] = el)}
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

            {showArrows && (
              <Button
                variant="light"
                onClick={() => scrollRight(category)}
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductSection;
