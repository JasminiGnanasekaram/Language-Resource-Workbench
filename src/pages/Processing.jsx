import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobStatus } from "../api/documentsApi.js";

function Step({ done, label }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span className="badge" style={{ background: done ? "#dcfce7" : "#fef9c3", color: "#111" }}>
        {done ? "✓" : "…"}
      </span>
      <div>{label}</div>
    </div>
  );
}

export default function Processing() {
  const { jobId } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    let t;
    async function tick() {
      const res = await getJobStatus(jobId);
      setData(res);
      if (res.status !== "done") t = setTimeout(tick, 1200);
      if (res.status === "done" && res.documentId) {
        setTimeout(() => nav(`/docs/${res.documentId}`), 800);
      }
    }
    tick();
    return () => clearTimeout(t);
  }, [jobId, nav]);

  const steps = data?.steps || { extracting: false, cleaning: false, nlp: false };

  return (
    <div className="card">
      <h1 className="h1">Processing</h1>
      <div className="muted" style={{ marginTop: 6 }}>
        Extracting Text → Cleaning Text → Applying NLP (as in your doc flow). 
      </div>

      <hr />

      <div className="grid" style={{ gap: 10 }}>
        <Step done={!!steps.extracting} label="Extracting Text" />
        <Step done={!!steps.cleaning} label="Cleaning Text" />
        <Step done={!!steps.nlp} label="Running NLP Analysis" />
      </div>

      <hr />

      <div className="muted">
        Job: <b>{jobId}</b> | Status: <b>{data?.status || "processing"}</b>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button className="btn" onClick={() => nav("/search")}>Go to Search</button>
      </div>
    </div>
  );
}
