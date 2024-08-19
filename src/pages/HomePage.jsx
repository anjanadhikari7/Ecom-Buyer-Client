import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import ProductSection from "../components/Product/productSection";

function HomePage() {
  return (
    <div>
      <div className="p-2 carousel rounded">Carousel</div>
      <div className="p-2 products rounded">
        <ProductSection />
      </div>
      <div className="p-2 links rounded">Links</div>
      <div className="p-2 footer rounded">Footer</div>
    </div>
  );
}

export default HomePage;
