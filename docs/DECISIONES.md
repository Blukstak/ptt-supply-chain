# Registro de decisiones — PTT Supply Chain Film

Bitácora de decisiones de diseño y contenido. Lo más reciente arriba.

## 2026-09-09 — v2.7: transmisión y motor rehechos desde las imágenes de R4 (Codex GPT-6 Astra, razonamiento medio)

Las ilustraciones `transmission()` y `engine()` creadas en R4 quedaban muy simples frente al mando final. Codex recibió adjuntas `r4-05-transmision.png` y `r4-06-motor.png` y las rehízo con el mismo acabado (3/4, gradientes dorados, pernos, sombra). Transmisión: carcasa, tapas atornilladas, nervaduras, bloque hidráulico, brida inferior. Motor: bloque largo, culatas en fila, dos turbos, colectores, tuberías, cárter, bastidor, rótulo CAT. Ids preservados; sin cambios en escenas. Comparaciones en `docs/revisiones/`.

## 2026-09-09 — v2.6 / R4: Ronda 4 de Romina (14 observaciones)

Fuente: `docs/Observaciones_Video_PTT_R4_2026-09-09.docx` (Romina De Filippi, Subgerencia de Supply Chain, 09/09/2026; observaciones sobre la v2.5 · 02:05). Capturas y fotos en `docs/referencias/r4-02…r4-07`.

| # | Minuto | Observación R4 | Decisión / implementación | Estado |
|---|---|---|---|---|
| 1 | 00:17 | Eliminar el párrafo (Img 1); dejar solo el título grande "La gran minería" | Kicker "Nuestros clientes" + **"La gran minería"** (132 px). Párrafo eliminado; se conserva la etiqueta pequeña "Equipos que reparamos". | ✅ |
| 2 | — | Etiqueta "Camión Komatsu" → "Camiones de extracción" | Etiqueta cambiada (`s02-clientes.ts`). | ✅ |
| 3 | 00:26 | Sacar el texto superior; dejar solo "Contrato de Mantención dentro de la minera" | Lower-third con ese título exacto (64 px, kicker "Personal PTT en faena"); párrafo superior eliminado. | ✅ |
| 4 | 00:31 | El componente debe salir del camión, no aparecer por corte | Nueva transición: zoom a la rueda trasera del 797 (queda a la derecha), aparece un anillo rojo de pernos que gira (desacople), el mando final nace en la rueda, vibra y **viaja desde la rueda al primer plano** creciendo mientras el camión se atenúa; etiqueta "El mando final se desacopla de la rueda trasera y sale del camión". Recién después se abre al corte con engranajes. | ✅ |
| 5 | 00:42 | Título "Todo comienza antes de que ocurra una falla"; "(generalmente)" como bajada pequeña | Cita en dos niveles: título 84 px y "(generalmente)" en línea inferior, 40 px, peso ligero, gris. | ✅ |
| 6 | 00:45 | Quitar "Un solo canal"; énfasis en respuesta rápida, 24/7 y flexibilidad (copy sugerido) | Lower-third: **"Respuesta rápida, disponibilidad 24/7 y flexibilidad ante los requerimientos del cliente."** (texto literal). Etiquetas: "Respuesta rápida a la minera", "Flexibilidad ante los requerimientos del cliente", "Disponibilidad 24/7". | ✅ |
| 7 | Taller | Letrero tapado por la puerta (Img 2): reubicar; letrero por estación con mecánico y componente; en 01:28 y 01:50 "Estación de armado" | `pttWorkshop()` ahora recibe `StationSign[]` (código, mecánico, componente, x opcional) y el tipo DESARME/ARMADO. Recepción: D1/D2/D3 "Estación de desarme" reubicados en x 330/810/1290 (fuera de la puerta, que ocupa 1500–1900). Taller (01:28) y cierre (01:50): A1/A2/A3 **"Estación de armado"**. Mecánicos y componentes (propuesta): Cristián Araya · Mando final; Rodrigo Muñoz · Transmisión; Felipe Contreras · Motor. La OT del taller pasa a "Estación A1". Los letreros se ocultan cuando un título grande pasa por encima (2 opciones, "Mejoras de I+D"). | ✅ |
| 8 | 01:09 | Aviones reconocibles | `airplane()` rehecho: fuselaje con morro redondeado y cabina oscura, 11 ventanillas, alas en flecha, dos motores bajo el ala, estabilizador y cola vertical, franja roja PTT; tamaño en el mapa ×1,7. | ✅ |
| 9 | 01:28 | Diferenciar repuestos de stock vs. comprados; que salgan de la caja piezas reconocibles; reemplazar la "estrella" | Nuevo `sparePart()` (sello, perno, tuerca, rodamiento, engranaje). De la caja consolidada salen 6 piezas en dos filas: **verde = "Repuestos que ya estaban en bodega"** (engranaje, rodamiento, sello) y **teal = "Repuestos comprados fuera · red internacional"** (perno, tuerca, rodamiento); luego entran al componente. La estrella se reemplazó por **llave de torque** (`torqueWrench()`) apretando sobre el componente + **barra "Armado del componente 0→100 %"**; se mantienen las chispas de fondo. | ✅ |
| 10 | 01:37 | Título exacto "2 opciones para nuestros clientes: Reparación y Venta Intercambio" | Cita final de Taller con ese texto literal (72 px). Las dos mitades pasan a "Opción 1 · Reparación" y "Opción 2 · Venta Intercambio" con bajadas breves. | ✅ |
| 11 | 01:48 | El mando final gira con la rueda pero queda atrás; fijarlo a la rueda | La tapa PTT instalada ahora es **hija del grupo de la rueda trasera** (`#c7-w3`): gira y avanza con el camión. El camión sale con `attr.transform` (antes `x`, que pisaba la traslación del `<g>`). Punto de instalación recalculado para la geometría v2.4 (1304, 767). | ✅ |
| 12 | 01:56 | Quitar el bloque fortalezas/limitaciones | Eliminado (−5 s). | ✅ |
| 13 | 02:03 | Reemplazar la escena final por distintas mineras enviándonos sus componentes (mando final, transmisión, motor; Img 3–6) | Nueva pantalla "Distintas mineras nos envían sus componentes": tres tarjetas **Minera A · Antofagasta / Minera B · Atacama / Minera C · O'Higgins**, cada una con su componente (`finalDriveSide`, nuevas `transmission()` y `engine()` vectoriales a partir de las Img 4 y 5) que baja por una flecha a la barra "TALLER PTT · POWER TRAIN TECHNOLOGIES · Recibimos y reparamos mandos finales · transmisiones · motores". El anillo de procesos se eliminó; el **cierre de marca (logo)** se mantiene al final. | ✅ |
| 14 | — | Duración 120 ± 5 s | **125,2 s (02:05)**. Compensación: Clientes −0,5 s, Red −0,3 s, transición del componente comprimida, cierre de marca 4 s. | ✅ |

