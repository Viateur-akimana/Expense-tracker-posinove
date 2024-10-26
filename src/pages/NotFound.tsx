import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
