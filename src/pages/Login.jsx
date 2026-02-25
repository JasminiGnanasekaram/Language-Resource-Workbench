import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/authApi.js"; // Assume you have an auth API

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Logic for calling your backend
      // await loginUser({ email, password });
      
      console.log("Logging in with:", { email, password });
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to search page on success
      navigate("/search"); 
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <div className="card">
        <h1 className="h1">Sign In</h1>
        <div className="muted" style={{ marginBottom: 20 }}>
          Enter your credentials to access the document system.
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 15 }}>
            <div className="muted">Email Address</div>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <div className="muted">Password</div>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{ color: "red", fontSize: "0.9rem", marginBottom: 15 }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn primary" 
            style={{ width: "100%", padding: "10px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <hr />
        
        <div style={{ textAlign: "center" }}>
          <span className="muted">Don't have an account? </span>
          <a href="/register" style={{ textDecoration: "none", fontWeight: "bold" }}>Create new account</a>
        </div>
      </div>
    </div>
  );
}