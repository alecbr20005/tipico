import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "TÍPICO Experience | Barra de Tapas · Triana",
  description: "SAME SAME BUT DIFFERENT. Experiencia digital de TÍPICO Barra de Tapas en Triana, Sevilla.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tipico2.vercel.app"),
  openGraph: {
    title: "TÍPICO Barra de Tapas",
    description: "SAME SAME BUT DIFFERENT.",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><I18nProvider>{children}</I18nProvider></body>
    </html>
  );
}
