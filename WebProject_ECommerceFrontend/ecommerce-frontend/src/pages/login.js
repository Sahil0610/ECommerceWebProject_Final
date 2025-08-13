import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/cartContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { refreshCartCount } = useContext(CartContext);
  const [googleUserName, setGoogleUserName] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Existing email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://localhost:7223/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        const { userId, userName, token } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
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

        await refreshCartCount();
        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // ✅ Google login without backend
  const handleGoogleLogin = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const name = decoded.name;

      setGoogleUserName(name);
      localStorage.setItem("userName", name);

      setMessage(`Hello, ${name}! You are logged in with Google.`);
    } catch (err) {
      setMessage("Google login error: " + err.message);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-10">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}

      {/* Email/Password login */}
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

      {/* Google Login */}
      <div className="mt-6 text-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Google login failed")}
        />
      </div>
    </div>
  );
}
