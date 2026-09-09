import { el } from '../core/dom'
import { minePit, truck797, lowboyTruck, finalDriveSide, finalDrive, pttWorkshop, loosePart, transmission, engine, STATIONS_ARMADO } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, lowerThird, showLowerThird, tag, pop, logoPTT } from '../core/scene'

/**
 * ENTREGA E INSTALACIÓN (R2 · obs. 14) + MEJORAS DE INGENIERÍA Y DESARROLLO (obs. 15) + cierre.
 * R4 · obs. 01:48: el mando final instalado va DENTRO del grupo de la rueda trasera (gira y avanza con el camión).
 * R4 · obs. 01:56: se elimina el bloque fortalezas/limitaciones.
 * R4 · obs. 02:03: la pantalla final se reemplaza por distintas mineras enviándonos sus componentes
 * (mando final, transmisión, motor) hacia el taller PTT; luego el cierre de marca.
 */
export function cierreScene(): Scene {
  const root = sceneRoot('cierre')
  const bg = fullSvg(minePit('mine3'))
  const dawn = el('div', { class: 'layer' })
  dawn.style.background = 'linear-gradient(to bottom, rgba(245,166,35,.22), rgba(0,0,0,0) 55%)'
  const dust = new Dust({ count: 140, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })
  // Rueda trasera w3 del 797 (translate(760 500) scale(.72), grupo interno translate(90 -24) scale(1.36), rueda en (490, 290)) → stage (1304.6, 766.7)
  const HUB = { x: 1304.6, y: 766.7 }
  const art = fullSvg(`
    <g id="cl-semi" transform="translate(-1000 620) scale(.9)">${lowboyTruck('cls')}</g>
    <g id="cl-797" transform="translate(2100 500) scale(.72)">${truck797('c7')}</g>
    <g id="cl-comp" transform="translate(-700 746) scale(.38)" opacity="0">${finalDriveSide('clc', 'PTT')}</g>
    <g id="cl-fd" transform="scale(.36)" opacity="0">${finalDrive('cfd', 250)}</g>
    <g id="cl-flash" opacity="0"><circle cx="${HUB.x}" cy="${HUB.y}" r="120" fill="#fff"/></g>
  `)
  // El mando final instalado se fija a la rueda: pasa a ser hijo del grupo de la rueda trasera (rota y se traslada con ella).
  art.querySelector('#c7-w3')!.append(art.querySelector('#cl-fd')!)
  // Cierre I+D: otro mando final llega al taller; la pieza mejorada vuelve con brillo y se arma; sale otro mando final a la mina
  const idSvg = fullSvg(`
    <g id="id-ws" opacity="0">${pttWorkshop('cw', STATIONS_ARMADO, 'ARMADO')}
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

  // R4 · obs. 02:03 — distintas mineras nos envían sus componentes
  const mines = [
    { x: 400, name: 'MINERA A', region: 'Región de Antofagasta', comp: 'Mando final', art: `<g transform="scale(.62)">${finalDriveSide('mnc0', 'PTT')}</g>` },
    { x: 960, name: 'MINERA B', region: 'Región de Atacama', comp: 'Transmisión', art: `<g transform="scale(.72)">${transmission('mnc1')}</g>` },
    { x: 1520, name: 'MINERA C', region: 'Región de O’Higgins', comp: 'Motor', art: `<g transform="scale(.6)">${engine('mnc2')}</g>` },
  ]
  const mineIcon = (x: number) => `<g transform="translate(${x} 250)"><path d="M-170 70 L-110 -10 L-60 30 L0 -60 L70 20 L120 -20 L170 70Z" fill="#3a3f47" stroke="#8a8f98" stroke-width="2"/><path d="M-120 70 L-80 30 L80 30 L120 70Z" fill="#1d2229"/><path d="M-90 52 H90 M-70 40 H70" stroke="#c9a15a" stroke-width="3" opacity=".8"/><rect x="-170" y="70" width="340" height="6" fill="#e0262b"/></g>`
  const minesSvg = fullSvg(`
    <rect width="1920" height="1080" fill="url(#mn-bg)"/>
    <defs><radialGradient id="mn-bg" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#151c26"/><stop offset="1" stop-color="#05070a"/></radialGradient></defs>
    ${mines.map((m) => `<g class="mn-card" opacity="0">
      <rect x="${m.x - 230}" y="160" width="460" height="560" rx="14" fill="#0b0f15" stroke="#2a3441" stroke-width="2"/>
      ${mineIcon(m.x)}
      <text x="${m.x}" y="370" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="40" fill="#e9eef4" letter-spacing="4">${m.name}</text>
      <text x="${m.x}" y="402" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="15" fill="#9aa7b6" letter-spacing="3">${m.region.toUpperCase()}</text>
      <text x="${m.x}" y="690" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="15" fill="#e0262b" letter-spacing="3">ENVÍA: ${m.comp.toUpperCase()}</text>
      <path class="mn-arrow" d="M${m.x} 730 V820" stroke="#e0262b" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
      <path class="mn-arrow" d="M${m.x - 14} 806 L${m.x} 824 L${m.x + 14} 806" stroke="#e0262b" stroke-width="4" fill="none" opacity="0"/>
    </g>`).join('')}
    ${mines.map((m, i) => `<g id="mn-comp-${i}" transform="translate(${m.x} 545)" opacity="0">${m.art}</g>`).join('')}
    <g id="mn-ptt" opacity="0"><rect x="260" y="840" width="1400" height="110" rx="12" fill="#0b0f15" stroke="#e0262b" stroke-width="4"/>
      <text x="960" y="885" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="40" fill="#e9eef4" letter-spacing="6">TALLER PTT · POWER TRAIN TECHNOLOGIES</text>
      <text x="960" y="925" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16" fill="#9aa7b6" letter-spacing="4">RECIBIMOS Y REPARAMOS MANDOS FINALES · TRANSMISIONES · MOTORES</text></g>
  `)
  const minesTitle = el('div', { class: 'abs', html: '<div class="kicker">Nuestros clientes</div><div class="headline" style="font-size:56px;margin-top:6px">Distintas mineras nos envían sus <em>componentes</em></div>' })
  Object.assign(minesTitle.style, { left: '120px', top: '40px', width: '1700px', opacity: '0' })
  const minesWrap = el('div', { class: 'abs' })
  Object.assign(minesWrap.style, { inset: '0', opacity: '0' })
  minesWrap.append(minesSvg, minesTitle)

  const endCard = el('div', { class: 'abs' })
  Object.assign(endCard.style, { inset: '0', background: 'radial-gradient(ellipse at 50% 50%, #151c26, #05070a 70%)', opacity: '0' })
  const ringSvg = fullSvg(`<g id="ec-ring" transform="translate(1380 540)"><circle r="230" fill="none" stroke="#2a3441" stroke-width="2"/><g transform="scale(.55)" opacity=".9">${finalDrive('ecfd', 250)}</g></g>`)
  endCard.append(ringSvg)
  const brand = el('div', { class: 'abs' })
  brand.append(logoPTT(120), el('div', { class: 'sub', style: 'margin-top:26px;max-width:640px', html: 'Reparamos componentes de maquinaria minera. Talleres en Santiago y Antofagasta, contrato en faena e Ingeniería y Desarrollo propia.' }), el('div', { class: 'mono', style: 'margin-top:30px;font-size:15px;letter-spacing:.2em;color:var(--ink-3)', html: 'MANDOS FINALES · TRANSMISIONES · DIFERENCIALES · MAZAS · MOTORES' }))
  Object.assign(brand.style, { left: '120px', top: '300px', opacity: '0' })
  root.append(bg)
  photoBg(root, 'mine-dawn.jpg', bg)
  root.append(dawn, dust.canvas, art, idSvg, lt, tagDel, tagInst, tagNew, tagPart, tagOut, msg, minesWrap, endCard, brand)

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
      tl.to(q('#cl-comp'), { attr: { transform: `translate(${HUB.x} ${HUB.y}) scale(.08)` }, duration: 0.9, ease: 'power3.in' }, iAt + 1)
      tl.to(q('#cl-comp'), { opacity: 0, duration: 0.2 }, iAt + 1.8)
      tl.fromTo(q('#cl-flash'), { opacity: 0 }, { opacity: 0.9, duration: 0.15, yoyo: true, repeat: 1 }, iAt + 1.85)
      tl.set(q('#cfd-hubface'), { opacity: 1 }, at)
      // El mando final queda fijado a la rueda (es hijo de #c7-w3): gira y avanza con el camión
      tl.fromTo(q('#cl-fd'), { opacity: 0, attr: { transform: 'scale(1)' } }, { opacity: 1, attr: { transform: 'scale(.36)' }, duration: 0.6, ease: 'power3.out' }, iAt + 1.9)
      pop(tl, tagInst, iAt + 2.2, 1.6)
      tl.to(q('#cl-semi'), { opacity: 0, duration: 0.6 }, iAt + 2.4)
      // El 797 retoma la operación (con el mando final instalado en la rueda)
      tl.to(q('#cl-797'), { attr: { transform: 'translate(-1900 500) scale(.72)' }, duration: 2.4, ease: 'power2.in' }, iAt + 3)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -1600, transformOrigin: '50% 50%', duration: 2.4, ease: 'power2.in' }, iAt + 3)

      // Cierre del ciclo: mejoras de Ingeniería y Desarrollo (retoma el laboratorio)
      const idAt = iAt + 4.2
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
      tl.to(q('#cw-signs'), { opacity: 0, duration: 0.5 }, idAt + 3.3)
      tl.fromTo(msg, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, idAt + 3.5)
      tl.to(q('#id-fd'), { attr: { transform: 'translate(2500 600) scale(.9)' }, duration: 1.4, ease: 'power2.in' }, idAt + 4.6)
      pop(tl, tagOut, idAt + 4.6, 1.6)
      tl.to(msg, { opacity: 0, y: -20, duration: 0.5 }, idAt + 6.4)

      // Distintas mineras nos envían sus componentes (R4 · obs. 02:03)
      const mAt = idAt + 6.8
      tl.to(minesWrap, { opacity: 1, duration: 0.8 }, mAt)
      tl.to([bg, dawn, dust.canvas, art, idSvg], { opacity: 0, duration: 0.8 }, mAt)
      tl.fromTo(minesTitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, mAt + 0.2)
      tl.fromTo(minesSvg.querySelectorAll('.mn-card'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, mAt + 0.5)
      mines.forEach((m, i) => {
        const c = q(`#mn-comp-${i}`)
        tl.fromTo(c, { opacity: 0, attr: { transform: `translate(${m.x} 545) scale(.6)` } }, { opacity: 1, attr: { transform: `translate(${m.x} 545) scale(1)` }, duration: 0.6, ease: 'back.out(1.5)' }, mAt + 1 + i * 0.2)
      })
      tl.to(q('#mn-ptt'), { opacity: 1, duration: 0.6 }, mAt + 1.8)
      tl.to(minesSvg.querySelectorAll('.mn-arrow'), { opacity: 1, duration: 0.4, stagger: 0.1 }, mAt + 2.2)
      mines.forEach((m, i) => {
        const c = q(`#mn-comp-${i}`)
        tl.to(c, { attr: { transform: `translate(${m.x} 895) scale(.25)` }, duration: 1.1, ease: 'power2.inOut' }, mAt + 2.6 + i * 0.25)
        tl.to(c, { opacity: 0, duration: 0.25 }, mAt + 3.5 + i * 0.25)
      })
      tl.fromTo(q('#mn-ptt'), { filter: 'brightness(1)' }, { filter: 'brightness(1.6)', duration: 0.3, repeat: 3, yoyo: true }, mAt + 3.5)
      tl.to(minesWrap, { opacity: 0, duration: 0.7 }, mAt + 5.0)

      // Cierre de marca
      const eAt = mAt + 5.2
      tl.to(endCard, { opacity: 1, duration: 0.9 }, eAt)
      tl.to(q('#ecfd-ringgear'), { rotation: 40, transformOrigin: '50% 50%', duration: 4.0, ease: 'none' }, eAt)
      tl.to(q('#ecfd-carrier'), { rotation: -120, transformOrigin: '50% 50%', duration: 4.0, ease: 'none' }, eAt)
      tl.to(q('#ecfd-sun'), { rotation: 360, transformOrigin: '50% 50%', duration: 4.0, ease: 'none' }, eAt)
      tl.fromTo(brand, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, eAt + 0.6)
      tl.to({}, { duration: 0.1 }, eAt + 3.8)
      return eAt + 4.0 - at
    },
  }
}
