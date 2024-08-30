import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row, Button } from "react-bootstrap";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);
  const [showAll, setShowAll] = useState(false);

  const handleCategoryClick = (categoryTitle) => {
    const section = document.getElementById(categoryTitle);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="categories-page text-center">
      <h1 className="mb-4">Shop by Categories</h1>
      <Row className="justify-content-center">
        {displayedCategories.map((category, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex justify-content-center"
          >
            <Card
              className="category-card text-center"
              onClick={() => handleCategoryClick(category.title)}
              style={{ cursor: "pointer", width: "100%", maxWidth: "300px" }}
            >
              <Card.Img
                variant="top"
                src={category.thumbnail}
                alt={category.title}
                className="rounded category-image"
              />
              <Card.Body>
                <Card.Title className="mt-2">{category.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {categories.length > 4 && (
        <Button variant="primary" onClick={handleShowAllClick} className="mt-3">
          {showAll ? "Show Less" : "Show All Categories"}
        </Button>
      )}
    </div>
  );
};

export default CategoriesPage;
