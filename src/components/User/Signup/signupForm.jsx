import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { signupFormFields } from "./signupFormFields";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import { setIsLoading } from "../../../redux/user/userSlice";
import { createUser } from "../../../axios/userAxios";
import CustomInput from "../../CustomInput/customInput";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formValidation = (formData) => {
  const { password, confirmPassword } = formData;
  return password === confirmPassword;
};

const SignupForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(initialFormData);
  const { firstName, lastName, email, address, phone, password } = formData;

  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = formValidation(formData);
    if (!isValidPassword) {
      return toast.error("Password and confirm password should match");
    }

    dispatch(setIsLoading(true));
    const result = await createUser({
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
    });
    dispatch(setIsLoading(false));

    if (result?.status === "error") {
      return toast.error(result.message || "Cannot create user!");
    }

    setFormData(initialFormData);
    toast.success(result.message || "Email verification link sent.");

    // Navigate to login page on successful signup
    navigate("/login");
  };

  return (
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={handleOnSubmit}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <Row>
          {signupFormFields.map((field, index) => (
            <Col key={index} xs={index === 0 || index === 1 ? 6 : 12}>
              <CustomInput
                label={field.label}
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: field.type,
                  name: field.name,
                  value: formData[field.name],
                  placeholder: field.placeholder,
                  required: true,
                }}
              />
            </Col>
          ))}
        </Row>

        <Button
          className="btn-lg w-100 btn-custom"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" /> : "Signup"}
        </Button>
        <p className="pt-2">
          Already a user? <Link to="/Login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignupForm;
