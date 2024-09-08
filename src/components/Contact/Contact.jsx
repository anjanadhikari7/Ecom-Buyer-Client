import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <Container className="contact-page p-4">
      <Row className="mb-4">
        <Col>
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Whether you have a question about our
            products, services, or anything else, feel free to reach out to us.
            Our team is here to help.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <h2>Get in Touch</h2>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your message" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h2>Contact Information</h2>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt size={24} />
              <div>
                <h5>Our Address</h5>
                <p>13A/8-10 King St, Rockdale NSW 2216</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone size={24} />
              <div>
                <h5>Phone</h5>
                <p>(123) 456-7890</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope size={24} />
              <div>
                <h5>Email</h5>
                <p>support@gadgetgalaxy.com</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.9851826038749!2d151.13851590764557!3d-33.95221356326775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bb874fec5abf%3A0xbe205a4a195143a0!2sDented%20Code!5e0!3m2!1sen!2sau!4v1725801171871!5m2!1sen!2sau"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              width="100%"
              height="300"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
