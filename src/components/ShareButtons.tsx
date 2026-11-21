"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "TÍPICO Barra de Tapas",
          text: "SAME SAME. BUT DIFFERENT.",
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="share-strip" aria-label="Compartir Típico">
      <span>Compartir</span>
      <button type="button" onClick={share}>{copied ? "Enlace copiado" : "Copiar enlace"}</button>
      <a href="https://www.instagram.com/tipicobarradetapas/" target="_blank" rel="noreferrer">Instagram</a>
      <a href="https://maps.google.com/?q=Calle+Pagés+del+Corro+86+Sevilla" target="_blank" rel="noreferrer">Google Maps</a>
    </div>
  );
}
