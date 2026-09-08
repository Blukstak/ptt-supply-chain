import { el } from '../core/dom'
import { worldMap, airplane, cargoShip, semiTruck } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 5 — Repuestos, compras e importación (comercio exterior).
 * Rutas aéreas y marítimas desde los orígenes hacia Chile; aduana y transporte terrestre.
 */
export function importacionScene(): Scene {
  const root = sceneRoot('import')
  // El mapa 1000x500 se escala a la pantalla; Chile ≈ (270, 400)
  const CL = { x: 270, y: 400 }
  const origins = [
    { x: 150, y: 150, name: 'EE.UU. · Peoria', mode: 'air' },
    { x: 520, y: 110, name: 'Europa · Bélgica', mode: 'air' },
    { x: 860, y: 170, name: 'Asia · Singapur', mode: 'sea' },
  ]
  const arc = (o: { x: number; y: number }) => {
    const mx = (o.x + CL.x) / 2, my = Math.min(o.y, CL.y) - 90
    return `M${o.x} ${o.y} Q${mx} ${my} ${CL.x} ${CL.y}`
  }
  const bg = fullSvg(`
    <defs><radialGradient id="im-g" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#0f1620"/><stop offset="1" stop-color="#05070a"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#im-g)"/>
    <g id="im-map" transform="translate(160 90) scale(1.6)">
      ${worldMap('wm')}
      ${origins.map((o, i) => `<path id="im-route-${i}" d="${arc(o)}" fill="none" stroke="${o.mode === 'air' ? '#f5a623' : '#2fd4c8'}" stroke-width="2" stroke-dasharray="6 5" opacity=".9"/>`).join('')}
      ${origins.map((o, i) => `<g id="im-o-${i}" opacity="0"><circle cx="${o.x}" cy="${o.y}" r="7" fill="#e9eef4"/><circle cx="${o.x}" cy="${o.y}" r="14" fill="none" stroke="#e9eef4" stroke-width="1.5" opacity=".6"/></g>`).join('')}
      <g id="im-cl" opacity="0"><circle cx="${CL.x}" cy="${CL.y}" r="10" fill="#ffcd11"/><circle id="im-cl-ping" cx="${CL.x}" cy="${CL.y}" r="16" fill="none" stroke="#ffcd11" stroke-width="2"/></g>
      <g id="im-plane-0" opacity="0" transform="translate(${origins[0].x} ${origins[0].y})"><g transform="scale(.22) translate(-160 -40)">${airplane('pl0')}</g></g>
      <g id="im-plane-1" opacity="0" transform="translate(${origins[1].x} ${origins[1].y})"><g transform="scale(.22) translate(-160 -40)">${airplane('pl1')}</g></g>
      <g id="im-ship-2" opacity="0" transform="translate(${origins[2].x} ${origins[2].y})"><g transform="scale(.16) translate(-360 -80)">${cargoShip('sh2')}</g></g>
    </g>
    <g id="im-semi" transform="translate(-1000 820) scale(.8)" opacity="0">${semiTruck('ims', '#2fd4c8')}</g>
  `)
  const lt = lowerThird('Escena 05 · Abastecimiento e importación', 'Repuestos originales, a tiempo')
  const labels = origins.map((o) => {
    const t = tag(o.name, 0, 0, o.mode === 'air' ? '' : 'info')
    Object.assign(t.style, { left: `${160 + o.x * 1.6 + 24}px`, top: `${90 + o.y * 1.6 - 22}px` })
    return t
  })
  const panel = el('div', { class: 'panel', html: `
    <div class="ph">Orden de compra · OC-2026-1187</div>
    <div class="row"><span class="k">Corona planetaria · 1204</span><span class="v">2 un.</span></div>
    <div class="row"><span class="k">Kit sellos Duo-Cone</span><span class="v">4 un.</span></div>
    <div class="row"><span class="k">Rodamientos cónicos</span><span class="v">6 un.</span></div>
    <div class="row"><span class="k">Incoterm</span><span class="v">FCA · Peoria</span></div>
    <div class="row"><span class="k">Lead time proyectado</span><span class="v ok">21 días</span></div>
  ` })
  Object.assign(panel.style, { left: '1180px', top: '560px', width: '620px' })
  const steps = el('div', { class: 'steps' })
  ;['Orden de compra', 'Transporte internacional', 'Aduana', 'Transporte terrestre'].forEach((s, i) => steps.append(el('div', { class: 'step', html: `<span class="n">0${i + 1}</span>${s}` })))
  Object.assign(steps.style, { left: '120px', top: '160px' })
  const q1 = quote('Del mundo a la faena, sin detener la operación.', 120, 400, 1500)
  root.append(bg, lt, ...labels, panel, steps, q1)

  return {
    id: 'import', title: 'Escena 5 · Importación', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const stepEls = Array.from(steps.children) as HTMLElement[]
      const activate = (i: number) => () => stepEls.forEach((s, k) => s.classList.toggle('active', k === i))
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.6, 4)
      tl.fromTo(q('#im-map'), { attr: { transform: 'translate(160 90) scale(1.75)' }, opacity: 0 }, { attr: { transform: 'translate(160 90) scale(1.6)' }, opacity: 1, duration: 2, ease: 'power3.out' }, at)
      tl.to(q('#im-cl'), { opacity: 1, duration: 0.5 }, at + 1)
      tl.fromTo(q('#im-cl-ping'), { attr: { r: 12 }, opacity: 1 }, { attr: { r: 40 }, opacity: 0, duration: 1.4, repeat: 12, ease: 'power2.out' }, at + 1)
      tl.set(steps, { opacity: 1 }, at + 1)
      pop(tl, stepEls, at + 1.2)
      // 01 OC
      tl.add(activate(0), at + 2.2)
      tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, at + 2.4)
      tl.fromTo(panel.querySelectorAll('.row'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, at + 2.7)
      // Orígenes
      origins.forEach((_, i) => {
        tl.to(q(`#im-o-${i}`), { opacity: 1, duration: 0.4 }, at + 3.2 + i * 0.3)
        pop(tl, labels[i], at + 3.3 + i * 0.3)
      })
      // 02 transporte internacional: dibujar rutas y mover vehículos
      const trAt = at + 5.4
      tl.add(activate(1), trAt)
      origins.forEach((o, i) => {
        const route = q(`#im-route-${i}`) as unknown as SVGPathElement
        const len = route.getTotalLength ? route.getTotalLength() : 800
        tl.fromTo(route, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: o.mode === 'air' ? 2.4 : 3.4, ease: 'power1.inOut' }, trAt + i * 0.4)
        const vehicle = q(o.mode === 'air' ? `#im-plane-${i}` : `#im-ship-${i}`)
        tl.to(vehicle, { opacity: 1, duration: 0.3 }, trAt + i * 0.4)
        // Sigue el trazado muestreando el path (sin plugin)
        const prog = { t: 0 }
        tl.to(prog, { t: 1, duration: o.mode === 'air' ? 2.4 : 3.4, ease: 'power1.inOut', onUpdate: () => {
          const p = route.getPointAtLength(prog.t * len)
          const p2 = route.getPointAtLength(Math.min(len, prog.t * len + 4))
          const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI
          vehicle.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${o.mode === 'air' ? ang : 0})`)
        } }, trAt + i * 0.4)
        tl.to(vehicle, { opacity: 0, duration: 0.3 }, trAt + i * 0.4 + (o.mode === 'air' ? 2.4 : 3.4))
      })
      // 03 Aduana
      const adAt = trAt + 4.6
      tl.add(activate(2), adAt)
      const tagAd = tag('Aduana · Internación · DIN aprobada', 560, 720, 'ok')
      root.append(tagAd)
      pop(tl, tagAd, adAt, 2.4)
      // 04 Transporte terrestre
      const ttAt = adAt + 2.8
      tl.add(activate(3), ttAt)
      tl.to([q('#im-map'), panel, ...labels], { opacity: 0.25, duration: 0.8 }, ttAt)
      tl.to(q('#im-semi'), { opacity: 1, duration: 0.3 }, ttAt)
      tl.to(q('#im-semi'), { attr: { transform: 'translate(2100 820) scale(.8)' }, duration: 5, ease: 'power1.inOut' }, ttAt)
      tl.to(['#ims-w0', '#ims-w1', '#ims-w2', '#ims-w3', '#ims-w4'].map(q), { rotation: 1600, transformOrigin: '50% 50%', duration: 5, ease: 'power1.inOut' }, ttAt)
      // Cita
      const qAt = ttAt + 1.6
      tl.to([steps, panel, ...labels], { opacity: 0, duration: 0.5 }, qAt - 0.4)
      const end = revealQuote(tl, q1, qAt, 3.8)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
