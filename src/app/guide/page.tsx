"use client";

import Header from "@/components/Header";
import { menu } from "@/data/menu";
import { useMemo, useState } from "react";

export default function GuidePage() {
  const [preference, setPreference] = useState("Especialidades");
  const recommendations = useMemo(() => menu.filter((item) => item.category === preference).slice(0, 3), [preference]);

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Recomendador transparente</p>
        <h1>Food guide</h1>
      </header>
      <main className="page-content">
        <p className="notice">Este recomendador utiliza reglas demostrativas sobre datos provisionales. No es inteligencia artificial conectada ni ofrece garantías alimentarias.</p>
        <div style={{ display: "flex", gap: 10, margin: "36px 0", flexWrap: "wrap" }}>
          {["Tapas", "Especialidades", "Principales"].map((value) => (
            <button key={value} onClick={() => setPreference(value)} style={{ border: preference === value ? "1px solid #171715" : "1px solid #d2cbbd", background: preference === value ? "#171715" : "#f7f3ea", color: preference === value ? "#efe8d8" : "#171715", padding: "14px 18px", cursor: "pointer" }}>{value}</button>
          ))}
        </div>
        {recommendations.map((item) => (
          <article key={item.id} style={{ borderTop: "1px solid #d2cbbd", padding: "26px 0", display: "grid", gridTemplateColumns: "60px 1fr", gap: 20 }}>
            <strong style={{ color: "#9d854f" }}>01</strong>
            <div><h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 38, margin: "0 0 8px", fontWeight: 400 }}>{item.name}</h2><p style={{ color: "#77736b", fontSize: 13 }}>{item.sourceNote}</p></div>
          </article>
        ))}
      </main>
    </div>
  );
}
