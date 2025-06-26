import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#010103] c-space">
    <h1
      className="text-8xl threed-font mb-4"
      style={{ fontFamily: 'Changa One, cursive', textShadow: '2px 2px 0 #00f0ff, 4px 4px 0 #ff00c8' }}
    >
      404
    </h1>
    <p className="text-white-600 text-2xl mb-8 text-center max-w-xl">
      Oops! The page you are looking for does not exist.<br />
      Maybe you mistyped the address, or the page has moved.
    </p>
    <Link to="/" className="field-btn transition-transform duration-300 ease-in-out transform hover:scale-110">
      Go Home
    </Link>
  </div>
);

export default NotFound; 