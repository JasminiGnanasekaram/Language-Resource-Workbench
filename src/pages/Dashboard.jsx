import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import { searchDocuments } from "../api/documentsApi.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const [stats, setStats] = useState({ documents: 0, tokens: 0, posTagged: 0 });

  useEffect(() => {
    (async () => {
      const res = await searchDocuments({ query: "" });
      const items = res.items || [];
      const tokens = items.reduce((sum, d) => sum + (d.tokens?.length || 0), 0);
      const posTagged = items.filter((d) => (d.pos?.length || 0) > 0).length;
      setStats({ documents: items.length, tokens, posTagged });
    })();
  }, []);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <div>
            <h1 className="h1">Dashboard</h1>
            <div className="muted">Upload data → processing → search & export.</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn primary" onClick={() => nav("/upload")}>Upload Data</button>
            <button className="btn" onClick={() => nav("/search")}>Search Data</button>
          </div>
        </div>
      </div>

      <div className="grid grid-3">
        <StatCard title="Documents" value={stats.documents} hint="Total stored docs" />
        <StatCard title="Tokens" value={stats.tokens} hint="All token count" />
        <StatCard title="POS Tagged Docs" value={stats.posTagged} hint="Docs with NLP results" />
      </div>
    </div>
  );
}
