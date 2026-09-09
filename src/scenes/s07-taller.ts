import { el } from '../core/dom'
import { pttWorkshop, finalDrive, pttWorker } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 7 — Reparación en taller y aseguramiento de calidad.
 * Los repuestos llegan al banco; el mando final se ensambla (piezas convergen) y se certifica.
 */
export function tallerScene(): Scene {
  const root = sceneRoot('taller')
  const bg = fullSvg(`${pttWorkshop('tf', ['D1', 'D2', 'D3'])}
    <g id="tl-stand" transform="translate(960 660)"><rect x="-260" y="140" width="520" height="30" fill="#2a2f36"/><rect x="-200" y="30" width="26" height="120" fill="#4b525c"/><rect x="174" y="30" width="26" height="120" fill="#4b525c"/></g>
    <g id="tl-fd" transform="translate(960 560)">${finalDrive('tfd', 250)}</g>
    <g id="tl-t1" transform="translate(500 760)">${pttWorker('tt1', false)}</g>
    <g id="tl-t2" transform="translate(1420 760)">${pttWorker('tt2', true)}</g>
    <g id="tl-sparks" opacity="0">${Array.from({ length: 18 }, (_, i) => `<line x1="960" y1="560" x2="${960 + Math.cos(i) * 90}" y2="${560 + Math.sin(i * 1.7) * 90}" stroke="#ffc857" stroke-width="2"/>`).join('')}</g>
  `)
  const sparks = new Dust({ count: 60, color: '255, 200, 87', speed: 1.4, size: [1, 2.5], drift: 1.2, area: { x: 760, y: 400, w: 400, h: 300 } })
  const lt = lowerThird('Escena 07 · Reparación y control de calidad', 'Estándar de fábrica')
  const steps = el('div', { class: 'steps' })
  ;['Repuestos en banco', 'Armado y torque', 'Pruebas dinámicas', 'Certificación'].forEach((s, i) => steps.append(el('div', { class: 'step', html: `<span class="n">0${i + 1}</span>${s}` })))
  Object.assign(steps.style, { left: '120px', top: '160px' })
  const stamp = el('div', { class: 'abs', html: `<div style="font-family:var(--font-display);font-weight:700;font-size:54px;text-transform:uppercase;letter-spacing:.06em;color:#4ade80;border:6px solid #4ade80;padding:10px 30px;border-radius:10px;transform:rotate(-8deg);background:rgba(0,0,0,.4)">Aprobado · QA</div>` })
  Object.assign(stamp.style, { left: '1180px', top: '360px', opacity: '0' })
  const tagOT = tag('OT-4471 · Mando Final CAT 797F · Estación D2', 120, 940, 'ok')
  const q1 = quote('Reparado a estándar de fábrica. Listo para volver a la faena.', 120, 380, 1560)
  root.append(bg)
    root.append(sparks.canvas, lt, steps, stamp, tagOT, q1)

  return {
    id: 'taller', title: 'Escena 7 · Taller', root,
    onEnter: () => sparks.start(), onLeave: () => sparks.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const stepEls = Array.from(steps.children) as HTMLElement[]
      const activate = (i: number) => () => stepEls.forEach((s, k) => s.classList.toggle('active', k === i))
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.6, 4)
      tl.set(steps, { opacity: 1 }, at + 0.8); pop(tl, stepEls, at + 1)
      // Piezas fuera de lugar (explosión inicial) → convergen
      tl.set(q('#tfd-housing'), { x: -520, y: -60, opacity: 0.9 }, at)
      tl.set(q('#tfd-ringgear'), { x: -220, y: 240, rotation: 40, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-carrier'), { x: 260, y: 260, rotation: -50, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-sun'), { x: 520, y: -100, transformOrigin: '50% 50%' }, at)
      tl.set(q('#tfd-hubface'), { opacity: 0 }, at)
      tl.add(activate(0), at + 2)
      const aAt = at + 3.2
      tl.add(activate(1), aAt)
      tl.to(q('#tfd-housing'), { x: 0, y: 0, duration: 1.4, ease: 'power3.inOut' }, aAt)
      tl.to(q('#tfd-ringgear'), { x: 0, y: 0, rotation: 0, duration: 1.4, ease: 'power3.inOut' }, aAt + 0.5)
      tl.to(q('#tfd-carrier'), { x: 0, y: 0, rotation: 0, duration: 1.4, ease: 'power3.inOut' }, aAt + 1)
      tl.to(q('#tfd-sun'), { x: 0, y: 0, duration: 1.2, ease: 'power3.inOut' }, aAt + 1.5)
      tl.to(q('#tf-cable'), { attr: { y2: 420 }, duration: 1.2, ease: 'power2.inOut' }, aAt)
      tl.fromTo(q('#tl-sparks'), { opacity: 0, scale: 0.4, transformOrigin: '960px 560px' }, { opacity: 1, scale: 1.2, duration: 0.5, repeat: 5, yoyo: true }, aAt + 1)
      // Pruebas dinámicas: rotación
      const pAt = aAt + 3.4
      tl.add(activate(2), pAt)
      tl.to(q('#tfd-ringgear'), { rotation: 120, transformOrigin: '50% 50%', duration: 5, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-carrier'), { rotation: -360, transformOrigin: '50% 50%', duration: 5, ease: 'power1.in' }, pAt)
      tl.to(q('#tfd-sun'), { rotation: 1080, transformOrigin: '50% 50%', duration: 5, ease: 'power1.in' }, pAt)
      // Certificación: tapa CAT + sello
      const cAt = pAt + 3.2
      tl.add(activate(3), cAt)
      tl.to(q('#tfd-hubface'), { opacity: 1, duration: 0.8 }, cAt)
      tl.fromTo(stamp, { opacity: 0, scale: 2.4, rotate: 10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'power4.in' }, cAt + 0.6)
      pop(tl, tagOT, cAt + 1.2)
      // Cita
      const qAt = cAt + 4.2
      tl.to([steps, stamp, tagOT, q('#tl-t1'), q('#tl-t2')], { opacity: 0, duration: 0.5 }, qAt - 0.4)
      tl.to(q('#tl-fd'), { opacity: 0.2, duration: 0.8 }, qAt - 0.4)
      const end = revealQuote(tl, q1, qAt, 3.8)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
