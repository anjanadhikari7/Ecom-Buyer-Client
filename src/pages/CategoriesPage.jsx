import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);

  return (
    <Row className="justify-content-center">
      <h1>Shop by categories</h1>
      {categories.map((category, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Card className="category-card text-center">
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
