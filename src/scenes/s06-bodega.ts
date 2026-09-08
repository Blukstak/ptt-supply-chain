import { el } from '../core/dom'
import { industrialFloor, hangingLights, warehouseRack, forklift, wmsScreen, technician } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 6 — Bodega, inventario y WMS.
 * Racks, grúa horquilla, escaneo de códigos de barra y actualización en tiempo real.
 */
export function bodegaScene(): Scene {
  const root = sceneRoot('bodega')
  const bg = fullSvg(`${industrialFloor('bf', '#0c1219')}${hangingLights('bl', [200, 640, 1080, 1520], 40)}
    <g id="bd-racks">
      <g transform="translate(80 240)">${warehouseRack('r1', 5, 3, 150, 120)}</g>
      <g transform="translate(940 240)">${warehouseRack('r2', 5, 3, 150, 120)}</g>
    </g>
    <text x="960" y="200" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="34" fill="#ffcd11" letter-spacing="6">CENTRO DE DISTRIBUCIÓN · PTT</text>
    <g id="bd-fork" transform="translate(-400 720) scale(1.1)">${forklift('fk')}</g>
    <g id="bd-tech" transform="translate(1500 760) scale(.9)" opacity="0">${technician('bt', '#2fd4c8', true)}</g>
    <g id="bd-beam" opacity="0"><line x1="1520" y1="790" x2="1240" y2="440" stroke="#f0503c" stroke-width="3"/><circle cx="1240" cy="440" r="18" fill="none" stroke="#f0503c" stroke-width="3"/></g>
    <g id="bd-wms" transform="translate(600 300) scale(.95)" opacity="0">${wmsScreen('bw', 760, 470)}</g>
  `)
  const lt = lowerThird('Escena 06 · Bodega y WMS', 'Inventario en tiempo real')
  const kpis = el('div', { class: 'abs', html: `
    <div class="panel" style="position:relative;width:300px;margin-bottom:16px"><div class="ph">Exactitud de inventario</div><div class="pv" id="k1">0%</div><div class="pl">Conteo cíclico · WMS</div></div>
    <div class="panel" style="position:relative;width:300px;margin-bottom:16px"><div class="ph">SKUs activos</div><div class="pv" id="k2">0</div><div class="pl">Componentes y repuestos</div></div>
    <div class="panel" style="position:relative;width:300px"><div class="ph">Fill rate a taller</div><div class="pv" id="k3">0%</div><div class="pl">Órdenes servidas a tiempo</div></div>
  ` })
  Object.assign(kpis.style, { left: '1500px', top: '150px' })
  const tagPick = tag('Picking por ubicación · A-12-03 → Taller', 120, 940, 'info')
  const q1 = quote('Cada repuesto en su lugar. Cada movimiento, registrado.', 120, 400, 1500)
  root.append(bg)
  photoBg(root, 'warehouse.jpg', bg)
  root.append(lt, kpis, tagPick, q1)

  return {
    id: 'bodega', title: 'Escena 6 · Bodega', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.2)
      tl.fromTo(q('#bd-racks'), { x: -80 }, { x: 0, duration: 8, ease: 'power1.out' }, at)
      showLowerThird(tl, lt, at + 0.6, 4)
      // Grúa horquilla cruza
      tl.to(q('#bd-fork'), { attr: { transform: 'translate(300 720) scale(1.1)' }, duration: 4, ease: 'power2.out' }, at + 0.5)
      tl.to(q('#fk-fork'), { y: -140, duration: 1.4, ease: 'power2.inOut' }, at + 4.5)
      // Técnico escanea
      tl.to(q('#bd-tech'), { opacity: 1, duration: 0.5 }, at + 2)
      const scanAt = at + 5
      tl.to(q('#bd-beam'), { opacity: 1, duration: 0.12, repeat: 7, yoyo: true }, scanAt)
      tl.fromTo(root.querySelector('#r2-bc-1-2')!, { opacity: 1 }, { opacity: 0.2, duration: 0.15, repeat: 5, yoyo: true }, scanAt)
      // WMS al frente
      const wAt = scanAt + 1.4
      tl.fromTo(q('#bd-wms'), { opacity: 0, attr: { transform: 'translate(600 340) scale(.9)' } }, { opacity: 1, attr: { transform: 'translate(300 300) scale(.95)' }, duration: 0.9, ease: 'power3.out' }, wAt)
      tl.to([q('#bd-racks'), q('#bd-fork'), q('#bd-tech')], { opacity: 0.35, duration: 0.6 }, wAt)
      tl.fromTo(root.querySelectorAll('.bw-row'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.15 }, wAt + 0.3)
      tl.add(() => { const s = root.querySelector('#bw-status'); if (s) s.textContent = '▮ SCAN OK — SEAL-KIT-8821 · B-04-11 · PICKING → OT-4471' }, wAt + 1.4)
      tl.fromTo(root.querySelectorAll('.bw-row')[1], { opacity: 0.2 }, { opacity: 1, duration: 0.25, repeat: 3, yoyo: true }, wAt + 1.4)
      pop(tl, tagPick, wAt + 1.8)
      // KPIs
      const kAt = wAt + 2.4
      tl.fromTo(kpis.children, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out' }, kAt)
      const nums = [{ el: '#k1', v: 99.6, f: (n: number) => n.toFixed(1) + '%' }, { el: '#k2', v: 4820, f: (n: number) => Math.round(n).toLocaleString('es-CL') }, { el: '#k3', v: 97, f: (n: number) => Math.round(n) + '%' }]
      nums.forEach((k, i) => {
        const o = { n: 0 }, node = kpis.querySelector(k.el)!
        tl.to(o, { n: k.v, duration: 1.8, ease: 'power2.out', onUpdate: () => { node.textContent = k.f(o.n) } }, kAt + 0.3 + i * 0.2)
      })
      // Cita
      const qAt = kAt + 5.2
      tl.to([q('#bd-wms'), kpis, tagPick], { opacity: 0, y: -20, duration: 0.6 }, qAt - 0.5)
      const end = revealQuote(tl, q1, qAt, 3.8)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
