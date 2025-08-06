// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { userName } = useContext(AuthContext);

  if (!userName) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
