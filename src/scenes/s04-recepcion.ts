import { el } from '../core/dom'
import { industrialFloor, hangingLights, finalDrive, technician, crate, wmsScreen } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 4 — Recepción, inspección y evaluación técnica en PTT.
 * Escaneo de código de barras → WMS → desarme, metrología, informe técnico y presupuesto.
 */
export function recepcionScene(): Scene {
  const root = sceneRoot('recepcion')
  const bg = fullSvg(`${industrialFloor('rf')}${hangingLights('rl', [260, 700, 1180, 1660], 60)}
    <!-- portón de recepción -->
    <rect x="1380" y="180" width="440" height="440" fill="#0b0f15" stroke="#2a3441" stroke-width="6"/>
    <g id="rc-door">${Array.from({ length: 8 }, (_, i) => `<rect x="1386" y="${186 + i * 54}" width="428" height="50" fill="#1b232e"/>`).join('')}</g>
    <text x="1600" y="150" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="34" fill="#ffcd11" letter-spacing="4">RECEPCIÓN</text>
  `)
  const art = fullSvg(`
    <g id="rc-crate" transform="translate(1520 560) scale(.6)" opacity="0">${crate('rcc', 420, 210, 'FD-797 · USADO')}</g>
    <g id="rc-stand" transform="translate(620 640)" opacity="0">
      <rect x="-200" y="120" width="400" height="26" fill="#3d4a5a"/><rect x="-160" y="20" width="24" height="110" fill="#56657a"/><rect x="136" y="20" width="24" height="110" fill="#56657a"/>
      <g transform="translate(0 -100) scale(.8)">${finalDrive('rfd', 250)}</g>
    </g>
    <g id="rc-tech" transform="translate(1000 560) scale(1.05)" opacity="0">${technician('rt1', '#ffcd11', true)}</g>
    <g id="rc-beam" opacity="0"><path d="M1030 590 L560 520 L560 640Z" fill="#f0503c" opacity=".35"/><line x1="1030" y1="590" x2="560" y2="580" stroke="#f0503c" stroke-width="3"/></g>
    <g id="rc-wms" transform="translate(1160 120) scale(.72)" opacity="0">${wmsScreen('rw', 760, 470)}</g>
  `)
  const lt = lowerThird('Escena 04 · Recepción e inspección', 'Evaluación técnica')
  const tagScan = tag('SCAN OK · FD-797-0412 recepcionado en WMS', 560, 900, 'ok')
  const panel = el('div', { class: 'panel', html: `
    <div class="ph">Protocolo de evaluación</div>
    <div class="row"><span class="k">01 · Inspección visual y lavado</span><span class="v ok">✓</span></div>
    <div class="row"><span class="k">02 · Desarme controlado</span><span class="v ok">✓</span></div>
    <div class="row"><span class="k">03 · Metrología y ensayos NDT</span><span class="v ok">✓</span></div>
    <div class="row"><span class="k">04 · Análisis de falla</span><span class="v warn">Desgaste corona · 0,8 mm</span></div>
    <div class="row"><span class="k">05 · Informe técnico y presupuesto</span><span class="v">Emitido · 48 h</span></div>
  ` })
  Object.assign(panel.style, { left: '1160px', top: '160px', width: '660px' })
  const q1 = quote('Inspeccionar, evaluar, decidir. Con datos.', 120, 400, 1300)

  root.append(bg)
  photoBg(root, 'workshop.jpg', bg)
  root.append(art, lt, tagScan, panel, q1)

  return {
    id: 'recepcion', title: 'Escena 4 · Recepción', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.6, 4)
      // Portón sube, caja entra y se traslada al banco
      tl.to(q('#rc-door'), { y: -430, duration: 1.6, ease: 'power2.inOut' }, at + 0.4)
      tl.to(q('#rc-crate'), { opacity: 1, duration: 0.5 }, at + 1.2)
      tl.to(q('#rc-crate'), { attr: { transform: 'translate(560 470) scale(1)' }, duration: 2.2, ease: 'power2.inOut' }, at + 1.6)
      tl.to(q('#rc-tech'), { opacity: 1, duration: 0.6 }, at + 2.6)
      // Escaneo
      const scanAt = at + 4.2
      tl.to(q('#rc-wms'), { opacity: 1, duration: 0.6 }, scanAt - 0.4)
      tl.to(q('#rc-beam'), { opacity: 1, duration: 0.15, repeat: 5, yoyo: true }, scanAt)
      tl.add(() => { const s = root.querySelector('#rw-status'); if (s) s.textContent = '▮ SCAN OK — FD-797-0412 · RECEPCIONADO · UBIC. INSP-01' }, scanAt + 0.9)
      tl.fromTo(root.querySelectorAll('.rw-row')[0], { opacity: 0.2 }, { opacity: 1, duration: 0.3, repeat: 3, yoyo: true }, scanAt + 0.9)
      pop(tl, tagScan, scanAt + 1)
      // Caja → mando final sobre banco (desembalaje)
      const openAt = scanAt + 3.2
      tl.to(q('#rc-crate'), { opacity: 0, attr: { transform: 'translate(560 470) scale(1.15)' }, duration: 0.6, ease: 'power2.in' }, openAt)
      tl.fromTo(q('#rc-stand'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, openAt + 0.3)
      tl.to(tagScan, { opacity: 0, duration: 0.4 }, openAt)
      tl.to(q('#rc-wms'), { opacity: 0, duration: 0.5 }, openAt)
      // Desarme "explode": ring / carrier / sun se separan
      tl.to(q('#rfd-housing'), { x: -140, duration: 1.2, ease: 'power3.inOut' }, openAt + 1.2)
      tl.to(q('#rfd-ringgear'), { x: -50, duration: 1.2, ease: 'power3.inOut' }, openAt + 1.2)
      tl.to(q('#rfd-carrier'), { x: 60, rotation: 30, transformOrigin: '50% 50%', duration: 1.2, ease: 'power3.inOut' }, openAt + 1.2)
      tl.to(q('#rfd-sun'), { x: 170, duration: 1.2, ease: 'power3.inOut' }, openAt + 1.2)
      tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, openAt + 1.4)
      tl.fromTo(panel.querySelectorAll('.row'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.7, ease: 'power2.out' }, openAt + 1.8)
      // Cita
      const qAt = openAt + 7.2
      tl.to([panel, q('#rc-tech'), q('#rc-stand')], { opacity: 0, duration: 0.6 }, qAt - 0.4)
      const end = revealQuote(tl, q1, qAt, 3.6)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
