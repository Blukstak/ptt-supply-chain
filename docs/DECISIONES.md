# Registro de decisiones — PTT Supply Chain Film

Bitácora de decisiones de diseño y contenido. Lo más reciente arriba.

## 2026-09-09 (noche) — Ronda 2 de Romina + instrucciones de Gala (v2.0)

Fuente: `docs/Observaciones_Video_PTT_R2_2026-09-09.docx` (Romina De Filippi, Subgerencia de Supply Chain, observaciones sobre la versión 03:47). Imágenes nuevas en `docs/referencias/r2-*.png`.

### Instrucciones directas de Gala (prevalecen)

| Instrucción | Cómo se aplicó |
|---|---|
| **Duración ~2 min (120 ± 5 s)** | Nueva duración **123,8 s (02:03)**, antes 03:47. Se acortaron los holds de citas (2–2,6 s), se eliminaron citas redundantes (quedan 3), se fusionaron escenas: Faena + Mando final + Planificación + Retiro → una sola escena "Contrato en faena"; Bodega + Tiempo de respuesta → las alternativas se reubican al final de Taller (como pidió Romina); Recepción absorbe el Laboratorio; el cierre absorbe instalación, I+D, balance y marca. El planetario de portada dura 6 s (antes 11,5). |
| **Sin la palabra "Escena"** | Eliminada de todos los kickers, lower-thirds, títulos de capítulo y del reproductor (`grep Escena src/` no devuelve nada). Los kickers ahora dicen el tema: "Contrato de mantención en faena", "Recepción e inspección en taller PTT", etc. |
| **PTT protagonista, la minería es el cliente** | El video abre con "Quiénes somos" (PTT) antes de la minería; la faena se muestra solo a través del taller PTT dentro de la mina; los textos hablan en primera persona ("Reparamos…", "Operamos…", "nuestro personal", "nuestra red", "nuestro inventario"); las etiquetas destacan "Personal PTT", "flota propia", "stock propio", "taller PTT"; el cierre de marca resume la propuesta PTT (talleres, contrato en faena, I+D). El tiempo en faena es ~19 s de 124, y de esos, la mitad es taller PTT/componente. |

### Observaciones R2 (según orden del documento)

