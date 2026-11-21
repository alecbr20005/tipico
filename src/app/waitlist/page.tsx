"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantSlug: "tipico",
          guestName: name,
          phone,
          partySize: Number(people),
          consent,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "No se ha podido registrar la solicitud.");
      setStatus("success");
      setMessage("Solicitud registrada por el restaurante.");
      setName("");
      setPhone("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No se ha podido registrar la solicitud.");
    }
  };

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero"><p className="eyebrow">Lista de espera</p><h1>Tu turno</h1></header>
      <main className="page-content">
        <p className="notice">Los datos se utilizan únicamente para gestionar la lista de espera del restaurante.</p>
        <form
          onSubmit={submit}
          style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr 1fr", gap: 10, margin: "36px 0" }}
        >
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" aria-label="Nombre" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <select value={people} onChange={(e) => setPeople(e.target.value)} aria-label="Número de personas" style={{ border: "1px solid #d2cbbd", padding: 14 }}>{[1,2,3,4,5,6].map((n) => <option key={n}>{n}</option>)}</select>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" aria-label="Teléfono" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <label style={{ gridColumn: "1 / -1", fontSize: 12, color: "#77736b" }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required /> Autorizo el tratamiento de estos datos para gestionar mi solicitud.
          </label>
          <button type="submit" disabled={status === "sending"} style={{ gridColumn: "1 / -1", border: 0, background: "#c1a26a", padding: "14px 22px", cursor: "pointer" }}>{status === "sending" ? "Registrando…" : "Unirme a la lista"}</button>
        </form>
        {message && (
          <p role="status" style={{ color: status === "error" ? "#8b2d24" : "#5c6b45" }}>{message}</p>
        )}
      </main>
    </div>
  );
}
