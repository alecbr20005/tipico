"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function CartaPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Típico Experience</p>
        <h1>La carta</h1>
      </header>
      <main className="page-content">
        <p className="notice">La carta pública se publicará después de validar y gestionar los platos desde el panel del restaurante.</p>
        <div style={{ display: "flex", gap: 12, margin: "36px 0" }}>
          <input aria-label="Buscar plato" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." style={{ flex: 1, border: "1px solid #d2cbbd", background: "#fff", padding: "14px 16px" }} />
        </div>
        {query && <p role="status" style={{ color: "#77736b" }}>La búsqueda estará disponible cuando exista una carta publicada.</p>}
      </main>
    </div>
  );
}
