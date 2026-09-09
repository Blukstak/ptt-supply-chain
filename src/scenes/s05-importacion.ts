import { el } from '../core/dom'
import { mercatorMap, cargoShip, lowboyTruck, pttWorker } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 5 — Abastecimiento internacional (observación 5 de Romina).
 * Secuencia: persona genera OC en el sistema → las OC viajan a los países de origen →
 * los repuestos regresan por vía marítima (rutas por el océano) → llegan a bodega/taller →
 * el taller arma el componente y se devuelve al cliente.
 */
export function importacionScene(): Scene {
  const root = sceneRoot('import')
  // Mapa 1000×560 escalado ×1.7 y centrado. Coordenadas en espacio del mapa.
  const CL = { x: 268, y: 418 } // Antofagasta / puerto
  const origins = [
    { x: 190, y: 228, name: 'EE.UU. · Houston', route: 'M190 228 L200 290 L215 330 L225 420 L240 470 L268 418' },
    { x: 452, y: 132, name: 'Europa · Rotterdam', route: 'M452 132 L420 150 L390 200 L330 280 L300 400 L262 470 L268 418' },
    { x: 782, y: 322, name: 'Asia · Singapur', route: 'M782 322 L760 380 L700 470 L560 520 L420 520 L300 490 L268 418' },
  ]
  const bg = fullSvg(`
    <rect width="1920" height="1080" fill="#07090c"/>
    <g id="im-map" transform="translate(110 90) scale(1.7)" opacity="0">
      ${mercatorMap('merc')}
      ${origins.map((o, i) => `<path id="im-route-${i}" d="${o.route}" fill="none" stroke="#e0262b" stroke-width="2.5" stroke-dasharray="6 5" opacity="0"/>`).join('')}
      ${origins.map((o, i) => `<g id="im-o-${i}" opacity="0"><circle cx="${o.x}" cy="${o.y}" r="7" fill="#fff"/><circle cx="${o.x}" cy="${o.y}" r="14" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/></g>`).join('')}
      <g id="im-cl" opacity="0"><circle cx="${CL.x}" cy="${CL.y}" r="9" fill="#e0262b"/><circle id="im-cl-ping" cx="${CL.x}" cy="${CL.y}" r="16" fill="none" stroke="#e0262b" stroke-width="2"/></g>
      ${origins.map((_o, i) => `<g id="im-oc-${i}" opacity="0" transform="translate(${CL.x} ${CL.y})"><rect x="-9" y="-11" width="18" height="22" rx="2" fill="#fff"/><rect x="-5" y="-6" width="10" height="2" fill="#e0262b"/><rect x="-5" y="-1" width="10" height="2" fill="#8a8f98"/><rect x="-5" y="4" width="10" height="2" fill="#8a8f98"/></g>`).join('')}
      ${origins.map((o, i) => `<g id="im-ship-${i}" opacity="0" transform="translate(${o.x} ${o.y})"><g transform="scale(.13) translate(-360 -100)">${cargoShip(`sh${i}`)}</g></g>`).join('')}
    </g>
    <!-- persona generando OC en el sistema -->
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
      <rect x="1140" y="640" width="80" height="6" fill="#4b525c"/><rect x="1170" y="600" width="20" height="40" fill="#4b525c"/>
    </g>
    <g id="im-semi" transform="translate(-1000 800) scale(.75)" opacity="0">${lowboyTruck('ims')}</g>
  `)
  const lt = lowerThird('Escena 05 · Abastecimiento internacional', 'Repuestos originales, a tiempo')
  const labels = origins.map((o) => {
    const t = tag(o.name, 0, 0, 'info')
    Object.assign(t.style, { left: `${110 + o.x * 1.7 + 22}px`, top: `${90 + o.y * 1.7 - 22}px` })
    return t
  })
  const steps = el('div', { class: 'steps' })
  ;['Orden de compra', 'OC a países de origen', 'Regreso vía marítima', 'Bodega y taller', 'Entrega al cliente'].forEach((s, i) => steps.append(el('div', { class: 'step', html: `<span class="n">0${i + 1}</span>${s}` })))
  Object.assign(steps.style, { left: '110px', top: '150px' })
  const chain = el('div', { class: 'abs', html: `
    <div class="steps" style="position:relative;opacity:1;gap:12px">
      ${['Compras', 'Origen', 'Marítimo', 'Bodega', 'Taller', 'Cliente'].map((s, i) => `<div class="step chain" style="font-size:22px"><span class="n">${i + 1}</span>${s}</div>`).join('<div style="align-self:center;color:var(--amber);font-size:26px">→</div>')}
    </div>` })
  Object.assign(chain.style, { left: '110px', top: '860px', opacity: '0' })
  const q1 = quote('Del mundo a la faena, sin detener la operación.', 120, 400, 1500)
  root.append(bg, lt, ...labels, steps, chain, q1)

  return {
    id: 'import', title: 'Escena 5 · Importación', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const stepEls = Array.from(steps.children) as HTMLElement[]
      const activate = (i: number) => () => stepEls.forEach((s, k) => s.classList.toggle('active', k === i))
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.6, 4)
      tl.set(steps, { opacity: 1 }, at + 0.8); pop(tl, stepEls, at + 1)

      // 01 — persona generando OC
      tl.add(activate(0), at + 1.4)
      tl.to(q('#im-desk'), { opacity: 1, duration: 0.8 }, at + 1)
      tl.fromTo(root.querySelectorAll('.ocrow'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.6 }, at + 2)
      tl.fromTo(q('#im-oc-btn'), { fill: '#e0262b' }, { fill: '#4ade80', duration: 0.3, repeat: 1, yoyo: true }, at + 4.2)

      // 02 — OC viajan a los países de origen (sobre el mapa)
      const mAt = at + 5.4
      tl.add(activate(1), mAt)
      tl.to(q('#im-desk'), { opacity: 0, duration: 0.8 }, mAt)
      tl.fromTo(q('#im-map'), { opacity: 0, attr: { transform: 'translate(110 90) scale(1.8)' } }, { opacity: 1, attr: { transform: 'translate(110 90) scale(1.7)' }, duration: 1.4, ease: 'power3.out' }, mAt)
      tl.to(q('#im-cl'), { opacity: 1, duration: 0.4 }, mAt + 0.8)
      tl.fromTo(q('#im-cl-ping'), { attr: { r: 12 }, opacity: 1 }, { attr: { r: 40 }, opacity: 0, duration: 1.4, repeat: 12, ease: 'power2.out' }, mAt + 0.8)
      origins.forEach((o, i) => {
        tl.to(q(`#im-oc-${i}`), { opacity: 1, duration: 0.2 }, mAt + 1.2 + i * 0.3)
        tl.to(q(`#im-oc-${i}`), { attr: { transform: `translate(${o.x} ${o.y})` }, duration: 1.6, ease: 'power2.inOut' }, mAt + 1.2 + i * 0.3)
        tl.to(q(`#im-oc-${i}`), { opacity: 0, duration: 0.3 }, mAt + 2.8 + i * 0.3)
        tl.to(q(`#im-o-${i}`), { opacity: 1, duration: 0.4 }, mAt + 2.7 + i * 0.3)
        pop(tl, labels[i], mAt + 2.8 + i * 0.3)
      })

      // 03 — regreso por vía marítima (los barcos siguen la ruta por el océano)
      const sAt = mAt + 4.8
      tl.add(activate(2), sAt)
      origins.forEach((_o, i) => {
        const route = q(`#im-route-${i}`) as unknown as SVGPathElement
        const len = route.getTotalLength ? route.getTotalLength() : 600
        const dur = 3.6
        tl.to(route, { opacity: 0.9, duration: 0.3 }, sAt + i * 0.5)
        tl.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, sAt + i * 0.5)
        const ship = q(`#im-ship-${i}`)
        tl.to(ship, { opacity: 1, duration: 0.3 }, sAt + i * 0.5)
        const prog = { t: 0 }
        tl.to(prog, { t: 1, duration: dur, ease: 'power1.inOut', onUpdate: () => {
          const p = route.getPointAtLength(prog.t * len)
          ship.setAttribute('transform', `translate(${p.x} ${p.y})`)
        } }, sAt + i * 0.5)
        tl.to(ship, { opacity: 0, duration: 0.3 }, sAt + i * 0.5 + dur)
      })
      const tagPort = tag('Puerto · Aduana · Internación', 110 + CL.x * 1.7 + 30, 90 + CL.y * 1.7 + 10, 'ok')
      root.append(tagPort)
      pop(tl, tagPort, sAt + 4.2, 3)

      // 04 — a bodega y taller (camión propio)
      const tAt = sAt + 6
      tl.add(activate(3), tAt)
      tl.to([q('#im-map'), ...labels], { opacity: 0.25, duration: 0.8 }, tAt)
      tl.to(q('#im-semi'), { opacity: 1, duration: 0.3 }, tAt)
      tl.to(q('#im-semi'), { attr: { transform: 'translate(2100 800) scale(.75)' }, duration: 5, ease: 'power1.inOut' }, tAt)
      tl.to(['#ims-w0', '#ims-w1', '#ims-w2', '#ims-w3', '#ims-w4'].map(q), { rotation: 1600, transformOrigin: '50% 50%', duration: 5, ease: 'power1.inOut' }, tAt)

      // 05 — cadena completa hasta el cliente
      const cAt = tAt + 2.4
      tl.add(activate(4), cAt)
      tl.to(chain, { opacity: 1, duration: 0.5 }, cAt)
      tl.fromTo(chain.querySelectorAll('.chain'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.25, ease: 'back.out(1.6)' }, cAt)

      // Cita
      const qAt = cAt + 3.4
      tl.to([steps, chain, ...labels], { opacity: 0, duration: 0.5 }, qAt - 0.4)
      const end = revealQuote(tl, q1, qAt, 3.8)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
