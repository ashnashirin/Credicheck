"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [companyName, setCompanyName] = useState("");
  const [internshipLink, setInternshipLink] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheckScore = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setShowResult(false);

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, internshipLink, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
        // small delay for fade-in
        setTimeout(() => setShowResult(true), 50);
      }
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  const getLabelColor = (label) => {
    if (label === "Safe") return "green";
    if (label === "Caution") return "orange";
    if (label === "Risky") return "red";
    return "black";
  };

  const getLabelIcon = (label) => {
    if (label === "Safe") return "✅";
    if (label === "Caution") return "⚠️";
    if (label === "Risky") return "❌";
    return "";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f0f2f5, #eef7fc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        padding: 30,
      }}
    >
      {/* App Name */}
      <h1 style={{ fontSize: 36, marginBottom: 5, color: "#000" }}>CrediCheck 🔍</h1>
      <p style={{ fontSize: 16, color: "#555", textAlign: "center", maxWidth: 500, marginBottom: 30 }}>
        Quickly judge if an internship is safe, risky, or needs caution. Powered by simple credibility checks so students don’t fall for fake listings.
      </p>

      {/* Form Card */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, color: "black" }}>
            Company Name:
          </label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              color: "#000",
              fontSize: 14,
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, color: "black" }}>
            Internship Link:
          </label>
          <input
            type="text"
            placeholder="Enter Internship URL"
            value={internshipLink}
            onChange={(e) => setInternshipLink(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              color: "#000",
              fontSize: 14,
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, color: "black" }}>
            Description / Notes:
          </label>
          <textarea
            placeholder="Enter description or notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              minHeight: 80,
              color: "#000",
              fontSize: 14,
            }}
          />
        </div>

        <button
          onClick={handleCheckScore}
          disabled={loading}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            fontSize: 16,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
        >
          {loading ? "Checking..." : "Check Score"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 15, fontWeight: "bold" }}>{error}</p>
        )}
      </div>

      {/* Result Card */}
      {result && (
        <div
          style={{
            marginTop: 25,
            padding: 25,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#fff",
            color: "black",
            opacity: showResult ? 1 : 0,
            transform: showResult ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            width: "100%",
            maxWidth: 600,
          }}
        >
          <h2 style={{ marginBottom: 10 }}>
            Result {getLabelIcon(result.label)}
          </h2>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Label:</strong>{" "}
            <span style={{ color: getLabelColor(result.label), fontWeight: "bold" }}>
              {result.label}
            </span>
          </p>
          <p>
            <strong>Reasons:</strong>
          </p>
          <ul>
            {result.reasons.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
