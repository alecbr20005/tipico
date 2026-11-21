# Arquitectura actual

## Experiencia

- Next.js App Router.
- Datos locales de demostración en `src/lib/demo-store.ts`.
- Persistencia del navegador mediante `localStorage`.
- OCR mediante `tesseract.js` ejecutado en el navegador.
- Generador de texto determinista sin IA externa.

## Recorrido

El recorrido utiliza la fotografía real del local mediante cambios de posición y escala. Se presenta como recreación aproximada, no como escaneo exacto.

## Carta y platos

Las cinco fotografías se utilizan sin inventar nombres oficiales. Las vistas individuales muestran datos pendientes cuando no están validados.

## Demo no conectada

Waitlist y Business no usan Supabase ni una API compartida. Los cambios permanecen en el navegador del usuario.

## Producción futura

La integración real requerirá backend, autenticación, migraciones, roles, RLS y recursos oficiales confirmados. No se ha configurado en esta rama.
