import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      <h1 className="text-9xl font-extrabold text-red-500 animate-pulse">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="mt-2 text-center max-w-md">
        Sorry, the page you're looking for might have been removed or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
      >
        Go to Home
      </button>

      <div className="mt-8">
        <img 
          src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" 
          alt="Lost gif" 
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default NotFound;
