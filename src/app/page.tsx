"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { menu } from "@/data/menu";
import { useState } from "react";

export default function HomePage() {
  const [active, setActive] = useState(0);
  const dish = menu[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + menu.length) % menu.length);
  };

  return (
    <>
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-grain" />
            <div className="hero-mark">T</div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Pagés del Corro 86 · Triana</p>
            <h1 id="hero-title">SAME SAME<br /><em>BUT DIFFERENT.</em></h1>
            <p className="hero-note">Una barra de tapas donde tradición y personalidad<br />se sirven a la misma mesa.</p>
            <div className="hero-links">
              <Link href="/carta" className="button button-gold">Explorar carta</Link>
              <Link href="/descubrir" className="button button-ghost">Descubrir Típico</Link>
            </div>
          </div>
          <p className="asset-note">Fotografía oficial pendiente de incorporar</p>
        </section>

        <section className="dishes-section" aria-labelledby="dishes-title">
          <div className="section-heading">
            <p className="eyebrow">Selección de cocina</p>
            <h2 id="dishes-title">Five dishes.<br /><em>One identity.</em></h2>
            <p>Una presentación destacada. No representa la totalidad de la carta.</p>
          </div>

          <div className="dish-stage" style={{ "--dish-index": active } as React.CSSProperties}>
            <button className="dish-arrow previous" onClick={() => move(-1)} aria-label="Plato anterior">←</button>
            <article className="dish-card" key={dish.id}>
              <div className="dish-visual">
                <div className="dish-monogram">{String(active + 1).padStart(2, "0")}</div>
                <p>Fotografía auténtica pendiente</p>
              </div>
              <div className="dish-copy">
                <p className="dish-index">{String(active + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}</p>
                <p className="eyebrow">{dish.category}</p>
                <h3>{dish.name}</h3>
                <p className="dish-status">Precio pendiente de confirmación</p>
                <p className="source-note">{dish.sourceNote}</p>
              </div>
            </article>
            <button className="dish-arrow next" onClick={() => move(1)} aria-label="Plato siguiente">→</button>
          </div>

          <div className="dish-tabs" role="tablist" aria-label="Seleccionar plato destacado">
            {menu.map((item, index) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.name}
              </button>
            ))}
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
