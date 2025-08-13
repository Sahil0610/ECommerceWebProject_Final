import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { userId, token } = useContext(AuthContext);

  const [shipping, setShipping] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://localhost:7223/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();

        setShipping({
          fullName: data.fullName || "",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          country: data.country || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId, token]);

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`https://localhost:7223/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shipping),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update shipping info");
      }
      setMessage("Shipping details updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);
    setError(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
    }

    try {
        const res = await fetch(`https://localhost:7223/api/user/change-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            UserId: userId,
            OldPassword: passwords.currentPassword,
            NewPassword: passwords.newPassword,
        }),
        });

        if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to change password");
        }
        setPasswordMessage("Password changed successfully.");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
        setError(err.message);
    }
    };

  if (loading) return <p style={styles.loading}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <form onSubmit={handleShippingSubmit} style={styles.form}>
        <h3 style={styles.sectionTitle}>Shipping Details</h3>

        <div style={styles.grid}>
          <label style={styles.label}>
            Full Name
            <input
              type="text"
              name="fullName"
              value={shipping.fullName}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="Your full name"
            />
          </label>

          <label style={styles.label}>
            Address Line 1
            <input
              type="text"
              name="addressLine1"
              value={shipping.addressLine1}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="Street address, P.O. box"
            />
          </label>

          <label style={styles.label}>
            Address Line 2
            <input
              type="text"
              name="addressLine2"
              value={shipping.addressLine2}
              onChange={handleShippingChange}
              style={styles.input}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </label>

          <label style={styles.label}>
            City
            <input
              type="text"
              name="city"
              value={shipping.city}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="City"
            />
          </label>

          <label style={styles.label}>
            State
            <input
              type="text"
              name="state"
              value={shipping.state}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="State / Province / Region"
            />
          </label>

          <label style={styles.label}>
            Postal Code
            <input
              type="text"
              name="postalCode"
              value={shipping.postalCode}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="ZIP / Postal Code"
            />
          </label>

          <label style={styles.label}>
            Country
            <input
              type="text"
              name="country"
              value={shipping.country}
              onChange={handleShippingChange}
              required
              style={styles.input}
              placeholder="Country"
            />
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Update Shipping Details
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} style={styles.form}>
        <h3 style={styles.sectionTitle}>Change Password</h3>

        {passwordMessage && <p style={styles.success}>{passwordMessage}</p>}

        <div style={styles.grid}>
            <label style={styles.label}>
                Current Password
                <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
                style={styles.input}
                placeholder="Current password"
                />
            </label>

            <label style={styles.label}>
                New Password
                <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
                style={styles.input}
                placeholder="New password"
                />
            </label>

            <label style={styles.label}>
                Confirm New Password
                <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                required
                style={styles.input}
                placeholder="Confirm new password"
                />
            </label>
            </div>


        <button type="submit" style={styles.button}>
          Change Password
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    borderRadius: 8,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 30,
    fontWeight: "700",
    fontSize: "2.2rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: 15,
    color: "#34495e",
  },
  form: {
    marginBottom: 40,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 20,
    marginBottom: 20,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "600",
    color: "#34495e",
    fontSize: "0.9rem",
  },
  input: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 6,
    border: "none",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",  
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    padding: "10px 30px",
    borderRadius: 6,
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.3)",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#e74c3c",
    backgroundColor: "#fceae9",
    borderRadius: 5,
    padding: "10px 15px",
    marginBottom: 20,
    textAlign: "center",
  },
  success: {
    color: "#27ae60",
    backgroundColor: "#eafaf1",
    borderRadius: 5,
    padding: "10px 15px",
    marginBottom: 20,
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: 40,
  },
};