| # | Observación | Decisión / implementación | Estado |
|---|---|---|---|
| 1 | Apertura "Quiénes es PTT": repara componentes de maquinaria minera; dos talleres (Santiago y Antofagasta) con mapa de Chile; contrato de mantención dentro de la minera; área de Ingeniería y Desarrollo (se retoma al cierre) | **Nueva escena "Quiénes somos"** (10 s) tras la portada: logo PTT, 4 ideas numeradas con el texto del documento, mapa de Chile vectorial (`chileMap`) con pines pulsantes en Antofagasta y Santiago ("Taller principal") y un marcador "Contrato en faena". La idea 04 se resalta en rojo con la etiqueta "Lo retomamos al cierre". | ✅ |
| 2 | Contrato de mantención en faena como secuencia: el camión entra a un taller dentro de la mina, hay personal PTT, desde ahí sale el componente; incorporar la vista del mando final (Img 2) | Escena "Contrato en faena": galpón `fieldWorkshop` con letrero "TALLER PTT EN FAENA · CONTRATO DE MANTENCIÓN · DENTRO DE LA MINERA", portón que se abre, dos técnicos PTT, el 797 entra al galpón; al final el componente sale en cama baja con la etiqueta de guía de despacho. La vista exterior del mando final (Img 2/9) se muestra en el close-up. | ✅ |
| 3 | "Nuestros clientes": quitar "ESCENA 01"; título más grande arriba; agregar motoniveladora, bulldozer, perforadora y camión Komatsu (Img 4–7) | **Nueva escena "Nuestros clientes"**: título 112 px en la parte superior, texto de Romina debajo, y fila de equipos dibujados en SVG: `motorGrader`, `bulldozer`, `drillRig`, `komatsuTruck` + CAT 797F, cada uno con su etiqueta. | ✅ |
| 4 | Close-up en tres pasos: camión completo → close-up al componente (Img 9) → movimiento de engranajes | Zoom a la rueda trasera → aparece el componente exterior (`finalDriveSide`, ahora con pernos en la brida y marca PTT) → se desplaza y "abre" al corte con los engranajes girando. | ✅ |
| 5 | Plan de mantenimiento: primero el camión completo con componentes destacados (Img 11: motor, transmisión, diferencial, mandos finales, maza suspensión), luego close-up al mando final indicando horas | "Despiece" sobre el 797: 5 rótulos con círculo rojo sobre cada componente (mandos finales en amarillo), luego el close-up y el gauge 17.650 / 18.000 h. Se eliminó el panel "Programa de mantenimiento" (redundante y largo). | ✅ |
| 6 | Red de interacción: la minera interactúa internamente; una sola línea hacia PTT; dentro de PTT interactúan taller, calidad, proveedores, bodega y proveedores logísticos; destacar comunicación rápida y 24/7 | Escena "Red de interacción" reescrita: caja "MINERA · CLIENTE" (Operaciones, Mantención, Planificación en triángulo), **una sola línea gruesa** Mantención → hub PTT, caja "POWER TRAIN TECHNOLOGIES" con hub central y 5 áreas interconectadas; etiquetas "Comunicación rápida con las mineras" y "Disponibilidad 24/7"; lower-third "Un solo canal, respuesta 24/7". | ✅ |
| 7 | Eliminar el bloque Forecast; reemplazar por un recurso que muestre que hay componentes derivados a PTT y otros a distintos proveedores | Forecast eliminado. En la misma escena, segundo tiempo: componentes salen de la minera; tres van al hub PTT (etiqueta "Componentes derivados a PTT · mandos finales, transmisiones, diferenciales") y uno a la caja gris "OTROS PROVEEDORES" ("Otros componentes se derivan a distintos proveedores"). | ✅ |
| 8 | Laboratorio de Ingeniería: secuencia breve (retira una pieza, la estudia y la devuelve) | Al final de "Recepción e inspección": aparece la mesa de laboratorio (`labBench`: microscopio, monitor con medición y "MEJORA PROPUESTA · v2", ingeniero PTT); un planetario vuela del componente desarmado al laboratorio, la pantalla parpadea y la pieza vuelve con un destello. ~4,5 s. | ✅ |
| 9 | Rutas de Europa y EE.UU. aéreas y que lleguen antes que el barco de Asia; agregar "red internacional de abastecimiento"; originales + desarrollados por I+D | Rutas de Houston y Rotterdam ahora son arcos blancos con **avión** orientado a la tangente (1,6 s); Singapur sigue marítimo con barco (3,4 s), llega después. Etiquetas "Red internacional de abastecimiento de repuestos" y "Repuestos originales + repuestos desarrollados por Ingeniería y Desarrollo". Chips: OC → Aéreo EE.UU./Europa → Marítimo Asia → Camión propio a bodega. | ✅ |
| 10 | Camión claramente cargado (carga de Europa, Asia y EE.UU.) llega a bodega; personal revisando la carga; de bodega pasa a taller | `lowboyTruck(id, cargo=true)` dibuja tres cajas rotuladas EE.UU. / EUROPA / ASIA con flejes. Aparece al final de Abastecimiento y llega a la escena "Bodega PTT": dos técnicos PTT escanean la carga, las cajas van al rack y luego salen hacia la derecha con la etiqueta "De bodega, directo a taller para el armado →"; en Taller las mismas cajas entran por la izquierda. | ✅ |
| 11 | Alternativas de armado fuera de secuencia: bodega → taller → luego notar que un componente se armó y otro ya estaba en stock → dos alternativas | La antigua escena "Tiempo de respuesta" se eliminó como escena y se reubicó **al final de Taller**: tras la certificación, el componente armado va a la izquierda ("Componente reparado · se armó en nuestro taller") y a la derecha aparece rack + componente ("Componente de stock · ya estaba en nuestro inventario: entrega inmediata"). Cita: "Dos alternativas para el cliente. Una respuesta rápida." | ✅ |
| 12 | Usar el componente de la Imagen 9; reemplazar la marca CAT por PTT | `finalDriveSide` es el componente de la Imagen 9 (cuerpo cónico amarillo, brida grande con pernos, brida pequeña); ahora lleva placa roja "PTT". La tapa del corte (`finalDrive` hubface) pasó de círculo amarillo "CAT" a círculo rojo "PTT". El nombre "CAT 797F" se conserva solo para identificar el camión del cliente. | ✅ |
| 13 | Encuadrar los letreros del taller (el texto se salía) | Letreros de 180 → 260 px de ancho con franja roja lateral; "ESTACIÓN DE DESARME" en Barlow Condensed 16 px. Verificado en Recepción, Taller y cierre. | ✅ |
| 14 | Debe notarse que el componente (Img 9) queda instalado dentro del camión | En "Entrega": el componente viaja sobre la cama baja, se eleva, vuela hasta la rueda trasera del 797 reduciéndose, destello blanco y queda la tapa con marca PTT en la rueda; etiqueta "Componente PTT instalado en el camión"; el 797 sale rodando. | ✅ |
| 15 | Cierre con Ingeniería y Desarrollo: llega otro mando final, la pieza revisada vuelve con una mejora (brillo), se usa para armar el componente nuevo, sale otro mando final a la mina; mensaje "Mejoras de Ingeniería y Desarrollo" | Tras la instalación se corta al taller: entra otro mando final ("Llega otro mando final al taller"), baja desde arriba la pieza con halo rojo pulsante ("La pieza que revisó Ingeniería vuelve con una mejora"), se funde en el componente con destello, aparece el titular **"Mejoras de Ingeniería y Desarrollo"** y el componente sale hacia la derecha ("Sale otro mando final hacia la mina"). Luego balance fortalezas/limitaciones (compacto, 5 s) y cierre de marca con el anillo de procesos actualizado (incluye "Ingeniería"). | ✅ |

