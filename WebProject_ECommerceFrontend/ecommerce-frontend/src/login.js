import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // adjust path as needed
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext"; // adjust path as needed

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context
  const { refreshCartCount } = useContext(CartContext); // get refreshCartCount function from context

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      const res = await fetch("https://localhost:7223/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const { userId, userName, token } = data;

        setMessage("Login successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);

        // Update AuthContext first
        login(userName, userId);

        // Merge guest cart
        const sessionId = localStorage.getItem("sessionId");
        await fetch("https://localhost:7223/api/cart/merge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId, userId }),
        });

        // ✅ Refresh cart count AFTER merge + login
        await refreshCartCount();

        navigate("/");
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-10">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit}>

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <button 
          type="submit" 
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
        >
          Login
        </button>

        <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
        </Link>
        </p>
      </form>

    </div>
  );
}
