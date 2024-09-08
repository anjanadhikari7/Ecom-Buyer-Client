import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaRegUserCircle,
  FaHistory,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Utilities/logo.png";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../redux/user/userAction";

const initialFormData = { searchText: "", category: "" };

const NavBar = () => {
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleOnChange, formData } = useForm(initialFormData);
  const { categories } = useSelector((state) => state.category);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

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

  const handleUserIconClick = () => {
    if (!user?._id) {
      navigate("/login");
      console.log("logged out");
    }
  };

  const handleDropdownSelect = (path) => {
    navigate(path);
    setShowModal(false); // Close the modal after navigation
  };

  const handleLogout = () => {
    dispatch(logoutUserAction(user.email));
    navigate("/login");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
    // Navigate to the search results page with the query parameters
    navigate(
      `/search?query=${encodeURIComponent(
        formData.searchText
      )}&category=${encodeURIComponent(formData.category)}`
    );
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
              <Navbar.Brand as={Link} to="/">
                <img
                  src={logo}
                  className={`d-inline-block align-top p-0 logo ${
                    scrolled ? "logo-shrink" : ""
                  }`}
                  alt="Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/shop">
                    Shop
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    Contact
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col
              xs={8}
              className="d-flex justify-content-end align-items-center"
            >
              <IoIosSearch className="icon me-3" onClick={handleModal} />
              <div style={{ position: "relative", display: "inline-block" }}>
                <MdOutlineShoppingCart
                  className="icon"
                  onClick={() => navigate("/cart")}
                />
                {totalQuantity > 0 && (
                  <span className="cart-quantity-badge">{totalQuantity}</span>
                )}
              </div>
              {user?._id ? (
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle
                    as="button"
                    className="d-flex align-items-center btn btn-link text-decoration-none dropdown-toggle"
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    <FaRegUserCircle className="icon me-2" />
                    <span className="user-name">{user.firstName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-end">
                    <Dropdown.Item
                      as={Link}
                      to="/user"
                      onClick={() => setShowModal(false)}
                    >
                      <FaRegUserCircle className="me-2" />
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/order-history"
                      onClick={() => setShowModal(false)}
                    >
                      <FaHistory className="me-2" />
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/update-details"
                      onClick={() => setShowModal(false)}
                    >
                      <FaUserEdit className="me-2" />
                      Update Details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <FaRegUserCircle
                  className="icon"
                  onClick={handleUserIconClick}
                />
              )}
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
          <Form onSubmit={handleSearchSubmit}>
            <div className="search-modal-content">
              <div className="d-flex w-100 align-items-center">
                <select
                  className="form-select me-2 bg-transparent"
                  name="category"
                  onChange={handleOnChange}
                  value={formData.category}
                >
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
                  onChange={handleOnChange}
                  value={formData.searchText}
                  name="searchText"
                />
                <Button type="submit" className="btn btn-primary">
                  Search
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
