# Handoff — PTT Supply Chain Film

**Para:** Astra (Codex `gpt-6-astra`) · **De:** Claude (sesión de coordinación) · **Fecha:** 2026-09-09
**Estado:** v2.10 desplegada · **Issue abierto:** P-1 (equipos con huecos) — ver §6

Este documento te pone en contexto y te entrega un problema pendiente **con una teoría mía que
debes verificar o refutar, no asumir como cierta**. Si la evidencia te lleva a otra causa, esa
manda.

---

## 1. El proyecto

Video corporativo de ~2 minutos sobre la cadena de suministro de **Power Train Technologies
(PTT)**, empresa chilena que repara componentes mayores de maquinaria minera (mandos finales,
transmisiones, motores) para la gran minería. No es un video renderizado: es una **animación web**
que se reproduce en el navegador, con línea de tiempo GSAP, ilustración SVG procedural y controles
tipo reproductor.

| | |
|---|---|
| Carpeta | `/Users/gala/Proyectos/ptt-supply-chain` |
| Stack | Vite + TypeScript + GSAP 3 · sin backend · sin assets binarios en el render |
| Dev | `npx vite --port 5173` → http://localhost:5173 |
| Verificar | `npx tsc --noEmit && npm run build` (ambos deben pasar siempre) |
| Deploy | push a `main` → GitHub Actions → GitHub Pages |
| Público | https://blukstak.github.io/ptt-supply-chain/ |
| Duración | 124,65 s (02:04) — objetivo 120 ± 5 s |

### Mapa del repo

```
src/
  main.ts              ensambla las escenas en la línea de tiempo maestra; expone window.__player
  core/player.ts       reproductor (escala 1920×1080 al viewport, progreso, capítulos, atajos)
  core/scene.ts        helpers: quote, lowerThird, tag, pop, sceneEnter/Leave, logoPTT,
                       stepsBar, artLayer/artAt (capas GPU para objetos pesados)
  core/dom.ts          el() / svg() / splitWords
  art/index.ts         TODA la ilustración vectorial (~1000 líneas). Cada función devuelve
                       markup SVG y recibe un `id` con el que prefija sus sub-elementos.
  art/logo-paths.ts    trazados del logo PTT · Marubeni vectorizado del original
  fx/                  partículas (Dust) y red de datos (DataFlow) en canvas
  scenes/s00…s09       una escena por archivo; cada build(tl, at) devuelve su duración en segundos
tools/equipos.html     banco de pruebas de arte (§6.4) — no entra al build
docs/DECISIONES.md     bitácora: cada versión, qué se decidió y por qué. LÉELA.
docs/referencias/      todas las imágenes que ha mandado el cliente + índice en README.md
docs/revisiones/       comparaciones render-vs-foto de rondas anteriores
```

### Escenas (v2.10)

Portada 0:00 · Quiénes somos 0:06 · La gran minería (clientes) 0:15 · Contrato en faena 0:23 ·
Red de interacción 0:43 · Recepción e ingeniería 0:54 · Abastecimiento 1:06 · Bodega 1:17 ·
Taller PTT 1:27 · Entrega → I+D → tres lugares → marca 1:42

---

## 2. Cómo se trabaja

El cliente (Romina De Filippi, Subgerencia de Supply Chain) manda rondas de observaciones. Van
seis: R1–R5 en `.docx` y "Feedback n1" (R6) como Google Doc con 22 imágenes. Cada ronda se
aplica completa, se despliega, y se registra en `docs/DECISIONES.md` con tabla
observación → decisión → estado. Las imágenes de cada ronda quedan en `docs/referencias/`
(`r2-*`, `r3-*`, `r4-*`, `r6-*`) y el texto del feedback con la posición exacta de cada imagen
en `docs/referencias/r6-feedback-n1.md`.

Tú (Astra) has hecho la mayor parte del arte a partir de fotos: el CAT 797F, el mando final, la
transmisión, el motor, y en R6 el logo, el mapa de Chile, el bulldozer, el Komatsu, la
motoniveladora y el mando final por capas.

---

## 3. Reglas invariantes (no las rompas sin que el cliente lo pida)

- Duración 120 ± 5 s.
- La palabra "Escena" no aparece en subtítulos, kickers ni capítulos.
- PTT es el protagonista; la minería es el cliente. Textos en primera persona de PTT.
- Paleta: rojo PTT `#e0262b` + grises. El amarillo CAT `#ffcd11` solo en equipos, componentes y
  puente grúa. Logo PTT · Marubeni tipográfico/vectorizado.
