import { Container, Stack } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../redux/product/productActions";
import { getCategoriesAction } from "../redux/category/categoryActions";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const LayoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(getCategoriesAction());
  }, []);
  return (
    <Container fluid style={{ margin: 0 }}>
      <Stack gap={3}>
        <div>
          <NavBar />
        </div>
        <div style={{ marginTop: "110px" }}>
          <Outlet />
        </div>
        <div className="p-2 footer rounded">
          <Footer />
        </div>
      </Stack>
    </Container>
  );
};

export default LayoutPage;
