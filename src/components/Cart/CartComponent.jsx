import { Col, Image, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartComponent = () => {
  const { items } = useSelector((state) => state.cart);
  return (
    <>
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
    </>
  );
};

export default CartComponent;
