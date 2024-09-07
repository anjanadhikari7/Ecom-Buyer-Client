import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Row, Col, ListGroup, Image } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput/customInput";
import { useNavigate } from "react-router-dom";

const CheckOutUserDetailsForm = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
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
  };

  const { handleOnChange, formData, setFormData } = useForm(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [user, items, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/checkout");
  };

  return (
    <Row className="mt-5">
      {/* Left side: Cart items */}
      <Col md={6}>
        <h3>Cart Items</h3>
        {items.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item
                key={item._id}
                className="d-flex align-items-center"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fluid
                  rounded
                  style={{
                    width: "150px",
                    height: "150px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      {/* Right side: Checkout form */}
      <Col md={6}>
        <h3>Checkout Details</h3>
        <Form onSubmit={handleSubmit}>
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
          <CustomInput
            label="Phone number"
            inputAttributes={{
              type: "String",
              name: "phone",
              value: formData.phone,
              disabled: true,
            }}
            handleOnChange={handleOnChange}
          />

          <CustomInput
            label="Address"
            inputAttributes={{
              type: "text",
              name: "address",
              value: formData.address,
            }}
            handleOnChange={handleOnChange}
          />

          <Button type="submit" variant="primary" className="mt-3">
            Proceed to payment
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CheckOutUserDetailsForm;
