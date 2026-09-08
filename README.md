# PTT · Supply Chain Film

Video corporativo **renderizado en el navegador** (~3:45) sobre la cadena de suministro de
Power Train Technologies, siguiendo el ciclo de vida de un Mando Final CAT 797.

Stack: Vite + TypeScript + GSAP. Ilustración vectorial procedural (SVG) + efectos en canvas.
Sin backend, sin assets binarios: el build es 100% estático.

## Uso

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/ (estático, listo para Netlify / Vercel / GitHub Pages / S3)
npm run preview   # sirve dist/ localmente
```

Controles: `Espacio` pausa · `← →` ±5 s · `F` pantalla completa · `R` reinicio · `1-9` capítulos.

## Estructura

```
src/
  main.ts            ensambla las escenas en una línea de tiempo maestra
  core/player.ts     reproductor (escala 1920x1080, progreso, capítulos, atajos)
  core/scene.ts      helpers de escena (citas, lower-thirds, tags, transiciones)
  art/index.ts       biblioteca SVG: rajo, CAT 797, mando final, taller, bodega, WMS, mapa...
  fx/                partículas de polvo y red de flujo de datos (canvas)
  scenes/s00..s08    una escena por archivo
public/media/        (opcional) fotografías reales para reemplazar fondos
```

## Escenas

| # | Escena | Texto en pantalla |
|---|--------|-------------------|
| 1 | Faena · Mando final próximo a vida útil · Planificación | "Todo comienza antes de que ocurra una falla." / "Planificación. Anticipación. Continuidad operacional." |
| 2 | Planificación de la demanda | "Supply Chain no reacciona. Anticipa." |
| 3 | Retiro y logística inversa | "Cada componente tiene una historia. Nosotros la registramos." |
| 4 | Recepción, inspección y evaluación técnica | "Inspeccionar, evaluar, decidir. Con datos." |
| 5 | Abastecimiento e importación | "Del mundo a la faena, sin detener la operación." |
| 6 | Bodega y WMS | "Cada repuesto en su lugar. Cada movimiento, registrado." |
| 7 | Reparación y QA | "Reparado a estándar de fábrica. Listo para volver a la faena." |
| 8 | Distribución, instalación y cierre | "El ciclo se cierra. La operación continúa." |

Para exportar a MP4: reproducir en pantalla completa y grabar con OBS/QuickTime, o usar
`npx playwright` + `ffmpeg` capturando frames (la línea de tiempo es determinista: `player.seek(t)`).
