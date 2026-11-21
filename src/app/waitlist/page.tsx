"use client";

import Header from "@/components/Header";
import { useState } from "react";

type Entry = { id: number; name: string; people: number; time: string; status: "Esperando" | "Avisado" | "Sentado" | "Cancelado" };

export default function WaitlistPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [time, setTime] = useState("");

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero"><p className="eyebrow">Lista de espera</p><h1>Tu turno</h1></header>
      <main className="page-content">
        <p className="notice">Demo sin backend compartido. Los datos se mantienen solo en esta sesión del navegador y no pueden utilizarse para gestionar una cola real.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!name.trim() || !time) return;
            setEntries((current) => [{ id: Date.now(), name: name.trim(), people: Number(people), time, status: "Esperando" }, ...current]);
            setName("");
            setTime("");
          }}
          style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr 0.8fr auto", gap: 10, margin: "36px 0" }}
        >
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" aria-label="Nombre" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <select value={people} onChange={(e) => setPeople(e.target.value)} aria-label="Número de personas" style={{ border: "1px solid #d2cbbd", padding: 14 }}>{[1,2,3,4,5,6].map((n) => <option key={n}>{n}</option>)}</select>
          <input required type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-label="Hora" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <button type="submit" style={{ border: 0, background: "#c1a26a", padding: "14px 22px", cursor: "pointer" }}>Añadir</button>
        </form>
        {entries.map((entry) => (
          <article key={entry.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", alignItems: "center", borderTop: "1px solid #d2cbbd", padding: "18px 0" }}>
            <div><strong>{entry.name}</strong><br /><span style={{ color: "#77736b", fontSize: 12 }}>{entry.people} personas · {entry.time}</span></div>
            <span style={{ color: "#9d854f", fontSize: 11 }}>{entry.status}</span>
            <select value={entry.status} onChange={(e) => setEntries((current) => current.map((item) => item.id === entry.id ? { ...item, status: e.target.value as Entry["status"] } : item))} style={{ border: "1px solid #d2cbbd", padding: 8 }}>
              {["Esperando","Avisado","Sentado","Cancelado"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </article>
        ))}
      </main>
    </div>
  );
}
