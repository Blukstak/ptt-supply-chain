import { el } from '../core/dom'
import { minePit, truck797, lowboyTruck, finalDriveSide, finalDrive, pttWorkshop, fieldWorkshop, labBench, pttWorker, loosePart, STATIONS_ARMADO } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, artLayer, artAt, sceneEnter, photoBg, lowerThird, showLowerThird, tag, pop, logoPTT } from '../core/scene'

/**
 * ENTREGA E INSTALACIÓN (R2 · obs. 14) + MEJORAS DE INGENIERÍA Y DESARROLLO (obs. 15) + cierre.
 * R4 · obs. 01:48: el mando final instalado va DENTRO del grupo de la rueda trasera (gira y avanza con el camión).
 * R5 · obs. 01:49: la tapa PTT queda sobre el ARO amarillo (r≈47–52 en la rueda), no sobre el neumático (r 94).
 * R5 · cierre (corrige R4): se eliminan "Distintas mineras…" y la barra del taller; después de "Sale otro mando final
 * hacia la mina" se cierra con los TRES LUGARES de PTT conectados (taller en la mina · taller de componentes ·
 * laboratorio de I+D), con flujos animados y el componente viajando entre ellos; luego el cierre de marca.
 * R5 · fluidez: componente, mando del I+D y viajero en capas GPU; sin `filter: brightness()`.
 */
