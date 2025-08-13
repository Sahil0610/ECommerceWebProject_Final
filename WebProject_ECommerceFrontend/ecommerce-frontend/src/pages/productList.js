import React, { useEffect, useState, useContext  } from "react";
import { Link } from "react-router-dom";
import { getSessionId } from "../utils/session"; 
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/cartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const { userId, userName } = useContext(AuthContext);
  const { refreshCartCount } = useContext(CartContext);

  useEffect(() => {
    fetch("https://localhost:7223/api/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach((p) => {
          initialQuantities[p.productId] = 1;
        });
        setQuantities(initialQuantities);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handlePlusQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const handleMinusQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId];
    const product = products.find((p) => p.productId === productId);
    const sessionId  = getSessionId(); // for guests
    
    const cartItem = {
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: quantity,
      sessionId: userId ? null : sessionId,
      userId: userId || null,
    };

    try {
      const res = await fetch("https://localhost:7223/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        //alert(`Added ${quantity} x "${product.productName}" to cart.`);
        refreshCartCount();
      } else {
        const err = await res.text();
        alert("Error: " + err);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: 50 }}>Loading products...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 40, fontSize: "2.5rem", color: "#333" }}>
        Furniture Chairs Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 30,
        }}
      >
        {products.map((product) => (
          <div
            key={product.productId}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link to={`/products/${product.productId}`} style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
              <img
                src={`https://localhost:7223${product.productImageUrl}`}
                alt={product.productName}
                style={{ maxWidth: "100%", height: 180, objectFit: "contain", borderRadius: 8 }}
              />
            </Link>

            <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "#222" }}>{product.productName}</h3>
            <p style={{ flexGrow: 1, fontSize: "0.9rem", color: "#555", marginBottom: 15 }}>
              {product.productDescription}
            </p>

            <p style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 15, color: "#000" }}>
              ${product.productPrice.toFixed(2)}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => handleMinusQuantity(product.productId)}
                  style={{
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    padding: "8px 15px",
                    minWidth: 30,
                    textAlign: "center",
                    fontSize: "1rem",
                    userSelect: "none",
                    display: "inline-block",
                  }}
                >
                  {quantities[product.productId]}
                </span>
                <button
                  onClick={() => handlePlusQuantity(product.productId)}
                  style={{
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product.productId)}
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 4px 8px rgb(0 123 255 / 0.3)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
