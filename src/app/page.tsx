"use client";

import Header from "@/components/Header";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  return (
    <>
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-photo" />
            <div className="hero-grain" />
            <div className="hero-mark">T</div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Pagés del Corro 86 · Triana</p>
            <h1 id="hero-title">TÍPICO.<br /><em>NOTHING TYPICAL.</em></h1>
            <p className="hero-note">SAME SAME. BUT DIFFERENT.<br />Una forma diferente de vivir las tapas.</p>
            <div className="hero-links">
              <Link href="/carta" className="button button-gold">{t.explore}</Link>
              <Link href="/descubrir" className="button button-ghost">{t.discover}</Link>
            </div>
          </div>
        </section>

        <ShareButtons />

        <section className="tour-preview" aria-labelledby="tour-preview-title">
          <div className="tour-preview-image" role="img" aria-label="Interior real de Típico Barra de Tapas" />
          <div className="tour-preview-copy">
            <p className="eyebrow">Una visita antes de llegar</p>
            <h2 id="tour-preview-title">Recorrido visual<br /><em>por Típico.</em></h2>
            <p>Explora la barra y el ambiente a partir de una fotografía real. La experiencia se identifica como recreación aproximada.</p>
            <Link href="/recorrido" className="text-link dark">Entrar al recorrido <span>↗</span></Link>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="eyebrow">Típico · Triana</p>
          <h2 id="manifesto-title">La barra es el punto de encuentro.<br /><em>La cocina, el motivo para volver.</em></h2>
          <Link href="/descubrir" className="text-link">Descubrir Típico <span>↗</span></Link>
        </section>

        <section className="social-section">
          <div>
            <p className="eyebrow">Presencia</p>
            <h2>El día a día<br />de Típico.</h2>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/tipicobarradetapas/" target="_blank" rel="noreferrer">
              Instagram <span>↗</span>
            </a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187443-d13564282-Reviews-Tipico_Barra_De_Tapas-Seville_Province_of_Seville_Andalucia.html" target="_blank" rel="noreferrer">
              Tripadvisor <span>↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer>
        <Link href="/" className="footer-brand">TÍPICO</Link>
        <p>Pagés del Corro 86 · Triana, Sevilla</p>
        <div>
          <a href="mailto:tipicotapas@gmail.com">Email</a>
          <a href="tel:+34955704941">Teléfono</a>
          <Link href="/business">Business</Link>
        </div>
      </footer>
    </>
  );
}
