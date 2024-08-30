import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUsPage.css"; // Import custom CSS file

const AboutUsPage = () => {
  return (
    <Container className="about-us-page p-4">
      <Row className="mb-4">
        <Col>
          <h1>About Us</h1>
          <p>
            Welcome to Gadget Galaxy! We are dedicated to offering a wide range
            of high-quality tech products and exceptional customer service. Our
            goal is to be your one-stop shop for all your tech needs, from the
            latest gadgets to essential accessories.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide innovative and reliable tech solutions
            that enhance the way you live and work. We strive to offer products
            that not only meet but exceed your expectations, backed by
            unparalleled customer support.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Meet Our Team</h2>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="team-card">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Text>Founder & CEO</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="team-card">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <Card.Body>
              <Card.Title>Jane Smith</Card.Title>
              <Card.Text>Chief Technology Officer</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="team-card">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <Card.Body>
              <Card.Title>Emily Johnson</Card.Title>
              <Card.Text>Marketing Manager</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
