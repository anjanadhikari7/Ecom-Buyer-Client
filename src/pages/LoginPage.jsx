import { Badge, Col, Container, Image, Row, Stack } from "react-bootstrap";
import logo from "../assets/logo.png";
import background from "../assets/bg.jpg";
import LoginForm from "../components/User/Login/LoginForm";
import "./LoginPage.css"; // Import the CSS file for styling

const LoginPage = () => {
  return (
    <Container fluid className="vh-100 d-flex flex-column position-relative">
      <Row className="flex-grow-1 align-items-start overflow-auto position-relative">
        <Col className="d-flex justify-content-center position-relative">
          <Stack className="justify-content-center align-items-center mt-4 position-relative">
            <Image src={logo} height={400} width={400} color={"black"} />
          </Stack>
        </Col>

        <Col className="d-flex justify-content-center align-items-center mt-4 position-relative">
          <LoginForm />
        </Col>
      </Row>
      <div className="background-blur"></div>
    </Container>
  );
};

export default LoginPage;
