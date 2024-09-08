import { Col, Container, Row } from "react-bootstrap";
import CheckOutUserDetailsForm from "./CheckOutUserDetailsForm";
import CartComponent from "../Cart/CartComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";

const CheckOutUserDetails = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      toast.warning("User not logged in! Please log in to proceed.");
    }
  }, [user, navigate]);

  return (
    <Container fluid className="mt-5">
      <Row className="mx-5">
        {/* Cart and User Details Section */}
        <Col md={6}>
          <CartComponent />
        </Col>

        {/* Payment Section */}
        <Col md={6}>
          <CheckOutUserDetailsForm />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutUserDetails;
