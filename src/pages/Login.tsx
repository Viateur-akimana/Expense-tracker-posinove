import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/lib";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Attempt to log in
    if (login(username, password)) {
      navigate("/"); // Redirect to home on success
    } else {
      alert("Invalid credentials!"); // Show error on failure
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Login
      </button>
      <p>Don't have an account? <a href="/signup">Register here</a></p>
    </form>
  );
};

export default Login;