### Estructura resultante (02:05 · 125,2 s)

| # | Capítulo | Inicio | Dur. |
|---|---|---|---|
| 0 | Portada | 0:00 | 6 s |
| 1 | Quiénes somos | 0:06 | 10 s |
| 2 | La gran minería (título) + equipos | 0:15 | 8,6 s |
| 3 | Contrato en faena (portón → despiece → el mando final sale de la rueda → engranajes → horas → cama baja; cita con bajada) | 0:23 | 20 s |
| 4 | Red de interacción (respuesta rápida · flexibilidad · 24/7; derivación) | 0:43 | 9,9 s |
| 5 | Recepción e ingeniería (letreros D1–D3 reubicados) | 0:52 | 13 s |
| 6 | Abastecimiento (aviones nuevos) | 1:05 | 12 s |
| 7 | Bodega | 1:16 | 11 s |
| 8 | Taller PTT (repuestos stock/compras → torque + barra → QA → 2 opciones) | 1:26 | 16 s |
| 9 | Entrega (mando fijado a la rueda) → Mejoras de I+D → Mineras y componentes → marca | 1:42 | 23,6 s |

### Pendientes que requieren decisión del cliente

- Nombres de mecánicos (Cristián Araya, Rodrigo Muñoz, Felipe Contreras) y asignación de componentes por estación son inventados; reemplazar por los reales.
- "Minera A/B/C" y regiones (Antofagasta, Atacama, O'Higgins) son genéricos; si se pueden nombrar clientes reales (o usar sus logos con autorización) se cambian.
- Bajadas de las 2 opciones ("Reparamos el componente del cliente…" / "Entregamos de inmediato un componente de nuestro stock y recibimos el del cliente a cambio.") son propuesta editorial sobre el título exacto de Romina.
- Obs. 1: se mantuvo la etiqueta pequeña "Equipos que reparamos · camiones de extracción y equipos de apoyo" sobre los equipos; se puede quitar si "solo el título" incluye también esa etiqueta.

## 2026-09-09 — v2.5: mando final rehecho desde el render de referencia (Codex GPT-6 Astra, razonamiento medio)

Gala pidió que el componente se vea como `docs/referencias/02-mando-final.png` (render CAT), sin el eje delgado trasero. Codex recibió las dos imágenes adjuntas (`-i`) y rehízo solo `finalDriveSide()`: tambor con tapa plana, cuerpo dorado escalonado, doble corona derecha con 100 dientes por corona, pernos, brillos, sombra; sin eje saliente; placa PTT roja discreta. Ids `-fl1/-fl2/-g` preservados; sin cambios en escenas. Comparación en `docs/revisiones/finalDrive-comparacion.png`.

## 2026-09-09 — v2.4: CAT 797F rehecho desde foto lateral (Codex GPT-6 Astra, razonamiento medio)

Gala aportó una foto del 797F en **vista lateral pura** (`docs/referencias/r4-01-cat-797f-lateral.png`, rescatada del portapapeles). Se le pasó a Codex como imagen adjunta (`codex exec -i`, acceso confirmado antes de lanzar) y rehízo `truck797()` iterando 3 rondas render-vs-foto (Swift/AppKit). Comparación final guardada en `docs/revisiones/truck797-comparacion.png`.

- Rasgos incorporados: perfil lateral, cabina izquierda acristalada, visera y tolva con nervaduras, rótulos 797F (franja roja) y 2104, barandas, escalera con pasamanos, CAT frontal, cilindro de levante, neumáticos con banda, sombra.
- Diferencias restantes: mecánica simplificada; el camión ocupa menos ancho que antes para respetar la proporción real.
- Ids preservados (`-w1/-w2/-w3`, `-bed`, `-cab`); las escenas no cambiaron, pero los rótulos del despiece (motor, transmisión, diferencial, maza, mandos finales) se re-anclaron a la nueva geometría en `s03-faena.ts`.
- Flujo de delegación: `codex exec -i … --skip-git-repo-check` en background de Claude Code (sin límite de 10 min), en vez del subagente `codex:rescue`.

## 2026-09-09 — v2.3: segunda pasada de equipos (Codex GPT-6 Astra, razonamiento medio)

Gala pidió acercar los equipos a un 1:1 con las fotos. Codex comparó cada render (Swift/AppKit) con su foto e iteró. Solo `src/art/index.ts`; firmas e ids preservados; sin cambios de escenas ni duración.

| Función | Rasgos incorporados | Límite vectorial declarado |
|---|---|---|
| `truck797` | Visera trapezoidal CATERPILLAR, nervaduras, marca 797F rojo/negro, puerta, barandas blancas, dual trasero visible | Más alargado y lateral que la foto (3/4) |
| `motorGrader` | Orientación de la foto, bastidor, hoja inclinada, hidráulicos, barandas | Escorzo de hoja/ejes simplificado |
| `bulldozer` | Neumáticos (como la foto), pala más ancha con borde atornillado, espejo, rejillas | Curvatura de pala aproximada |
| `drillRig` | Mástil continuo, cabina baja, doble oruga, tirantes, estabilizadores | Cableado y perspectiva simplificados |
| `komatsuTruck` | Visera plana rotulada, cabina cuadrada, ruedas mayores, rejilla, escaleras | Frente 3/4 y proporción global distintos |
| `finalDriveSide` | Cuerpo cónico, 96 dientes por corona, pernos, tapas, placa PTT discreta | Volumen de bridas aproximado |
| `lowboyTruck` | Cabina ensanchada, deflector, espejos, escape, eje trasero extra, repuestos | Perspectiva frontal distinta a la foto |

Decisión: las ilustraciones son vista lateral por diseño (las escenas animan traslación y ruedas); un 1:1 real exigiría fotos o render 3D, no vector plano. Si el cliente lo quiere, la vía es `public/media/` con imágenes licenciadas.

## 2026-09-09 — v2.2: equipos vectoriales rediseñados con Codex (GPT-6 Astra)

Gala pidió que ChatGPT/Codex (modelo `gpt-6-astra`, razonamiento medio, vía plugin `codex` en Claude Code) mejorara las ilustraciones de equipos usando las fotos de referencia de Romina. Solo se tocó `src/art/index.ts`; firmas, parámetros e ids de sub-elementos se conservaron, por lo que ninguna escena cambió.

| Función | Referencia | Qué mejoró |
|---|---|---|
| `truck797` | `01-camion-797.png` | Visera de tolva sobre cabina, cabina acristalada sobre plataforma con barandas, radiador con parrilla, escalera diagonal, escape, llantas amarillas con dibujo, sombra |
| `motorGrader` | `r2-04` | Cabina, hoja central con cilindros, bastidor articulado, 6 ruedas |
| `bulldozer` | `r2-05` | Hoja frontal, ripper, orugas con rodillos, cabina ROPS |
| `drillRig` | `r2-06` | Mástil con barra y cables, orugas, cabina |
| `komatsuTruck` | `r2-07` | Silueta Komatsu (cabina cuadrada, tolva ancha) con logotipo |
| `finalDriveSide` | `02` y `r2-09` | Bridas dentadas más fieles, sin eje saliente, placa roja PTT |
| `lowboyTruck` | `04` | Tracto rojo con detalle de cabina/escape, cama baja amarilla con cuello de cisne |

Validado con capturas en Clientes, Contrato en faena, Bodega y Entrega. Sin cambios de duración (02:05).

## 2026-09-09 (noche, 2) — Ronda 3 de Romina (v2.1 / R3)

Fuente: `docs/Observaciones_Video_PTT_R3_2026-09-09.docx` (Romina De Filippi, Subgerencia de Supply Chain). Capturas del documento en `docs/referencias/r3-*.png`.

**Nota importante:** las capturas y los minutos citados en R3 (pantalla "Supply chain no reacciona. Anticipa.", "ESCENA 05", "minuto 2:00", "minuto 2:12", "fill rate") corresponden a la **v1.2 (03:47)**, no a la v2.0 (02:03) que ya estaba publicada. Cada observación se mapeó a la escena equivalente de v2.0; lo que ya se había resuelto en R2 se marca como tal.

| # | Observación R3 | Decisión / implementación | Estado |
|---|---|---|---|
| 1 | Eliminar la pantalla "Supply chain no reacciona. Anticipa." (Img 1) | Esa cita pertenecía a la escena de planificación/forecast de v1.2, eliminada en R2 (obs. 7). `grep -ri anticipa src/` no devuelve nada. | ✅ (ya aplicado en v2.0) |
| 2 | Evaluación en taller (Img 2): agregar que se evalúa el componente, se genera el listado de repuestos, se valoriza, se emite la cotización y se entrega el detalle de la evaluación; copy sugerido | Escena "Recepción e ingeniería": el panel "Protocolo de evaluación" pasa a **"Evaluación en taller"** con 5 filas: 01 Evaluación del componente · 02 Listado de repuestos (Generado) · 03 Valorización del listado · 04 Cotización al cliente (Emitida) · 05 Detalle de la evaluación al cliente (Entregado). Debajo del componente desarmado aparece el copy textual: *"Evaluamos el componente y generamos el listado de repuestos. Con eso valorizamos, cotizamos y entregamos al cliente el detalle de la evaluación."* (+0,9 s para que se lea). La cita de v1.2 "Inspeccionar, evaluar, decidir. Con datos." ya no existía. | ✅ |
| 3a | Abastecimiento (Img 3): barra superior con 6 pasos: Análisis de repuestos · Compras · Importación · Recepción y revisión · Picking de repuestos disponibles en bodega · Entrega a taller de repuestos de bodega + compras | Nuevo helper `stepsBar(SUPPLY_STEPS)` en `core/scene.ts` con los 6 textos exactos, en dos filas (4 + 2) para que quepan. En Abastecimiento se recorren 01 (listado en el ERP), 02 (emisión de OC) y 03 (aviones/barco y camión). Como los pasos 04–06 ocurren físicamente en bodega, **la misma barra continúa en la escena Bodega** y allí se resaltan 04, 05 y 06. Se eliminaron los 4 pasos antiguos (OC / Aéreo / Marítimo / Camión). | ✅ |
| 3b | Título inferior: reemplazar "Repuestos originales, a tiempo" por un mensaje con red internacional de proveedores, agilidad y stock de mayor rotación | El lower-third de Abastecimiento ahora dice **"Red internacional de proveedores, operación ágil y stock de los repuestos de mayor rotación."** (texto exacto del documento, 50 px en dos líneas). En v2.0 el título era "Red propia de repuestos". | ✅ |
| 4a | Mapa (min. 2:00 de v1.2): centrar el punto de recepción sobre Chile, no sobre Argentina | El punto pasa de (268, 418) a (232, 432) en coordenadas del mapa: sobre la costa oeste de Sudamérica. Además se dibuja **Chile como franja roja** semitransparente a lo largo de la costa para que se lea de inmediato. Las tres rutas (Houston, Rotterdam, Singapur) terminan en el nuevo punto; la marítima llega por el Pacífico. | ✅ |
| 4b | Copy: reemplazar "Del mundo a la faena…" | Ese texto ya no existía en v2.0; en su lugar la etiqueta "Red internacional de abastecimiento de repuestos" se reemplaza por el bloque **"Proveedores del mundo para asegurar el abastecimiento y mantener activa la cadena de reparación."** (bloque con fondo oscuro y filete rojo sobre el Pacífico, para que las rutas no lo crucen). Se conserva la etiqueta R2 "Repuestos originales + repuestos desarrollados por Ingeniería y Desarrollo". | ✅ |
| 5a | Bodega (min. 2:12 de v1.2): distinguir dos flujos — picking de repuestos que ya están en bodega y recepción de la carga de los países — que se consolidan en una misma caja que se entrega a taller | Escena "Bodega" reescrita: (04) el camión cargado llega y dos técnicos PTT revisan la carga → las tres cajas EE.UU./EUROPA/ASIA bajan del camión a una **zona de consolidación** (pallet con marco punteado "OT-4471"); (05) un tercer técnico hace **picking** en el rack y dos cajas "STOCK" bajan a la misma zona; (06) las cinco cajas se funden en **una sola caja "PTT · Repuestos de bodega + compras · OT-4471"** que sale hacia la derecha. Etiquetas: "Recepción de la carga de EE.UU., Europa y Asia", "Personal PTT revisa la carga · ingreso al WMS", "Picking de repuestos que ya están en bodega", "Ambos flujos se consolidan en una misma caja", "Entrega a taller en la fecha planificada →". En Taller entra esa misma caja consolidada (antes entraban dos cajas EUROPA/ASIA) y el primer paso dice "Caja de bodega: repuestos + compras". | ✅ |
| 5b | Eliminar los indicadores numéricos del costado derecho (fill rate y similares) | Pertenecían a la escena Bodega/WMS de v1.2; en v2.0 ya no había indicadores numéricos. | ✅ (ya aplicado en v2.0) |
| 5c | Copy: reemplazar "Cada repuesto en su lugar…" por "Bodega completa los repuestos para la reparación y entrega en la fecha planificada." | Lower-third de Bodega: kicker "Bodega PTT" + título con el texto exacto (50 px, dos líneas). | ✅ |

### Duración y estructura resultante (02:05 · 125,2 s)

La regla de 120 ± 5 s se mantiene: R3 añade contenido en Recepción (+0,9 s) y Bodega (+0,5 s); se compensó recortando el tramo del camión en Abastecimiento (−0,7 s).

| # | Capítulo | Inicio | Dur. |
|---|---|---|---|
| 0 | Portada | 0:00 | 6 s |
| 1 | Quiénes somos | 0:06 | 10 s |
| 2 | Nuestros clientes | 0:15 | 9 s |
| 3 | Contrato en faena | 0:24 | 19 s |
| 4 | Red de interacción | 0:43 | 10 s |
| 5 | Recepción e ingeniería (evaluación → listado → valorización → cotización → detalle; laboratorio) | 0:52 | 13 s |
| 6 | Abastecimiento (pasos 01–03: análisis, compras, importación; mapa con Chile) | 1:05 | 12 s |
| 7 | Bodega (pasos 04–06: recepción y revisión, picking, consolidación y entrega a taller) | 1:16 | 11 s |
| 8 | Taller PTT (armado, QA, dos alternativas) | 1:26 | 15 s |
| 9 | Entrega y cierre | 1:41 | 24 s |

### Pendientes que requieren decisión del cliente

- Los pasos 04–06 de la barra se muestran en la escena Bodega (no solo en Abastecimiento) porque es donde ocurren; si se prefiere que los seis pasos se recorran íntegros dentro de la pantalla de abastecimiento, habría que alargar esa escena ~6 s o quitar otra cosa.
- "OT-4471" y las etiquetas "STOCK" de las cajas de picking son propuesta editorial.
- La franja roja sobre Chile en el mapa es un recurso gráfico añadido para reforzar la obs. 4; se puede quitar si se prefiere solo el punto.

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
