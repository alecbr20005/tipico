import Header from "@/components/Header";

export default function DescubrirPage() {
  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Triana · Sevilla</p>
        <h1>Descubrir Típico</h1>
      </header>
      <main className="page-content">
        <p className="notice">La identidad ampliada se completará con material autorizado y información confirmada por el restaurante.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 50 }}>
          <article style={{ minHeight: 360, background: "#171715", color: "#efe8d8", padding: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p className="eyebrow">La ubicación</p>
            <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 52, fontWeight: 400, marginBottom: 12 }}>Pagés del Corro 86</h2>
            <a href="https://maps.google.com/?q=Pagés+del+Corro+86+Sevilla" target="_blank" rel="noreferrer" style={{ borderBottom: "1px solid #c1a26a", alignSelf: "flex-start", paddingBottom: 8 }}>Abrir en Maps ↗</a>
          </article>
          <article style={{ minHeight: 360, background: "#c1a26a", padding: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p style={{ textTransform: "uppercase", letterSpacing: ".18em", fontSize: 10 }}>Presencia</p>
            <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 52, fontWeight: 400 }}>SAME SAME<br /><em>BUT DIFFERENT.</em></h2>
          </article>
        </div>
      </main>
    </div>
  );
}
