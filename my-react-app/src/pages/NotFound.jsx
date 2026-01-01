import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6">
      <div className="text-center max-w-xl">
        <FaExclamationTriangle className="text-cyan-700 text-6xl mb-4 mx-auto" />
        <h1 className="text-5xl font-bold text-gray-800 mb-2"> Page Not Found</h1>
        <p className="text-gray-600 text-lg mb-6">
          The page you’re looking for doesn’t exist or may have been moved. Please check the URL or return to the homepage.
        </p>
      
      </div>
    </div>
  );
};

export default NotFound;
