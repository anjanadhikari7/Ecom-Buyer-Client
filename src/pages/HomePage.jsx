import React, { useState } from "react";
import ProductSection from "../components/Product/productSection";
import Carousel from "../components/Carousel/carousel";
import CategoriesPage from "./CategoriesPage";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        <ProductSection selectedCategory={selectedCategory} />
      </div>
      <div className="p-2 links rounded">Links</div>
      <div className="p-2 footer rounded">Footer</div>
    </div>
  );
}

export default HomePage;
