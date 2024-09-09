import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Pagination,
  Button,
} from "react-bootstrap";
import { getOrdersAction } from "../../redux/order/orderAction";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    dispatch(getOrdersAction());
    if (!user?._id) {
      navigate("/login");
      toast.warning("Please login first!");
      return;
    }
  }, [user, navigate]);

  const getProductDetails = (productId) => {
    return products.find((product) => product._id === productId);
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-success";
      case "shipped":
        return "text-primary";
      case "pending":
        return "text-info";
      default:
        return "";
    }
  };

  const formatStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  if (!orders?.length) {
    return (
      <Container className="mt-5">
        <h2>Hello {user.firstName},</h2>
        <h3 className="text-center">You have not placed any orders yet.</h3>
        <Button
          variant="primary"
          onClick={() => navigate("/shop")}
          className="mt-3"
        >
          Go to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "900px" }}>
      <h2>Hello {user.firstName},</h2>
      <h2 className="text-center mb-4">Your Order History</h2>
      {currentOrders.map((order) => (
        <Card
          key={order.orderId}
          className="mb-4 shadow-sm"
          style={{ padding: "10px 15px" }}
        >
          <Card.Header>
            <Row>
              <Col md={4}>
                <strong>Order ID:</strong> {order.orderId}
              </Col>
              <Col md={4}>
                <strong>Status:</strong>{" "}
                <span className={getStatusColor(order.status)}>
                  {formatStatus(order.status)}
                </span>
              </Col>
              <Col md={4} className="text-md-end">
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {order.products.map((item) => {
                  const productDetails = getProductDetails(item.productId);
                  return (
                    <Row
                      key={item.productId}
                      className="mb-2 align-items-center"
                    >
                      <Col md={2}>
                        <Image
                          src={productDetails?.thumbnail || "placeholder.jpg"}
                          alt={productDetails?.name}
                          fluid
                          rounded
                          style={{ maxHeight: "75px", maxWidth: "75px" }}
                        />
                      </Col>
                      <Col md={6}>
                        <p className="mb-1">
                          <strong>{productDetails?.name}</strong>
                        </p>
                        <p className="text-muted mb-0">Qty: {item.quantity}</p>
                      </Col>
                      <Col md={4} className="text-md-end">
                        <strong>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <strong>Shipping Address:</strong> {order.address}
              </Col>
              <Col md={6} className="text-md-end">
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <Pagination className="justify-content-center mt-4">
        {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(
          (num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => paginate(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );
};

export default OrderHistory;
