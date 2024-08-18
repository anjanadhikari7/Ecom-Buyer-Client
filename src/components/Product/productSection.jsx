import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "./productCard";

const ProductSection = () => {
  const { products } = useSelector((state) => state.product);
  const [sortBy, setSortBy] = useState("All"); // Default sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8); // Default, will be adjusted based on screen size

  useEffect(() => {
    const updateProductsPerPage = () => {
      // Adjust products per page based on screen width
      if (window.innerWidth < 576) {
        setProductsPerPage(2); // Mobile: 1 product per row, 2 rows per page
      } else if (window.innerWidth < 768) {
        setProductsPerPage(4); // Tablet: 2 products per row, 2 rows per page
      } else if (window.innerWidth < 992) {
        setProductsPerPage(6); // Small desktop: 3 products per row, 2 rows per page
      } else {
        setProductsPerPage(8); // Large desktop: 4 products per row, 2 rows per page
      }
    };

    // Initial call
    updateProductsPerPage();

    // Add event listener
    window.addEventListener("resize", updateProductsPerPage);

    // Cleanup
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  // Group products by parentCategory
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.parentCategory || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Handle sorting logic
  const sortedProducts = () => {
    if (sortBy === "Categories") {
      return groupedProducts;
    } else {
      let productsToSort = [...products];
      if (sortBy === "Price: Low to High") {
        productsToSort.sort((a, b) => a.price - b.price);
      } else if (sortBy === "Price: High to Low") {
        productsToSort.sort((a, b) => b.price - a.price);
      }
      return { "All Products": productsToSort };
    }
  };

  const displayedProducts = sortedProducts();
  const currentCategory =
    sortBy === "Categories" ? Object.keys(displayedProducts) : ["All Products"];

  // Calculate total pages for the current category
  const totalPages = Math.ceil(
    displayedProducts[currentCategory[0]].length / productsPerPage
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts[currentCategory[0]].slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{sortBy === "Categories" ? "Categories" : "All Products"}</h2>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            style={{
              backgroundColor: "#FF5733", // Vibrant color
              borderColor: "#FF5733",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
            }}
          >
            Sort by: {sortBy}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortBy("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Price: Low to High")}>
              Price: Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Price: High to Low")}>
              Price: High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Categories")}>
              Categories
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {sortBy === "Categories" ? (
        Object.keys(displayedProducts).map((category) => (
          <div key={category} style={{ marginBottom: "2rem" }}>
            <h3>{category}</h3>
            <Row className="g-4">
              {displayedProducts[category].map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        <>
          <Row className="g-4">
            {currentProducts.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
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
                    style={{
                      backgroundColor:
                        index + 1 === currentPage ? "#007bff" : "#fff",
                      color: index + 1 === currentPage ? "#fff" : "#007bff",
                      borderColor: "#007bff",
                      borderRadius: "50%",
                      padding: "0.4rem 0.8rem",
                      margin: "0 0.25rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSection;
