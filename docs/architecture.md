# Arquitectura propuesta

## Sistemas

- `src/app`: experiencia pública y rutas privadas.
- `src/app/api`: operaciones servidor-validadas.
- `src/lib/supabase`: clientes Supabase para navegador y servidor.
- `supabase/migrations`: esquema, relaciones y políticas RLS.

## Datos

Restaurantes, perfiles, roles, categorías, platos, traducciones, alérgenos, imágenes, modelos 3D, galería, lista de espera y analítica futura se gestionan en Postgres.

## Seguridad

- Supabase Auth para sesiones.
- Perfiles con roles `admin`, `manager` y `staff`.
- RLS en todas las tablas de datos privados.
- Validación Zod en la API de la lista de espera.
- Sin claves privadas en el cliente.

## Estado actual

La experiencia pública no presenta datos provisionales como oficiales. La carta y las recomendaciones permanecen vacías hasta que existan datos validados. La lista de espera requiere configuración de Supabase y no usa almacenamiento local.

## Pendientes externos

- Autorizar y aportar recursos gráficos oficiales.
- Confirmar platos, datos gastronómicos y traducciones.
- Crear usuarios, roles y ejecutar migraciones en Supabase.
- Crear modelos 3D reales o mantener el fallback fotográfico.
