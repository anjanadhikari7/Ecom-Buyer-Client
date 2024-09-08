// TechIconLoader.jsx
import React from "react";
import { FaLaptop, FaGamepad } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import "./TechIconLoader.css";

const TechIconLoader = () => {
  return (
    <div className="loader-container">
      <div className="icon-wrapper">
        <FaLaptop className="tech-icon" />
        <FaGamepad className="tech-icon" />
        <FiSmartphone className="tech-icon" />
      </div>
      <svg
        height="120"
        stroke="#333" // Greyish color
        strokeWidth="2"
        className="text-line"
        width="100%"
      >
        <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">
          Gadget Galaxy
        </text>
      </svg>
    </div>
  );
};

export default TechIconLoader;
