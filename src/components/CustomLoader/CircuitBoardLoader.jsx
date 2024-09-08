// CircuitBoardLoader.jsx
import React from "react";
import "./CircuitBoardLoader.css";

const CircuitBoardLoader = () => {
  return (
    <div className="circuit-board-loader">
      <div className="circuit-board">
        <div className="line"></div>
        <div className="line"></div>
        <div className="node"></div>
        <div className="node"></div>
        <div className="node"></div>
      </div>
      <div></div>
    </div>
  );
};

export default CircuitBoardLoader;
