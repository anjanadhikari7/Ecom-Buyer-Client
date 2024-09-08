import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput/customInput";
import { useNavigate } from "react-router-dom";

const CheckOutUserDetailsForm = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const initialFormData = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    userId: user._id,
    products: items.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
    totalAmount: items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2),
  };

  const { handleOnChange, formData, setFormData } = useForm(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [user, items, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout"); // Move to payment section
  };

  return (
    <Container className="p-4 border shadow-lg rounded-4">
      <h3 className="text-center mb-4">Checkout Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <CustomInput
              label="First Name"
              inputAttributes={{
                type: "text",
                name: "firstName",
                value: formData.firstName,
                disabled: true,
              }}
              handleOnChange={handleOnChange}
            />
          </Col>
          <Col md={6}>
            <CustomInput
              label="Last Name"
              inputAttributes={{
                type: "text",
                name: "lastName",
                value: formData.lastName,
                disabled: true,
              }}
              handleOnChange={handleOnChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <CustomInput
              label="Email"
              inputAttributes={{
                type: "email",
                name: "email",
                value: formData.email,
                disabled: true,
              }}
              handleOnChange={handleOnChange}
            />
          </Col>
          <Col md={6}>
            <CustomInput
              label="Phone Number"
              inputAttributes={{
                type: "text",
                name: "phone",
                value: formData.phone,
                disabled: true,
              }}
              handleOnChange={handleOnChange}
            />
          </Col>
        </Row>
        <CustomInput
          label="Address"
          inputAttributes={{
            type: "text",
            name: "address",
            value: formData.address,
          }}
          handleOnChange={handleOnChange}
        />
        <Form.Group className="mt-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="text"
            value={`$${formData.totalAmount}`}
            readOnly
            className="text-center"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-lg w-100 mt-3">
          Proceed to Payment
        </Button>
      </Form>
    </Container>
  );
};

export default CheckOutUserDetailsForm;
