import { el } from '../core/dom'
import { industrialFloor, lowboyTruck, finalDriveSide, warehouseRack } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 6b — Tiempo de respuesta: dos vías complementarias (observación 6 de Romina).
 *  · Logística propia: camiones propios para bajar y subir componentes.
 *  · Componentes propios: stock de componentes para cubrir urgencias.
 */
export function respuestaScene(): Scene {
  const root = sceneRoot('respuesta')
  const bg = fullSvg(`${industrialFloor('rp', '#111318')}
    <line id="rp-split" x1="960" y1="80" x2="960" y2="1000" stroke="#e0262b" stroke-width="4" opacity="0"/>
    <g id="rp-left">
      <g id="rp-truck" transform="translate(-60 560) scale(.85)">${lowboyTruck('rpt')}<g transform="translate(330 140) scale(.42)">${finalDriveSide('rpf', 'FD-797')}</g></g>
    </g>
    <g id="rp-right">
      <g transform="translate(1060 330) scale(.9)">${warehouseRack('rpr', 4, 3, 190, 130)}</g>
      <g id="rp-stock" transform="translate(1400 800) scale(.55)">${finalDriveSide('rps', 'STOCK')}</g>
    </g>
  `)
  const lt = lowerThird('Tiempo de respuesta', 'Dos vías, una respuesta rápida')
  const hL = el('div', { class: 'abs', html: '<div class="kicker">Vía 1 · Logística propia</div><div class="headline" style="font-size:64px;margin-top:8px">Camiones <em>propios</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:700px">Bajamos y subimos componentes desde y hacia la faena con flota propia, sin depender de terceros.</div>' })
  Object.assign(hL.style, { left: '110px', top: '140px', opacity: '0' })
  const hR = el('div', { class: 'abs', html: '<div class="kicker">Vía 2 · Componentes propios</div><div class="headline" style="font-size:64px;margin-top:8px">Stock <em>disponible</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:700px">Componentes propios en inventario para cubrir urgencias del cliente de inmediato.</div>' })
  Object.assign(hR.style, { left: '1030px', top: '140px', opacity: '0' })
  const tagL = tag('Retiro y entrega en faena · flota PTT', 110, 940, 'ok')
  const tagR = tag('Componentes en stock · entrega inmediata', 1030, 940, 'ok')
  const q1 = quote('Rapidez de respuesta. Por más de una vía.', 120, 400, 1400)
  root.append(bg, lt, hL, hR, tagL, tagR, q1)

  return {
    id: 'respuesta', title: 'Escena 6b · Respuesta', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.6, 3.6)
      tl.to(q('#rp-split'), { opacity: 0.6, duration: 0.8 }, at + 1)
      tl.fromTo(q('#rp-split'), { attr: { y2: 80 } }, { attr: { y2: 1000 }, duration: 1, ease: 'power3.out' }, at + 1)
      // Vía 1: camión entra por la izquierda
      tl.to(q('#rp-truck'), { attr: { transform: 'translate(60 560) scale(.85)' }, duration: 3, ease: 'power2.out' }, at + 1.2)
      tl.to(['#rpt-w0', '#rpt-w1', '#rpt-w2', '#rpt-w3', '#rpt-w4'].map(q), { rotation: 720, transformOrigin: '50% 50%', duration: 3, ease: 'power2.out' }, at + 1.2)
      tl.fromTo(hL, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, at + 4.6)
      pop(tl, tagL, at + 5.4)
      // Vía 2: rack + componente en stock
      tl.fromTo(q('#rp-right'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, at + 6.4)
      tl.fromTo(q('#rp-stock'), { opacity: 0, attr: { transform: 'translate(1400 800) scale(.2)' } }, { opacity: 1, attr: { transform: 'translate(1400 800) scale(.55)' }, duration: 0.9, ease: 'back.out(1.6)' }, at + 7.2)
      tl.fromTo(hR, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, at + 7.6)
      pop(tl, tagR, at + 8.4)
      // Cita
      const qAt = at + 13
      tl.to([hL, hR, tagL, tagR], { opacity: 0, duration: 0.5 }, qAt - 0.4)
      tl.to([q('#rp-left'), q('#rp-right'), q('#rp-split')], { opacity: 0.2, duration: 0.6 }, qAt - 0.4)
      const end = revealQuote(tl, q1, qAt, 3.4)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
