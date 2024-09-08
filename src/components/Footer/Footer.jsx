import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css"; // Import custom CSS file if needed

const Footer = () => {
  const containerStyle = {
    padding: "1rem 0",
    backgroundColor: "#f8f9fa", // Light background for contrast
    fontSize: "0.875rem", // Smaller font size for compactness
  };

  const headingStyle = {
    fontWeight: "bold",
    marginBottom: "0.75rem",
    color: "#343a40", // Dark color for headings
  };

  const navLinkStyle = {
    color: "#6c757d", // Subtle color for links
    textDecoration: "none",
  };

  const navLinkHoverStyle = {
    color: "#007bff", // Highlight color on hover
  };

  const socialIconStyle = {
    fontSize: "1.25rem",
    color: "#343a40",
    margin: "0 0.5rem",
  };

  return (
    <footer style={containerStyle}>
      <Container>
        <Row className="text-center text-md-start">
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h6 style={headingStyle}>Company</h6>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/about"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#careers"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Careers
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#blog"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Blog
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h6 style={headingStyle}>Support</h6>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/contact"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#faq"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                FAQ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#returns"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Returns
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h6 style={headingStyle}>Legal</h6>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="#privacy-policy"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Privacy Policy
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/terms-of-service"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Terms of Service
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#cookie-policy"
                style={navLinkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = navLinkHoverStyle.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = navLinkStyle.color)
                }
              >
                Cookie Policy
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <div className="social-icons mt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Gadget Galaxy. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
