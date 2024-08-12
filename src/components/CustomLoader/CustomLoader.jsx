import { Image, Spinner } from "react-bootstrap";
import logo from "../../Utilities/logo.png";
import "./CustomLoader.css";

const CustomLoader = () => {
  return (
    <>
      <Image src={logo} height={"100px"} width={"100px"} />
      <div className="loader d-flex justify-content-center align-items-center">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </>
  );
};

export default CustomLoader;
