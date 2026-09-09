# Registro de decisiones — PTT Supply Chain Film

Bitácora de decisiones de diseño y contenido. Lo más reciente arriba.

## 2026-09-09 (tarde) — Observaciones consolidadas de Romina (v1.2)

Fuente: `docs/Observaciones_Video_PTT_2026-09-09.docx` (Romina De Filippi, Subgerencia de Supply Chain). Imágenes en `docs/referencias/`.

| # | Observación | Decisión / implementación | Estado |
|---|---|---|---|
| 1 | Portada: título y 4 engranajes girando en torno al central | Ya aplicado en v1.1. | ✅ |
| 2 | Reemplazar "Operación" por intro de clientes (gran minería) | Texto exacto del documento; camión 797 (Img 1) y luego mando final (Img 2). | ✅ |
| 3 | Horas máx. 18.000; dejar claro que es un mando final del camión; "(generalmente)" | Gauge 17.650 / 18.000 h con etiqueta "MÁX. 18.000 H". El camión queda como fantasma tenue detrás del corte + rótulo "Mando final · CAT 797F — componente de la rueda trasera". Cita: *"Todo comienza antes de que ocurra una falla (generalmente)."* | ✅ |
| 4 | Camión de transporte = tracto rojo con cama baja (Img 4); quitar "48 h"; taller fiel (Img 5-7) | Nuevo `lowboyTruck` (tracto rojo PTT + cama baja amarilla) en escenas 3, 5, 6b y 8. Eliminada la mención "48 h". Nuevo fondo `pttWorkshop`: muros blancos, cerchas, puente grúa amarillo, letreros D1/D2/D3 "Estación de desarme", mesas, carros rojos; personal con uniforme PTT (polera negra con franja roja). | ✅ |
| 5 | Mapa Mercator satelital; rutas marítimas por el océano; secuencia OC → origen → barco → bodega/taller → cliente | Nuevo `mercatorMap` (océano azul con grilla, continentes verde/tierra). Rutas solo marítimas, trazadas por el mar (Houston→Pacífico, Rotterdam→Atlántico, Singapur→Pacífico) hasta el puerto. Escena 5 reescrita: 1) persona emitiendo OC en el ERP, 2) las OC vuelan a los orígenes, 3) barcos regresan, 4) camión propio a bodega/taller, 5) cadena completa hasta el cliente. Se usó un mapa vectorial (no la imagen satelital) para mantener el build sin binarios y con licencia clara; si se quiere la textura real, va en `public/media/`. | ✅ |
| 6 | Dos vías de respuesta: logística propia y componentes propios | **Nueva escena 6b "Tiempo de respuesta"** (después de Bodega): pantalla dividida — izquierda camión propio PTT, derecha rack con componente en stock; cada vía con su título, texto y etiqueta. | ✅ |
| 7 | Cierre con balance fortalezas / limitaciones | Panel doble antes del cierre de marca con las 6 fortalezas y las 2 limitaciones del documento, tal cual. | ✅ |
| 8 | Paleta rojos y grises; logo PTT · Marubeni Group; tono ejecutivo | Variable `--amber` ahora es rojo PTT `#e0262b` (todas las transiciones, barras, tags y el anillo final). El amarillo CAT se conserva solo en camión, componente y puente grúa (fidelidad a la realidad). Logo recreado tipográficamente (POWER rojo / TRAIN blanco / TECHNOLOGIES gris / Marubeni Group rojo, inclinado) en portada, splash y cierre; el PNG original tiene fondo blanco y no se integra sobre negro. | ✅ |

Duración resultante: ~3:40.

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
