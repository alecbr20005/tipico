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

## Arquitectura

- Frontend público y rutas privadas: Next.js 16 / React / TypeScript.
- Datos privados y compartidos: Supabase Postgres.
- Identidad de usuarios y roles: Supabase Auth.
- Seguridad: políticas RLS y validación Zod en API.
- Espera: API compartida con persistencia en Supabase.
- Contenido y carta: diseñados para gestionarse desde tablas administrables.
- Sin datos personales ficticios, sin contraseñas demo y sin métricas simuladas.

## Supabase

Aplicar la migración `supabase/migrations/202611210001_initial_schema.sql` desde el proyecto de Supabase.

Variables necesarias:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo para procesos administrativos protegidos)
- `NEXT_PUBLIC_SITE_URL`

No publiques la clave service-role en variables `NEXT_PUBLIC_*`.

## Recursos pendientes

- Archivo original del logotipo.
- Fotografías oficiales de Típico.
- Fotografía y selección final de los cinco platos.
- Modelos GLB/USDZ reales.
- Validación de carta, precios, alérgenos e idiomas.
- Credenciales de Supabase y creación de usuarios administrativos.
