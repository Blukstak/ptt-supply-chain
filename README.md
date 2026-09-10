# PTT · Supply Chain Film

Video corporativo **renderizado en el navegador** (~2:04) sobre Power Train Technologies y su cadena de
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

## Escenas (v2.9 · 02:04)

| # | Capítulo | Contenido |
|---|----------|-----------|
| 0 | Portada | Logo PTT · Marubeni Group, planetario girando |
| 1 | Quiénes somos | Reparamos componentes de maquinaria minera · talleres Santiago y Antofagasta (mapa de Chile) · contrato de mantención en faena · Ingeniería y Desarrollo |
| 2 | La gran minería | "Nuestros clientes" (54 px) + título grande; equipos que reparamos: motoniveladora, bulldozer, perforadora, camiones de extracción, CAT 797F |
| 3 | Contrato en faena | El 797 entra al Taller Minera (contrato mantención PTT) · ruedas giran y salen dos mandos finales · horómetros individuales 17.650 y 17.280 h / máximo 18.000 h · el componente sale en cama baja. *"Todo comienza antes de que ocurra una falla (generalmente)."* |
| 4 | Red de interacción | La minera interactúa internamente y sale una sola línea a PTT; dentro de PTT: taller, calidad, bodega, proveedores, prov. logísticos · respuesta rápida · flexibilidad · 24/7 (etiquetas de a una) · componentes derivados a PTT vs. otros proveedores |
| 5 | Recepción e ingeniería | Recepción, escaneo, desarme por capas en vista 3/4 (wheel → segunda reducción → primera reducción → carcasa/eje) · evaluación en taller: se evalúa el componente, se genera el listado de repuestos, se valoriza, se cotiza y se entrega al cliente el detalle · el laboratorio de Ingeniería retira una pieza, la estudia y la devuelve |
| 6 | Abastecimiento | Barra de 6 pasos (análisis de repuestos → compras → importación → recepción y revisión → picking → entrega a taller); aquí se recorren 01–03: listado y OC en el ERP · aéreo desde EE.UU. y Europa · marítimo desde Asia · punto de recepción sobre Chile · el camión propio llega vacío, la carga de EE.UU./Europa/Asia sube a la cama baja y parte a bodega. *"Red internacional de proveedores, operación ágil y stock de los repuestos de mayor rotación."* |
| 7 | Bodega | Pasos 04–06: el camión cargado llega y el personal revisa la carga (recepción) · picking de los repuestos que ya estaban en bodega · ambos flujos se consolidan en una sola caja que se entrega a taller. *"Bodega completa los repuestos para la reparación y entrega en la fecha planificada."* |
| 8 | Taller PTT | Llega la caja consolidada; salen los repuestos (verde: ya estaban en bodega · teal: comprados fuera) · armado por capas (carcasa/eje → reducciones → tapa → wheel), torque y barra de avance, pruebas y certificación PTT · *"2 opciones para nuestros clientes: Reparación y Venta Intercambio"* |
| 9 | Entrega y cierre | El componente PTT queda fijado al aro de la rueda y sale con el camión · mejoras de Ingeniería y Desarrollo · "Tres lugares, una sola cadena": taller en la mina · taller de componentes · laboratorio de I+D conectados, con el componente viajando entre ellos · cierre de marca |

Observaciones del cliente y decisiones: `docs/DECISIONES.md`. Referencias visuales: `docs/referencias/`.

Para exportar a MP4: reproducir en pantalla completa y grabar con OBS/QuickTime, o usar
`npx playwright` + `ffmpeg` capturando frames (la línea de tiempo es determinista: `player.seek(t)`).
