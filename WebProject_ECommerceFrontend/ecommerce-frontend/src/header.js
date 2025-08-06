// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "./AuthContext";

function Header() {
  const { userName, logout } = useContext(AuthContext);

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

        <Link to="/cart" style={styles.iconLink}>
          <FaShoppingCart size={22} /> Cart
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
    textDecoration: "none", color: "#333", fontWeight: "600"
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
