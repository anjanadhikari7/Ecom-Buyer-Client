import { Container, Stack } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../redux/product/productActions";
import { getCategoriesAction } from "../redux/category/categoryActions";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(getCategoriesAction());
  }, []);
  return (
    <Container fluid style={{ margin: 0 }}>
      <Stack gap={3}>
        <div className="p-2 rounded navbar ">
          <NavBar />
        </div>
        <Outlet />
      </Stack>
    </Container>
  );
};

export default LayoutPage;
