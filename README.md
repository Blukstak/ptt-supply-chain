# PTT · Supply Chain Film

Video corporativo **renderizado en el navegador** (~2:05) sobre Power Train Technologies y su cadena de
suministro: quiénes somos, nuestros clientes y el ciclo completo de un mando final, desde el contrato en faena
hasta las mejoras de Ingeniería y Desarrollo.

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
  scenes/s00..s09    una escena por archivo
public/media/        (opcional) fotografías reales para reemplazar fondos
```

## Escenas (v2.1 · 02:05)

| # | Capítulo | Contenido |
|---|----------|-----------|
| 0 | Portada | Logo PTT · Marubeni Group, planetario girando |
| 1 | Quiénes somos | Reparamos componentes de maquinaria minera · talleres Santiago y Antofagasta (mapa de Chile) · contrato de mantención en faena · Ingeniería y Desarrollo |
| 2 | Nuestros clientes | La gran minería del país; equipos que reparamos: motoniveladora, bulldozer, perforadora, Komatsu, CAT 797F |
| 3 | Contrato en faena | El 797 entra al taller PTT dentro de la mina · despiece de componentes · close-up al mando final (exterior → engranajes) · horas 17.650/18.000 · el componente sale en cama baja. *"Todo comienza antes de que ocurra una falla (generalmente)."* |
| 4 | Red de interacción | La minera interactúa internamente y sale una sola línea a PTT; dentro de PTT: taller, calidad, bodega, proveedores, prov. logísticos · comunicación rápida · 24/7 · componentes derivados a PTT vs. otros proveedores |
| 5 | Recepción e ingeniería | Recepción, escaneo, desarme · evaluación en taller: se evalúa el componente, se genera el listado de repuestos, se valoriza, se cotiza y se entrega al cliente el detalle · el laboratorio de Ingeniería retira una pieza, la estudia y la devuelve |
| 6 | Abastecimiento | Barra de 6 pasos (análisis de repuestos → compras → importación → recepción y revisión → picking → entrega a taller); aquí se recorren 01–03: listado y OC en el ERP · aéreo desde EE.UU. y Europa · marítimo desde Asia · punto de recepción sobre Chile · camión propio cargado. *"Red internacional de proveedores, operación ágil y stock de los repuestos de mayor rotación."* |
| 7 | Bodega | Pasos 04–06: el camión cargado llega y el personal revisa la carga (recepción) · picking de los repuestos que ya estaban en bodega · ambos flujos se consolidan en una sola caja que se entrega a taller. *"Bodega completa los repuestos para la reparación y entrega en la fecha planificada."* |
| 8 | Taller PTT | Llega la caja consolidada de bodega · armado, pruebas y certificación con marca PTT · dos alternativas: componente reparado o componente de stock. *"Dos alternativas para el cliente. Una respuesta rápida."* |
| 9 | Entrega y cierre | El componente PTT queda instalado en el camión · mejoras de Ingeniería y Desarrollo (la pieza mejorada vuelve y sale otro mando final) · fortalezas y limitaciones · cierre de marca |

Observaciones del cliente y decisiones: `docs/DECISIONES.md`. Referencias visuales: `docs/referencias/`.

Para exportar a MP4: reproducir en pantalla completa y grabar con OBS/QuickTime, o usar
`npx playwright` + `ffmpeg` capturando frames (la línea de tiempo es determinista: `player.seek(t)`).
