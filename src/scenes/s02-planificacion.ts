import { el } from '../core/dom'
import { DataFlow } from '../fx/dataflow'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, pop } from '../core/scene'

/**
 * ESCENA 2 — Planificación de la demanda.
 * Red de áreas de Supply Chain intercambiando información; forecast de horas y calendario.
 */
export function planificacionScene(): Scene {
  const root = sceneRoot('plan')
  const nodes = [
    { x: 300, y: 540, label: 'Operación minera' },
    { x: 700, y: 300, label: 'Planificación' },
    { x: 700, y: 780, label: 'Abastecimiento' },
    { x: 1100, y: 300, label: 'Comercio exterior' },
    { x: 1100, y: 780, label: 'Bodega · WMS' },
    { x: 1500, y: 540, label: 'Taller PTT' },
  ]
  const edges = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 2 }, { from: 2, to: 4 },
    { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 1, to: 5 }, { from: 5, to: 0 },
  ]
  const flow = new DataFlow(nodes, edges)
  const bg = fullSvg(`
    <defs><radialGradient id="pl-g" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#121924"/><stop offset="1" stop-color="#05070a"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#pl-g)"/>
    <g opacity=".12" stroke="#3d4a5a">${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 80} 0 V1080"/>`).join('')}${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 80} H1920"/>`).join('')}</g>
  `)
  const nodeEls = nodes.map((n) => {
    const d = el('div', { class: 'abs node', html: `<div class="dot"></div><div class="lbl">${n.label}</div>` })
    Object.assign(d.style, { left: `${n.x}px`, top: `${n.y}px`, transform: 'translate(-50%,-50%)', textAlign: 'center' })
    ;(d.querySelector('.dot') as HTMLElement).style.cssText = 'width:26px;height:26px;border-radius:50%;background:var(--amber);box-shadow:0 0 30px var(--amber);margin:0 auto 12px'
    ;(d.querySelector('.lbl') as HTMLElement).style.cssText = 'font-family:var(--font-display);font-weight:600;font-size:30px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);white-space:nowrap'
    return d
  })
  const lt = lowerThird('Escena 02 · Planificación de la demanda', 'Información antes que materiales')
  const panel = el('div', { class: 'panel', html: `
    <div class="ph">Forecast de componentes · 12 meses</div>
    <div class="pv" id="pf-val">0</div>
    <div class="pl">Mandos finales CAT 797 proyectados por horómetro de flota</div>
    <svg width="560" height="150" viewBox="0 0 560 150" style="margin-top:18px">
      <g id="pf-bars">${Array.from({ length: 12 }, (_, i) => { const h = 40 + ((i * 37) % 90); return `<rect x="${i * 46 + 6}" y="${150 - h}" width="30" height="${h}" rx="3" fill="${i === 8 ? '#f5a623' : '#3d4a5a'}"/>` }).join('')}</g>
      <text x="6" y="12" font-family="JetBrains Mono" font-size="11" fill="#5f6d7d">ENE</text><text x="500" y="12" font-family="JetBrains Mono" font-size="11" fill="#5f6d7d">DIC</text>
    </svg>
  ` })
  Object.assign(panel.style, { left: '1160px', top: '180px', width: '640px' })
  const q1 = quote('Supply Chain no reacciona. Anticipa.', 120, 440, 1300)
  const bullets = el('div', { class: 'abs', html: `
    <div class="tag info" style="position:relative;margin-bottom:14px">Horómetros de flota en línea</div>
    <div class="tag info" style="position:relative;margin-bottom:14px">Plan de mantenimiento mayor (PMM)</div>
    <div class="tag info" style="position:relative;margin-bottom:14px">Punto de reorden por componente</div>
    <div class="tag ok" style="position:relative">Reserva de stock con 90 días de anticipación</div>
  ` })
  Object.assign(bullets.style, { left: '120px', top: '200px' })
  root.append(bg, flow.canvas, ...nodeEls, lt, panel, bullets, q1)

  return {
    id: 'plan', title: 'Escena 2 · Planificación', root,
    onEnter: () => flow.start(), onLeave: () => flow.stop(),
    build(tl, at) {
      sceneEnter(tl, root, at, 1.2)
      flow.intensity = 0
      tl.to(flow, { intensity: 1, duration: 2, ease: 'power2.out' }, at + 0.4)
      tl.fromTo(nodeEls, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(2)' }, at + 0.5)
      showLowerThird(tl, lt, at + 1, 4.5)
      // Nodos: contraer hacia la izquierda para dar espacio al panel
      const shiftAt = at + 6.5
      tl.to(nodeEls, { x: (i) => -nodes[i].x * 0.42 + 40, y: (i) => (nodes[i].y - 540) * 0.1, scale: 0.85, duration: 1.2, ease: 'power3.inOut' }, shiftAt)
      tl.to(flow.canvas, { scaleX: 0.58, scaleY: 1.2, x: -400, y: 0, transformOrigin: '0 50%', duration: 1.2, ease: 'power3.inOut' }, shiftAt)
      tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, shiftAt + 0.6)
      const v = { n: 0 }
      const valEl = panel.querySelector('#pf-val')!
      tl.to(v, { n: 14, duration: 1.8, ease: 'power2.out', onUpdate: () => { valEl.textContent = String(Math.round(v.n)) } }, shiftAt + 1)
      tl.fromTo(panel.querySelectorAll('#pf-bars rect'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }, shiftAt + 1.1)
      tl.set(bullets, { opacity: 1 }, shiftAt + 1.4)
      tl.to(nodeEls, { opacity: 0.25, duration: 0.6 }, shiftAt + 1.4)
      tl.to(flow, { intensity: 0.35, duration: 0.6 }, shiftAt + 1.4)
      pop(tl, Array.from(bullets.children), shiftAt + 1.6)
      // Cita
      const qAt = shiftAt + 8.4
      tl.to([panel, bullets], { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, qAt - 0.5)
      tl.to(nodeEls, { opacity: 0, duration: 0.4 }, qAt - 0.5)
      tl.to(flow, { intensity: 1, duration: 1 }, qAt - 0.5)
      tl.to(flow.canvas, { scaleX: 1, scaleY: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.inOut' }, qAt - 0.5)
      const end = revealQuote(tl, q1, qAt, 3.6)
      sceneLeave(tl, root, end + 0.1, 1)
      return end + 1.2 - at
    },
  }
}
