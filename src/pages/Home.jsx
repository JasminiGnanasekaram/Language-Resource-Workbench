import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import { searchDocuments } from "../api/documentsApi.js";

export default function Home() {
  const nav = useNavigate();
  const [stats, setStats] = useState({ documents: 0, tokens: 0, posTagged: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await searchDocuments({ query: "" });
        const items = res.items || [];
        const tokens = items.reduce((sum, d) => sum + (d.tokens?.length || 0), 0);
        const posTagged = items.filter((d) => (d.pos?.length || 0) > 0).length;
        
        setStats({ documents: items.length, tokens, posTagged });
      } catch (err) {
        console.error("Failed to fetch home stats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* 1. Hero / Welcome Section */}
      <section className="card" style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 12 }}>
          NLP Document Manager
        </h1>
        <p className="muted" style={{ fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 24px' }}>
          Streamline your workflow: upload raw text, process Natural Language, 
          and export structured data effortlessly.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button className="btn primary" onClick={() => nav("/upload")}>
            Get Started: Upload Data
          </button>
          <button className="btn" onClick={() => nav("/search")}>
            Browse Repository
          </button>
        </div>
      </section>

      {/* 2. Quick Stats Grid */}
      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>System Overview</h2>
        <div className="grid grid-3">
          <StatCard 
            title="Documents" 
            value={loading ? "..." : stats.documents} 
            hint="Total corpus size" 
          />
          <StatCard 
            title="Total Tokens" 
            value={loading ? "..." : stats.tokens.toLocaleString()} 
            hint="Cumulative word count" 
          />
          <StatCard 
            title="NLP Processed" 
            value={loading ? "..." : stats.posTagged} 
            hint="Documents with POS tags" 
          />
        </div>
      </section>

      {/* 3. Feature Shortcuts */}
      <section className="grid grid-2" style={{ gap: 16 }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => nav("/upload")}>
          <h3>📤 Data Ingestion</h3>
          <p className="muted">Upload JSON or TXT files to begin processing.</p>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => nav("/search")}>
          <h3>🔍 Advanced Search</h3>
          <p className="muted">Filter by metadata or POS patterns.</p>
        </div>
      </section>
      
    </div>
  );
}