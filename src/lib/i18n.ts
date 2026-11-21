"use client";

import { createContext, useContext, useState, type ReactNode, createElement } from "react";

export type Locale = "es" | "en" | "fr";
export type Copy = {
  carta: string;
  descubrir: string;
  recorrido: string;
  guide: string;
  waitlist: string;
  tools: string;
  share: string;
  explore: string;
  discover: string;
};

const translations = {
  es: { carta: "Carta", descubrir: "Descubrir", recorrido: "Recorrido 3D", guide: "Food guide", waitlist: "Lista de espera", tools: "Herramientas", share: "Compartir", explore: "Explorar carta", discover: "Descubrir Típico" },
  en: { carta: "Menu", descubrir: "Discover", recorrido: "3D tour", guide: "Food guide", waitlist: "Waitlist", tools: "Tools", share: "Share", explore: "Explore menu", discover: "Discover Típico" },
  fr: { carta: "Carte", descubrir: "Découvrir", recorrido: "Visite 3D", guide: "Guide gastronomique", waitlist: "Liste d'attente", tools: "Outils", share: "Partager", explore: "Explorer la carte", discover: "Découvrir Típico" },
} as const;

const I18nContext = createContext<{ locale: Locale; t: Copy; setLocale: (locale: Locale) => void }>({
  locale: "es",
  t: translations.es,
  setLocale: () => undefined,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "es";
    const stored = localStorage.getItem("tipico-locale");
    return stored === "es" || stored === "en" || stored === "fr" ? stored : "es";
  });
  const setLocale = (next: Locale) => {
    localStorage.setItem("tipico-locale", next);
    setLocaleState(next);
  };
  return createElement(I18nContext.Provider, { value: { locale, t: translations[locale], setLocale } }, children);
}

export function useI18n() {
  return useContext(I18nContext);
}
