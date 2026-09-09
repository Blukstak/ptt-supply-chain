import { el } from '../core/dom'
import { minePit, truck797, semiTruck, finalDriveSide, finalDrive } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 8 — Distribución, instalación y cierre del ciclo.
 * El componente reparado vuelve a la faena; el 797 retoma la operación. Cierre de marca.
 */
export function cierreScene(): Scene {
  const root = sceneRoot('cierre')
  const bg = fullSvg(minePit('mine3'))
  const dawn = el('div', { class: 'layer' })
  dawn.style.background = 'linear-gradient(to bottom, rgba(245,166,35,.22), rgba(0,0,0,0) 55%)'
  const dust = new Dust({ count: 140, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })
  const art = fullSvg(`
    <g id="cl-semi" transform="translate(-1000 700) scale(.9)">${semiTruck('cls')}<g transform="translate(290 -30) scale(.5)">${finalDriveSide('clc', 'FD-797')}</g></g>
    <g id="cl-797" transform="translate(2100 500) scale(.72)">${truck797('c7')}</g>
    <g id="cl-fd" transform="translate(1186 766) scale(.15)" opacity="0">${finalDrive('cfd', 250)}</g>
  `)
  const lt = lowerThird('Escena 08 · Distribución e instalación', 'Continuidad operacional')
  const tagDel = tag('Entrega en faena · 100% a tiempo · Detención programada Sem. 38', 120, 940, 'ok')
  const q1 = quote('El ciclo se cierra. La operación continúa.', 120, 400, 1400)

  // Cierre de marca: anillo de procesos
  const endCard = el('div', { class: 'abs' })
  Object.assign(endCard.style, { inset: '0', background: 'radial-gradient(ellipse at 50% 50%, #151c26, #05070a 70%)', opacity: '0' })
  const ringSvg = fullSvg(`
    <g id="ec-ring" transform="translate(1320 540)">
      <circle r="300" fill="none" stroke="#2a3441" stroke-width="2"/>
      <circle id="ec-arc" r="300" fill="none" stroke="#f5a623" stroke-width="4" stroke-dasharray="${2 * Math.PI * 300}" stroke-dashoffset="${2 * Math.PI * 300}" transform="rotate(-90)"/>
      ${['Planificación', 'Retiro', 'Recepción', 'Abastecimiento', 'Bodega · WMS', 'Reparación', 'Distribución'].map((s, i, a) => {
        const ang = (i / a.length) * Math.PI * 2 - Math.PI / 2, x = Math.cos(ang) * 300, y = Math.sin(ang) * 300
        const lx = Math.cos(ang) * 360, ly = Math.sin(ang) * 360
        const anchor = Math.abs(Math.cos(ang)) < 0.2 ? 'middle' : Math.cos(ang) > 0 ? 'start' : 'end'
        return `<g class="ec-node" opacity="0"><circle cx="${x}" cy="${y}" r="12" fill="#f5a623"/><text x="${lx}" y="${ly + 8}" text-anchor="${anchor}" font-family="Barlow Condensed" font-weight="600" font-size="26" fill="#e9eef4" letter-spacing="2">${s.toUpperCase()}</text></g>`
      }).join('')}
      <g transform="scale(.55)" opacity=".9">${finalDrive('ecfd', 250)}</g>
    </g>
  `)
  endCard.append(ringSvg)
  const brand = el('div', { class: 'abs', html: `
    <div class="kicker">Power Train Technologies</div>
    <div class="headline" style="font-size:150px;margin-top:10px">PTT<em>.</em></div>
    <div class="sub" style="margin-top:20px;max-width:640px">Supply Chain integrada para la continuidad operacional de la minería.</div>
    <div class="mono" style="margin-top:40px;font-size:15px;letter-spacing:.2em;color:var(--ink-3)">REPARACIÓN DE COMPONENTES MAYORES · CAT 797 · MANDOS FINALES · TRANSMISIONES · DIFERENCIALES</div>
  ` })
  Object.assign(brand.style, { left: '120px', top: '330px', opacity: '0' })
  root.append(bg)
  photoBg(root, 'mine-dawn.jpg', bg)
  root.append(dawn, dust.canvas, art, lt, tagDel, q1, endCard, brand)

  return {
    id: 'cierre', title: 'Escena 8 · Cierre', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.4)
      showLowerThird(tl, lt, at + 0.6, 4)
      // Camión de reparto entra y se detiene
      tl.to(q('#cl-semi'), { attr: { transform: 'translate(640 700) scale(.9)' }, duration: 4.5, ease: 'power2.out' }, at + 0.3)
      tl.to(['#cls-w0', '#cls-w1', '#cls-w2', '#cls-w3', '#cls-w4'].map(q), { rotation: 900, transformOrigin: '50% 50%', duration: 4.5, ease: 'power2.out' }, at + 0.3)
      pop(tl, tagDel, at + 4.2)
      // 797 entra y el mando final "se instala" (tapa CAT en la rueda)
      tl.to(q('#cl-797'), { attr: { transform: 'translate(560 500) scale(.72)' }, duration: 4, ease: 'power2.out' }, at + 5)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -600, transformOrigin: '50% 50%', duration: 4, ease: 'power2.out' }, at + 5)
      tl.to(q('#cl-semi'), { opacity: 0, duration: 0.8 }, at + 6)
      tl.set(q('#cfd-hubface'), { opacity: 1 }, at)
      tl.fromTo(q('#cl-fd'), { opacity: 0, attr: { transform: 'translate(1186 766) scale(.6)' } }, { opacity: 1, attr: { transform: 'translate(1186 766) scale(.15)' }, duration: 1.2, ease: 'power3.in' }, at + 9)
      tl.fromTo(q('#cl-fd'), { filter: 'brightness(3)' }, { filter: 'brightness(1)', duration: 0.6 }, at + 10.2)
      tl.to(tagDel, { opacity: 0, duration: 0.4 }, at + 10)
      // El 797 retoma la operación: sale por la izquierda
      tl.to([q('#cl-797'), q('#cl-fd')], { x: -1800, duration: 6, ease: 'power2.in' }, at + 11)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -1600, transformOrigin: '50% 50%', duration: 6, ease: 'power2.in' }, at + 11)
      const end = revealQuote(tl, q1, at + 12.6, 3.6)
      // End card
      const eAt = end + 0.2
      tl.to(endCard, { opacity: 1, duration: 1.2 }, eAt)
      tl.to([bg, dawn, dust.canvas, art], { opacity: 0, duration: 1 }, eAt)
      tl.to(q('#ec-arc'), { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut' }, eAt + 0.6)
      tl.fromTo(ringSvg.querySelectorAll('.ec-node'), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.38 }, eAt + 0.8)
      tl.to(q('#ecfd-ringgear'), { rotation: 90, transformOrigin: '50% 50%', duration: 14, ease: 'none' }, eAt)
      tl.to(q('#ecfd-carrier'), { rotation: -270, transformOrigin: '50% 50%', duration: 14, ease: 'none' }, eAt)
      tl.to(q('#ecfd-sun'), { rotation: 810, transformOrigin: '50% 50%', duration: 14, ease: 'none' }, eAt)
      tl.fromTo(brand, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, eAt + 1.4)
      tl.to({}, { duration: 0.1 }, eAt + 9)
      return eAt + 9.2 - at
    },
  }
}
