import React, { useEffect, useState, useContext } from "react";
import { getSessionId } from "./utils/session";
import { CartContext } from "./cartContext";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const sessionId = getSessionId();
  const userId = localStorage.getItem("userId");
  const { refreshCartCount } = useContext(CartContext);

  useEffect(() => {
    async function fetchCart() {
      try {
        let queryParams = [];
        if (userId) queryParams.push(`userId=${userId}`);
        if (sessionId) queryParams.push(`sessionId=${sessionId}`);
        const queryString = queryParams.join("&");

        const res = await fetch(`https://localhost:7223/api/cart?${queryString}`);
        if (!res.ok) {
          console.error("Failed to fetch cart items:", res.status);
          setCartItems([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [sessionId, userId]);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch("https://localhost:7223/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: newQuantity }),
      });
      if (res.ok) {
        setCartItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
        refreshCartCount();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`https://localhost:7223/api/cart/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        refreshCartCount();
      }
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  if (loading) return <p style={{ textAlign: "center" }}>Loading cart...</p>;
  if (cartItems.length === 0)
    return <p style={{ textAlign: "center", marginTop: 40 }}>Your cart is empty.</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img
              src={`https://localhost:7223${item.productImageUrl}`}
              alt={item.productName}
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
            />
            <div>
              <h4 style={{ margin: 0 }}>{item.productName}</h4>
              <p style={{ margin: "5px 0", color: "#555" }}>${item.productPrice.toFixed(2)}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              style={buttonStyle}
            >
              −
            </button>
            <span style={{ minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              style={buttonStyle}
            >
              +
            </button>
          </div>

          <div style={{ fontWeight: "bold", width: 100, textAlign: "right" }}>
            ${(item.productPrice * item.quantity).toFixed(2)}
          </div>

          <button onClick={() => handleRemove(item.id)} style={removeButtonStyle}>
            Remove
          </button>
        </div>
      ))}

      <div
        style={{
          textAlign: "right",
          marginTop: 30,
          fontSize: "1.3rem",
          fontWeight: "bold",
          borderTop: "1px solid #eee",
          paddingTop: 20,
        }}
      >
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderRadius: 5,
  backgroundColor: "#f4f4f4",
  cursor: "pointer",
  fontSize: "1rem",
};

const removeButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
  marginLeft: 10,
};

export default CartPage;
