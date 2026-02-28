import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("❌ Passwords do not match");
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("✅ Account created successfully");

      navigate("/login");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join our document system</p>

        <form onSubmit={handleRegister}>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {formData.confirmPassword && (
            <p
              style={{
                color:
                  formData.password === formData.confirmPassword
                    ? "green"
                    : "red",
                fontSize: "13px",
                marginTop: "-10px",
              }}
            >
              {formData.password === formData.confirmPassword
                ? "✅ Passwords match"
                : "❌ Passwords do not match"}
            </p>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: 20 }}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    color: "gray",
    marginBottom: "20px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  link: {
    color: "#667eea",
    fontWeight: "bold",
    textDecoration: "none",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};