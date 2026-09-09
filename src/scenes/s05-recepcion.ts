import { el } from '../core/dom'
import { pttWorkshop, finalDrive, finalDriveSide, pttWorker, labBench, loosePart } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * RECEPCIÓN E INSPECCIÓN EN TALLER PTT + LABORATORIO DE INGENIERÍA (R2 · obs. 8).
 * El componente entra, se escanea y se desarma; el laboratorio retira una pieza, la estudia y la devuelve.
 */
export function recepcionScene(): Scene {
  const root = sceneRoot('recepcion')
  const bg = fullSvg(`${pttWorkshop('rf', ['D1', 'D2', 'D3'])}
    <rect x="1500" y="220" width="400" height="400" fill="#3a3f47" stroke="#2a2f36" stroke-width="6"/>
    <g id="rc-door">${Array.from({ length: 8 }, (_, i) => `<rect x="1506" y="${226 + i * 49}" width="388" height="45" fill="#4b525c"/>`).join('')}</g>
    <text x="1700" y="205" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="30" fill="#e0262b" letter-spacing="4">RECEPCIÓN</text>
  `)
  const art = fullSvg(`
    <g id="rc-crate" transform="translate(1600 520) scale(.5)" opacity="0">${finalDriveSide('rcc', 'PTT')}</g>
    <g id="rc-stand" transform="translate(620 640)" opacity="0">
      <rect x="-200" y="120" width="400" height="26" fill="#3d4a5a"/><rect x="-160" y="20" width="24" height="110" fill="#56657a"/><rect x="136" y="20" width="24" height="110" fill="#56657a"/>
      <g transform="translate(0 -100) scale(.8)">${finalDrive('rfd', 250)}</g>
    </g>
    <g id="rc-tech" transform="translate(1000 560) scale(1.05)" opacity="0">${pttWorker('rt1', true)}</g>
    <g id="rc-beam" opacity="0"><path d="M1030 590 L640 500 L640 620Z" fill="#f0503c" opacity=".35"/><line x1="1030" y1="590" x2="640" y2="560" stroke="#f0503c" stroke-width="3"/></g>
    <g id="rc-lab" transform="translate(1520 700)" opacity="0">${labBench('lab')}<g transform="translate(-60 -250) scale(.9)">${pttWorker('lw', false, '#2a2f36')}</g>
      <text x="0" y="-320" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="26" fill="#e0262b" letter-spacing="4">LABORATORIO · INGENIERÍA Y DESARROLLO</text></g>
    <g id="rc-part" transform="translate(700 600) scale(.6)" opacity="0"><g id="rc-part-in">${loosePart('rp', 44)}</g></g>
  `)
  const lt = lowerThird('Recepción e inspección en taller PTT', 'Evaluación técnica')
  const tagScan = tag('SCAN OK · FD-797-0412 recepcionado en WMS', 560, 900, 'ok')
  // R3 · obs. 2: evaluación → listado de repuestos → valorización → cotización → detalle al cliente
  const panel = el('div', { class: 'panel', html: `
    <div class="ph">Evaluación en taller</div>
    <div class="row"><span class="k">01 · Evaluación del componente</span><span class="v ok">✓</span></div>
    <div class="row"><span class="k">02 · Listado de repuestos</span><span class="v ok">Generado</span></div>
    <div class="row"><span class="k">03 · Valorización del listado</span><span class="v ok">✓</span></div>
    <div class="row"><span class="k">04 · Cotización al cliente</span><span class="v warn">Emitida</span></div>
    <div class="row"><span class="k">05 · Detalle de la evaluación al cliente</span><span class="v ok">Entregado</span></div>
  ` })
  Object.assign(panel.style, { left: '1160px', top: '160px', width: '660px' })
  const tagLab = tag('Ingeniería retira la pieza, la estudia y la devuelve', 1060, 900, 'info')
  // Copy propuesto por el cliente (R3 · obs. 2)
  const copy = el('div', { class: 'abs', html: '<div class="headline" style="font-size:42px;line-height:1">Evaluamos el componente y generamos el listado de repuestos.</div><div class="sub" style="font-size:27px;margin-top:12px;max-width:900px;color:var(--ink)">Con eso valorizamos, cotizamos y entregamos al cliente el detalle de la evaluación.</div>' })
  Object.assign(copy.style, { left: '120px', top: '850px', width: '1300px', opacity: '0' })
  root.append(bg, art, lt, tagScan, panel, tagLab, copy)

  return {
    id: 'recepcion', title: 'Recepción e ingeniería', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      tl.to(q('#rc-door'), { y: -390, duration: 1.2, ease: 'power2.inOut' }, at + 0.3)
      tl.to(q('#rc-crate'), { opacity: 1, duration: 0.4 }, at + 0.8)
      tl.to(q('#rc-crate'), { attr: { transform: 'translate(640 560) scale(1)' }, duration: 1.6, ease: 'power2.inOut' }, at + 1)
      tl.to(q('#rc-tech'), { opacity: 1, duration: 0.5 }, at + 1.6)
      const scanAt = at + 2.4
      tl.to(q('#rc-beam'), { opacity: 1, duration: 0.15, repeat: 5, yoyo: true }, scanAt)
      pop(tl, tagScan, scanAt + 0.6, 2.2)
      // Desarme sobre banco
      const openAt = scanAt + 1.4
      tl.to(q('#rc-crate'), { opacity: 0, attr: { transform: 'translate(640 560) scale(1.15)' }, duration: 0.5, ease: 'power2.in' }, openAt)
      tl.fromTo(q('#rc-stand'), { opacity: 0, y: 680 }, { opacity: 1, y: 640, duration: 0.8, ease: 'power3.out' }, openAt + 0.2)
      tl.to(q('#rfd-housing'), { x: -140, duration: 1, ease: 'power3.inOut' }, openAt + 0.9)
      tl.to(q('#rfd-ringgear'), { x: -50, duration: 1, ease: 'power3.inOut' }, openAt + 0.9)
      tl.to(q('#rfd-carrier'), { x: 60, rotation: 30, transformOrigin: '50% 50%', duration: 1, ease: 'power3.inOut' }, openAt + 0.9)
      tl.to(q('#rfd-sun'), { x: 170, duration: 1, ease: 'power3.inOut' }, openAt + 0.9)
      tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, openAt + 1)
      tl.fromTo(panel.querySelectorAll('.row'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.32, ease: 'power2.out' }, openAt + 1.2)
      tl.fromTo(copy, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, openAt + 1.4)
      // Laboratorio de ingeniería: retira una pieza, la estudia y la devuelve
      const labAt = openAt + 3.9
      tl.to(panel, { opacity: 0, y: -20, duration: 0.5 }, labAt - 0.2)
      tl.to(copy, { opacity: 0, y: -16, duration: 0.5 }, labAt - 0.2)
      tl.to(q('#rc-tech'), { opacity: 0, duration: 0.4 }, labAt - 0.2)
      tl.fromTo(q('#rc-lab'), { opacity: 0, attr: { transform: 'translate(1600 700)' } }, { opacity: 1, attr: { transform: 'translate(1520 700)' }, duration: 0.8, ease: 'power3.out' }, labAt)
      tl.set(q('#rc-part'), { opacity: 1, attr: { transform: 'translate(700 600) scale(.6)' } }, labAt + 0.4)
      tl.to(q('#rc-part'), { attr: { transform: 'translate(1370 690) scale(.6)' }, duration: 1, ease: 'power2.inOut' }, labAt + 0.4)
      tl.to(q('#rc-part-in'), { rotation: 360, transformOrigin: '50% 50%', duration: 1.6, ease: 'none' }, labAt + 0.4)
      tl.fromTo(q('#lab-screen'), { opacity: 0.3 }, { opacity: 1, duration: 0.2, repeat: 7, yoyo: true }, labAt + 1.4)
      pop(tl, tagLab, labAt + 1.2)
      tl.to(q('#rc-part'), { attr: { transform: 'translate(700 600) scale(.6)' }, duration: 0.9, ease: 'power2.inOut' }, labAt + 2.6)
      tl.fromTo(q('#rc-part'), { filter: 'brightness(2.4)' }, { filter: 'brightness(1)', duration: 0.6 }, labAt + 3.4)
      tl.to([q('#rc-lab'), q('#rc-stand'), q('#rc-part'), tagLab], { opacity: 0, duration: 0.5 }, labAt + 4)
      sceneLeave(tl, root, labAt + 4.2, 0.9)
      return labAt + 5.1 - at
    },
  }
}
