# TÍPICO Experience

## Estado

Esta implementación es una base visual y funcional de demostración para TÍPICO Barra de Tapas.

- Identidad visual y Home: implementadas.
- Presentación de cinco platos: nombres y notas provisionales; sin fotografías oficiales.
- Carta: datos provisionales, sin precios, ingredientes, alérgenos ni disponibilidad confirmada.
- Food Guide: recomendador basado en reglas, no IA.
- Waitlist: demostración en memoria; no persistencia compartida.
- Business: demostración sin autenticación ni datos reales.
- Instagram y Tripadvisor: enlaces a perfiles oficiales.

## Auditoría del proyecto anterior

El repositorio anterior se conserva en `reference/`. Sus problemas principales fueron: datos de carta no validados, imágenes ilustrativas presentadas como visuales pendientes, waitlist basada en localStorage, autenticación demo en el cliente y métricas sin datos reales. La nueva arquitectura evita esas dependencias y marca explícitamente cualquier demo.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Producción pendiente

1. Incorporar logotipo y fotografías oficiales autorizadas.
2. Validar los cinco platos, carta, precios, alérgenos e idiomas.
3. Configurar Supabase Auth, tablas RLS y rutas privadas.
4. Reemplazar la Waitlist en memoria por backend compartido.
5. Añadir consentimiento/privacidad y política de retención.
6. Sustituir el marcador visual por el diseño oficial.

No publicar ni desplazar a producción sin autorización.
