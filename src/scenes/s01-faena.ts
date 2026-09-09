import { el } from '../core/dom'
import { minePit, truck797, finalDrive, hoursGauge } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 1 — El inicio de la historia.
 * Faena → camión 797 → mando final próximo a cumplir horas → planificación del reemplazo.
 */
export function faenaScene(): Scene {
  const root = sceneRoot('faena')
  const bg = fullSvg(minePit('mine'))
  const truckSvg = fullSvg(`<g id="truck-wrap" transform="translate(2100 500) scale(.72)">${truck797('t')}</g>`)
  const dust = new Dust({ count: 160, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })

  // Vista técnica del mando final (aparece al hacer zoom sobre la rueda)
  const fdSvg = fullSvg(`
    <defs><radialGradient id="fd-bg" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#1b2330"/><stop offset="1" stop-color="#07090c"/></radialGradient></defs>
    <rect id="fd-bgrect" width="1920" height="1080" fill="url(#fd-bg)" opacity="0"/>
    <g id="fd-wrap" transform="translate(620 540)">${finalDrive('fd', 250)}</g>
    <g id="fd-callouts" opacity="0" font-family="JetBrains Mono, monospace" font-size="15" fill="#9aa7b6" letter-spacing="2">
      <path d="M840 360 L960 300 L1080 300" stroke="#f5a623" stroke-width="2" fill="none"/><text x="1090" y="305" fill="#e9eef4">CORONA (RING GEAR)</text>
      <path d="M760 620 L960 760 L1080 760" stroke="#f5a623" stroke-width="2" fill="none"/><text x="1090" y="765" fill="#e9eef4">PORTA PLANETARIOS</text>
      <path d="M660 540 L960 540 L1080 540" stroke="#f5a623" stroke-width="2" fill="none"/><text x="1090" y="545" fill="#e9eef4">SOLAR (SUN GEAR)</text>
    </g>
    <g id="fd-gauge" transform="translate(1440 560)" opacity="0">${hoursGauge('g1', 170)}<text text-anchor="middle" y="${170 * 0.52}" font-family="JetBrains Mono, monospace" font-size="15" fill="#5f6d7d" letter-spacing="2">MÁX. 18.000 H</text></g>
    <g id="fd-link" opacity="0"><text x="620" y="150" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="44" fill="#e9eef4" letter-spacing="2">MANDO FINAL · CAT 797F</text><text x="620" y="190" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16" fill="#9aa7b6" letter-spacing="3">COMPONENTE DE LA RUEDA TRASERA DEL CAMIÓN</text><path d="M620 205 L620 250" stroke="#e0262b" stroke-width="3"/></g>
  `)

  const lt1 = lowerThird('Escena 01 · Nuestros clientes', 'La gran minería del país')
  const intro = el('div', { class: 'sub abs', html: 'Nuestros principales clientes son la <b style="color:var(--ink);font-weight:600">gran minería del país</b>. Ellos desmontan componentes de sus camiones de extracción y equipos de apoyo, y nosotros los bajamos a nuestros talleres.' })
  Object.assign(intro.style, { left: '120px', top: '150px', maxWidth: '760px', opacity: '0', fontSize: '32px', textShadow: '0 4px 24px rgba(0,0,0,.8)' })
  const q1 = quote('Todo comienza antes de que ocurra una falla (generalmente).', 120, 360, 1500)
  const q2 = quote('Planificación. Anticipación. Continuidad operacional.', 120, 400, 1500)

  const tagLife = tag('Próximo a cumplir vida útil programada', 1180, 820)
  const tagPlan = tag('Plan de mantenimiento · Detención programada', 120, 120, 'info')

  // Panel de planificación
  const panel = el('div', { class: 'panel', html: `
    <div class="ph">Programa de mantenimiento</div>
    <div class="row"><span class="k">Equipo</span><span class="v">CAT 797F · CE-014</span></div>
    <div class="row"><span class="k">Componente</span><span class="v">Mando Final · Lado izq.</span></div>
    <div class="row"><span class="k">Horas actuales</span><span class="v warn">17.650 h</span></div>
    <div class="row"><span class="k">Cambio programado</span><span class="v">18.000 h</span></div>
    <div class="row"><span class="k">Ventana de detención</span><span class="v">Sem. 38 · 36 h</span></div>
    <div class="row"><span class="k">Componente de reemplazo</span><span class="v ok" id="p-status">DISPONIBLE ✓</span></div>
  ` })
  Object.assign(panel.style, { left: '1160px', top: '200px', width: '640px' })

  // Componente nuevo (mando final con tapa CAT) listo para instalar
  const newSvg = fullSvg(`<g id="new-wrap" transform="translate(560 560) scale(.9)" opacity="0">${finalDrive('nfd', 250)}</g>`)
  const tagNew = tag('Componente nuevo listo para instalación', 300, 900, 'ok')

  root.append(bg)
  photoBg(root, 'mine-day.jpg', bg)
  root.append(dust.canvas, truckSvg, fdSvg, newSvg, lt1, intro, q1, q2, tagLife, tagPlan, panel, tagNew)

  return {
    id: 'faena', title: 'Escena 1 · Faena', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const wheels = ['#t-w1', '#t-w2', '#t-w3'].map(q)
      const truck = q('#truck-wrap')
      const haze = q('#mine-haze')
      sceneEnter(tl, root, at, 1.6)
      // Paralaje inicial de la faena
      tl.fromTo(q('#mine-far'), { y: 30 }, { y: 0, duration: 6, ease: 'power2.out' }, at)
      tl.fromTo(q('#mine-benches'), { y: 60, scale: 1.04, transformOrigin: '50% 100%' }, { y: 0, scale: 1, duration: 6, ease: 'power2.out' }, at)
      tl.fromTo(haze, { opacity: 0.2 }, { opacity: 0.8, duration: 6 }, at)
      showLowerThird(tl, lt1, at + 0.8, 5.5)
      tl.fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, at + 2)
      tl.to(intro, { opacity: 0, y: -10, duration: 0.5 }, at + 7.6)
      // Camión entra por la derecha, en marcha hacia la izquierda
      tl.set(truck, { attr: { transform: 'translate(2100 500) scale(.72)' } }, at)
      tl.to(truck, { attr: { transform: 'translate(560 500) scale(.72)' }, duration: 7, ease: 'power2.out' }, at + 0.6)
      tl.to(wheels, { rotation: -900, transformOrigin: '50% 50%', duration: 8, ease: 'power2.out' }, at + 0.6)
      // Vibración sutil del cuerpo
      tl.to(q('#t-bed'), { y: 2, duration: 0.15, repeat: 40, yoyo: true, ease: 'sine.inOut' }, at + 0.6)

      // Zoom sobre rueda trasera → corte del mando final
      const zoomAt = at + 8.4
      tl.to(truckSvg, { scale: 3.2, x: -3175, y: -1911, transformOrigin: '50% 50%', duration: 2.2, ease: 'power3.inOut' }, zoomAt)
      tl.to([bg, dust.canvas], { scale: 3.2, x: -3175, y: -1911, transformOrigin: '50% 50%', duration: 2.2, ease: 'power3.inOut' }, zoomAt)
      tl.to(bg, { filter: 'blur(14px) brightness(.4)', duration: 1.2 }, zoomAt + 1)
      tl.to(truckSvg, { opacity: 0.12, duration: 0.8 }, zoomAt + 1.4)
      tl.to(q('#fd-bgrect'), { opacity: 0.92, duration: 1 }, zoomAt + 1.4)
      tl.fromTo(q('#fd-wrap'), { attr: { transform: 'translate(620 540) scale(.3)' }, opacity: 0 }, { attr: { transform: 'translate(620 540) scale(1)' }, opacity: 1, duration: 1.4, ease: 'power4.out' }, zoomAt + 1.6)
      tl.to(q('#fd-ringgear'), { rotation: 60, transformOrigin: '50% 50%', duration: 20, ease: 'none' }, zoomAt + 1.6)
      tl.to(q('#fd-carrier'), { rotation: -180, transformOrigin: '50% 50%', duration: 20, ease: 'none' }, zoomAt + 1.6)
      tl.to(q('#fd-sun'), { rotation: 540, transformOrigin: '50% 50%', duration: 20, ease: 'none' }, zoomAt + 1.6)
      tl.to(q('#fd-callouts'), { opacity: 1, duration: 0.8 }, zoomAt + 2.6)
      tl.fromTo(q('#fd-link'), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, zoomAt + 1.8)

      // Gauge de horas: 0 → 18.420 / 20.000
      const gAt = zoomAt + 2.8
      const circ = 2 * Math.PI * 170
      const val = { v: 0 }
      const valEl = q('#g1-val')
      tl.to(q('#fd-gauge'), { opacity: 1, duration: 0.6 }, gAt)
      tl.to(q('#g1-arc'), { strokeDashoffset: circ * (1 - 17650 / 18000), duration: 2.6, ease: 'power2.out' }, gAt)
      tl.to(val, { v: 17650, duration: 2.6, ease: 'power2.out', onUpdate: () => { valEl.textContent = Math.round(val.v).toLocaleString('es-CL') } }, gAt)
      tl.to(q('#g1-arc'), { stroke: '#f0503c', duration: 0.6, repeat: 3, yoyo: true }, gAt + 2.6)
      pop(tl, tagLife, gAt + 2.4)

      // Cita 1
      const qAt = gAt + 4.6
      tl.to([q('#fd-callouts'), q('#fd-gauge'), q('#fd-link'), tagLife, truckSvg], { opacity: 0, duration: 0.6 }, qAt - 0.4)
      tl.to(q('#fd-wrap'), { opacity: 0.18, x: 700, duration: 1.2, ease: 'power2.inOut' }, qAt - 0.4)
      const afterQ1 = revealQuote(tl, q1, qAt, 3.8)

      // Planificación: panel + componente nuevo
      const pAt = afterQ1 + 0.2
      tl.to(q('#fd-wrap'), { opacity: 0, duration: 0.6 }, pAt)
      pop(tl, tagPlan, pAt)
      tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, pAt + 0.3)
      tl.fromTo(panel.querySelectorAll('.row'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.14, ease: 'power2.out' }, pAt + 0.6)
      tl.fromTo(q('#new-wrap'), { opacity: 0, attr: { transform: 'translate(560 560) scale(.5)' } }, { opacity: 1, attr: { transform: 'translate(560 560) scale(.9)' }, duration: 1.2, ease: 'back.out(1.4)' }, pAt + 1.2)
      tl.to(q('#nfd-hubface'), { opacity: 1, duration: 0.8 }, pAt + 1.8)
      tl.to(q('#new-wrap'), { rotation: 8, transformOrigin: '50% 50%', duration: 6, ease: 'sine.inOut' }, pAt + 1.2)
      tl.fromTo(panel.querySelector('#p-status')!, { scale: 1.6, color: '#ffffff' }, { scale: 1, color: '#4ade80', duration: 0.6, ease: 'back.out(2)' }, pAt + 1.7)
      pop(tl, tagNew, pAt + 2.2)

      // Cita 2 y salida
      const q2At = pAt + 6.2
      tl.to([panel, tagPlan, tagNew], { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, q2At - 0.5)
      tl.to(q('#new-wrap'), { opacity: 0.15, duration: 0.8 }, q2At - 0.5)
      const end = revealQuote(tl, q2, q2At, 4)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
