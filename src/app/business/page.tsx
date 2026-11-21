"use client";

import Header from "@/components/Header";

export default function BusinessPage() {
  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Típico · Operación</p>
        <h1>Business</h1>
      </header>
      <main className="page-content">
        <p className="notice">Demostración comercial sin autenticación ni datos reales. La versión operativa requiere Supabase Auth, RLS, roles y auditoría.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 36 }}>
          {[
            ["Estado", "Demo"],
            ["Carta", "Provisional"],
            ["Sala", "Sin datos reales"],
            ["Analítica", "Pendiente"]
          ].map(([label, value]) => (
            <article key={label} style={{ minHeight: 150, background: "#171715", color: "#efe8d8", padding: 24 }}>
              <p style={{ color: "#c1a26a", textTransform: "uppercase", letterSpacing: ".14em", fontSize: 10 }}>{label}</p>
              <strong style={{ display: "block", marginTop: 38, fontFamily: "Instrument Serif, Georgia, serif", fontSize: 25, fontWeight: 400 }}>{value}</strong>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
