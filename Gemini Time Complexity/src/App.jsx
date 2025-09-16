// App.jsx
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [codeSnippet, setCodeSnippet] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedReply("");

    try {
      const res = await axios.post("http://localhost:8080/gemini/timeAnalyzer/generate", {
        codeSnippet, // Axios will JSON.stringify this safely
      });
      const data =
        typeof res.data === "string" ? res.data : JSON.stringify(res.data, null, 2);
      setGeneratedReply(data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to generate complexity. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Gemini Time Complexity Analyzer</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="snippet" style={styles.label}>
          Paste your code snippet
        </label>

        <textarea
          id="snippet"
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          placeholder={`// paste any code here\nSystem.out.println("Hello\\nWorld");`}
          style={styles.textarea}
          rows={12}
        />

        <div style={styles.row}>
          <span style={styles.muted}>
            {codeSnippet.length.toLocaleString()} chars
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => copy(codeSnippet)}
              disabled={!codeSnippet}
            >
              Copy input
            </button>
            <button type="submit" style={styles.primaryBtn} disabled={loading || !codeSnippet}>
              {loading ? "Sending…" : "Ask Gemini"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div style={styles.errorBox}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={styles.outputCard}>
        <div style={styles.outputHeader}>
          <h2 style={styles.h2}>Response</h2>
          <button
            type="button"
            style={styles.secondaryBtn}
            onClick={() => copy(generatedReply)}
            disabled={!generatedReply}
          >
            Copy response
          </button>
        </div>
        <pre style={styles.pre}>
          {generatedReply || (loading ? "Waiting for response…" : "No response yet")}
        </pre>
      </div>
    </div>
  );
}

/* --- lightweight inline styles --- */
const styles = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    padding: 16,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    color: "#0f172a",
  },
  h1: { margin: "0 0 16px", fontSize: 28 },
  h2: { margin: 0, fontSize: 20 },
  form: {
    display: "grid",
    gap: 8,
    marginBottom: 16,
  },
  label: { fontWeight: 600 },
  textarea: {
    width: "100%",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 14,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: 12,
    outline: "none",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  muted: { color: "#64748b", fontSize: 13 },
  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  errorBox: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  outputCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
  },
  outputHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  pre: {
    margin: 0,
    padding: 12,
    background: "white",
    minHeight: 160,
    maxHeight: 420,
    overflow: "auto",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 13,
    lineHeight: 1.45,
  },
};
