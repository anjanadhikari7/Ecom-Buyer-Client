import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../../components/Product/product";
import { Button, Row, Col } from "react-bootstrap";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const query = params.get("query") || "";
  const category = params.get("category") || "";

  const { products } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const searchQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(searchQuery);
      const matchesCategory = category
        ? product.parentCategory === category
        : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [products, query, category]);

  const handleGoToShop = () => {
    navigate("/shop");
  };

  return (
    <div>
      <h2>Search Results</h2>
      {filteredProducts.length > 0 ? (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <p>No products found matching your search criteria.</p>
          <Button variant="primary" onClick={handleGoToShop}>
            Go to Shop
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
