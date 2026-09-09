import { el } from '../core/dom'
import { pttWorkshop, finalDrive, finalDriveSide, pttWorker, warehouseRack, crate, sparePart, torqueWrench, STATIONS_ARMADO } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ARMADO EN TALLER PTT (v1.2 esc. 7) + ALTERNATIVAS PARA EL CLIENTE (R2 · obs. 11 y 12, reubicadas).
 * R4 · obs. 01:28: de la caja salen repuestos reconocibles (sellos, pernos, tuercas, rodamientos, engranajes),
 * diferenciando los que ya estaban en bodega (verde) de los comprados fuera (teal); el trabajo sobre el componente
 * se representa con llave de torque + barra de avance del armado (antes: "estrella que salta").
 * R4 · obs. 01:37: "2 opciones para nuestros clientes: Reparación y Venta Intercambio".
 */
export function tallerScene(): Scene {
  const root = sceneRoot('taller')
  const BOX = { x: 1560, y: 790 } // caja consolidada (300×180)
  const parts = [
    { kind: 'gear', src: 'stock', x: 1330, y: 575 }, { kind: 'bearing', src: 'stock', x: 1420, y: 575 }, { kind: 'seal', src: 'stock', x: 1510, y: 575 },
    { kind: 'bolt', src: 'buy', x: 1330, y: 710 }, { kind: 'nut', src: 'buy', x: 1420, y: 710 }, { kind: 'bearing', src: 'buy', x: 1510, y: 710 },
  ] as const
  const bg = fullSvg(`${pttWorkshop('tf', STATIONS_ARMADO, 'ARMADO')}
    <rect id="tl-dim" width="1920" height="1080" fill="#05070a" opacity="0"/>
    <g id="tl-stand" transform="translate(960 660)"><rect x="-260" y="140" width="520" height="30" fill="#2a2f36"/><rect x="-200" y="30" width="26" height="120" fill="#4b525c"/><rect x="174" y="30" width="26" height="120" fill="#4b525c"/></g>
    <g id="tl-fd" transform="translate(960 560)">${finalDrive('tfd', 250)}</g>
    <g id="tl-t1" transform="translate(500 760)">${pttWorker('tt1', false)}</g>
    <g id="tl-t2" transform="translate(1180 760)">${pttWorker('tt2', true)}</g>
    <g id="tl-boxes"><g class="tl-box" transform="translate(-500 ${BOX.y})">${crate('tlc0', 300, 180, 'PTT')}<text x="150" y="-14" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="22" fill="#fff" letter-spacing="3">REPUESTOS DE BODEGA + COMPRAS</text></g></g>
    <g id="tl-parts">${parts.map((p, i) => `<g class="tl-part" data-src="${p.src}" opacity="0" transform="translate(${BOX.x + 150} ${BOX.y + 60}) scale(.1)"><circle r="46" fill="#0a0e14" fill-opacity=".55" stroke="${p.src === 'stock' ? '#4ade80' : '#22d3ee'}" stroke-width="3"/>${sparePart(`tp${i}`, p.kind)}</g>`).join('')}</g>
    <g id="tl-wrench" transform="translate(960 560)" opacity="0"><g id="tl-wrench-in" transform="rotate(-20)">${torqueWrench('tw')}</g></g>
    <g id="tl-right" opacity="0">
      <g transform="translate(1080 300) scale(.8)">${warehouseRack('tlr', 4, 3, 190, 130)}</g>
      <g id="tl-stock" transform="translate(1440 800) scale(.55)">${finalDriveSide('tls', 'PTT')}</g>
    </g>
    <line id="tl-split" x1="960" y1="80" x2="960" y2="1000" stroke="#e0262b" stroke-width="4" opacity="0"/>
  `)
  const sparks = new Dust({ count: 60, color: '255, 200, 87', speed: 1.4, size: [1, 2.5], drift: 1.2, area: { x: 760, y: 400, w: 400, h: 300 } })
  const lt = lowerThird('Armado en taller PTT', 'Estándar de fábrica')
  const steps = el('div', { class: 'steps' })
  ;['Caja de bodega: repuestos + compras', 'Armado y torque', 'Pruebas dinámicas', 'Certificación PTT'].forEach((s, i) => steps.append(el('div', { class: 'step', html: `<span class="n">0${i + 1}</span>${s}` })))
  Object.assign(steps.style, { left: '120px', top: '160px' })
  const tagStock = tag('Repuestos que ya estaban en bodega', 1270, 500, 'ok')
  const tagBuy = tag('Repuestos comprados fuera · red internacional', 1270, 635, 'info')
  // Barra de avance del armado (R4: recurso que representa el trabajo sobre el componente)
  const prog = el('div', { class: 'abs', html: '<div class="kicker" style="font-size:15px;margin-bottom:8px">Armado del componente · <span id="tl-pct">0%</span></div><div style="width:420px;height:10px;background:rgba(255,255,255,.14);border-radius:5px;overflow:hidden"><div id="tl-fill" style="width:0;height:100%;background:var(--amber)"></div></div>' })
  Object.assign(prog.style, { left: '750px', top: '880px', opacity: '0' })
  const stamp = el('div', { class: 'abs', html: `<div style="font-family:var(--font-display);font-weight:700;font-size:54px;text-transform:uppercase;letter-spacing:.06em;color:#4ade80;border:6px solid #4ade80;padding:10px 30px;border-radius:10px;transform:rotate(-8deg);background:rgba(0,0,0,.4)">Aprobado · QA</div>` })
  Object.assign(stamp.style, { left: '1180px', top: '360px', opacity: '0' })
  const tagOT = tag('OT-4471 · Mando final · Estación A1', 120, 940, 'ok')
  // Opciones para el cliente (R4 · obs. 01:37)
  const hL = el('div', { class: 'abs', html: '<div class="kicker">Opción 1</div><div class="headline" style="font-size:60px;margin-top:8px"><em>Reparación</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:720px">Reparamos el componente del cliente en nuestro taller con repuestos de nuestra red internacional.</div>' })
  Object.assign(hL.style, { left: '110px', top: '130px', opacity: '0' })
  const hR = el('div', { class: 'abs', html: '<div class="kicker">Opción 2</div><div class="headline" style="font-size:60px;margin-top:8px">Venta <em>Intercambio</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:720px">Entregamos de inmediato un componente de nuestro stock y recibimos el del cliente a cambio.</div>' })
  Object.assign(hR.style, { left: '1030px', top: '130px', opacity: '0' })
  const tagL = tag('Reparación en taller PTT', 110, 940, 'ok')
  const tagR = tag('Venta Intercambio · stock propio · entrega inmediata', 1030, 940, 'ok')
  const q1 = quote('2 opciones para nuestros clientes: Reparación y Venta Intercambio', 120, 330, 1600)
  q1.style.fontSize = '72px'
  root.append(bg, sparks.canvas, lt, steps, tagStock, tagBuy, prog, stamp, tagOT, hL, hR, tagL, tagR, q1)

  return {
    id: 'taller', title: 'Taller PTT', root,
    onEnter: () => sparks.start(), onLeave: () => sparks.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const stepEls = Array.from(steps.children) as HTMLElement[]
      const activate = (i: number) => () => stepEls.forEach((s, k) => s.classList.toggle('active', k === i))
      sceneEnter(tl, root, at, 1)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      tl.set(steps, { opacity: 1 }, at + 0.6); pop(tl, stepEls, at + 0.8)
      // Piezas fuera de lugar → convergen; la caja consolidada llega desde bodega
      tl.set(q('#tfd-housing'), { x: -520, y: -60, opacity: 0.9 }, at)
      tl.set(q('#tfd-ringgear'), { x: -220, y: 240, rotation: 40, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-carrier'), { x: 260, y: 260, rotation: -50, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-sun'), { x: 520, y: -100, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-hubface'), { opacity: 0 }, at)
      tl.add(activate(0), at + 0.8)
      const box = q('.tl-box')
      tl.to(box, { attr: { transform: `translate(${BOX.x} ${BOX.y})` }, duration: 1.2, ease: 'power2.out' }, at + 0.3)
      // Los repuestos salen de la caja: fila verde = ya estaban en bodega; fila teal = comprados fuera
      const partEls = Array.from(root.querySelectorAll('.tl-part')) as SVGGElement[]
      partEls.forEach((p, i) => {
        const t0 = at + 1.4 + i * 0.14
        tl.set(p, { opacity: 1 }, t0)
        tl.to(p, { attr: { transform: `translate(${parts[i].x} ${parts[i].y}) scale(1)` }, duration: 0.6, ease: 'back.out(1.4)' }, t0)
      })
      pop(tl, tagStock, at + 1.7)
      pop(tl, tagBuy, at + 2.1)
      // …y entran al componente
      const aAt = at + 3.0
      partEls.forEach((p, i) => {
        tl.to(p, { attr: { transform: 'translate(960 560) scale(.15)' }, opacity: 0, duration: 0.55, ease: 'power2.in' }, aAt - 0.2 + i * 0.1)
      })
      tl.to([box, tagStock, tagBuy], { opacity: 0, duration: 0.4 }, aAt + 0.3)
      tl.add(activate(1), aAt)
      tl.to(q('#tfd-housing'), { x: 0, y: 0, duration: 1.1, ease: 'power3.inOut' }, aAt)
      tl.to(q('#tfd-ringgear'), { x: 0, y: 0, rotation: 0, duration: 1.1, ease: 'power3.inOut' }, aAt + 0.35)
      tl.to(q('#tfd-carrier'), { x: 0, y: 0, rotation: 0, duration: 1.1, ease: 'power3.inOut' }, aAt + 0.7)
      tl.to(q('#tfd-sun'), { x: 0, y: 0, duration: 1, ease: 'power3.inOut' }, aAt + 1)
      tl.to(q('#tf-cable'), { attr: { y2: 420 }, duration: 1, ease: 'power2.inOut' }, aAt)
      // Trabajo sobre el componente: llave de torque apretando + barra de avance (chispas de fondo)
      tl.fromTo(q('#tl-wrench'), { opacity: 0, attr: { transform: 'translate(960 560) scale(.6)' } }, { opacity: 1, attr: { transform: 'translate(960 560) scale(1)' }, duration: 0.4, ease: 'back.out(1.6)' }, aAt + 0.6)
      tl.fromTo(q('#tl-wrench-in'), { rotation: -35 }, { rotation: 25, transformOrigin: '0px 0px', duration: 0.35, repeat: 5, yoyo: true, ease: 'power2.inOut' }, aAt + 0.9)
      tl.fromTo(prog, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, aAt + 0.5)
      const pv = { v: 0 }
      const fill = prog.querySelector('#tl-fill') as HTMLElement, pct = prog.querySelector('#tl-pct') as HTMLElement
      tl.to(pv, { v: 100, duration: 2.6, ease: 'power1.inOut', onUpdate: () => { fill.style.width = `${pv.v}%`; pct.textContent = `${Math.round(pv.v)}%` } }, aAt + 0.6)
      tl.to(q('#tl-wrench'), { opacity: 0, duration: 0.3 }, aAt + 3.1)
      const pAt = aAt + 2.2
      tl.add(activate(2), pAt)
      tl.to(q('#tfd-ringgear'), { rotation: 90, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-carrier'), { rotation: -270, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-sun'), { rotation: 810, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      const cAt = pAt + 1.6
      tl.add(activate(3), cAt)
      tl.to(prog, { opacity: 0, duration: 0.4 }, cAt)
      tl.to(q('#tfd-hubface'), { opacity: 1, duration: 0.6 }, cAt)
      tl.fromTo(stamp, { opacity: 0, scale: 2.4, rotate: 10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: 'power4.in' }, cAt + 0.4)
      pop(tl, tagOT, cAt + 0.8)
      // 2 opciones: Reparación (izquierda) · Venta Intercambio (derecha, del stock)
      const altAt = cAt + 2.2
      tl.to([steps, stamp, tagOT, q('#tl-t1'), q('#tl-t2'), q('#tl-stand'), q('#tf-signs')], { opacity: 0, duration: 0.4 }, altAt - 0.3)
      tl.to(q('#tl-dim'), { opacity: 0.62, duration: 0.6 }, altAt)
      tl.to(q('#tl-fd'), { attr: { transform: 'translate(500 600) scale(.8)' }, duration: 1, ease: 'power3.inOut' }, altAt)
      tl.to(q('#tl-split'), { opacity: 0.6, duration: 0.6 }, altAt + 0.4)
      tl.fromTo(hL, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 0.6)
      pop(tl, tagL, altAt + 1)
      tl.fromTo(q('#tl-right'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 1.2)
      tl.fromTo(q('#tl-stock'), { opacity: 0, attr: { transform: 'translate(1440 800) scale(.2)' } }, { opacity: 1, attr: { transform: 'translate(1440 800) scale(.55)' }, duration: 0.8, ease: 'back.out(1.6)' }, altAt + 1.6)
      tl.fromTo(hR, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 1.8)
      pop(tl, tagR, altAt + 2.2)
      const qAt = altAt + 3.5
      tl.to([hL, hR, tagL, tagR], { opacity: 0, duration: 0.4 }, qAt - 0.3)
      tl.to([q('#tl-fd'), q('#tl-right'), q('#tl-split')], { opacity: 0.2, duration: 0.5 }, qAt - 0.3)
      tl.to(q('#tl-dim'), { opacity: 0.85, duration: 0.6 }, qAt - 0.3)
      const end = revealQuote(tl, q1, qAt, 2.0)
      sceneLeave(tl, root, end, 0.9)
      return end + 1 - at
    },
  }
}
