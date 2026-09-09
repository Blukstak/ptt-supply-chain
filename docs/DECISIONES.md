# Registro de decisiones — PTT Supply Chain Film

Bitácora de decisiones de diseño y contenido. Lo más reciente arriba.

## 2026-09-09 — Correcciones de Romi (v1.1)

| Decisión | Detalle | Estado |
|---|---|---|
| Portada: nuevo título | "Cadena de suministro **Power Train Technologies**" reemplaza a "El ciclo de vida de un Mando Final CAT 797". | ✅ |
| Portada: engranajes | El planetario ahora tiene **4** satélites (no 3), giran sobre su eje y orbitan el solar; al ser simétricos el conjunto queda centrado. | ✅ |
| Escena 1: mensaje de apertura | Se reemplaza "Operación 24/7" por el texto de clientes: *"Nuestros principales clientes son la gran minería del país. Ellos desmontan componentes de sus camiones de extracción y equipos de apoyo y los bajamos a nuestros talleres."* | ✅ |
| Camión CAT 797F | Redibujado según foto de referencia: visera de la tolva sobre la cabina, cabina elevada sobre plataforma, radiador frontal, escalera diagonal, barandas, llantas amarillas. Vista lateral (no 3/4). | ✅ |
| Componente (Mando Final) | Se reemplaza la "caja FD-797 USADO" por una ilustración del **mando final exterior**: cilindro amarillo con bridas dentadas en ambos extremos, **sin** el eje que sobresale en la foto de referencia. Se usa en escenas 3, 4 y 8. El corte técnico (planetario) se mantiene solo para inspección/taller. | ✅ |
| Referencia de video | https://www.youtube.com/watch?v=j4ulsFhfqaA (mando final CAT 797). No se puede embeber en la animación (YouTube bloquea autoplay sin gesto y no es descargable legalmente); se usó como referencia visual. Si se consigue el archivo con permiso, va en `public/media/`. | ℹ️ |

## 2026-09-08 — Decisiones iniciales (v1.0)

- **Formato:** animación web (Vite + TypeScript + GSAP) en vez de video renderizado, para poder iterar rápido y desplegar como sitio estático. Exportable a MP4 con `window.__player.seek(t)` + captura de frames.
- **Estética:** ilustración vectorial procedural (SVG) + partículas canvas. Sin fotografía por falta de material licenciado; `public/media/` permite reemplazar fondos por fotos reales sin tocar código.
- **Stage fijo 1920×1080** escalado al viewport (composición estable en cualquier pantalla).
- **Paleta:** negro industrial + ámbar/CAT yellow (`#ffcd11`) + teal para datos digitales.
- **Estructura narrativa (8 escenas, ~3:15):** Faena/planificación → Planificación demanda → Retiro/logística inversa → Recepción/inspección → Abastecimiento/importación → Bodega/WMS → Taller/QA → Distribución/cierre. Solo la Escena 1 vino definida por el cliente; el resto es propuesta.
- **Hosting:** GitHub Pages (repo público) con deploy automático en cada push a `main`. Alternativa privada: Netlify/Vercel.
