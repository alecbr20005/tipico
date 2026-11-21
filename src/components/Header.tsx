"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, type Locale } from "@/lib/i18n";

export default function Header() {
  const { locale, setLocale, t } = useI18n();
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
        <Link href="/carta" onClick={() => setOpen(false)}>{t.carta}</Link>
        <Link href="/descubrir" onClick={() => setOpen(false)}>{t.descubrir}</Link>
        <Link href="/recorrido" onClick={() => setOpen(false)}>{t.recorrido}</Link>
        <Link href="/guide" onClick={() => setOpen(false)}>{t.guide}</Link>
        <Link href="/tools" onClick={() => setOpen(false)}>{t.tools}</Link>
        <Link href="/waitlist" onClick={() => setOpen(false)}>{t.waitlist}</Link>
      </nav>
      <div className="header-actions">
        <select className="language" aria-label="Idioma" value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
          <option value="es">ES</option>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
        <Link className="header-location" href="https://maps.google.com/?q=Pagés+del+Corro+86+Sevilla" target="_blank">Triana</Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menú">
          <span /><span />
        </button>
      </div>
    </header>
  );
}
