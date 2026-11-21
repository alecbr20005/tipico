"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/restaurant/tipico-interior.webp", alt: "Interior real de Típico Barra de Tapas", label: "Ambiente" },
  { src: "/images/dishes/gambas-sarten.webp", alt: "Fotografía gastronómica proporcionada por el restaurante", label: "Gastronomía" },
  { src: "/images/dishes/plato-negro.webp", alt: "Fotografía gastronómica proporcionada por el restaurante", label: "Gastronomía" },
  { src: "/images/dishes/croquetas-piedra.webp", alt: "Fotografía gastronómica proporcionada por el restaurante", label: "Gastronomía" },
  { src: "/images/dishes/sopa-servicio.webp", alt: "Fotografía gastronómica proporcionada por el restaurante", label: "Gastronomía" },
  { src: "/images/dishes/plato-negro-largo.webp", alt: "Fotografía gastronómica proporcionada por el restaurante", label: "Gastronomía" },
] as const;

export default function OfficialGallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [active]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <figure key={image.src}>
            <button type="button" className="gallery-open" onClick={() => setActive(index)} aria-label={`Ampliar ${image.label.toLowerCase()} ${index + 1}`}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
              <span>{image.label} · {String(index + 1).padStart(2, "0")}</span>
            </button>
          </figure>
        ))}
      </div>
      {active !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Visor de fotografía">
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Cerrar">×</button>
          <button type="button" className="lightbox-arrow lightbox-prev" onClick={() => setActive((active - 1 + images.length) % images.length)} aria-label="Fotografía anterior">←</button>
          <div className="lightbox-media">
            <Image src={images[active].src} alt={images[active].alt} fill sizes="90vw" />
          </div>
          <button type="button" className="lightbox-arrow lightbox-next" onClick={() => setActive((active + 1) % images.length)} aria-label="Fotografía siguiente">→</button>
          <p>{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} · {images[active].label}</p>
        </div>
      )}
    </>
  );
}