- **Firmas exportadas e ids de sub-elementos son contrato con las escenas.** Antes de tocar
  cualquier función de `art/index.ts`, `grep` en `src/scenes` qué ids se referencian
  (`#t-w1`, `#km`, `#bz`, `#fds-fl1`, …). Romperlos rompe animaciones sin error de compilación.

### Trampas de GSAP ya conocidas en este código

- Rotar grupos SVG con `transformOrigin: '50% 50%'` (el default los gira por la esquina).
- **No** tweenear `x`/`y` de GSAP sobre un `<g>` que ya tiene `transform="translate(...)"` propio:
  GSAP reemplaza la traslación. Usa `attr: { transform: '...' }` o un wrapper.
- Los overlays `.tag .panel .quote .lower-third .steps .hud` nacen con `opacity:0` por CSS; los
  `.panel` anidados en HTML necesitan `opacity:1` inline.
- Para mover objetos pesados usa `artLayer/artAt` (capa SVG propia con `will-change: transform`),
  no `attr:{transform}` sobre grupos enormes dentro del SVG del fondo: eso re-rasteriza el fondo
  en cada frame y produce tirones (se corrigió en R5).

---

## 4. Cómo se te invoca (para que sepas qué esperar)

```bash
codex exec -i <img1> -i <img2> … \
  -m gpt-6-astra -c model_reasoning_effort=medium -c sandbox_mode=workspace-write \
  --skip-git-repo-check -- "$(cat prompt.txt)" < /dev/null
```

Detalles que costaron tiempo y conviene conservar:

- El `--` antes del prompt y el `< /dev/null` son obligatorios: con varios `-i` seguidos, el CLI
  toma el prompt como otro archivo y se queda esperando stdin (cuelga sin error).
- Las imágenes se adjuntan como copias JPEG ≤1024 px (`docs/referencias/r6-small/`); los PNG
  originales pesan hasta 3 MB y ralentizan el turno.
- Se ejecuta desacoplado (`nohup`) porque el Bash del orquestador corta a los 10 minutos y mata
  el proceso hijo.
- `--resume-last` reanuda **el último hilo del repo**, que puede ser uno trivial o de solo
  lectura (un `resume` hereda el sandbox del original). Por defecto se usa hilo nuevo.
- Siempre se te pide una *safety net*: si no puedes ver alguna imagen de referencia, no cambies
  nada y responde `NO_ACCESS`.

---

## 5. Historial de versiones relevante al issue

| Ver. | Qué pasó |
|---|---|
| v2.2–2.4 | Equipos redibujados desde fotos; `truck797` rehecho desde foto lateral pura |
| v2.5 | `finalDriveSide` rehecho desde el render CAT (quedó muy bien) |
| v2.9 (R6) | **Bulldozer, Komatsu y motoniveladora redibujados** desde `r6-04…r6-08` |
| v2.10 | Fix: `<defs>` de gradientes propios en esos tres equipos |

---

## 6. ISSUE ABIERTO P-1 — Los equipos se ven con "partes invisibles o inexistentes"

### 6.1 El reporte

El cliente ve el bulldozer y el camión Komatsu **con partes que faltan**, y dice que "en el
documento no estaban así" (las fotos de referencia muestran máquinas macizas y completas).
Después de v2.10 el reporte se mantiene: *"definitivamente no está bien ese Komatsu, lo veo igual
que antes"*. Confirmé que no es caché: el sitio sirve el bundle nuevo.

### 6.2 Lo que ya se descartó

- **No es un problema de `<defs>` faltantes.** Antes de v2.10, `bulldozer()`, `komatsuTruck()` y
  `motorGrader()` referenciaban `url(#${id}-paint)` / `-glass` sin definirlos (solo `truck797`
  los tenía), y un `url(#id)` inexistente pinta transparente. Eso **ya está corregido** y
  verifiqué en el navegador que los nueve gradientes (`mg-`, `bz-`, `dr-`, `km-`, `c97-`)
  existen en el DOM. Aun así el cliente sigue viendo el defecto → había **dos** problemas
  distintos y solo se resolvió uno.
- **No es caché ni deploy.** Bundle publicado = build local.
- **No es el CAT 797F.** Ese se ve macizo y correcto; el defecto es específico de los equipos
  redibujados en R6.

### 6.3 Mi teoría (verifícala o refútala)

Creo que hay dos causas superpuestas, ambas comprobables en el código:

