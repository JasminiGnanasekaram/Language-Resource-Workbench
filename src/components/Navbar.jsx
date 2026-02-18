import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 10px",
  borderRadius: "10px",
  background: isActive ? "#111827" : "transparent",
  color: isActive ? "white" : "#111",
});

export default function Navbar() {
  return (
    <div style={{ background: "white", borderBottom: "1px solid #e9e9ef" }}>
      <div className="container" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#2563eb" }} />
          <div>
            <div style={{ fontWeight: 800 }}>Language Resource WorkBench</div>
            <div className="muted">Upload → Clean → NLP → Search → Export</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <NavLink to="/" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/upload" style={linkStyle}>Upload</NavLink>
          <NavLink to="/search" style={linkStyle}>Search</NavLink>
        </div>
      </div>
    </div>
  );
}
