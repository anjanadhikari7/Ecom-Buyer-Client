import React, { useState, useMemo } from "react";
import Carousel from "../../components/Carousel/carousel";
import CategoriesPage from "../categories/CategoriesPage";
import Product from "../../components/Product/product";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products } = useSelector((state) => state.product);

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
            {" "}
            {/* Adjusted gutter size */}
            {onSaleProducts.length > 0 ? (
              onSaleProducts.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <p>No products on sale at the moment.</p>
            )}
          </Row>
        </div>

        <div className="highlight-section mt-4">
          <h3>Top Sellers</h3>
          <Row className="g-2">
            {" "}
            {/* Adjusted gutter size */}
            {topSellerProducts.length > 0 ? (
              topSellerProducts.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <p>No top sellers available at the moment.</p>
            )}
          </Row>
        </div>

        <div className="highlight-section mt-4">
          <h3>Recently Added</h3>
          <Row className="g-2">
            {" "}
            {/* Adjusted gutter size */}
            {recentlyAddedProducts.length > 0 ? (
              recentlyAddedProducts.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <p>No recently added products.</p>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
