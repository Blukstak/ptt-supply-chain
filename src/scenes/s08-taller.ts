import { el } from '../core/dom'
import { pttWorkshop, finalDrive, finalDriveSide, pttWorker, warehouseRack, crate } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ARMADO EN TALLER PTT (v1.2 esc. 7) + ALTERNATIVAS PARA EL CLIENTE (R2 · obs. 11 y 12, reubicadas).
 * La carga llega de bodega, el componente se arma y certifica con marca PTT; luego se nota que un
 * componente se armó y otro ya estaba en stock: reparado o stock inmediato.
 */
export function tallerScene(): Scene {
  const root = sceneRoot('taller')
  const bg = fullSvg(`${pttWorkshop('tf', ['D1', 'D2', 'D3'])}
    <rect id="tl-dim" width="1920" height="1080" fill="#05070a" opacity="0"/>
    <g id="tl-boxes"><g class="tl-box" transform="translate(-500 780)">${crate('tlc0', 300, 180, 'PTT')}<text x="150" y="-14" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="22" fill="#fff" letter-spacing="3">REPUESTOS DE BODEGA + COMPRAS</text></g></g>
    <g id="tl-stand" transform="translate(960 660)"><rect x="-260" y="140" width="520" height="30" fill="#2a2f36"/><rect x="-200" y="30" width="26" height="120" fill="#4b525c"/><rect x="174" y="30" width="26" height="120" fill="#4b525c"/></g>
    <g id="tl-fd" transform="translate(960 560)">${finalDrive('tfd', 250)}</g>
    <g id="tl-t1" transform="translate(500 760)">${pttWorker('tt1', false)}</g>
    <g id="tl-t2" transform="translate(1420 760)">${pttWorker('tt2', true)}</g>
    <g id="tl-sparks" opacity="0">${Array.from({ length: 18 }, (_, i) => `<line x1="960" y1="560" x2="${960 + Math.cos(i) * 90}" y2="${560 + Math.sin(i * 1.7) * 90}" stroke="#ffc857" stroke-width="2"/>`).join('')}</g>
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
  const stamp = el('div', { class: 'abs', html: `<div style="font-family:var(--font-display);font-weight:700;font-size:54px;text-transform:uppercase;letter-spacing:.06em;color:#4ade80;border:6px solid #4ade80;padding:10px 30px;border-radius:10px;transform:rotate(-8deg);background:rgba(0,0,0,.4)">Aprobado · QA</div>` })
  Object.assign(stamp.style, { left: '1180px', top: '360px', opacity: '0' })
  const tagOT = tag('OT-4471 · Mando final · Estación D2', 120, 940, 'ok')
  // Alternativas
  const hL = el('div', { class: 'abs', html: '<div class="kicker">Alternativa 1</div><div class="headline" style="font-size:60px;margin-top:8px">Componente <em>reparado</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:720px">Se armó en nuestro taller con repuestos de nuestra red internacional.</div>' })
  Object.assign(hL.style, { left: '110px', top: '130px', opacity: '0' })
  const hR = el('div', { class: 'abs', html: '<div class="kicker">Alternativa 2</div><div class="headline" style="font-size:60px;margin-top:8px">Componente de <em>stock</em></div><div class="sub" style="font-size:24px;margin-top:10px;max-width:720px">Ya estaba en nuestro inventario: entrega inmediata al cliente.</div>' })
  Object.assign(hR.style, { left: '1030px', top: '130px', opacity: '0' })
  const tagL = tag('Armado en taller PTT', 110, 940, 'ok')
  const tagR = tag('Stock propio · entrega inmediata', 1030, 940, 'ok')
  const q1 = quote('Dos alternativas para el cliente. Una respuesta rápida.', 120, 380, 1500)
  root.append(bg, sparks.canvas, lt, steps, stamp, tagOT, hL, hR, tagL, tagR, q1)

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
      // Piezas fuera de lugar → convergen; las cajas llegan desde bodega
      tl.set(q('#tfd-housing'), { x: -520, y: -60, opacity: 0.9 }, at)
      tl.set(q('#tfd-ringgear'), { x: -220, y: 240, rotation: 40, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-carrier'), { x: 260, y: 260, rotation: -50, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-sun'), { x: 520, y: -100, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-hubface'), { opacity: 0 }, at)
      tl.add(activate(0), at + 0.8)
      const boxes = Array.from(root.querySelectorAll('.tl-box')) as SVGGElement[]
      boxes.forEach((b) => {
        tl.to(b, { attr: { transform: 'translate(1580 780)' }, duration: 1.5, ease: 'power2.out' }, at + 0.3)
        tl.to(b, { opacity: 0, duration: 0.4 }, at + 2.2)
      })
      const aAt = at + 2
      tl.add(activate(1), aAt)
      tl.to(q('#tfd-housing'), { x: 0, y: 0, duration: 1.1, ease: 'power3.inOut' }, aAt)
      tl.to(q('#tfd-ringgear'), { x: 0, y: 0, rotation: 0, duration: 1.1, ease: 'power3.inOut' }, aAt + 0.35)
      tl.to(q('#tfd-carrier'), { x: 0, y: 0, rotation: 0, duration: 1.1, ease: 'power3.inOut' }, aAt + 0.7)
      tl.to(q('#tfd-sun'), { x: 0, y: 0, duration: 1, ease: 'power3.inOut' }, aAt + 1)
      tl.to(q('#tf-cable'), { attr: { y2: 420 }, duration: 1, ease: 'power2.inOut' }, aAt)
      tl.fromTo(q('#tl-sparks'), { opacity: 0, scale: 0.4, transformOrigin: '960px 560px' }, { opacity: 1, scale: 1.2, duration: 0.4, repeat: 5, yoyo: true }, aAt + 0.8)
      const pAt = aAt + 2.2
      tl.add(activate(2), pAt)
      tl.to(q('#tfd-ringgear'), { rotation: 90, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-carrier'), { rotation: -270, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-sun'), { rotation: 810, transformOrigin: '50% 50%', duration: 3, ease: 'power1.in' }, pAt)
      const cAt = pAt + 1.6
      tl.add(activate(3), cAt)
      tl.to(q('#tfd-hubface'), { opacity: 1, duration: 0.6 }, cAt)
      tl.fromTo(stamp, { opacity: 0, scale: 2.4, rotate: 10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: 'power4.in' }, cAt + 0.4)
      pop(tl, tagOT, cAt + 0.8)
      // Alternativas: el componente reparado a la izquierda; a la derecha, el que ya estaba en stock
      const altAt = cAt + 2.2
      tl.to([steps, stamp, tagOT, q('#tl-t1'), q('#tl-t2'), q('#tl-stand')], { opacity: 0, duration: 0.4 }, altAt - 0.3)
      tl.to(q('#tl-dim'), { opacity: 0.62, duration: 0.6 }, altAt)
      tl.to(q('#tl-fd'), { attr: { transform: 'translate(500 600) scale(.8)' }, duration: 1, ease: 'power3.inOut' }, altAt)
      tl.to(q('#tl-split'), { opacity: 0.6, duration: 0.6 }, altAt + 0.4)
      tl.fromTo(hL, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 0.6)
      pop(tl, tagL, altAt + 1)
      tl.fromTo(q('#tl-right'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 1.2)
      tl.fromTo(q('#tl-stock'), { opacity: 0, attr: { transform: 'translate(1440 800) scale(.2)' } }, { opacity: 1, attr: { transform: 'translate(1440 800) scale(.55)' }, duration: 0.8, ease: 'back.out(1.6)' }, altAt + 1.6)
      tl.fromTo(hR, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, altAt + 1.8)
      pop(tl, tagR, altAt + 2.2)
      const qAt = altAt + 3.8
      tl.to([hL, hR, tagL, tagR], { opacity: 0, duration: 0.4 }, qAt - 0.3)
      tl.to([q('#tl-fd'), q('#tl-right'), q('#tl-split')], { opacity: 0.2, duration: 0.5 }, qAt - 0.3)
      tl.to(q('#tl-dim'), { opacity: 0.85, duration: 0.6 }, qAt - 0.3)
      const end = revealQuote(tl, q1, qAt, 2)
      sceneLeave(tl, root, end, 0.9)
      return end + 1 - at
    },
  }
}
