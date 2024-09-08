import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import CustomInput from "../../components/CustomInput/customInput";
import { updateUserAction } from "../../redux/user/userAction";

const EditUserDetails = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = React.useState({
    _id: user._id, // Include _id here
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(userDetails));
  };

  return (
    <Container className="edit-user-details p-4">
      <Row className="mb-4">
        <Col>
          <h1>Edit Your Details</h1>
          <p>
            Update your personal information and ensure your details are
            up-to-date.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <CustomInput
                  label="First Name"
                  inputAttributes={{
                    type: "text",
                    name: "firstName",
                    value: userDetails.firstName,
                    placeholder: "Enter your first name",
                  }}
                  handleOnChange={handleChange}
                />
                <CustomInput
                  label="Last Name"
                  inputAttributes={{
                    type: "text",
                    name: "lastName",
                    value: userDetails.lastName,
                    placeholder: "Enter your last name",
                  }}
                  handleOnChange={handleChange}
                />
                <CustomInput
                  label="Email Address"
                  inputAttributes={{
                    type: "email",
                    name: "email",
                    value: userDetails.email,
                    placeholder: "Enter your email",
                  }}
                  handleOnChange={handleChange}
                />
                <CustomInput
                  label="Phone Number"
                  inputAttributes={{
                    type: "tel",
                    name: "phone",
                    value: userDetails.phone,
                    placeholder: "Enter your phone number",
                  }}
                  handleOnChange={handleChange}
                />
                <CustomInput
                  label="Address"
                  inputAttributes={{
                    type: "text",
                    name: "address",
                    value: userDetails.address,
                    placeholder: "Enter your address",
                  }}
                  handleOnChange={handleChange}
                />
                <Button variant="primary" type="submit">
                  {isLoading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="contact-info-card">
            <Card.Body>
              <h2>Contact Information</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <FaUser size={24} />
                  <div>
                    <h5>Name</h5>
                    <p>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaEnvelope size={24} />
                  <div>
                    <h5>Email</h5>
                    <p>{userDetails.email}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaPhone size={24} />
                  <div>
                    <h5>Phone</h5>
                    <p>{userDetails.phone}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt size={24} />
                  <div>
                    <h5>Address</h5>
                    <p>{userDetails.address}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserDetails;
