"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { readDemoDishes, type DemoDish } from "@/lib/demo-store";
import Link from "next/link";

export default function CartaPage() {
  const [query, setQuery] = useState("");
  const [dishes] = useState<DemoDish[]>(() => readDemoDishes());
  const visible = dishes.filter((dish) => dish.published && dish.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Típico Experience</p>
        <h1>La carta</h1>
      </header>
      <main className="page-content">
        <p className="notice">Cinco fotografías proporcionadas por el propietario. Los nombres, descripciones, ingredientes y alérgenos siguen pendientes de validación.</p>
        <div style={{ display: "flex", gap: 12, margin: "36px 0" }}>
          <input aria-label="Buscar plato" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." style={{ flex: 1, border: "1px solid #d2cbbd", background: "#fff", padding: "14px 16px" }} />
        </div>
        <div className="dish-menu-grid">
          {visible.map((dish, index) => (
            <article className="dish-menu-card" key={dish.id}>
              <div className="dish-menu-image"><img src={dish.image} alt={dish.name} /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="dish-menu-copy">
                <p className="eyebrow">{dish.category}</p>
                <h2>{dish.name}</h2>
                {dish.description ? <p>{dish.description}</p> : <p className="pending">Descripción pendiente de validar</p>}
                <p className="pending">Alérgenos: {dish.allergens}</p>
                <Link href={`/plato/${dish.id}`}>Ver presentación <span>↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
