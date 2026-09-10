# R6 · Verificación de arte y escenas

Se leyeron README, la bitácora completa, el índice de referencias y el feedback literal. Las 22 imágenes adjuntas eran visibles antes de editar.

## Arte

Comparaciones lado a lado renderizadas con Swift/AppKit. `v1` conserva la primera propuesta; `v2` muestra la versión final. En la segunda pasada se corrigieron detalles del 854K, perfil de la hoja CAT 24, uniones del 830E, soportes del mando, color TRAIN y encuadre. Las capas tuvieron una revisión adicional de la geometría: spindle estrecho, tambores independientes, eje detrás de la brida, tapa y wheel.

| Función | Primera pasada | Final |
|---|---|---|
| `logoPTT` / `pttLogoSvg` | [v1](r6-logo-v1.png) | [v2](r6-logo-v2.png) |
| `chileMap` | [v1](r6-map-v1.png) | [v2](r6-map-v2.png) |
| `bulldozer` | [v1](r6-bulldozer-v1.png) | [v2](r6-bulldozer-v2.png) |
| `komatsuTruck` | [v1](r6-komatsu-v1.png) | [v2](r6-komatsu-v2.png) |
| `motorGrader` | [v1](r6-grader-v1.png) | [v2](r6-grader-v2.png) |
| `finalDriveSide` | [v1](r6-mando-v1.png) | [v2](r6-mando-v2.png) |
| `finalDriveLayers` | [v1](r6-layers-v1.png) | [v2](r6-layers-v2.png) |
| `pttWorkshop` | [v1](r6-workshop-v1.png) | [v2](r6-workshop-v2.png) |
| `fieldWorkshop` + escala del trabajador | [v1](r6-field-v1.png) | [v2](r6-field-v2.png) |

Detalle de capas: [base](r6-layer-1.png), [reducción 1](r6-layer-2.png), [reducción 2](r6-layer-3.png), [tapa](r6-layer-4.png), [wheel](r6-layer-5.png). Las imágenes r6-14…19 definen la vista; r6-20 corresponde al conjunto instalado dentro de los neumáticos, que se retoma en Entrega.

## Capturas reales del reproductor

El servidor Vite no pudo escuchar en 5173 (`EPERM`). Chrome headless y WKWebView fallaron en este entorno. Se consiguió ejecutar el bundle del código con **Swift + WebKit WebView clásico**, sin servidor, y capturar su DOM a 1920×1080 mediante AppKit. Se usó `window.__player.master.seek(t, false).pause()`; los canvas de partículas se ocultaron para las capturas. La tipografía usa los respaldos del sistema si las fuentes web no están cargadas; el logo es vectorial y no depende de ellas.

PNG en `r6-scene-<segundo>.png`: portada 2; empresa 11; equipos 21; galpón 26; ruedas/extracción/horas 31, 33, 35, 37; recepción 58, 59, 60, 61; armado 89, 91, 93; Reparación 98; entrega y proporción 104, 106. La revisión detectó y corrigió una etiqueta de caja cortada, el SCAN sobre el lower-third, la puerta fuera de su vano y la trayectoria de las piezas retiradas.

**Resultado del JS real:**

```json
{"d":124.65,"labels":{"intro":0,"empresa":5.8,"clientes":15.4,"faena":23.4,"red":43,"recepcion":53.8,"import":66,"bodega":77.5,"taller":87.3,"cierre":102.3}}
```

`d` se obtuvo de `window.__player.master.duration()`. Comprobación independiente por llamadas a `build()` con DOM de prueba: duraciones 6.4, 10.2, 8.6, 20.2, 11.4, 12.8, 12.1, 10.4, 15.6 y 22.4. Suma 130.1 menos solapes 5.4 = 124.7; último callback a 124.65.

## Código

- `npx tsc --noEmit`: pasa.
- `npm run build`: pasa.
- Comparación del markup antes/después: `truck797`, `transmission`, `engine`, `finalDrive`, `pttWorker` y `lowboyTruck` iguales.
- Exportaciones previas conservadas; nueva `finalDriveLayers(id = 'fdl')`.
- IDs comprobados: `wheel0/1` del bulldozer; `wheel0/1/2` de motoniveladora; `wheel0/1/wheel-inner` del Komatsu; `fl1/fl2/g` del mando; `hoist/cable/signs/furniture` del taller; `door/clip` del galpón. Nuevos `base/reduction1/reduction2/cover/wheel`, con aliases `housing/ringgear/carrier/sun/hubface` para compatibilidad de las escenas.
- Retirados deliberadamente de Faena los IDs del corte/lupa/conos y sus tweens, conforme al punto 9. `truck797` conserva todos sus sub-elementos.
- Sin “Escena” en títulos de capítulos ni subtítulos nuevos; textos de PTT en primera persona.

No se hizo commit. No se midió FPS sostenido ni se produjo MP4; la comprobación visual es de fotogramas deterministas. Mapa y mecánica son ilustraciones simplificadas, no cartografía ni documentación de servicio. La posición de la faena es esquemática y el segundo horómetro es un ejemplo editorial, no un dato real del cliente.
