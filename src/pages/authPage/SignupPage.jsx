import { Badge, Col, Container, Image, Row, Stack } from "react-bootstrap";
import logo from "../../assets/logo.png";
import SignupForm from "../../components/User/Signup/signupForm";
import "./LoginPage.css"; // Import the CSS file for styling

const SignupPage = () => {
  return (
    <Container fluid className="vh-100 d-flex flex-column position-relative">
      <Row className="flex-grow-1 align-items-start overflow-auto position-relative">
        <Col className="d-flex flex-column justify-content-center align-items-center position-relative">
          <Stack className="justify-content-center align-items-center mt-4 position-relative">
            <Image src={logo} height={400} width={400} />
          </Stack>
        </Col>

        <Col
          className="d-flex justify-content-center align-items-center mt-4 position-relative"
          style={{
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <SignupForm />
        </Col>
      </Row>
      <div className="background-blur"></div>
    </Container>
  );
};

export default SignupPage;
