# TÍPICO Experience Platform

## Estado

Plataforma local y visualmente operativa para TÍPICO Barra de Tapas.

- Home editorial con fotografía real.
- Carta con cinco fotografías proporcionadas por el propietario.
- Nombres, precios, ingredientes y alérgenos pendientes de validación.
- Recorrido visual aproximado del local basado en una fotografía real.
- Galería ampliable.
- Escáner OCR local.
- Generador determinista de descripciones.
- Food Guide basado en datos locales.
- Waitlist demo mediante localStorage.
- Business demo mediante localStorage.
- Compartir mediante Web Share/portapapeles.
- Selector ES/EN/FR.

## Datos y demostraciones

Las funciones demo indican explícitamente que son locales. No se presentan como sincronización real ni como autenticación de producción.

No existe integración con Supabase en esta rama. No se han creado usuarios, roles, migraciones ni credenciales.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Rutas principales

- `/`
- `/carta`
- `/plato/dish-01` a `/plato/dish-05`
- `/recorrido`
- `/descubrir`
- `/guide`
- `/tools`
- `/waitlist`
- `/business`

## Recursos pendientes

- Confirmación de los nombres oficiales de los cinco platos.
- Descripciones, ingredientes, alérgenos y precios.
- Logo oficial verificable.
- Modelos GLB/GLTF/USDZ reales.
- Integración real de Waitlist y Business.
- Traducción completa de todos los contenidos.

No desplegar ni publicar sin autorización.
