import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "./product";

const ProductSection = ({ searchQuery, selectedCategory }) => {
  const { products } = useSelector((state) => state.product);
  const [sortBy, setSortBy] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  // Dynamically update products per page based on window width
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth < 576) {
        setProductsPerPage(4); // Mobile: 2 items per row × 2 rows
      } else if (window.innerWidth < 768) {
        setProductsPerPage(6); // Tablet: 3 items per row × 2 rows
      } else if (window.innerWidth < 992) {
        setProductsPerPage(8); // Small desktop: 4 items per row × 2 rows
      } else {
        setProductsPerPage(12); // Large desktop: 6 items per row × 2 rows
      }
    };

    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  // Filter and sort products
  const filterAndSortProducts = () => {
    let filteredProducts = [...products]; // Create a copy to avoid mutating Redux state

    // Filter by selected category
    if (selectedCategory && selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.parentCategory === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products by price
    if (sortBy === "Price: Low to High") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const sortedProducts = filterAndSortProducts();

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          {selectedCategory !== "All" ? selectedCategory : "All Products"}
        </h2>

        {/* Sorting checkboxes */}
        <Form className="d-flex">
          <div className="form-check form-check-inline">
            <Form.Check
              type="radio"
              label="All"
              name="sortOptions"
              value="All"
              checked={sortBy === "All"}
              onChange={handleSortChange}
              className="me-2"
            />
          </div>
          <div className="form-check form-check-inline">
            <Form.Check
              type="radio"
              label="Price: Low to High"
              name="sortOptions"
              value="Price: Low to High"
              checked={sortBy === "Price: Low to High"}
              onChange={handleSortChange}
              className="me-2"
            />
          </div>
          <div className="form-check form-check-inline">
            <Form.Check
              type="radio"
              label="Price: High to Low"
              name="sortOptions"
              value="Price: High to Low"
              checked={sortBy === "Price: High to Low"}
              onChange={handleSortChange}
              className="me-2"
            />
          </div>
        </Form>
      </div>

      {/* Product display */}
      <Row className="g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={2}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <div className="text-center">
            <p>No products match your search criteria.</p>
          </div>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-4">
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
