import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import { searchDocuments } from "../api/documentsApi.js";

export default function Dashboard() {
  const nav = useNavigate();

  const [stats, setStats] = useState({
    documents: 0,
    tokens: 0,
    posTagged: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await searchDocuments({ query: "" });
        const items = res.items || [];

        const tokens = items.reduce(
          (sum, d) => sum + (d.tokens?.length || 0),
          0
        );

        const posTagged = items.filter(
          (d) => (d.pos?.length || 0) > 0
        ).length;

        setStats({
          documents: items.length,
          tokens,
          posTagged,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* 🔷 HERO HEADER */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Language Resource Workbench</h1>
        <p style={styles.subtitle}>Collect , Clean & Analyse Multilingual Text Data</p>
        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={() => nav("/upload")}>
            Upload Data
          </button>
          <button style={styles.secondaryBtn} onClick={() => nav("/search")}>
            Search Data
          </button>
        </div>
      </div>

      {/* 🔷 STATS CARDS */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Documents"
          value={loading ? "..." : stats.documents}
          hint="Total stored documents"
        />
        <StatCard
          title="Tokens"
          value={loading ? "..." : stats.tokens.toLocaleString()}
          hint="Total token count"
        />
        <StatCard
          title="POS Tagged"
          value={loading ? "..." : stats.posTagged}
          hint="Processed with NLP"
        />
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f7f9fc",
    fontFamily: "'Inter', sans-serif",
  },

  hero: {
    textAlign: "center",
    padding: "60px 20px",
    marginBottom: "50px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  },

  title: {
    fontSize: "38px",
    fontWeight: "900",
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "35px",
    opacity: 0.9,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#fff",
    color: "#667eea",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  secondaryBtn: {
    background: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  infoBtn: {
    background: "#06b6d4",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(6,182,212,0.3)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },
};