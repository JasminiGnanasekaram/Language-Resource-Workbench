import React from "react";

export default function User() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>User Profile</h2>
        <p>Welcome to the User Page 🎉</p>
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
    background: "#f4f6f9",
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};