import { el } from '../core/dom'
import { minePit, truck797, lowboyTruck, finalDriveSide, finalDrive, pttWorkshop, loosePart } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, lowerThird, showLowerThird, tag, pop, logoPTT } from '../core/scene'

/**
 * ENTREGA E INSTALACIÓN (R2 · obs. 14) + MEJORAS DE INGENIERÍA Y DESARROLLO (obs. 15) + balance (v1.2) + cierre de marca.
 */
export function cierreScene(): Scene {
  const root = sceneRoot('cierre')
  const bg = fullSvg(minePit('mine3'))
  const dawn = el('div', { class: 'layer' })
  dawn.style.background = 'linear-gradient(to bottom, rgba(245,166,35,.22), rgba(0,0,0,0) 55%)'
  const dust = new Dust({ count: 140, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })
  const art = fullSvg(`
    <g id="cl-semi" transform="translate(-1000 620) scale(.9)">${lowboyTruck('cls')}</g>
    <g id="cl-797" transform="translate(2100 500) scale(.72)">${truck797('c7')}</g>
    <g id="cl-comp" transform="translate(-700 746) scale(.38)" opacity="0">${finalDriveSide('clc', 'PTT')}</g>
    <g id="cl-fd" transform="translate(1473 766) scale(.15)" opacity="0">${finalDrive('cfd', 250)}</g>
    <g id="cl-flash" opacity="0"><circle cx="1473" cy="766" r="120" fill="#fff"/></g>
  `)
  // Cierre I+D: otro mando final llega al taller; la pieza mejorada vuelve con brillo y se arma; sale otro mando final a la mina
  const idSvg = fullSvg(`
    <g id="id-ws" opacity="0">${pttWorkshop('cw', ['D1', 'D2', 'D3'])}
      <rect id="id-dim" width="1920" height="1080" fill="#05070a" opacity="0"/>
      <g transform="translate(960 660)"><rect x="-260" y="140" width="520" height="30" fill="#2a2f36"/><rect x="-200" y="30" width="26" height="120" fill="#4b525c"/><rect x="174" y="30" width="26" height="120" fill="#4b525c"/></g>
      <g id="id-fd" transform="translate(-600 600) scale(.9)">${finalDriveSide('idf', 'PTT')}</g>
      <g id="id-part" transform="translate(1700 -100) scale(.9)" opacity="0"><circle r="90" fill="#e0262b" opacity=".35"><animate attributeName="r" values="70;110;70" dur="1.2s" repeatCount="indefinite"/></circle>${loosePart('idp', 44)}</g>
      <g id="id-glow" opacity="0"><circle cx="960" cy="600" r="260" fill="#e0262b" opacity=".25"/></g>
    </g>
  `)
  const lt = lowerThird('Entrega e instalación en faena', 'Continuidad operacional')
  const tagDel = tag('Entrega en faena con flota propia · detención programada', 120, 150, 'ok')
  const tagInst = tag('Componente PTT instalado en el camión', 1100, 900, 'ok')
  const tagNew = tag('Llega otro mando final al taller', 120, 150, 'info')
  const tagPart = tag('La pieza que revisó Ingeniería vuelve con una mejora', 1000, 150, 'ok')
  const tagOut = tag('Sale otro mando final hacia la mina', 1100, 900, 'ok')
  const msg = el('div', { class: 'abs', html: '<div class="kicker">Ciclo de mejora continua</div><div class="headline" style="font-size:88px;margin-top:10px">Mejoras de <em>Ingeniería y Desarrollo</em></div>' })
  Object.assign(msg.style, { left: '120px', top: '200px', maxWidth: '1300px', opacity: '0', textShadow: '0 6px 30px rgba(0,0,0,.8)' })

  const balance = el('div', { class: 'abs', html: `
    <div class="kicker" style="margin-bottom:14px">Propuesta de valor PTT</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;width:1680px">
      <div class="panel" style="position:relative;opacity:1;padding:20px 26px"><div class="ph" style="color:#4ade80">Fortalezas</div>
        ${['Rapidez en el tiempo de respuesta', 'Soporte a la minería por múltiples vías', 'Alternativa real al OEM: reduce la dependencia', 'Contratos de mantención dentro de la mina (periféricos)', 'Flexibilidad: distintas alternativas para la operación', 'Área de Ingeniería propia desarrollando soluciones'].map((t) => `<div class="row bl" style="padding:7px 0"><span class="k" style="color:var(--ink)">${t}</span><span class="v ok">✓</span></div>`).join('')}
      </div>
      <div class="panel" style="position:relative;opacity:1;padding:20px 26px"><div class="ph" style="color:var(--ptt-grey)">Limitaciones que reconocemos</div>
        ${['Capacidad instalada aún limitada', 'Talleres de menor tamaño que los del OEM'].map((t) => `<div class="row bl" style="padding:7px 0"><span class="k" style="color:var(--ink)">${t}</span><span class="v" style="color:var(--ptt-grey)">—</span></div>`).join('')}
        <div class="pl" style="margin-top:18px;font-size:18px;line-height:1.5">Un balance honesto: sabemos dónde estamos y hacia dónde crecemos, y por eso nuestra propuesta es flexible, rápida y cercana a la operación.</div>
      </div>
    </div>` })
  Object.assign(balance.style, { left: '120px', top: '150px', opacity: '0' })

  const endCard = el('div', { class: 'abs' })
  Object.assign(endCard.style, { inset: '0', background: 'radial-gradient(ellipse at 50% 50%, #151c26, #05070a 70%)', opacity: '0' })
  const ringSvg = fullSvg(`
    <g id="ec-ring" transform="translate(1320 540)">
      <circle r="300" fill="none" stroke="#2a3441" stroke-width="2"/>
      <circle id="ec-arc" r="300" fill="none" stroke="#e0262b" stroke-width="4" stroke-dasharray="${2 * Math.PI * 300}" stroke-dashoffset="${2 * Math.PI * 300}" transform="rotate(-90)"/>
      ${['Contrato en faena', 'Retiro', 'Recepción', 'Ingeniería', 'Abastecimiento', 'Bodega', 'Taller', 'Entrega'].map((s, i, a) => {
        const ang = (i / a.length) * Math.PI * 2 - Math.PI / 2, x = Math.cos(ang) * 300, y = Math.sin(ang) * 300
        const lx = Math.cos(ang) * 360, ly = Math.sin(ang) * 360
        const anchor = Math.abs(Math.cos(ang)) < 0.2 ? 'middle' : Math.cos(ang) > 0 ? 'start' : 'end'
        return `<g class="ec-node" opacity="0"><circle cx="${x}" cy="${y}" r="12" fill="#e0262b"/><text x="${lx}" y="${ly + 8}" text-anchor="${anchor}" font-family="Barlow Condensed" font-weight="600" font-size="26" fill="#e9eef4" letter-spacing="2">${s.toUpperCase()}</text></g>`
      }).join('')}
      <g transform="scale(.55)" opacity=".9">${finalDrive('ecfd', 250)}</g>
    </g>
  `)
  endCard.append(ringSvg)
  const brand = el('div', { class: 'abs' })
  brand.append(logoPTT(120), el('div', { class: 'sub', style: 'margin-top:26px;max-width:640px', html: 'Reparamos componentes de maquinaria minera. Talleres en Santiago y Antofagasta, contrato en faena e Ingeniería y Desarrollo propia.' }), el('div', { class: 'mono', style: 'margin-top:30px;font-size:15px;letter-spacing:.2em;color:var(--ink-3)', html: 'MANDOS FINALES · TRANSMISIONES · DIFERENCIALES · MAZAS · MOTORES' }))
  Object.assign(brand.style, { left: '120px', top: '300px', opacity: '0' })
  root.append(bg)
  photoBg(root, 'mine-dawn.jpg', bg)
  root.append(dawn, dust.canvas, art, idSvg, lt, tagDel, tagInst, tagNew, tagPart, tagOut, msg, balance, endCard, brand)

  return {
    id: 'cierre', title: 'Entrega y cierre', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      // Cama baja con el componente llega; el 797 entra
      tl.to(q('#cl-semi'), { attr: { transform: 'translate(120 620) scale(.9)' }, duration: 2, ease: 'power2.out' }, at + 0.2)
      tl.to(['#cls-w0', '#cls-w1', '#cls-w2', '#cls-w3', '#cls-w4'].map(q), { rotation: 900, transformOrigin: '50% 50%', duration: 2, ease: 'power2.out' }, at + 0.2)
      tl.set(q('#cl-comp'), { opacity: 1, attr: { transform: 'translate(-700 746) scale(.38)' } }, at)
      tl.to(q('#cl-comp'), { attr: { transform: 'translate(420 746) scale(.38)' }, duration: 2, ease: 'power2.out' }, at + 0.2)
      pop(tl, tagDel, at + 1.2, 2.4)
      tl.to(q('#cl-797'), { attr: { transform: 'translate(760 500) scale(.72)' }, duration: 2.2, ease: 'power2.out' }, at + 1)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -600, transformOrigin: '50% 50%', duration: 2.2, ease: 'power2.out' }, at + 1)
      // Instalación: el componente se levanta, viaja hasta la rueda trasera y queda instalado (marca PTT en la rueda)
      const iAt = at + 3.4
      tl.to(q('#cl-comp'), { attr: { transform: 'translate(900 500) scale(.5)' }, duration: 1, ease: 'power2.inOut' }, iAt)
      tl.to(q('#cl-comp'), { attr: { transform: 'translate(1473 766) scale(.08)' }, duration: 0.9, ease: 'power3.in' }, iAt + 1)
      tl.to(q('#cl-comp'), { opacity: 0, duration: 0.2 }, iAt + 1.8)
      tl.fromTo(q('#cl-flash'), { opacity: 0 }, { opacity: 0.9, duration: 0.15, yoyo: true, repeat: 1 }, iAt + 1.85)
      tl.set(q('#cfd-hubface'), { opacity: 1 }, at)
      tl.fromTo(q('#cl-fd'), { opacity: 0, attr: { transform: 'translate(1473 766) scale(.5)' } }, { opacity: 1, attr: { transform: 'translate(1473 766) scale(.15)' }, duration: 0.6, ease: 'power3.out' }, iAt + 1.9)
      pop(tl, tagInst, iAt + 2.2, 1.6)
      tl.to(q('#cl-semi'), { opacity: 0, duration: 0.6 }, iAt + 2.4)
      // El 797 retoma la operación
      tl.to([q('#cl-797'), q('#cl-fd')], { x: -2600, duration: 2.4, ease: 'power2.in' }, iAt + 3)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -1600, transformOrigin: '50% 50%', duration: 2.4, ease: 'power2.in' }, iAt + 3)

      // Cierre del ciclo: mejoras de Ingeniería y Desarrollo (retoma el laboratorio)
      const idAt = iAt + 4.4
      tl.to(q('#id-ws'), { opacity: 1, duration: 0.8 }, idAt)
      tl.to([dawn, dust.canvas], { opacity: 0, duration: 0.6 }, idAt)
      tl.to(q('#id-fd'), { attr: { transform: 'translate(960 600) scale(.9)' }, duration: 1.1, ease: 'power2.out' }, idAt + 0.3)
      pop(tl, tagNew, idAt + 0.6, 1.8)
      tl.to(q('#id-part'), { opacity: 1, duration: 0.3 }, idAt + 1.3)
      tl.to(q('#id-part'), { attr: { transform: 'translate(1500 380) scale(.9)' }, duration: 0.8, ease: 'power2.out' }, idAt + 1.3)
      pop(tl, tagPart, idAt + 1.8, 2.2)
      tl.to(q('#id-part'), { attr: { transform: 'translate(960 600) scale(.1)' }, duration: 0.8, ease: 'power3.in' }, idAt + 2.6)
      tl.to(q('#id-part'), { opacity: 0, duration: 0.2 }, idAt + 3.3)
      tl.fromTo(q('#id-glow'), { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, idAt + 3.3)
      tl.fromTo(q('#id-fd'), { filter: 'brightness(2.6)' }, { filter: 'brightness(1)', duration: 0.8 }, idAt + 3.4)
      tl.to(q('#id-dim'), { opacity: 0.6, duration: 0.6 }, idAt + 3.3)
      tl.fromTo(msg, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, idAt + 3.5)
      tl.to(q('#id-fd'), { attr: { transform: 'translate(2500 600) scale(.9)' }, duration: 1.4, ease: 'power2.in' }, idAt + 4.6)
      pop(tl, tagOut, idAt + 4.6, 1.6)
      tl.to(msg, { opacity: 0, y: -20, duration: 0.5 }, idAt + 6.4)

      // Balance fortalezas / limitaciones
      const bAt = idAt + 6.8
      tl.to([bg, art, q('#id-ws')], { filter: 'brightness(.35) blur(6px)', duration: 0.6 }, bAt)
      tl.fromTo(balance, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, bAt)
      tl.fromTo(balance.querySelectorAll('.bl'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.16 }, bAt + 0.4)
      tl.to(balance, { opacity: 0, y: -20, duration: 0.5 }, bAt + 4.6)
      // End card
      const eAt = bAt + 5
      tl.to(endCard, { opacity: 1, duration: 1 }, eAt)
      tl.to([bg, dawn, dust.canvas, art, idSvg], { opacity: 0, duration: 0.8 }, eAt)
      tl.to(q('#ec-arc'), { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, eAt + 0.4)
      tl.fromTo(ringSvg.querySelectorAll('.ec-node'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.22 }, eAt + 0.6)
      tl.to(q('#ecfd-ringgear'), { rotation: 40, transformOrigin: '50% 50%', duration: 4.8, ease: 'none' }, eAt)
      tl.to(q('#ecfd-carrier'), { rotation: -120, transformOrigin: '50% 50%', duration: 4.8, ease: 'none' }, eAt)
      tl.to(q('#ecfd-sun'), { rotation: 360, transformOrigin: '50% 50%', duration: 4.8, ease: 'none' }, eAt)
      tl.fromTo(brand, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, eAt + 1)
      tl.to({}, { duration: 0.1 }, eAt + 4.6)
      return eAt + 4.8 - at
    },
  }
}
