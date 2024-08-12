import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../Utilities/logo.png";
import useForm from "../../hooks/useForm";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../redux/category/categoryActions";

const initialFormData = { searchText: "", category: "" };

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleOnChange, formData } = useForm(initialFormData);
  const { categories } = useSelector((state) => state.category);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbar ${scrolled ? "navbar-shrink" : ""} shadow-lg`}
      >
        <Container>
          <Row className="w-100 align-items-center">
            <Col xs={4} className="d-flex align-items-center">
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  height="100"
                  className="d-inline-block align-top p-0"
                  alt="Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#shop">Shop</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                  <Nav.Link href="#contact">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col
              xs={8}
              className="d-flex justify-content-end align-items-center"
            >
              <IoIosSearch className="icon" onClick={handleModal} />
              <FaRegUserCircle className="icon" />
              <MdOutlineShoppingCart className="icon" />
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Modal
        show={showModal}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
        dialogClassName="transparent-modal"
      >
        <Modal.Header className="px-2 py-1" closeButton>
          <Modal.Title className="d-flex flex-fill justify-content-center">
            Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="search-modal-content">
              <div className="d-flex w-100 align-items-center">
                <select className="form-select me-2 bg-transparent">
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.title} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control me-2 wide-input"
                  placeholder="Search Anything...."
                  handleOnChange={handleOnChange}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