### Estructura resultante (02:03)

| # | Capítulo | Inicio | Dur. |
|---|---|---|---|
| 0 | Portada | 0:00 | 6 s |
| 1 | Quiénes somos | 0:06 | 10 s |
| 2 | Nuestros clientes | 0:15 | 9 s |
| 3 | Contrato en faena (taller en mina → despiece → close-up → horas → retiro) | 0:24 | 19 s |
| 4 | Red de interacción (+ derivación de componentes) | 0:43 | 10 s |
| 5 | Recepción e ingeniería (inspección, desarme, laboratorio) | 0:52 | 11 s |
| 6 | Abastecimiento (OC, aéreo, marítimo, camión cargado) | 1:04 | 12 s |
| 7 | Bodega (revisión de carga → a taller) | 1:15 | 9 s |
| 8 | Taller PTT (armado, QA, dos alternativas) | 1:25 | 15 s |
| 9 | Entrega y cierre (instalación, mejoras I+D, balance, marca) | 1:39 | 24 s |

### Pendientes que requieren decisión del cliente

- Los equipos (motoniveladora, bulldozer, perforadora, Komatsu) y el mapa de Chile son ilustraciones vectoriales simplificadas, no las fotos; si se prefieren las fotos reales (con licencia), van en `public/media/`.
- Las cinco áreas internas de PTT en la red (Taller, Calidad, Bodega, Proveedores, Prov. logísticos) y las tres de la minera (Operaciones, Mantención, Planificación) son una propuesta; confirmar nombres.
- El texto de las dos alternativas ("Componente reparado" / "Componente de stock") y de las etiquetas de derivación (qué componentes van a PTT) es propuesta editorial.
- Con 2 minutos, cada bloque dura entre 9 y 24 s: si algún mensaje necesita más aire, hay que decidir qué otro se recorta.

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
