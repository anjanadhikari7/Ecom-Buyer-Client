import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Pagination, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "./product";
// import noProductsGif from "../assets/no-products.gif"; // Add your own GIF here

const ProductSection = ({ searchQuery, selectedCategory }) => {
  const { products } = useSelector((state) => state.product);
  const [sortBy, setSortBy] = useState("All"); // Default sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12); // 6 items per row × 2 rows
  const categoryRefs = useRef({}); // To store refs for each category section

  useEffect(() => {
    const updateProductsPerPage = () => {
      // Adjust products per page based on screen width
      if (window.innerWidth < 576) {
        setProductsPerPage(4); // Mobile: 2 items per row × 2 rows per page
      } else if (window.innerWidth < 768) {
        setProductsPerPage(6); // Tablet: 3 items per row × 2 rows per page
      } else if (window.innerWidth < 992) {
        setProductsPerPage(8); // Small desktop: 4 items per row × 2 rows per page
      } else {
        setProductsPerPage(12); // Large desktop: 6 items per row × 2 rows per page
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

  // Filter products by search query and selected category
  const filterProducts = (products) => {
    let filtered = products;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.parentCategory === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Handle sorting logic
  const sortedProducts = () => {
    let productsToSort = [];
    if (sortBy === "Categories") {
      const result = {};
      Object.keys(groupedProducts).forEach((category) => {
        result[category] = filterProducts(groupedProducts[category]);
      });
      return result;
    } else {
      productsToSort = filterProducts(products);
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

  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
          <div
            key={category}
            ref={(el) => (categoryRefs.current[category] = el)}
            style={{ marginBottom: "2rem" }}
          >
            <h3>{category}</h3>
            {displayedProducts[category].length > 0 ? (
              <Row className="g-4">
                {displayedProducts[category].map((product) => (
                  <Col key={product._id} xs={12} sm={6} md={4} lg={2}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center">
                {/* Add your own GIF here */}
                <p>No products available in this category.</p>
                <a href="#all-products" onClick={() => setSortBy("All")}>
                  View All Products
                </a>
              </div>
            )}
          </div>
        ))
      ) : (
        <>
          <Row className="g-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={2}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <div className="text-center">
                {/* Add your own GIF here */}
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
                    style={{
                      backgroundColor: "#FF5733", // Vibrant color
                      borderColor: "#FF5733",
                      color: "#fff",
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
