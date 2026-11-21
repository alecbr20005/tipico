"use client";

import { useState } from "react";

const stops = [
  { label: "Vista general", title: "La barra", note: "Vista inicial del comedor y la barra.", x: 50, y: 50, scale: 1 },
  { label: "La barra", title: "La barra Típico", note: "Primer plano sobre el mostrador.", x: 42, y: 58, scale: 1.55 },
  { label: "El ambiente", title: "Comedor", note: "Zona visible desde el punto de la fotografía.", x: 68, y: 38, scale: 1.38 },
  { label: "Los detalles", title: "Detalles del local", note: "Materiales y elementos visibles.", x: 22, y: 58, scale: 1.7 },
] as const;

export default function VisualTour() {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const stop = stops[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + stops.length) % stops.length);
    setDrag({ x: 0, y: 0 });
  };

  return (
    <section className="visual-tour" aria-labelledby="tour-title">
      <div className="tour-heading">
        <div>
          <p className="eyebrow">Típico en primera persona</p>
          <h1 id="tour-title">Recorre el local</h1>
        </div>
        <p>Recreación visual aproximada basada en una fotografía real del local. No representa un escaneo exacto ni zonas no visibles.</p>
      </div>

      <div
        className="tour-stage"
        role="region"
        aria-label={`Recorrido visual: ${stop.title}`}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || event.buttons !== 1) return;
          setDrag({
            x: Math.max(-18, Math.min(18, (event.clientX / window.innerWidth - 0.5) * 36)),
            y: Math.max(-12, Math.min(12, (event.clientY / window.innerHeight - 0.5) * 24)),
          });
        }}
        onPointerLeave={() => setDrag({ x: 0, y: 0 })}
      >
        <div
          className="tour-image"
          style={{
            backgroundImage: "url('/images/restaurant/tipico-interior.webp')",
            backgroundPosition: `${stop.x}% ${stop.y}%`,
            transform: `scale(${stop.scale}) translate(${drag.x}px, ${drag.y}px)`,
          }}
        />
        <div className="tour-vignette" />
        <div className="tour-caption">
          <span>{String(active + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}</span>
          <h2>{stop.title}</h2>
          <p>{stop.note}</p>
        </div>
        <button className="tour-reset" type="button" onClick={() => { setActive(0); setDrag({ x: 0, y: 0 }); }}>Volver al inicio</button>
        <button className="tour-arrow tour-prev" type="button" onClick={() => move(-1)} aria-label="Vista anterior">←</button>
        <button className="tour-arrow tour-next" type="button" onClick={() => move(1)} aria-label="Vista siguiente">→</button>
      </div>

      <div className="tour-stops" role="tablist" aria-label="Puntos del recorrido">
        {stops.map((item, index) => (
          <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
