import gsap from 'gsap'
import './styles/main.css'
import { el } from './core/dom'
import { Player } from './core/player'
import type { Scene } from './core/scene'
import { wipe } from './core/scene'
import { introScene } from './scenes/s00-intro'
import { empresaScene } from './scenes/s01-empresa'
import { clientesScene } from './scenes/s02-clientes'
import { faenaScene } from './scenes/s03-faena'
import { redScene } from './scenes/s04-red'
import { recepcionScene } from './scenes/s05-recepcion'
import { importacionScene } from './scenes/s06-importacion'
import { bodegaScene } from './scenes/s07-bodega'
import { tallerScene } from './scenes/s08-taller'
import { cierreScene } from './scenes/s09-cierre'

gsap.defaults({ overwrite: 'auto' })

const app = document.getElementById('app')!
const player = new Player(app)

const scenes: Scene[] = [
  introScene(), empresaScene(), clientesScene(), faenaScene(), redScene(),
  recepcionScene(), importacionScene(), bodegaScene(), tallerScene(), cierreScene(),
]
scenes.forEach((s) => player.stage.append(s.root))

// Ensambla la línea de tiempo maestra: cada escena empieza donde termina la anterior (con solape para el wipe).
const OVERLAP = 0.6
let cursor = 0
const chapters = scenes.map((s, i) => {
  const at = cursor
  player.master.addLabel(s.id, at)
  if (i > 0) wipe(player.master, player.stage, at - 0.5)
  const dur = s.build(player.master, at)
  // Activar/desactivar efectos canvas por escena para no gastar CPU fuera de ella.
  player.master.call(() => s.onEnter?.(), [], at)
  player.master.call(() => s.onLeave?.(), [], at + dur - 0.05)
  cursor = at + dur - OVERLAP
  return { id: s.id, title: s.title, time: i > 0 ? at + 0.5 : 0 }
})
player.setChapters(chapters)

// Al buscar (seek) hay que sincronizar los efectos canvas con la escena activa.
let lastActive = -1
gsap.ticker.add(() => {
  const t = player.master.time()
  let active = 0
  chapters.forEach((c, i) => { if (t >= c.time) active = i })
  if (active !== lastActive) {
    scenes.forEach((s, i) => (i === active ? s.onEnter?.() : s.onLeave?.()))
    lastActive = active
  }
})

// Splash / botón de inicio (los navegadores exigen gesto para fullscreen y evita el arranque en frío).
const splash = el('div', { class: 'splash' })
splash.append(el('div', { class: 'card', html: `
  <div class="ptt-logo" style="font-size:64px"><span class="l1">Power</span><span class="l2">Train</span><span class="l3">Technologies</span><span class="l4">Marubeni Group</span></div>
  <div class="logo" style="font-size:34px;color:var(--ink-2)">Cadena de suministro</div>
  <p>Quiénes somos y cómo nuestra cadena de suministro —talleres, contrato en faena, red de abastecimiento e Ingeniería y Desarrollo— responde a la gran minería.</p>
  <button class="play">▶ Reproducir</button>
  <p style="font-size:13px;color:var(--ink-3)">Espacio: pausa · ← →: ±5 s · F: pantalla completa · 1–9: capítulos</p>
` }))
splash.querySelector('.play')!.addEventListener('click', () => {
  splash.classList.add('hidden')
  document.fonts?.ready.then(() => player.play())
})
app.append(splash)

// Acceso para depuración / automatización (p. ej. render a video con Playwright): window.__player.seek(t)
;(window as unknown as { __player: Player }).__player = player
