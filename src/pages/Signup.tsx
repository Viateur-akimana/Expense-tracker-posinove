import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/lib";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(username, password);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
        Signup
      </button>
    </form>
  );
};

export default Signup;
