"use client";

import Header from "@/components/Header";
import { menu } from "@/data/menu";
import { useMemo, useState } from "react";

export default function CartaPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const items = useMemo(() => menu.filter((item) =>
    (category === "Todas" || item.category === category) &&
    item.name.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Típico Experience</p>
        <h1>La carta</h1>
      </header>
      <main className="page-content">
        <p className="notice">Carta limitada de demostración. Los nombres proceden de fuentes públicas y deben ser validados por el restaurante antes de publicarse como información oficial. Precios, alérgenos e ingredientes no confirmados.</p>
        <div style={{ display: "flex", gap: 12, margin: "36px 0" }}>
          <input aria-label="Buscar plato" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." style={{ flex: 1, border: "1px solid #d2cbbd", background: "#fff", padding: "14px 16px" }} />
          <select aria-label="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} style={{ border: "1px solid #d2cbbd", background: "#fff", padding: "14px" }}>
            {["Todas", "Tapas", "Especialidades", "Principales"].map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 1, background: "#d2cbbd" }}>
          {items.map((item) => (
            <article key={item.id} style={{ background: "#f7f3ea", minHeight: 220, padding: 28, display: "flex", flexDirection: "column" }}>
              <p style={{ color: "#9d854f", fontSize: 10, textTransform: "uppercase", letterSpacing: ".16em" }}>{item.category} · Provisional</p>
              <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontWeight: 400, fontSize: 34, margin: "12px 0" }}>{item.name}</h2>
              <p style={{ marginTop: "auto", color: "#77736b", fontSize: 12, lineHeight: 1.6 }}>{item.sourceNote}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
