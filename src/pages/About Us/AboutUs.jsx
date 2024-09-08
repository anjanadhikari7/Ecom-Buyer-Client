import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUsPage.css";
import userImage from "../../assets/userImage.png";

const AboutUsPage = () => {
  return (
    <Container className="about-us-page p-4">
      <Row className="mb-4">
        <Col>
          <h1>About Us</h1>
          <p>
            Welcome to Gadget Galaxy, your ultimate destination for high-quality
            tech products and exceptional customer service. Our goal is to be
            your go-to source for the latest gadgets and essential accessories.
            We are committed to delivering innovation, reliability, and
            excellence in every product we offer.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>Our Mission</h2>
          <p>
            At Gadget Galaxy, our mission is to enhance your life and work with
            innovative tech solutions. We aim to provide products that not only
            meet but exceed your expectations, supported by our dedicated
            customer service team. Our commitment is to deliver excellence and
            ensure your complete satisfaction with every purchase.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>Meet Our Founder</h2>
        </Col>
      </Row>

      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card className="team-card">
            <Card.Img variant="top" src={userImage} alt="Anjan Adhikari" />
            <Card.Body>
              <Card.Title>Anjan Adhikari</Card.Title>
              <Card.Text>Founder & CEO</Card.Text>
              <Card.Text>
                Anjan is the visionary behind Gadget Galaxy, driving the company
                with his passion for technology and commitment to customer
                satisfaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
