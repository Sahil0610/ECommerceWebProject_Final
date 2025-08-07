import React, { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedId = localStorage.getItem("userId");

    if (savedName) setUserName(savedName);

    if (savedId) {
      const parsedId = parseInt(savedId, 10);
      if (!isNaN(parsedId)) {
        setUserId(parsedId);
      }
    }
  }, []);

  const login = (name, id) => {
    setUserName(name);
    setUserId(id);

    localStorage.setItem("userName", name);
    localStorage.setItem("userId", id);
  };

  const logout = () => {
    setUserName(null);
    setUserId(null);

    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
