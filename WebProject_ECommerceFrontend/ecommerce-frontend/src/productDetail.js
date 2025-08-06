import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams(); // get productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://localhost:7223/api/Products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handlePlusQuantity = () => setQuantity(quantity + 1);
  const handleMinusQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x "${product.productName}" to cart.`);
    // Replace alert with actual cart logic
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: 50 }}>Loading product details...</div>;
  if (!product) return <div style={{ textAlign: "center", marginTop: 50 }}>Product not found.</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 40, fontSize: "2.5rem", color: "#333" }}>
        {product.productName}
      </h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", textAlign: "center" }}>
          <img
            src={`https://localhost:7223${product.productImageUrl}`}
            alt={product.productName}
            style={{
              width: "100%",      // fill container width
              maxHeight: 600,    // taller max height
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
        <div style={{ flex: "1 1 45%", display: "flex", flexDirection: "column" }}>
          <p style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: 20 }}>
            Price: ${product.productPrice.toFixed(2)}
          </p>
          <p style={{ fontSize: "1rem", color: "#555", marginBottom: 40 }}>
            {product.productDescription}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <button
              onClick={handleMinusQuantity}
              style={{
                padding: "10px 15px",
                fontSize: "1.2rem",
                borderRadius: 8,
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              −
            </button>
            <span style={{ fontSize: "1.3rem", minWidth: 30, textAlign: "center" }}>{quantity}</span>
            <button
              onClick={handlePlusQuantity}
              style={{
                padding: "10px 15px",
                fontSize: "1.2rem",
                borderRadius: 8,
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              style={{
                marginLeft: 30,
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 25px",
                border: "none",
                borderRadius: 8,
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
      </div>
    </div>
  );
}

export default ProductDetail;
