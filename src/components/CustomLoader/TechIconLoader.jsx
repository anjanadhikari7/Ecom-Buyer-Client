// TechIconLoader.jsx
import React from "react";
import { FaLaptop, FaGamepad } from "react-icons/fa";
import "./TechIconLoader.css";
import { FiSmartphone } from "react-icons/fi";

const TechIconLoader = () => {
  return (
    <div className="loader-container">
      <div className="icon-wrapper">
        <FaLaptop className="tech-icon" />
        <FaGamepad className="tech-icon" />
        <FiSmartphone className="tech-icon" />
      </div>
    </div>
  );
};

export default TechIconLoader;