export function cierreScene(): Scene {
  const root = sceneRoot('cierre')
  const bg = fullSvg(minePit('mine3'))
  const dawn = el('div', { class: 'layer' })
  dawn.style.background = 'linear-gradient(to bottom, rgba(245,166,35,.22), rgba(0,0,0,0) 55%)'
  const dust = new Dust({ count: 140, color: '201, 162, 122', speed: 0.5, size: [1, 4], area: { x: 0, y: 500, w: 1920, h: 600 } })
  // Rueda trasera w3 del 797 (translate(760 500) scale(.72), grupo interno translate(90 -24) scale(1.36), rueda en (490, 290)) → stage (1304.6, 766.7)
  const HUB = { x: 1304.6, y: 766.7 }
  // Aro amarillo de la rueda: r 52 (borde) / 47 en coordenadas de la rueda. finalDrive(250) tiene carcasa r 320 → scale .15 ⇒ r 48.
  const CAP_S = 0.15
  const art = fullSvg(`
    <g id="cl-semi" transform="translate(-1100 686) scale(.55)">${lowboyTruck('cls')}</g>
    <g id="cl-797" transform="translate(2100 500) scale(.72)">${truck797('c7')}</g>
    <g id="cl-fd" transform="scale(${CAP_S})" opacity="0">${finalDrive('cfd', 250)}</g>
    <g id="cl-flash" opacity="0"><circle cx="${HUB.x}" cy="${HUB.y}" r="70" fill="#fff"/></g>
  `, 'full gpu')
  // El mando final instalado se fija a la rueda: pasa a ser hijo del grupo de la rueda trasera (rota y se traslada con ella).
  art.querySelector('#c7-w3')!.append(art.querySelector('#cl-fd')!)
  // Componente que llega en la cama baja y sube a la rueda (capa GPU propia)
  const COMP = { x: 506, y: 828, s: 0.084 }
  const compSvg = artLayer(`<g transform="translate(${COMP.x} ${COMP.y}) scale(${COMP.s})">${finalDriveSide('clc', 'PTT')}</g>`, COMP.x, COMP.y)
  compSvg.style.opacity = '0'
  // Cierre I+D: otro mando final llega al taller; la pieza mejorada vuelve con brillo y se arma; sale otro mando final a la mina
  const idSvg = fullSvg(`
    <g id="id-ws" opacity="0">${pttWorkshop('cw', STATIONS_ARMADO, 'ARMADO')}
      <rect id="id-dim" width="1920" height="1080" fill="#05070a" opacity="0"/>
      <g transform="translate(960 660)"><rect x="-260" y="140" width="520" height="30" fill="#2a2f36"/><rect x="-200" y="30" width="26" height="120" fill="#4b525c"/><rect x="174" y="30" width="26" height="120" fill="#4b525c"/></g>
      <g id="id-part" transform="translate(1700 -100) scale(.9)" opacity="0"><circle r="90" fill="#e0262b" opacity=".35"><animate attributeName="r" values="70;110;70" dur="1.2s" repeatCount="indefinite"/></circle>${loosePart('idp', 44)}</g>
      <g id="id-glow" opacity="0"><circle cx="960" cy="600" r="260" fill="#e0262b" opacity=".25"/></g>
    </g>
  `)
  const idFdSvg = artLayer(`<g transform="translate(960 600) scale(.9)">${finalDriveSide('idf', 'PTT')}</g><ellipse id="id-flash" cx="960" cy="600" rx="300" ry="150" fill="#fff" opacity="0"/>`, 960, 600)
  idFdSvg.style.opacity = '0'
  const lt = lowerThird('Entrega e instalación en faena', 'Continuidad operacional')
  const tagDel = tag('Entrega en faena con flota propia · detención programada', 120, 150, 'ok')
  const tagInst = tag('Componente PTT instalado en el aro de la rueda', 1100, 900, 'ok')
  const tagNew = tag('Llega otro mando final al taller', 120, 150, 'info')
  const tagPart = tag('La pieza que revisó Ingeniería vuelve con una mejora', 1000, 150, 'ok')
  const tagOut = tag('Sale otro mando final hacia la mina', 1100, 900, 'ok')
  const msg = el('div', { class: 'abs', html: '<div class="kicker">Ciclo de mejora continua</div><div class="headline" style="font-size:88px;margin-top:10px">Mejoras de <em>Ingeniería y Desarrollo</em></div>' })
  Object.assign(msg.style, { left: '120px', top: '200px', maxWidth: '1300px', opacity: '0', textShadow: '0 6px 30px rgba(0,0,0,.8)' })

  // R5 · cierre — los tres lugares de PTT como un sistema conectado
  const A = { x: 400, y: 380 }, B = { x: 1520, y: 380 }, Cc = { x: 960, y: 730 } // taller en la mina · taller de componentes · laboratorio
  const CW = 440, CH = 240
  const card = (id: string, c: { x: number; y: number }, title: string, sub: string, inner: string) => `
    <g class="pl-card" id="${id}" opacity="0">
      <rect x="${c.x - CW / 2}" y="${c.y - CH / 2}" width="${CW}" height="${CH}" rx="14" fill="#0b0f15" stroke="#2a3441" stroke-width="2"/>
      <clipPath id="${id}-clip"><rect x="${c.x - CW / 2 + 2}" y="${c.y - CH / 2 + 2}" width="${CW - 4}" height="${CH - 4}" rx="13"/></clipPath>
      <g clip-path="url(#${id}-clip)">${inner}</g>
      <rect x="${c.x - CW / 2}" y="${c.y + CH / 2 - 6}" width="${CW}" height="6" fill="#e0262b"/>
      <text x="${c.x}" y="${c.y + CH / 2 + 46}" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="36" fill="#e9eef4" letter-spacing="2">${title}</text>
      <text x="${c.x}" y="${c.y + CH / 2 + 76}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" fill="#9aa7b6" letter-spacing="3">${sub}</text>
    </g>`
  // Segmentos entre bordes de tarjetas (las líneas van debajo de las tarjetas; se recortan a los bordes para que el viajero no las cruce)
  const seg = (p: { x: number; y: number }, q2: { x: number; y: number }) => {
    const dx = q2.x - p.x, dy = q2.y - p.y
    const t = Math.min(Math.abs(dx) ? CW / 2 / Math.abs(dx) : 9, Math.abs(dy) ? CH / 2 / Math.abs(dy) : 9)
    return { a: { x: p.x + dx * t, y: p.y + dy * t }, b: { x: q2.x - dx * t, y: q2.y - dy * t } }
  }
  const AB = seg(A, B), BC = seg(B, Cc), CA = seg(Cc, A)
  const line = (id: string, s: { a: { x: number; y: number }; b: { x: number; y: number } }) => `<path id="${id}" class="pl-line" d="M${s.a.x} ${s.a.y} L${s.b.x} ${s.b.y}" stroke="#e0262b" stroke-width="4" stroke-dasharray="16 12" fill="none" opacity="0"/>`
  const placesSvg = fullSvg(`
    <defs><radialGradient id="pl-bg" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#151c26"/><stop offset="1" stop-color="#05070a"/></radialGradient>
      <g id="pl-fds">${finalDriveSide('plf', 'PTT')}</g></defs>
    <rect width="1920" height="1080" fill="url(#pl-bg)"/>
    <g id="pl-lines">${line('pl-ab', AB)}${line('pl-bc', BC)}${line('pl-ca', CA)}</g>
    ${card('pl-a', A, 'Taller en la mina', 'CONTRATO DE MANTENCIÓN EN FAENA', `
      <rect x="${A.x - CW / 2}" y="${A.y - CH / 2}" width="${CW}" height="${CH}" fill="#1a1e24"/>
      <rect x="${A.x - CW / 2}" y="${A.y + 96}" width="${CW}" height="40" fill="#3a3129"/>
      <g transform="translate(${A.x - 200} ${A.y + 100}) scale(.365)">${fieldWorkshop('plfw')}</g>
      <g transform="translate(${A.x - 130} ${A.y + 4}) scale(.16)">${pttWorker('plw1', true)}</g>`)}
    ${card('pl-b', B, 'Taller de componentes', 'SANTIAGO · ANTOFAGASTA', `
      <g transform="translate(${B.x - CW / 2} ${B.y - CH / 2}) scale(${CW / 1920})">${pttWorkshop('plws', STATIONS_ARMADO, 'ARMADO')}<g transform="translate(960 700) scale(1.05)"><use href="#pl-fds"/></g></g>`)}
    ${card('pl-c', Cc, 'Laboratorio de Ingeniería y Desarrollo', 'MEJORAS QUE VUELVEN AL COMPONENTE', `
      <rect x="${Cc.x - CW / 2}" y="${Cc.y - CH / 2}" width="${CW}" height="${CH}" fill="#10151c"/>
      <rect x="${Cc.x - CW / 2}" y="${Cc.y + 92}" width="${CW}" height="40" fill="#1d2229"/>
      <g transform="translate(${Cc.x + 40} ${Cc.y + 92}) scale(.6)">${labBench('pllab')}<g transform="translate(-60 -250) scale(.9)">${pttWorker('plw2', false, '#2a2f36')}</g></g>`)}
  `)
  // Componente que viaja por el sistema (capa GPU; <use> de una sola definición)
  const travSvg = artLayer(`<g transform="translate(${A.x} ${A.y}) scale(.17)"><use href="#pl-fds"/></g>`, A.x, A.y)
  travSvg.style.opacity = '0'
  const placesTitle = el('div', { class: 'abs', html: '<div class="kicker">Nuestro sistema</div><div class="headline" style="font-size:64px;margin-top:6px">Tres lugares, <em>una sola cadena</em></div>' })
  Object.assign(placesTitle.style, { left: '120px', top: '56px', width: '1700px', opacity: '0' })
  const placesWrap = el('div', { class: 'abs' })
  Object.assign(placesWrap.style, { inset: '0', opacity: '0' })
  placesWrap.append(placesSvg, travSvg, placesTitle)

  const endCard = el('div', { class: 'abs' })
  Object.assign(endCard.style, { inset: '0', background: 'radial-gradient(ellipse at 50% 50%, #151c26, #05070a 70%)', opacity: '0' })
  const ringSvg = fullSvg(`<g id="ec-ring" transform="translate(1380 540)"><circle r="230" fill="none" stroke="#2a3441" stroke-width="2"/><g transform="scale(.55)" opacity=".9">${finalDrive('ecfd', 250)}</g></g>`)
  endCard.append(ringSvg)
  const brand = el('div', { class: 'abs' })
  brand.append(logoPTT(120), el('div', { class: 'sub', style: 'margin-top:26px;max-width:640px', html: 'Reparamos componentes de maquinaria minera. Talleres en Santiago y Antofagasta, contrato en faena e Ingeniería y Desarrollo propia.' }), el('div', { class: 'mono', style: 'margin-top:30px;font-size:15px;letter-spacing:.2em;color:var(--ink-3)', html: 'MANDOS FINALES · TRANSMISIONES · DIFERENCIALES · MAZAS · MOTORES' }))
  Object.assign(brand.style, { left: '120px', top: '300px', opacity: '0' })
  root.append(bg)
  photoBg(root, 'mine-dawn.jpg', bg)
  root.append(dawn, dust.canvas, art, compSvg, idSvg, idFdSvg, lt, tagDel, tagInst, tagNew, tagPart, tagOut, msg, placesWrap, endCard, brand)

  return {
    id: 'cierre', title: 'Entrega y cierre', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1.2)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      // Cama baja con el componente llega; el 797 entra
      tl.to(q('#cl-semi'), { attr: { transform: 'translate(60 686) scale(.55)' }, duration: 2, ease: 'power2.out' }, at + 0.2)
      tl.to(['#cls-w0', '#cls-w1', '#cls-w2', '#cls-w3', '#cls-w4'].map(q), { rotation: 900, transformOrigin: '50% 50%', duration: 2, ease: 'power2.out' }, at + 0.2)
      tl.set(compSvg, { opacity: 1, ...artAt(COMP.x, COMP.y, -700, COMP.y, 1) }, at)
      tl.to(compSvg, { ...artAt(COMP.x, COMP.y, COMP.x, COMP.y, 1), duration: 2, ease: 'power2.out' }, at + 0.2)
      pop(tl, tagDel, at + 1.2, 2.4)
      tl.to(q('#cl-797'), { attr: { transform: 'translate(760 500) scale(.72)' }, duration: 2.2, ease: 'power2.out' }, at + 1)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -600, transformOrigin: '50% 50%', duration: 2.2, ease: 'power2.out' }, at + 1)
      // Instalación: el componente se levanta, viaja hasta la rueda trasera y queda instalado sobre el aro (marca PTT)
      const iAt = at + 3.4
      tl.to(compSvg, { ...artAt(COMP.x, COMP.y, 900, 500, 0.5 / COMP.s), duration: 1, ease: 'power2.inOut' }, iAt)
      tl.to(compSvg, { ...artAt(COMP.x, COMP.y, HUB.x, HUB.y, 0.07 / COMP.s), duration: 0.9, ease: 'power3.in' }, iAt + 1)
      tl.to(compSvg, { opacity: 0, duration: 0.2 }, iAt + 1.8)
      tl.fromTo(q('#cl-flash'), { opacity: 0 }, { opacity: 0.9, duration: 0.15, yoyo: true, repeat: 1 }, iAt + 1.85)
      tl.set(q('#cfd-hubface'), { opacity: 1 }, at)
      // El mando final queda fijado al ARO de la rueda (es hijo de #c7-w3): gira y avanza con el camión
      tl.fromTo(q('#cl-fd'), { opacity: 0, attr: { transform: `scale(${CAP_S * 2.6})` } }, { opacity: 1, attr: { transform: `scale(${CAP_S})` }, duration: 0.6, ease: 'power3.out' }, iAt + 1.9)
      pop(tl, tagInst, iAt + 2.2, 1.5)
      tl.to(q('#cl-semi'), { opacity: 0, duration: 0.6 }, iAt + 2.3)
      // El 797 retoma la operación (con el mando final instalado en la rueda)
      tl.to(q('#cl-797'), { attr: { transform: 'translate(-1900 500) scale(.72)' }, duration: 2.2, ease: 'power2.in' }, iAt + 2.8)
      tl.to(['#c7-w1', '#c7-w2', '#c7-w3'].map(q), { rotation: -1600, transformOrigin: '50% 50%', duration: 2.2, ease: 'power2.in' }, iAt + 2.8)

      // Cierre del ciclo: mejoras de Ingeniería y Desarrollo (retoma el laboratorio)
      const idAt = iAt + 3.6
      tl.to(q('#id-ws'), { opacity: 1, duration: 0.8 }, idAt)
      tl.to([dawn, dust.canvas], { opacity: 0, duration: 0.6 }, idAt)
      tl.set(idFdSvg, { opacity: 1, ...artAt(960, 600, -600, 600, 1) }, idAt)
      tl.to(idFdSvg, { ...artAt(960, 600, 960, 600, 1), duration: 1.1, ease: 'power2.out' }, idAt + 0.3)
      pop(tl, tagNew, idAt + 0.5, 1.6)
      tl.to(q('#id-part'), { opacity: 1, duration: 0.3 }, idAt + 1.2)
      tl.to(q('#id-part'), { attr: { transform: 'translate(1500 380) scale(.9)' }, duration: 0.8, ease: 'power2.out' }, idAt + 1.2)
      pop(tl, tagPart, idAt + 1.6, 2.0)
      tl.to(q('#id-part'), { attr: { transform: 'translate(960 600) scale(.1)' }, duration: 0.8, ease: 'power3.in' }, idAt + 2.4)
      tl.to(q('#id-part'), { opacity: 0, duration: 0.2 }, idAt + 3.1)
      tl.fromTo(q('#id-glow'), { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, idAt + 3.1)
      // R5 · fluidez: destello por opacidad (antes `filter: brightness(2.6)` sobre el mando de 800 dientes)
      tl.fromTo(q('#id-flash'), { opacity: 0.8 }, { opacity: 0, duration: 0.8 }, idAt + 3.2)
      tl.to(q('#id-dim'), { opacity: 0.6, duration: 0.6 }, idAt + 3.1)
      tl.to(q('#cw-signs'), { opacity: 0, duration: 0.5 }, idAt + 3.1)
      tl.fromTo(msg, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, idAt + 3.3)
      tl.to(idFdSvg, { ...artAt(960, 600, 2500, 600, 1), duration: 1.4, ease: 'power2.in' }, idAt + 4.3)
      pop(tl, tagOut, idAt + 4.3, 1.5)
      tl.to(msg, { opacity: 0, y: -20, duration: 0.5 }, idAt + 5.7)

      // R5 · cierre: los tres lugares de PTT y sus conexiones
      const pAt = idAt + 6.0
      tl.to(placesWrap, { opacity: 1, duration: 0.8 }, pAt)
      tl.to([bg, dawn, dust.canvas, art, idSvg, idFdSvg], { opacity: 0, duration: 0.8 }, pAt)
      tl.fromTo(placesTitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, pAt + 0.2)
      tl.fromTo([q('#pl-a'), q('#pl-b'), q('#pl-c')], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.3, ease: 'power3.out' }, pAt + 0.4)
      const lines = [q('#pl-ab'), q('#pl-bc'), q('#pl-ca')]
      tl.to(lines, { opacity: 1, duration: 0.2, stagger: 0.25 }, pAt + 1.4)
      tl.fromTo(lines, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.25, ease: 'power2.inOut' }, pAt + 1.4)
      tl.set(lines, { strokeDasharray: '16 12', strokeDashoffset: 0 }, pAt + 2.4)
      tl.to(lines, { strokeDashoffset: -280, duration: 4.4, ease: 'none' }, pAt + 2.4)
      // El componente recorre el sistema: mina → taller de componentes → laboratorio → vuelve a la mina
      const hop = (t0: number, from: { x: number; y: number }, to: { x: number; y: number }, dur: number) => {
        tl.set(travSvg, { opacity: 1, ...artAt(A.x, A.y, from.x, from.y, 1) }, t0)
        tl.to(travSvg, { ...artAt(A.x, A.y, to.x, to.y, 1), duration: dur, ease: 'power2.inOut' }, t0)
        tl.to(travSvg, { opacity: 0, duration: 0.2 }, t0 + dur)
      }
      hop(pAt + 2.3, AB.a, AB.b, 1.0)
      hop(pAt + 3.5, BC.a, BC.b, 0.85)
      hop(pAt + 4.5, CA.a, CA.b, 0.85)
      ;[q('#pl-b'), q('#pl-c'), q('#pl-a')].forEach((c, i) => tl.to(c.querySelector('rect')!, { attr: { stroke: '#e0262b' }, duration: 0.3, yoyo: true, repeat: 1 }, pAt + 3.3 + i * 1.0))
      tl.to(placesWrap, { opacity: 0, duration: 0.7 }, pAt + 5.9)

      // Cierre de marca
      const eAt = pAt + 6.2
      tl.to(endCard, { opacity: 1, duration: 0.9 }, eAt)
      tl.to(q('#ecfd-ringgear'), { rotation: 40, transformOrigin: '50% 50%', duration: 3.0, ease: 'none' }, eAt)
      tl.to(q('#ecfd-carrier'), { rotation: -120, transformOrigin: '50% 50%', duration: 3.0, ease: 'none' }, eAt)
      tl.to(q('#ecfd-sun'), { rotation: 360, transformOrigin: '50% 50%', duration: 3.0, ease: 'none' }, eAt)
      tl.fromTo(brand, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, eAt + 0.6)
      tl.to({}, { duration: 0.1 }, eAt + 3.0)
      return eAt + 3.2 - at
    },
  }
}
