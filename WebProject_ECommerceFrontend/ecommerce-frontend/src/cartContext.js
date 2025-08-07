// src/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getSessionId } from "./utils/session"; // adjust path

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const sessionId = getSessionId();
    const query = userId ? `userId=${userId}` : `sessionId=${sessionId}`;

    try {
      const res = await fetch(`https://localhost:7223/api/cart/count?${query}`);
      if (res.ok) {
        const data = await res.json();
        setCartCount(data.count);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  // Fetch count on userId change (login/logout)
  useEffect(() => {
    if (userId) {
        // Delay to ensure merge completes in backend
        const timeout = setTimeout(() => {
        fetchCartCount();
        }, 200); // 300ms works well in most cases

        return () => clearTimeout(timeout); // Cleanup
    } else {
        fetchCartCount(); // Still fetch for guest users
    }
    }, [userId]);

  const refreshCartCount = async () => {
    await fetchCartCount();
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
