import React, { useMemo, useState } from "react";
import { uploadDocument } from "../api/documentsApi.js";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const nav = useNavigate();
  const [inputType, setInputType] = useState("text");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    language: "Tamil",
    source: "Manual",
    license: "CC BY",
    text: "",
    url: "",
    file: null,
  });

  const accept = useMemo(() => {
    if (inputType === "pdf") return ".pdf";
    if (inputType === "image") return "image/*";
    if (inputType === "audio") return "audio/*";
    return "*/*";
  }, [inputType]);

  const canSubmit =
    (inputType === "text" && form.text.trim().length > 0) ||
    (inputType === "url" && form.url.trim().length > 0) ||
    (["pdf", "image", "audio"].includes(inputType) && !!form.file);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const payload = {
        inputType,
        title: form.title,
        domain: form.domain,
        language: form.language,
        source: form.source,
        license: form.license,
      };

      if (inputType === "text") payload.text = form.text;
      if (inputType === "url") payload.url = form.url;
      if (["pdf", "image", "audio"].includes(inputType)) payload.file = form.file;

      const res = await uploadDocument(payload);
      nav(`/processing/${res.jobId}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1 className="h1">Upload Data</h1>
      <div className="muted" style={{ marginTop: 6 }}>
        Text / PDF / Image / Audio / URL upload + metadata & license.
      </div>

      <hr />

      <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
        <div className="row">
          <div>
            <div className="muted">Input Type</div>
            <select
              value={inputType}
              onChange={(e) => {
                setInputType(e.target.value);
                setForm((p) => ({ ...p, text: "", url: "", file: null }));
              }}
            >
              <option value="text">Text</option>
              <option value="pdf">PDF</option>
              <option value="image">Image (OCR)</option>
              <option value="audio">Audio (STT)</option>
              <option value="url">URL</option>
            </select>
          </div>

          <div>
            <div className="muted">Language</div>
            <select value={form.language} onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}>
              <option>Tamil</option>
              <option>Sinhala</option>
              <option>English</option>
              <option>Mixed</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div>
            <div className="muted">Source</div>
            <input className="input" value={form.source} onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))} placeholder="ex: Newspaper / Manual / Website" />
          </div>
          <div>
            <div className="muted">License</div>
            <select value={form.license} onChange={(e) => setForm((p) => ({ ...p, license: e.target.value }))}>
              <option>Public Domain</option>
              <option>CC BY</option>
              <option>CC BY-SA</option>
              <option>CC BY-NC</option>
              <option>All Rights Reserved</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div>
            <div className="muted">Title (optional)</div>
            <input className="input" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          </div>
          <div>
            <div className="muted">Domain (optional)</div>
            <input className="input" value={form.domain} onChange={(e) => setForm((p) => ({ ...p, domain: e.target.value }))} placeholder="ex: News / Education / Social" />
          </div>
        </div>

        {/* Input area */}
        {inputType === "text" ? (
          <div>
            <div className="muted">Enter Text</div>
            <textarea value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} placeholder="Paste text here..." />
          </div>
        ) : null}

        {inputType === "url" ? (
          <div>
            <div className="muted">Enter URL</div>
            <input className="input" value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} placeholder="https://..." />
          </div>
        ) : null}

        {["pdf", "image", "audio"].includes(inputType) ? (
          <div>
            <div className="muted">Choose File</div>
            <input
              type="file"
              accept={accept}
              onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0] || null }))}
            />
            {form.file ? <div className="muted" style={{ marginTop: 6 }}>Selected: {form.file.name}</div> : null}
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className={`btn primary`} disabled={!canSubmit || loading}>
            {loading ? "Uploading..." : "Upload & Process"}
          </button>
          <button type="button" className="btn" onClick={() => nav("/search")}>
            Go to Search
          </button>
        </div>
      </form>
    </div>
  );
}
