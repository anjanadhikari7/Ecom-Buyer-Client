import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import userImage from "../../assets/userImage.png";

const UserPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      toast.warning("Please login first!");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center mb-4">
          <Card className="shadow-sm p-3">
            <Image
              src={userImage}
              roundedCircle
              fluid
              style={{
                maxWidth: "250px",
                marginBottom: "15px",
                marginLeft: "70px",
              }}
            />
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-muted">{user.email}</p>
            <Button
              variant="outline-secondary"
              className="mt-3"
              onClick={() => navigate("/order-history")}
            >
              View Order History
            </Button>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <h3 className="mb-4">Account Details</h3>
            <Row>
              <Col md={6}>
                <p>
                  <strong>First Name:</strong> {user.firstName}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Last Name:</strong> {user.lastName}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </p>
              </Col>
              <Col md={12}>
                <p>
                  <strong>Address:</strong> {user.address || "No address added"}
                </p>
              </Col>
            </Row>
            <Button
              variant="outline-secondary"
              className="mt-3"
              onClick={() => navigate("/update-details")}
            >
              Edit Account Details
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
