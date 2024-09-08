import { Container, Stack } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../redux/product/productActions";
import { getCategoriesAction } from "../redux/category/categoryActions";
import { getOrdersAction } from "../redux/order/orderAction";
import CircuitBoardLoader from "../components/CustomLoader/CircuitBoardLoader";
import TechIconLoader from "../components/CustomLoader/TechIconLoader";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeReached, setMinLoadingTimeReached] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductsAction());
      await dispatch(getCategoriesAction());
      await dispatch(getOrdersAction());
    };

    const timer = setTimeout(() => {
      setMinLoadingTimeReached(true);
    }, 5000); // 7 seconds

    fetchData().then(() => {
      setLoading(false);
    });

    // Clear timer if fetch completes before 10 seconds
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading || !minLoadingTimeReached) {
    return <TechIconLoader />;
  }

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
