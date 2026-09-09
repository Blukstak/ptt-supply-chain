import { el } from '../core/dom'
import { mercatorMap, cargoShip, airplane, lowboyTruck, pttWorker } from '../art'
import { Scene, sceneRoot, fullSvg, artLayer, artAt, sceneEnter, sceneLeave, lowerThird, showLowerThird, tag, pop, stepsBar, SUPPLY_STEPS } from '../core/scene'

/**
 * RED INTERNACIONAL DE ABASTECIMIENTO (R2 · obs. 9 y 10).
 * OC en el ERP → EE.UU. y Europa por vía aérea (llegan antes) → Asia por vía marítima →
 * camión propio cargado sale hacia bodega. Repuestos originales y desarrollados por Ingeniería y Desarrollo.
 */
export function importacionScene(): Scene {
  const root = sceneRoot('import')
  // R3 · obs. 4: el punto de recepción va sobre Chile (costa oeste de Sudamérica), no sobre Argentina.
  const CL = { x: 232, y: 432 }
  const origins = [
    { x: 190, y: 228, name: 'EE.UU. · Houston · aéreo', air: true, route: 'M190 228 Q290 300 232 432' },
    { x: 452, y: 132, name: 'Europa · Rotterdam · aéreo', air: true, route: 'M452 132 Q420 330 232 432' },
    { x: 782, y: 322, name: 'Asia · Singapur · marítimo', air: false, route: 'M782 322 L760 380 L700 470 L560 500 L400 470 L232 432' },
  ]
  const bg = fullSvg(`
    <rect width="1920" height="1080" fill="#07090c"/>
    <g id="im-map" transform="translate(110 90) scale(1.7)" opacity="0">
      ${mercatorMap('merc')}
      <path id="im-chile" d="M218 372 L232 370 L246 448 L256 516 L262 540 L250 520 L240 460 L225 400Z" fill="#e0262b" opacity="0"/>
      ${origins.map((o, i) => `<path id="im-route-${i}" d="${o.route}" fill="none" stroke="${o.air ? '#ffffff' : '#e0262b'}" stroke-width="2.5" stroke-dasharray="6 5" opacity="0"/>`).join('')}
      ${origins.map((o, i) => `<g id="im-o-${i}" opacity="0"><circle cx="${o.x}" cy="${o.y}" r="7" fill="#fff"/><circle cx="${o.x}" cy="${o.y}" r="14" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/></g>`).join('')}
      <g id="im-cl" opacity="0"><circle cx="${CL.x}" cy="${CL.y}" r="9" fill="#e0262b"/><circle id="im-cl-ping" cx="${CL.x}" cy="${CL.y}" r="16" fill="none" stroke="#e0262b" stroke-width="2"/></g>
      ${origins.map((_o, i) => `<g id="im-oc-${i}" opacity="0" transform="translate(${CL.x} ${CL.y})"><rect x="-9" y="-11" width="18" height="22" rx="2" fill="#fff"/><rect x="-5" y="-6" width="10" height="2" fill="#e0262b"/><rect x="-5" y="-1" width="10" height="2" fill="#8a8f98"/><rect x="-5" y="4" width="10" height="2" fill="#8a8f98"/></g>`).join('')}
      ${origins.map((o, i) => `<g id="im-v-${i}" opacity="0" transform="translate(${o.x} ${o.y})"><g id="im-vr-${i}">${o.air ? `<g transform="scale(.24) translate(-170 -50)">${airplane(`pl${i}`)}</g>` : `<g transform="scale(.13) translate(-360 -100)">${cargoShip(`sh${i}`)}</g>`}</g></g>`).join('')}
    </g>
    <g id="im-desk" opacity="0">
      <rect x="0" y="0" width="1920" height="1080" fill="#0d1117"/>
      <rect x="0" y="720" width="1920" height="360" fill="#141922"/>
      <rect x="560" y="640" width="800" height="18" fill="#2a2f36"/><rect x="580" y="658" width="16" height="200" fill="#1d2229"/><rect x="1324" y="658" width="16" height="200" fill="#1d2229"/>
      <g transform="translate(760 620) scale(.95)">${pttWorker('imw', false)}</g>
      <g transform="translate(900 300)">
        <rect width="560" height="340" rx="10" fill="#0b0f15" stroke="#2a3441" stroke-width="3"/>
        <rect width="560" height="44" rx="10" fill="#141b24"/>
        <text x="280" y="28" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" fill="#9aa7b6" letter-spacing="3">PTT · ERP · ÓRDENES DE COMPRA</text>
        <g id="im-oc-rows" font-family="JetBrains Mono, monospace" font-size="15" fill="#e9eef4">
          <g class="ocrow" opacity="0" transform="translate(24 84)"><text>OC-2026-1187</text><text x="200" fill="#9aa7b6">Corona planetaria</text><text x="430" fill="#e0262b">HOUSTON</text></g>
          <g class="ocrow" opacity="0" transform="translate(24 128)"><text>OC-2026-1188</text><text x="200" fill="#9aa7b6">Kit sellos Duo-Cone</text><text x="430" fill="#e0262b">ROTTERDAM</text></g>
          <g class="ocrow" opacity="0" transform="translate(24 172)"><text>OC-2026-1189</text><text x="200" fill="#9aa7b6">Rodamientos cónicos</text><text x="430" fill="#e0262b">SINGAPUR</text></g>
        </g>
        <rect id="im-oc-btn" x="24" y="270" width="512" height="46" rx="6" fill="#e0262b"/>
        <text x="280" y="300" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="22" fill="#fff" letter-spacing="3">EMITIR ÓRDENES DE COMPRA</text>
      </g>
    </g>
  `)
  // R5 · obs. 01:14: el camión propio llega VACÍO al punto de recepción; las cajas EE.UU./EUROPA/ASIA vienen desde
  // sus orígenes en el mapa, se elevan y se depositan sobre la cama baja (son hijas del grupo del camión: viajan con él).
  // R5 · fluidez: el camión va en su propia capa GPU.
  const TRK = { x: 300, y: 800, s: 0.75 }
  const semiSvg = artLayer(`<g id="im-semi" transform="translate(${TRK.x} ${TRK.y}) scale(${TRK.s})">${lowboyTruck('ims', true)}</g>`, TRK.x, TRK.y)
  semiSvg.style.opacity = '0'
  // R3 · obs. 3: título inferior con las tres ideas (red internacional, agilidad, stock de mayor rotación)
  const lt = lowerThird('Abastecimiento internacional', 'Red internacional de proveedores, operación ágil y stock de los repuestos de mayor rotación.')
  Object.assign((lt.querySelector('.headline') as HTMLElement).style, { fontSize: '50px', maxWidth: '1500px' })
  const labels = origins.map((o) => {
    const t = tag(o.name, 0, 0, 'info')
    Object.assign(t.style, { left: `${110 + o.x * 1.7 + 22}px`, top: `${90 + o.y * 1.7 - 22}px` })
    return t
  })
  // R3 · obs. 3: barra superior con los 6 pasos (01–03 se recorren aquí; 04–06 en Bodega)
  const { steps, els: stepEls, activate } = stepsBar(SUPPLY_STEPS, 110, 100, true)
  // R3 · obs. 4: copy del mapa
  const copyMap = el('div', { class: 'abs headline', html: 'Proveedores del mundo para asegurar el abastecimiento y mantener activa la cadena de reparación.' })
  Object.assign(copyMap.style, { left: '110px', top: '540px', width: '760px', fontSize: '36px', lineHeight: '1.02', opacity: '0', padding: '16px 22px', background: 'rgba(7,9,12,.72)', borderLeft: '6px solid var(--amber)', borderRadius: '4px' })
  const tagKind = tag('Repuestos originales + repuestos desarrollados por Ingeniería y Desarrollo', 110, 700, 'ok')
  const tagLoad = tag('La carga de EE.UU., Europa y Asia sube al camión · rumbo a bodega PTT', 900, 640, 'info')
  root.append(bg, semiSvg, lt, ...labels, steps, copyMap, tagKind, tagLoad)

  return {
    id: 'import', title: 'Abastecimiento', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      tl.set(steps, { opacity: 1 }, at + 0.6); pop(tl, stepEls, at + 0.8)
      // 01 — análisis de repuestos (listado en el ERP) → 02 — compras (emisión de OC)
      tl.add(activate(0), at + 1)
      tl.add(activate(1), at + 2.3)
      tl.to(q('#im-desk'), { opacity: 1, duration: 0.6 }, at + 0.6)
      tl.fromTo(root.querySelectorAll('.ocrow'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.35 }, at + 1.2)
      tl.fromTo(q('#im-oc-btn'), { fill: '#e0262b' }, { fill: '#4ade80', duration: 0.3, repeat: 1, yoyo: true }, at + 2.4)
      // 02 — mapa: las OC vuelan a los orígenes
      const mAt = at + 2.8
      tl.to(q('#im-desk'), { opacity: 0, duration: 0.6 }, mAt)
      tl.fromTo(q('#im-map'), { opacity: 0, attr: { transform: 'translate(110 90) scale(1.8)' } }, { opacity: 1, attr: { transform: 'translate(110 90) scale(1.7)' }, duration: 1, ease: 'power3.out' }, mAt)
      tl.to(q('#im-chile'), { opacity: 0.55, duration: 0.5 }, mAt + 0.4)
      tl.to(q('#im-cl'), { opacity: 1, duration: 0.3 }, mAt + 0.5)
      tl.fromTo(q('#im-cl-ping'), { attr: { r: 12 }, opacity: 1 }, { attr: { r: 40 }, opacity: 0, duration: 1.4, repeat: 6, ease: 'power2.out' }, mAt + 0.5)
      origins.forEach((o, i) => {
        tl.to(q(`#im-oc-${i}`), { opacity: 1, duration: 0.2 }, mAt + 0.6 + i * 0.2)
        tl.to(q(`#im-oc-${i}`), { attr: { transform: `translate(${o.x} ${o.y})` }, duration: 1, ease: 'power2.inOut' }, mAt + 0.6 + i * 0.2)
        tl.to(q(`#im-oc-${i}`), { opacity: 0, duration: 0.2 }, mAt + 1.6 + i * 0.2)
        tl.to(q(`#im-o-${i}`), { opacity: 1, duration: 0.3 }, mAt + 1.5 + i * 0.2)
        pop(tl, labels[i], mAt + 1.6 + i * 0.2)
      })
      // 03 — aviones (EE.UU./Europa) llegan antes; barco (Asia) llega después
      // 03 — importación
      const sAt = mAt + 2.0
      tl.add(activate(2), sAt)
      origins.forEach((o, i) => {
        const route = q(`#im-route-${i}`) as unknown as SVGPathElement
        const len = route.getTotalLength ? route.getTotalLength() : 600
        const dur = o.air ? 1.6 : 3.4
        tl.to(route, { opacity: 0.9, duration: 0.3 }, sAt)
        tl.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, sAt)
        const v = q(`#im-v-${i}`), vr = q(`#im-vr-${i}`)
        tl.to(v, { opacity: 1, duration: 0.3 }, sAt)
        const prog = { t: 0 }
        tl.to(prog, { t: 1, duration: dur, ease: 'power1.inOut', onUpdate: () => {
          const p = route.getPointAtLength(prog.t * len)
          v.setAttribute('transform', `translate(${p.x} ${p.y})`)
          if (o.air) { const p2 = route.getPointAtLength(Math.min(len, prog.t * len + 4)); vr.setAttribute('transform', `rotate(${(Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI})`) }
        } }, sAt)
        tl.to(v, { opacity: 0, duration: 0.3 }, sAt + dur)
      })
      tl.fromTo(copyMap, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, sAt + 1.2)
      pop(tl, tagKind, sAt + 2.1)
      // 04 — camión propio, claramente cargado, sale hacia bodega
      const tAt = sAt + 3.4
      const wheels = ['#ims-w0', '#ims-w1', '#ims-w2', '#ims-w3', '#ims-w4'].map(q)
      // 04a — el camión llega vacío y se detiene bajo el punto de recepción
      const cargoWrap = [0, 1, 2].map((i) => q(`#ims-cr${i}`).parentElement as unknown as SVGGElement)
      const straps = Array.from(root.querySelectorAll('#ims-cargo > path'))
      const land = [[278, 120], [365, 115], [454, 110]] // posición final de cada caja sobre la cama (local del camión)
      const toLocal = (sx: number, sy: number) => [(sx - TRK.x) / TRK.s, (sy - TRK.y) / TRK.s]
      cargoWrap.forEach((c, i) => { const [lx, ly] = toLocal(110 + origins[i].x * 1.7, 90 + origins[i].y * 1.7); tl.set(c, { opacity: 0, attr: { transform: `translate(${lx} ${ly}) scale(.5)` } }, at) })
      tl.set(straps, { opacity: 0 }, at)
      tl.set(semiSvg, artAt(TRK.x, TRK.y, -900, TRK.y, 1), at)
      tl.to(semiSvg, { opacity: 1, duration: 0.3 }, tAt - 1.3)
      tl.to(semiSvg, { ...artAt(TRK.x, TRK.y, TRK.x, TRK.y, 1), duration: 1.4, ease: 'power2.out' }, tAt - 1.3)
      tl.to(wheels, { rotation: 700, transformOrigin: '50% 50%', duration: 1.4, ease: 'power2.out' }, tAt - 1.3)
      tl.to([q('#im-map'), ...labels], { opacity: 0.25, duration: 0.6 }, tAt)
      // 04b — la carga que viene del exterior SUBE al camión: cada caja se eleva y se deposita sobre la cama baja
      cargoWrap.forEach((c, i) => {
        const t0 = tAt + 0.0 + i * 0.3
        const [lx, ly] = land[i]
        tl.to(c, { opacity: 1, duration: 0.25 }, t0)
        tl.to(c, { attr: { transform: `translate(${lx} ${ly - 150}) scale(1)` }, duration: 0.8, ease: 'power2.inOut' }, t0)
        tl.to(c, { attr: { transform: `translate(${lx} ${ly}) scale(1)` }, duration: 0.5, ease: 'bounce.out' }, t0 + 0.8)
      })
      tl.to(straps, { opacity: 1, duration: 0.3 }, tAt + 1.6)
      tl.to(q('#ims-bed'), { y: 3, duration: 0.12, repeat: 5, yoyo: true, ease: 'sine.inOut' }, tAt + 1.0)
      pop(tl, tagLoad, tAt + 0.7, 1.9)
      // 04c — sale hacia bodega con la carga a bordo
      const goAt = tAt + 1.9
      tl.to(semiSvg, { ...artAt(TRK.x, TRK.y, 2200, TRK.y, 1), duration: 2.2, ease: 'power2.in' }, goAt)
      tl.to(wheels, { rotation: 1600, transformOrigin: '50% 50%', duration: 2.2, ease: 'power2.in' }, goAt)
      tl.to([steps, copyMap, tagKind, ...labels], { opacity: 0, duration: 0.5 }, goAt + 0.6)
      sceneLeave(tl, root, goAt + 1.1, 0.9)
      return goAt + 2.0 - at
    },
  }
}
