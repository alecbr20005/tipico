"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { initialDemoDishes, readDemoDishes, saveDemoDishes, type DemoDish } from "@/lib/demo-store";

type WaitlistEntry = { id: string; name: string; phone: string; people: number; status: string; createdAt: string };

export default function BusinessPage() {
  const [tab, setTab] = useState<"menu" | "waitlist" | "content">("menu");
  const [dishes, setDishes] = useState<DemoDish[]>(() => readDemoDishes());
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("tipico-demo-waitlist") ?? "[]");
  });
  const [saved, setSaved] = useState(false);


  const updateDish = (id: string, patch: Partial<DemoDish>) => {
    setDishes((current) => current.map((dish) => dish.id === id ? { ...dish, ...patch } : dish));
  };

  const save = () => {
    saveDemoDishes(dishes);
    setSaved(true);
  };

  const reset = () => {
    setDishes(initialDemoDishes);
    saveDemoDishes(initialDemoDishes);
    setSaved(false);
  };

  const updateWaitlist = (id: string, status: string) => {
    const next = waitlist.map((entry) => entry.id === id ? { ...entry, status } : entry);
    setWaitlist(next);
    localStorage.setItem("tipico-demo-waitlist", JSON.stringify(next));
  };

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero"><p className="eyebrow">Típico · Panel de demostración</p><h1>Business</h1></header>
      <main className="page-content">
        <p className="notice">Demo local: los cambios se guardan en este navegador y no se publican ni sincronizan con el restaurante.</p>
        <div className="tool-tabs" role="tablist">
          <button role="tab" aria-selected={tab === "menu"} onClick={() => setTab("menu")}>Carta</button>
          <button role="tab" aria-selected={tab === "waitlist"} onClick={() => setTab("waitlist")}>Lista de espera</button>
          <button role="tab" aria-selected={tab === "content"} onClick={() => setTab("content")}>Contenido</button>
        </div>

        {tab === "menu" && (
          <section className="business-panel">
            {dishes.map((dish) => (
              <article className="business-dish" key={dish.id}>
                <img src={dish.image} alt="" />
                <div>
                  <label>Nombre<input value={dish.name} onChange={(event) => updateDish(dish.id, { name: event.target.value })} /></label>
                  <label>Descripción<textarea value={dish.description ?? ""} placeholder="Pendiente de validar" onChange={(event) => updateDish(dish.id, { description: event.target.value })} /></label>
                  <label>Precio<input value={dish.price} placeholder="Pendiente" onChange={(event) => updateDish(dish.id, { price: event.target.value })} /></label>
                  <label>Alérgenos<input value={dish.allergens} onChange={(event) => updateDish(dish.id, { allergens: event.target.value })} /></label>
                  <label className="checkbox-label"><input type="checkbox" checked={dish.published} onChange={(event) => updateDish(dish.id, { published: event.target.checked })} /> Publicado en demo</label>
                </div>
              </article>
            ))}
            <div className="business-actions"><button type="button" className="tool-primary" onClick={save}>Guardar cambios locales</button><button type="button" onClick={reset}>Restaurar datos iniciales</button>{saved && <p role="status">Cambios guardados en este navegador.</p>}</div>
          </section>
        )}

        {tab === "waitlist" && (
          <section className="business-panel">
            {waitlist.length === 0 ? <p>No hay entradas de prueba.</p> : waitlist.map((entry) => (
              <article className="waitlist-row" key={entry.id}>
                <div><strong>{entry.name}</strong><span>{entry.people} personas · {entry.phone}</span></div>
                <select value={entry.status} onChange={(event) => updateWaitlist(entry.id, event.target.value)}><option>Esperando</option><option>Avisado</option><option>Sentado</option><option>Cancelado</option></select>
              </article>
            ))}
          </section>
        )}

        {tab === "content" && (
          <section className="business-panel">
            <p><strong>Contenido del local:</strong> Calle Pagés del Corro 86, Triana, Sevilla.</p>
            <p><strong>Redes:</strong> Instagram y Tripadvisor enlazados a perfiles oficiales.</p>
            <p><strong>Recorrido:</strong> recreación aproximada basada en una fotografía real.</p>
            <p>La edición completa de contenidos y publicación requerirá persistencia real en una fase posterior.</p>
          </section>
        )}
      </main>
    </div>
  );
}
