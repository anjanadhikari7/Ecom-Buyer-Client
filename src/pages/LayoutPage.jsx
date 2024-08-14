import { Container, Stack } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import ProductSection from "../components/Product/productSection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../redux/product/productActions";
import { getCategoriesAction } from "../redux/category/categoryActions";

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

        <div className="p-2 carousel rounded">Carousel</div>
        <div className="p-2 products rounded">
          <ProductSection />
        </div>
        <div className="p-2 links rounded">Links</div>
        <div className="p-2 footer rounded">Footer</div>
      </Stack>
    </Container>
  );
};

export default LayoutPage;
