import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import ProductSection from "../../components/Product/productSection";
import { useSelector } from "react-redux";

const ShopProducts = () => {
  const location = useLocation(); // Get the selected category from location state
  const { selectedCategory } = location.state || {}; // Safely access selectedCategory
  const { products } = useSelector((state) => state.product); // Assuming products are in redux state

  // Default to "All" if selectedCategory is undefined
  const category = selectedCategory || "All";

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => category === "All" || product.parentCategory === category
  );

  return (
    <div>
      <ProductSection products={filteredProducts} selectedCategory={category} />
    </div>
  );
};

export default ShopProducts;
