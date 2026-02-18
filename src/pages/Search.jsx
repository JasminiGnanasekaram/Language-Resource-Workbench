import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import { searchDocuments } from "../api/documentsApi.js";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [source, setSource] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await searchDocuments({ query, language, source });
      setRows(res.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { key: "id", header: "ID" },
    { key: "language", header: "Language" },
    { key: "excerpt", header: "Excerpt" },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link className="btn" to={`/docs/${r.id}`}>View</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <h1 className="h1">Search & Results</h1>
      <div className="muted" style={{ marginTop: 6 }}>
        Search + filters (language/source) like your wireframe. 
      </div>

      <hr />

      <div className="row">
        <div>
          <div className="muted">Search</div>
          <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        </div>
        <div>
          <div className="muted">Language</div>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">All</option>
            <option value="Tamil">Tamil</option>
            <option value="Sinhala">Sinhala</option>
            <option value="English">English</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <div>
          <div className="muted">Source</div>
          <input className="input" value={source} onChange={(e) => setSource(e.target.value)} placeholder="ex: Manual / Newspaper" />
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "end" }}>
          <button className="btn primary" onClick={run} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          <button className="btn" onClick={() => { setQuery(""); setLanguage(""); setSource(""); }}>
            Clear
          </button>
        </div>
      </div>

      <hr />

      <Table columns={columns} rows={rows} />
    </div>
  );
}
