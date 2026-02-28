import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // simulate backend verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // login successful
      localStorage.setItem("isLoggedIn", "true");

      // trigger navbar update
      window.dispatchEvent(new Event("login"));

      setMessage("Login successful 🎉");
      navigate("/home"); // go to home page

    } catch (err) {
      setError("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome Back 👋</h2>
        <p>Login to Language Resource Workbench</p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={styles.input}/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={styles.input}/>
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 15 }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

// styles same as before...
const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #667eea, #764ba2)" },
  card: { background: "#fff", padding: "40px", borderRadius: "12px", width: "350px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" },
  button: { width: "100%", padding: "12px", background: "#667eea", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", fontSize: "13px" },
  success: { color: "green", fontSize: "13px" },
};