import { el } from '../core/dom'
import { minePit, truck797, finalDrive, finalDriveSide, hoursGauge, fieldWorkshop, pttWorker, lowboyTruck } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * CONTRATO DE MANTENCIÓN EN FAENA (R2 · obs. 2, 4, 5) + retiro del componente (v1.2 esc. 3, comprimida).
 * 1) El camión entra a un taller PTT dentro de la mina, con personal PTT.
 * 2) Camión completo con componentes destacados (motor, transmisión, diferencial, mandos finales, maza suspensión).
 * 3) Close-up: componente exterior (Imagen 9) → engranajes girando → horas de operación.
 * 4) El componente sale de la faena en cama baja hacia el taller PTT.
 */
export function faenaScene(): Scene {
  const root = sceneRoot('faena')
  const bg = fullSvg(minePit('mine1'))
  const dust = new Dust({ count: 140, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })
  const shedSvg = fullSvg(`
    <g id="fw-wrap" transform="translate(300 900) scale(1.3)">${fieldWorkshop('fw')}</g>
    <g id="fw-people" opacity="0">
      <g transform="translate(470 660) scale(.8)">${pttWorker('fwp1', true)}</g>
      <g transform="translate(1560 660) scale(.8)">${pttWorker('fwp2', false)}</g>
    </g>
  `)
  // Despiece (obs. 5): rótulos en coordenadas locales del camión
  const parts = [
    { x: 60, y: 266, r: 78, lx: 0, ly: -120, label: 'MOTOR' },
    { x: 470, y: 325, r: 60, lx: 470, ly: -120, label: 'TRANSMISIÓN' },
    { x: 930, y: 330, r: 55, lx: 930, ly: -120, label: 'DIFERENCIAL' },
    { x: 230, y: 370, r: 70, lx: 230, ly: 570, label: 'CONJUNTO MAZA SUSPENSIÓN' },
    { x: 990, y: 370, r: 100, lx: 990, ly: 570, label: 'MANDOS FINALES' },
  ]
  const truckSvg = fullSvg(`<g id="truck-wrap" transform="translate(2100 601) scale(.6)">${truck797('t')}
    <g id="dp" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="34" fill="#e9eef4" letter-spacing="2">
      ${parts.map((p, i) => `<g class="dp-item" opacity="0"><circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="#e0262b" fill-opacity=".18" stroke="#e0262b" stroke-width="4"/><line x1="${p.x}" y1="${p.y + (p.ly < 0 ? -p.r : p.r)}" x2="${p.lx}" y2="${p.ly + (p.ly < 0 ? 14 : -30)}" stroke="#e0262b" stroke-width="3"/><rect x="${p.lx - p.label.length * 10.5 - 14}" y="${p.ly - 32}" width="${p.label.length * 21 + 28}" height="46" rx="4" fill="#0a0e14" fill-opacity=".85" stroke="#e0262b" stroke-width="2"/><text x="${p.lx}" y="${p.ly}" text-anchor="middle">${i === 4 ? '<tspan fill="#ffcd11">' + p.label + '</tspan>' : p.label}</text></g>`).join('')}
    </g>
  </g>`)

  // Vista técnica: componente exterior (Imagen 9) → corte con engranajes + horas
  const fdSvg = fullSvg(`
    <defs><radialGradient id="fd-bg" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#1b2330"/><stop offset="1" stop-color="#07090c"/></radialGradient></defs>
    <rect id="fd-bgrect" width="1920" height="1080" fill="url(#fd-bg)" opacity="0"/>
    <g id="fd-ext" transform="translate(700 560) scale(.4)" opacity="0">${finalDriveSide('fde', 'PTT')}</g>
    <g id="fd-wrap" transform="translate(620 540)" opacity="0">${finalDrive('fd', 250)}</g>
    <g id="fd-callouts" opacity="0" font-family="JetBrains Mono, monospace" font-size="15" fill="#9aa7b6" letter-spacing="2">
      <path d="M840 360 L960 300 L1080 300" stroke="#e0262b" stroke-width="2" fill="none"/><text x="1090" y="305" fill="#e9eef4">CORONA (RING GEAR)</text>
      <path d="M760 620 L960 760 L1080 760" stroke="#e0262b" stroke-width="2" fill="none"/><text x="1090" y="765" fill="#e9eef4">PORTA PLANETARIOS</text>
      <path d="M660 540 L960 540 L1080 540" stroke="#e0262b" stroke-width="2" fill="none"/><text x="1090" y="545" fill="#e9eef4">SOLAR (SUN GEAR)</text>
    </g>
    <g id="fd-gauge" transform="translate(1440 560)" opacity="0">${hoursGauge('g1', 170)}<text text-anchor="middle" y="${170 * 0.52}" font-family="JetBrains Mono, monospace" font-size="15" fill="#5f6d7d" letter-spacing="2">MÁX. 18.000 H</text></g>
    <g id="fd-link" opacity="0"><text x="700" y="150" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="44" fill="#e9eef4" letter-spacing="2">MANDO FINAL · CAT 797F</text><text x="700" y="190" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16" fill="#9aa7b6" letter-spacing="3">COMPONENTE DE LA RUEDA TRASERA · EN LA PUNTA, LOS ENGRANAJES</text></g>
  `)
  const semiSvg = fullSvg(`<g id="rt-semi" transform="translate(-1000 720) scale(.95)">${lowboyTruck('semi')}<g transform="translate(330 140) scale(.42)">${finalDriveSide('cr', 'PTT')}</g></g>`)

  const lt1 = lowerThird('Contrato de mantención en faena', 'Personal PTT dentro de la minera')
  const intro = el('div', { class: 'sub abs', html: 'Operamos un <b style="color:var(--ink);font-weight:600">contrato de mantención dentro de la minera</b>: nuestro personal recibe el camión en el taller de la faena y desde ahí sale el componente hacia nuestros talleres.' })
  Object.assign(intro.style, { left: '120px', top: '130px', maxWidth: '900px', opacity: '0', fontSize: '30px', textShadow: '0 4px 24px rgba(0,0,0,.8)' })
  const tagParts = tag('Componentes que reparamos en PTT', 120, 130, 'info')
  const tagLife = tag('Próximo a cumplir vida útil programada · cambio a las 18.000 h', 1180, 820)
  const tagGD = tag('Guía de despacho · Trazabilidad activa · Destino: Taller PTT', 120, 150, 'ok')
  const q1 = quote('Todo comienza antes de que ocurra una falla (generalmente).', 120, 300, 1500)

  root.append(bg)
  photoBg(root, 'mine-day.jpg', bg)
  root.append(dust.canvas, shedSvg, truckSvg, fdSvg, semiSvg, lt1, intro, tagParts, tagLife, tagGD, q1)

  return {
    id: 'faena', title: 'Contrato en faena', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const wheels = ['#t-w1', '#t-w2', '#t-w3'].map(q)
      const truck = q('#truck-wrap')
      sceneEnter(tl, root, at, 1.2)
      tl.fromTo(q('#mine1-benches'), { y: 40, scale: 1.03, transformOrigin: '50% 100%' }, { y: 0, scale: 1, duration: 5, ease: 'power2.out' }, at)
      showLowerThird(tl, lt1, at + 0.6, 3)
      tl.fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, at + 1)
      // 1) Portón del taller en faena se abre, personal PTT y camión entra
      tl.to(q('#fw-door'), { y: -240, duration: 1.2, ease: 'power2.inOut' }, at + 0.3)
      tl.to(q('#fw-people'), { opacity: 1, duration: 0.5 }, at + 0.8)
      tl.set(truck, { attr: { transform: 'translate(2100 601) scale(.6)' } }, at)
      tl.to(truck, { attr: { transform: 'translate(676 601) scale(.6)' }, duration: 2.6, ease: 'power2.out' }, at + 0.6)
      tl.to(wheels, { rotation: -720, transformOrigin: '50% 50%', duration: 2.8, ease: 'power2.out' }, at + 0.6)
      tl.to(q('#t-bed'), { y: 2, duration: 0.15, repeat: 22, yoyo: true, ease: 'sine.inOut' }, at + 0.6)

      // 2) Despiece: camión al frente con componentes destacados
      const dAt = at + 4
      tl.to(intro, { opacity: 0, y: -10, duration: 0.4 }, dAt - 0.3)
      tl.to([shedSvg, bg, dust.canvas], { opacity: 0.25, duration: 0.8 }, dAt)
      tl.to(truck, { attr: { transform: 'translate(480 470) scale(.72)' }, duration: 1, ease: 'power3.inOut' }, dAt)
      pop(tl, tagParts, dAt + 0.6)
      tl.fromTo(root.querySelectorAll('.dp-item'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.25, ease: 'back.out(1.8)' }, dAt + 0.7)

      // 3) Close-up al mando final: zoom a la rueda trasera → componente exterior → engranajes → horas
      const zoomAt = dAt + 3.2
      tl.to(tagParts, { opacity: 0, duration: 0.3 }, zoomAt)
      tl.to(root.querySelectorAll('.dp-item'), { opacity: 0, duration: 0.4 }, zoomAt)
      tl.to(truckSvg, { scale: 3.2, x: -3175, y: -1911, transformOrigin: '50% 50%', duration: 1.6, ease: 'power3.inOut' }, zoomAt)
      tl.to(truckSvg, { opacity: 0.12, duration: 0.6 }, zoomAt + 1)
      tl.to(q('#fd-bgrect'), { opacity: 0.94, duration: 0.8 }, zoomAt + 1)
      tl.fromTo(q('#fd-link'), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 }, zoomAt + 1.2)
      tl.fromTo(q('#fd-ext'), { opacity: 0, attr: { transform: 'translate(700 560) scale(.4)' } }, { opacity: 1, attr: { transform: 'translate(700 560) scale(1.45)' }, duration: 1.1, ease: 'power4.out' }, zoomAt + 1.2)
      // el exterior se desplaza y "abre" al corte con engranajes (en la punta)
      const gearsAt = zoomAt + 2.6
      tl.to(q('#fd-ext'), { attr: { transform: 'translate(1180 560) scale(.9)' }, opacity: 0.35, duration: 0.9, ease: 'power3.inOut' }, gearsAt)
      tl.fromTo(q('#fd-wrap'), { attr: { transform: 'translate(620 540) scale(.3)' }, opacity: 0 }, { attr: { transform: 'translate(620 540) scale(1)' }, opacity: 1, duration: 1, ease: 'power4.out' }, gearsAt)
      tl.to(q('#fd-ringgear'), { rotation: 60, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, gearsAt)
      tl.to(q('#fd-carrier'), { rotation: -180, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, gearsAt)
      tl.to(q('#fd-sun'), { rotation: 540, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, gearsAt)
      tl.to(q('#fd-callouts'), { opacity: 1, duration: 0.6 }, gearsAt + 0.8)
      const gAt = gearsAt + 1
      const circ = 2 * Math.PI * 170
      const val = { v: 0 }
      const valEl = q('#g1-val')
      tl.to(q('#fd-ext'), { opacity: 0, duration: 0.5 }, gAt)
      tl.to(q('#fd-gauge'), { opacity: 1, duration: 0.5 }, gAt)
      tl.to(q('#g1-arc'), { strokeDashoffset: circ * (1 - 17650 / 18000), duration: 2, ease: 'power2.out' }, gAt)
      tl.to(val, { v: 17650, duration: 2, ease: 'power2.out', onUpdate: () => { valEl.textContent = Math.round(val.v).toLocaleString('es-CL') } }, gAt)
      tl.to(q('#g1-arc'), { stroke: '#f0503c', duration: 0.5, repeat: 3, yoyo: true }, gAt + 2)
      pop(tl, tagLife, gAt + 1.8)

      // 4) El componente sale de la faena en cama baja hacia el taller PTT
      const rAt = gAt + 3.8
      tl.to([q('#fd-callouts'), q('#fd-gauge'), q('#fd-link'), q('#fd-wrap'), tagLife, q('#fd-bgrect'), truckSvg], { opacity: 0, duration: 0.6 }, rAt - 0.5)
      tl.set([bg, dust.canvas], { scale: 1, x: 0, y: 0 }, rAt - 0.5)
      tl.to([bg, dust.canvas], { opacity: 1, duration: 0.8 }, rAt - 0.4)
      tl.to(shedSvg, { opacity: 0.35, duration: 0.8 }, rAt - 0.4)
      tl.to(q('#rt-semi'), { attr: { transform: 'translate(2200 720) scale(.95)' }, duration: 4.6, ease: 'power1.inOut' }, rAt)
      tl.to(['#semi-w0', '#semi-w1', '#semi-w2', '#semi-w3', '#semi-w4'].map(q), { rotation: 1400, transformOrigin: '50% 50%', duration: 4.6, ease: 'power1.inOut' }, rAt)
      pop(tl, tagGD, rAt + 0.8, 3)
      const end = revealQuote(tl, q1, rAt + 1.2, 2.1)
      sceneLeave(tl, root, end, 0.9)
      return end + 1 - at
    },
  }
}
