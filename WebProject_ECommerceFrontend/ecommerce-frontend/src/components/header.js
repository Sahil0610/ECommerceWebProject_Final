import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getSessionId } from "../utils/session"; // Adjust path if needed
import { CartContext } from "../context/cartContext"; // Adjust path if needed


function Header() {
  const { userName, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  
  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo}>
        <Link to="/" style={styles.title}>FURNI.</Link>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
      </nav>

      {/* User Actions */}
      <div style={styles.actions}>
        {userName && (
          <span style={styles.greeting}>
            Hello, Happy Shopping {userName}!
          </span>
        )}

        {/* Profile icon only if logged in */}
        {userName && (
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">
            <FaUser size={22} />
          </Link>
        )}

        <Link to="/cart" style={{ ...styles.iconLink, position: "relative" }}>
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span>{cartCount > 99 ? "99+" : cartCount}</span>
          )}
        </Link>

        {userName ? (
          <button onClick={logout} style={styles.logoutBtn}>
            <FaSignOutAlt size={20} /> Logout
          </button>
        ) : (
          <Link to="/login" style={styles.iconLink}>
            <FaSignInAlt size={20} /> Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 50px", backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)", position: "sticky",
    top: 0, zIndex: 1000
  },
  logo: { fontWeight: "bold", fontSize: "2rem" },
  title: { textDecoration: "none", color: "#007bff" },
  nav: { display: "flex", gap: "30px" },
  link: { textDecoration: "none", color: "#333", fontWeight: "600", fontSize: "1.1rem" },
  actions: { display: "flex", gap: "20px", alignItems: "center" },
  iconLink: {
    display: "flex", alignItems: "center", gap: "6px",
    textDecoration: "none", color: "#333", fontWeight: "600",
    position: "relative"
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "12px",      // pill shape instead of perfect circle
    padding: "2px 6px",        // enough horizontal padding for 2+ digits
    fontSize: "0.8rem",
    fontWeight: "700",
    minWidth: "20px",
    textAlign: "center",
    whiteSpace: "nowrap",      // prevent wrapping for multi-digit numbers
    lineHeight: "1.2rem",
    boxSizing: "border-box",
    display: "inline-block",
  },

  greeting: { fontSize: "1rem", fontWeight: "500", color: "#333" },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    background: "red", color: "white", border: "none",
    padding: "6px 12px", cursor: "pointer", borderRadius: "4px",
    fontWeight: "600"
  }
};

export default Header;