**(a) Falta un cuerpo base cerrado.** `truck797` se construye sobre una silueta continua a la que
luego se le superponen detalles, por eso no tiene huecos. Los equipos de R6 parecen dibujados
como una colección de piezas sueltas: si una zona no queda cubierta por ninguna pieza, se ve el
fondo. En `komatsuTruck` el chasis es un único rectángulo bajo las ruedas
(`<path d="M86 -111 H462 V-59 H101Z" fill="#4c4630"/>`, y ≈ −111…−59) y la base de la tolva está
en y ≈ −146: entre ambos hay una banda de ~35 px cubierta solo por dos "postes"
(x 90–145 y x 215–242). Entre x ≈ 242 y x ≈ 427 —justo el vano entre las ruedas— **no hay
nada**. En la foto `r6-06` esa zona está llena: bastidor lateral, cilindro de levante,
guardabarros.

**(b) Contraste casi nulo contra el fondo de faena.** Las piezas estructurales usan `#4c4630` y
`#b38e28` sobre un suelo marrón oscuro (~`#3a2f26`). Aunque esas piezas *sí* se pintan, el ojo
las lee como agujeros. Sobre fondo claro el mismo dibujo se ve razonable — que es exactamente lo
que pasó con tu verificación previa.

**Corolario sobre el método, no sobre ti:** tus capturas de verificación se hicieron sobre fondo
claro y comparando "¿se parece a la foto?" de forma global. Este defecto solo salta mirando la
silueta contra el fondo real y buscando huecos. Por eso agregué la herramienta de §6.4.

### 6.4 Cómo reproducirlo

```bash
npx vite --port 5173   # y abrir:
http://localhost:5173/tools/equipos.html
```

`tools/equipos.html` renderiza cada función de arte aislada, a tamaño grande, **sobre fondo claro
y sobre el fondo oscuro de faena lado a lado**. Los huecos aparecen de inmediato en la columna
oscura. Compara cada fila con su foto en `docs/referencias/` (la fila indica cuál).

En la escena real: `http://localhost:5173` → play → `window.__player.seek(20.5)`.

### 6.5 Criterio de aceptación

1. Ninguna de las máquinas muestra fondo a través del cuerpo en la columna oscura de
   `tools/equipos.html`: silueta maciza y continua de un extremo al otro.
2. Cada pieza está unida a la máquina: escalera pegada al frontal, hoja del bulldozer unida a sus
   brazos y estos al bastidor, hoja de la motoniveladora colgando del bastidor, tolva del Komatsu
   apoyada sobre un bastidor visible.
3. Las piezas estructurales se distinguen del fondo de faena (sube luminosidad o añade un borde
   sutil; no uses tonos que se fundan con `#3a2f26`).
4. La silueta general corresponde a la foto de referencia: Komatsu con cabina adelante-izquierda
   bajo la visera de la tolva, dos ejes, cola de la tolva sobresaliendo tras la rueda trasera.
5. `npx tsc --noEmit` y `npm run build` pasan; firmas e ids intactos (`#km`, `#bz`, `#mg` y sus
   sub-elementos usados en `src/scenes/s02-clientes.ts`).
6. Verificación **en navegador** (`tools/equipos.html` + la escena), no solo render AppKit.

### 6.6 Alcance

Tocar solo `bulldozer()`, `komatsuTruck()` y `motorGrader()` en `src/art/index.ts` (y `drillRig()`
si presenta lo mismo). **No** tocar `truck797`, `finalDriveSide`, `finalDriveLayers`,
`transmission`, `engine` ni las escenas. Sin commit: dejar los cambios en el working tree y
reportar. Añadir nota en `docs/DECISIONES.md`.

---

## 7. Pendientes con el cliente (no son bugs)

- Nombres de mecánicos por estación (hoy inventados: Cristián Araya, Rodrigo Muñoz, Felipe
  Contreras) y el componente que repara cada uno.
- Bajadas de "2 opciones para nuestros clientes: Reparación y Venta Intercambio".
- Copy del cierre "Tres lugares, una sola cadena" y el orden del recorrido del componente.
- Fluidez: se optimizó en R5 (capas GPU, sin `backdrop-filter` ni `filter: brightness` animado)
  pero nunca se ha medido FPS real; el mando final por capas añadió geometría.
- Los fondos son ilustración vectorial. Si algún día hay fotos licenciadas, `public/media/` ya
  está cableado para reemplazarlos sin tocar código (ver `photoBg` en `core/scene.ts`).
