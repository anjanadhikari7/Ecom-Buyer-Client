import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/carousel";
import CategoriesPage from "../categories/CategoriesPage";
import Product from "../../components/Product/product";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const currentDate = Date.now();
  const fourteenDaysAgo = currentDate - 14 * 24 * 60 * 60 * 1000; // Timestamp for 14 days ago

  // Filter for on-sale products
  const onSaleProducts = useMemo(
    () =>
      products.filter((product) => {
        const salesStartDate = new Date(product.salesStartDate).getTime();
        const salesEndDate = new Date(product.salesEndDate).getTime();
        return salesStartDate <= currentDate && salesEndDate >= currentDate;
      }),
    [products, currentDate]
  );

  // Filter for top sellers
  const topSellerProducts = useMemo(
    () => products.filter((product) => product.isTopSeller),
    [products]
  );

  // Filter for recently added products
  const recentlyAddedProducts = useMemo(
    () =>
      products.filter((product) => {
        const createdAt = new Date(product.createdAt).getTime();
        return createdAt >= fourteenDaysAgo;
      }),
    [products, fourteenDaysAgo]
  );

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleViewMore = (section) => {
    navigate("/shop"); // Navigate to /shop
  };

  // Limit the number of products displayed
  const limitProducts = (products) => products.slice(0, 12);

  return (
    <div>
      <div className="p-2 carousel rounded">
        <Carousel />
      </div>
      <div className="p-2 products rounded">
        <CategoriesPage onSelectCategory={handleSelectCategory} />
      </div>

      {/* Highlights Section */}
      <div className="p-2 highlights rounded">
        <div className="highlight-section">
          <h3>On Sale</h3>
          <Row className="g-2">
            {limitProducts(onSaleProducts).map((product) => (
              <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {onSaleProducts.length > 12 && (
            <div className="text-center mt-4">
              <Button
                variant="primary"
                onClick={() => handleViewMore("onSale")}
              >
                View More
              </Button>
            </div>
          )}
        </div>

        <div className="highlight-section mt-4">
          <h3>Top Sellers</h3>
          <Row className="g-2">
            {limitProducts(topSellerProducts).map((product) => (
              <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {topSellerProducts.length > 12 && (
            <div className="text-center mt-4">
              <Button
                variant="primary"
                onClick={() => handleViewMore("topSellers")}
              >
                View More
              </Button>
            </div>
          )}
        </div>

        <div className="highlight-section mt-4">
          <h3>Recently Added</h3>
          <Row className="g-2">
            {limitProducts(recentlyAddedProducts).map((product) => (
              <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {recentlyAddedProducts.length > 12 && (
            <div className="text-center mt-4">
              <Button
                variant="primary"
                onClick={() => handleViewMore("recentlyAdded")}
              >
                View More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
