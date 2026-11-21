"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { readDemoDishes, type DemoDish } from "@/lib/demo-store";

export default function GuidePage() {
  const [dishes] = useState<DemoDish[]>(() => readDemoDishes());
  const [avoid, setAvoid] = useState("");
  const [preference, setPreference] = useState("Todos");


  const results = dishes.filter((dish) =>
    dish.published &&
    (preference === "Todos" || dish.category === preference) &&
    (!avoid.trim() || !`${dish.name} ${dish.description ?? ""} ${dish.allergens}`.toLowerCase().includes(avoid.trim().toLowerCase()))
  );

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Recomendador local</p>
        <h1>Food guide</h1>
      </header>
      <main className="page-content">
        <p className="notice">Las recomendaciones se calculan localmente con los datos disponibles. No garantiza que un plato sea seguro para una alergia; todos los alérgenos están pendientes de validar.</p>
        <div className="guide-controls">
          <label>Preferencia
            <select value={preference} onChange={(event) => setPreference(event.target.value)}>
              <option>Todos</option>
              <option>Pendiente</option>
            </select>
          </label>
          <label>Ingrediente o alérgeno a evitar
            <input value={avoid} onChange={(event) => setAvoid(event.target.value)} placeholder="Ej. pescado" />
          </label>
        </div>
        <div className="guide-results">
          {results.map((dish, index) => (
            <article key={dish.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <img src={dish.image} alt={dish.name} />
              <div><p className="eyebrow">Dato pendiente de validar</p><h2>{dish.name}</h2><p>{dish.description ?? "Descripción y alérgenos pendientes."}</p></div>
            </article>
          ))}
          {results.length === 0 && <p role="status">No hay suficientes datos validados para recomendar una opción. Comprueba el criterio o vuelve a consultar al restaurante.</p>}
        </div>
      </main>
    </div>
  );
}
