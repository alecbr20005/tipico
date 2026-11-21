"use client";

import Header from "@/components/Header";

export default function GuidePage() {

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Recomendador transparente</p>
        <h1>Food guide</h1>
      </header>
      <main className="page-content">
        <p className="notice">El recomendador estará disponible cuando exista una carta publicada y validada. No ofrece garantías sobre alergias o seguridad alimentaria.</p>
      </main>
    </div>
  );
}
