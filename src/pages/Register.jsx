import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../api/authApi.js"; 

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

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      console.log("Registering user:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to login or dashboard
      navigate("/login"); 
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <div className="card">
        <h1 className="h1">Create Account</h1>
        <div className="muted" style={{ marginBottom: 20 }}>
          Join the document system by filling out the details below.
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: 15 }}>
            <div className="muted">Full Name</div>
            <input
              name="name"
              type="text"
              className="input"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <div className="muted">Email Address</div>
            <input
              name="email"
              type="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <div className="muted">Password</div>
            <input
              name="password"
              type="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <div className="muted">Confirm Password</div>
            <input
              name="confirmPassword"
              type="password"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{ color: "#e63946", fontSize: "0.9rem", marginBottom: 15 }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn primary" 
            style={{ width: "100%", padding: "10px" }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <hr />
        
        <div style={{ textAlign: "center" }}>
          <span className="muted">Already have an account? </span>
          <Link to="/login" style={{ textDecoration: "none", fontWeight: "bold" }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}