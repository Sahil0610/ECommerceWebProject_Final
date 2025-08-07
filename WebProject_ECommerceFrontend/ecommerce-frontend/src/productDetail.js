import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // adjust path if different

function ProductDetail() {
  const { id } = useParams();
  const { userName } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    reviewerName: "",
    rating: 0,
    reviewText: "",
    image: null
  });

  const [hoverRating, setHoverRating] = useState(0);

  const [previewImage, setPreviewImage] = useState(null); 

  useEffect(() => {
    console.log("Product ID from route:", id);

    // Fetch product
    fetch(`https://localhost:7223/api/Products/${id}`)
      .then(res => {
        console.log("Product fetch status:", res.status);
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        console.log("Product fetched:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    // Fetch reviews
    fetch(`https://localhost:7223/api/ProductReview/${id}`)
      .then(res => {
        console.log("Reviews fetch status:", res.status);
        const contentType = res.headers.get("content-type");
        console.log("Content-Type:", contentType);
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          console.warn("Response not JSON, returning empty array");
          return [];
        }
      })
      .then(data => {
        console.log("Reviews fetched:", data);
        setReviews(data || []);
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      });
  }, [id]);

  const handlePlusQuantity = () => setQuantity(quantity + 1);
  const handleMinusQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x "${product.productName}" to cart.`);
  };

  const handleInputChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Preview
    }
  };

  const handleStarClick = star => {
    setFormData(prev => ({ ...prev, rating: star }));
  };

  const handleSubmitReview = async e => {
    e.preventDefault();

    const form = new FormData();
    form.append("productId", parseInt(id)); // id should be int
    form.append("reviewerName", userName);
    form.append("rating", formData.rating);
    form.append("reviewText", formData.reviewText);
    if (formData.image) {
      form.append("Image", formData.image);
    }

    try {
      const res = await fetch("https://localhost:7223/api/ProductReview", {
        method: "POST",
        body: form
      });

      const result = await res.json(); // capture backend response

      if (res.ok) {
        alert("Review added successfully!");
        setFormData({ reviewerName: "", rating: 0, reviewText: "", image: null });
        setPreviewImage(null); 

        const updated = await fetch(`https://localhost:7223/api/ProductReview/${id}`).then(r =>
          r.json()
        );
        setReviews(updated);
      } else {
        console.error("Review post failed:", result);
        alert("Failed to post review: " + (result?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Failed to post review: Network error");
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        Loading product details...
      </div>
    );
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        Product not found.
      </div>
    );

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      {/* PRODUCT DETAILS */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: "2.5rem",
          color: "#333"
        }}
      >
        {product.productName}
      </h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", textAlign: "center" }}>
          <img
            src={`https://localhost:7223${product.productImageUrl}`}
            alt={product.productName}
            style={{
              width: "100%",
              maxHeight: 600,
              objectFit: "contain",
              borderRadius: 10
            }}
          />
        </div>
        <div
          style={{
            flex: "1 1 45%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: 20
            }}
          >
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
                cursor: "pointer"
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: "1.3rem",
                minWidth: 30,
                textAlign: "center"
              }}
            >
              {quantity}
            </span>
            <button
              onClick={handlePlusQuantity}
              style={{
                padding: "10px 15px",
                fontSize: "1.2rem",
                borderRadius: 8,
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                cursor: "pointer"
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
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div style={{ marginTop: "50px" }}>
        <h3 style={{ fontSize: "1.8rem", color: "#222", marginBottom: "20px" }}>
          Customer Reviews
        </h3>
        {reviews.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map(r => (
            <div
              key={r.id}
              style={{
                marginBottom: "30px",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{r.reviewerName}</strong>
              {/* Rating */}
              <div style={{ marginBottom: "10px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: r.rating >= star ? "#ffc107" : "#ccc",
                      fontSize: "1.4rem",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* Review Text */}
              <p
                style={{
                  fontSize: "1rem",
                  color: "#333",
                  marginBottom: r.imageUrl ? "15px" : "0",
                  whiteSpace: "pre-line",
                }}
              >
                {r.reviewText}
              </p>
              {r.imageUrl && (
                <img
                  src={`https://localhost:7223${r.imageUrl}`}
                  alt="Review"
                  style={{ width: "100px", borderRadius: 6 }}
                />
              )}
              <small style={{ display: "block", color: "#777" }}>
                Posted on: {new Date(r.postedAt).toLocaleString()}
              </small>
            </div>
          ))
        )}

        {/* REVIEW FORM */}
        {userName && (
          <form
            onSubmit={handleSubmitReview}
            style={{
              marginTop: "30px",
              padding: "30px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h4 style={{ marginBottom: "20px", fontSize: "1.5rem", color: "#333" }}>
              Write a Review
            </h4>

            {/* STAR RATING */}
            <div style={{ marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: "2rem",
                    color: (hoverRating || formData.rating) >= star ? "#ffc107" : "#ccc",
                    cursor: "pointer",
                    marginRight: "8px",
                    transition: "color 0.2s ease-in-out",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* TEXTAREA */}
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInputChange}
              placeholder="Share your experience with this product..."
              rows={5}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
                boxSizing: "border-box",
                marginBottom: "20px",
                resize: "vertical",
              }}
            />

            {/* FILE UPLOAD */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  setFormData({ ...formData, image: file });
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              onClick={() => document.getElementById("file-upload").click()}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "25px",
                textAlign: "center",
                backgroundColor: "#fff",
                cursor: "pointer",
                marginBottom: "20px",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#007bff")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ccc")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
                alt="Upload Icon"
                style={{ width: "40px", opacity: 0.5 }}
              />
              <p style={{ margin: "10px 0", fontSize: "16px", color: "#444" }}>
                <strong>Click or drag & drop an image</strong>
              </p>
              <p style={{ fontSize: "13px", color: "#888" }}>
                JPEG, PNG, PDF, and MP4 formats, up to 50MB
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.mp4"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {formData.image && (
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
                  Selected file: <strong>{formData.image.name}</strong>
                </p>
              )}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    marginTop: "12px",
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#218838")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#28a745")
              }
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
