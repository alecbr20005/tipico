# Comprobación de la plataforma

## Validación ejecutada

- `npm run lint`: correcto, con avisos de `<img>` pendientes de migración completa a `next/image`.
- `npm run typecheck`: correcto.
- `npm run build`: correcto.
- Rutas probadas con servidor local: `/`, `/carta`, `/plato/dish-01`, `/recorrido`, `/descubrir`, `/guide`, `/tools`, `/waitlist`, `/business`, `/robots.txt` y `/sitemap.xml`; todas responden `200`.

## Funciones locales comprobadas por implementación

- La carta carga las cinco fotografías locales y conserva los datos pendientes.
- Food Guide filtra preferencia y texto en datos locales.
- Waitlist guarda entradas en `localStorage`.
- Business guarda edición de carta y estados de prueba en `localStorage`.
- El escáner utiliza OCR en el navegador y muestra una revisión editable.
- El generador utiliza plantillas deterministas.
- Compartir utiliza Web Share o portapapeles cuando están disponibles.

## No comprobado en dispositivos reales

- Quick Look/AR: no existe modelo 3D real ni USDZ.
- OCR con cartas impresas reales: requiere prueba visual en navegador.
- Gestos táctiles del recorrido: requieren validación móvil.
- Idiomas: el selector cambia el estado global, pero quedan textos pendientes de traducir.
- Publicación/despliegue: no autorizado.
