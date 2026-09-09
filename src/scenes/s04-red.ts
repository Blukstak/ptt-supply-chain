import { el } from '../core/dom'
import { DataFlow } from '../fx/dataflow'
import { finalDriveSide } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * RED DE INTERACCIÓN (R2 · obs. 6 y 7).
 * La minera interactúa internamente entre sus áreas; desde la minera sale UNA sola línea hacia PTT;
 * dentro de PTT interactúan taller, calidad, proveedores, bodega y proveedores logísticos.
 * Mensajes: comunicación rápida con las mineras · disponibilidad 24/7.
 * Segundo tiempo (reemplaza al forecast): hay componentes que se derivan a PTT y otros a distintos proveedores.
 */
export function redScene(): Scene {
  const root = sceneRoot('red')
  const mine = [
    { x: 300, y: 380, label: 'Operaciones' },
    { x: 520, y: 300, label: 'Mantención' },
    { x: 430, y: 600, label: 'Planificación' },
  ]
  const ptt = [
    { x: 1420, y: 490, label: 'PTT', hub: true },
    { x: 1200, y: 300, label: 'Taller' },
    { x: 1620, y: 280, label: 'Calidad' },
    { x: 1720, y: 560, label: 'Bodega' },
    { x: 1520, y: 760, label: 'Proveedores' },
    { x: 1180, y: 700, label: 'Prov. logísticos' },
  ]
  const nodes = [...mine, ...ptt]
  const edges = [
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 0 }, // minera interna
    { from: 1, to: 3 }, // UNA sola línea minera → PTT
    { from: 3, to: 4 }, { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 3, to: 7 }, { from: 3, to: 8 }, // PTT interna
    { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 }, { from: 8, to: 4 },
  ]
  const flow = new DataFlow(nodes, edges, '224, 38, 43')
  const bg = fullSvg(`
    <defs><radialGradient id="rd-g" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#121924"/><stop offset="1" stop-color="#05070a"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#rd-g)"/>
    <g opacity=".12" stroke="#3d4a5a">${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 80} 0 V1080"/>`).join('')}${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 80} H1920"/>`).join('')}</g>
    <g id="rd-boxes" opacity="0">
      <rect x="170" y="200" width="480" height="520" rx="16" fill="none" stroke="#8a8f98" stroke-width="2" stroke-dasharray="10 8"/>
      <text x="410" y="176" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#8a8f98" letter-spacing="6">MINERA · CLIENTE</text>
      <rect x="1060" y="180" width="800" height="700" rx="16" fill="none" stroke="#e0262b" stroke-width="3"/>
      <text x="1460" y="156" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#e0262b" letter-spacing="6">POWER TRAIN TECHNOLOGIES</text>
    </g>
    <path id="rd-link" d="M560 320 L1380 480" stroke="#e0262b" stroke-width="6" stroke-linecap="round" fill="none" opacity="0"/>
    <g id="rd-otros" opacity="0"><rect x="1060" y="930" width="800" height="70" rx="10" fill="none" stroke="#8a8f98" stroke-width="2"/><text x="1460" y="974" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#8a8f98" letter-spacing="4">OTROS PROVEEDORES</text></g>
    <g id="rd-comps">
      ${[0, 1, 2, 3].map((i) => `<g class="rd-comp" opacity="0" transform="translate(520 300) scale(.16)">${finalDriveSide(`rdc${i}`, 'PTT')}</g>`).join('')}
    </g>
  `)
  const nodeEls = nodes.map((n) => {
    const hub = 'hub' in n && n.hub
    const d = el('div', { class: 'abs node', html: `<div class="dot"></div><div class="lbl">${n.label}</div>` })
    Object.assign(d.style, { left: `${n.x}px`, top: `${n.y}px`, transform: 'translate(-50%,-50%)', textAlign: 'center', opacity: '0' })
    ;(d.querySelector('.dot') as HTMLElement).style.cssText = `width:${hub ? 54 : 24}px;height:${hub ? 54 : 24}px;border-radius:50%;background:${hub ? '#fff' : 'var(--amber)'};box-shadow:0 0 30px var(--amber);margin:0 auto 10px`
    ;(d.querySelector('.lbl') as HTMLElement).style.cssText = `font-family:var(--font-display);font-weight:${hub ? 700 : 600};font-size:${hub ? 40 : 28}px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);white-space:nowrap`
    return d
  })
  const lt = lowerThird('Cómo trabajamos con la minería', 'Un solo canal, respuesta 24/7')
  const tagFast = tag('Comunicación rápida con las mineras', 700, 200, 'ok')
  const tag247 = tag('Disponibilidad 24/7', 780, 590, 'ok')
  const tagPTT = tag('Componentes derivados a PTT · mandos finales, transmisiones, diferenciales', 1060, 100, 'ok')
  const tagOtros = tag('Otros componentes se derivan a distintos proveedores', 120, 950, '')
  root.append(bg, flow.canvas, ...nodeEls, lt, tagFast, tag247, tagPTT, tagOtros)

  return {
    id: 'red', title: 'Red de interacción', root,
    onEnter: () => flow.start(), onLeave: () => flow.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      flow.intensity = 0
      tl.to(q('#rd-boxes'), { opacity: 1, duration: 0.8 }, at + 0.3)
      tl.fromTo(nodeEls.slice(0, 3), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' }, at + 0.5)
      tl.fromTo(nodeEls.slice(3), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, at + 1.1)
      tl.to(flow, { intensity: 1, duration: 1.5, ease: 'power2.out' }, at + 1)
      showLowerThird(tl, lt, at + 0.8, 4)
      // Una sola línea minera → PTT
      tl.to(q('#rd-link'), { opacity: 1, duration: 0.2 }, at + 2.2)
      tl.fromTo(q('#rd-link'), { strokeDasharray: 900, strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power3.inOut' }, at + 2.2)
      pop(tl, tagFast, at + 3.1)
      pop(tl, tag247, at + 3.6)
      // Derivación de componentes: algunos a PTT, otros a distintos proveedores
      const dAt = at + 6
      tl.to([tagFast, tag247], { opacity: 0, duration: 0.4 }, dAt - 0.3)
      tl.to(q('#rd-otros'), { opacity: 1, duration: 0.5 }, dAt)
      tl.to(flow, { intensity: 0.35, duration: 0.5 }, dAt)
      const comps = Array.from(root.querySelectorAll('.rd-comp')) as SVGGElement[]
      const dest = ['1420 490', '1420 490', '1460 965', '1420 490']
      comps.forEach((c, i) => {
        const t0 = dAt + 0.3 + i * 0.45
        tl.set(c, { opacity: 1, attr: { transform: 'translate(520 300) scale(.16)' } }, t0)
        tl.to(c, { attr: { transform: `translate(${dest[i]}) scale(.16)` }, duration: 1.4, ease: 'power2.inOut' }, t0)
        tl.to(c, { opacity: 0, duration: 0.3 }, t0 + 1.3)
      })
      pop(tl, tagPTT, dAt + 1.5)
      pop(tl, tagOtros, dAt + 2.3)
      tl.fromTo(nodeEls[3].querySelector('.dot')!, { scale: 1 }, { scale: 1.5, duration: 0.3, repeat: 5, yoyo: true }, dAt + 1.4)
      tl.to([...nodeEls, q('#rd-boxes'), q('#rd-link'), q('#rd-otros'), tagPTT, tagOtros, flow.canvas], { opacity: 0, duration: 0.5 }, at + 9)
      sceneLeave(tl, root, at + 9.3, 0.9)
      return 10.2
    },
  }
}
