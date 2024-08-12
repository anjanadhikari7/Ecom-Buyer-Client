import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://www.wannabe-toys.com/images/logo-wannabe-toys.png"
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="Wannabe Toys Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Homepage</Nav.Link>
              <Nav.Link href="#shop">Shop</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contacts">Contacts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <img
              src="https://www.wannabe-toys.com/images/hero.jpg"
              className="img-fluid"
              alt="Wannabe Toys Hero Image"
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12} className="text-center">
            <h1>Welcome to Wannabe Toys</h1>
            <p>
              Discover our collection of unique and handcrafted toys, perfect
              for children of all ages.
            </p>
            <Button variant="primary">Shop Now</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
