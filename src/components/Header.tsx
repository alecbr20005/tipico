"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="brand" aria-label="Típico, inicio">
        TÍPICO
      </Link>
      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
        <Link href="/carta" onClick={() => setOpen(false)}>Carta</Link>
        <Link href="/descubrir" onClick={() => setOpen(false)}>Descubrir</Link>
        <Link href="/guide" onClick={() => setOpen(false)}>Food guide</Link>
        <Link href="/waitlist" onClick={() => setOpen(false)}>Lista de espera</Link>
      </nav>
      <div className="header-actions">
        <span className="language" aria-label="Idioma">ES</span>
        <Link className="header-location" href="https://maps.google.com/?q=Pagés+del+Corro+86+Sevilla" target="_blank">Triana</Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menú">
          <span /><span />
        </button>
      </div>
    </header>
  );
}
