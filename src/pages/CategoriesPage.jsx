import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);

  const handleCategoryClick = (categoryTitle) => {
    const section = document.getElementById(categoryTitle);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Row className="justify-content-center">
      <h1>Shop by Categories</h1>
      {categories.map((category, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Card
            className="category-card text-center"
            onClick={() => handleCategoryClick(category.title)}
            style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Card.Img
              variant="top"
              src={category.thumbnail}
              alt={category.title}
              className="rounded-circle category-image"
            />
            <Card.Body>
              <Card.Title>{category.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CategoriesPage;
