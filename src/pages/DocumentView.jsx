import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { downloadCsv, downloadJson, getDocumentById } from "../api/documentsApi.js";

export default function DocumentView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getDocumentById(id);
      setDoc(res);
    })();
  }, [id]);

  const csvRows = useMemo(() => {
    if (!doc) return [];
    // simple export schema
    return [
      {
        id: doc.id,
        language: doc.language,
        source: doc.source,
        license: doc.license,
        cleanText: doc.cleanText,
        tokens: (doc.tokens || []).join(" "),
      },
    ];
  }, [doc]);

  if (!doc) {
    return (
      <div className="card">
        <div className="h2">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <div>
            <div className="badge">Document #{doc.id}</div>
            <h1 className="h1" style={{ marginTop: 8 }}>{doc.title || "Document Detail"}</h1>
            <div className="muted">
              {doc.language} • {doc.source} • {doc.license} • {doc.createdAt}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "end" }}>
            <button className="btn" onClick={() => nav("/search")}>Back</button>
            <button className="btn" onClick={() => downloadJson(doc, `doc-${doc.id}.json`)}>Download JSON</button>
            <button className="btn" onClick={() => downloadCsv(csvRows, `doc-${doc.id}.csv`)}>Download CSV</button>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gap: 12 }}>
        <div className="card">
          <h2 className="h2">Original Text</h2>
          <div className="muted" style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{doc.rawText}</div>
        </div>

        <div className="card">
          <h2 className="h2">Clean Text</h2>
          <div className="muted" style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{doc.cleanText}</div>
        </div>

        <div className="card">
          <h2 className="h2">Tokens</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {(doc.tokens || []).map((t, i) => (
              <span key={i} className="badge">{t}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="h2">POS Tags</h2>
          <div style={{ marginTop: 10 }}>
            {(doc.pos || []).length === 0 ? (
              <div className="muted">No POS data</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {doc.pos.map((p, i) => (
                  <span key={i} className="badge">{p.token} : {p.tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
