import { el } from '../core/dom'
import { chileMap, pin } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, tag, pop, logoPTT } from '../core/scene'

/**
 * QUIÉNES SOMOS (R2 · obs. 1) — presentación de la compañía antes de la operación.
 * Mapa de Chile con Santiago y Antofagasta; 4 ideas clave (la última, Ingeniería y Desarrollo, se retoma al cierre).
 */
export function empresaScene(): Scene {
  const root = sceneRoot('empresa')
  const bg = fullSvg(`
    <defs><radialGradient id="em-g" cx=".7" cy=".5" r=".8"><stop offset="0" stop-color="#151c26"/><stop offset="1" stop-color="#05070a"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#em-g)"/>
    <g opacity=".12" stroke="#3d4a5a">${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 80} 0 V1080"/>`).join('')}${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 80} H1920"/>`).join('')}</g>
    <g id="em-map" transform="translate(1330 100) scale(.95)" opacity="0">
      ${chileMap('clm')}
      <g id="em-pin-anf" transform="translate(150 150)" opacity="0">${pin('pa', 'ANTOFAGASTA')}</g>
      <g id="em-pin-scl" transform="translate(126 380)" opacity="0">${pin('ps', 'SANTIAGO')}</g>
      <text x="196" y="184" font-family="JetBrains Mono, monospace" font-size="14" fill="#9aa7b6" letter-spacing="3" id="em-t1" opacity="0">TALLER PRINCIPAL</text>
      <text x="174" y="414" font-family="JetBrains Mono, monospace" font-size="14" fill="#9aa7b6" letter-spacing="3" id="em-t2" opacity="0">TALLER PRINCIPAL</text>
      <g id="em-pin-mine" transform="translate(142 250)" opacity="0"><circle r="7" fill="#e0262b"/><circle r="14" fill="none" stroke="#e0262b" stroke-width="1.5" opacity=".6"/><text x="26" y="7" font-family="JetBrains Mono, monospace" font-size="14" fill="#e0262b" letter-spacing="2">CONTRATO EN FAENA</text></g>
    </g>
  `)
  const dust = new Dust({ count: 60, color: '224, 38, 43', speed: 0.2, size: [1, 2] })
  const kicker = el('div', { class: 'kicker abs' }, 'Quiénes somos')
  Object.assign(kicker.style, { left: '120px', top: '150px' })
  const logo = el('div', { class: 'abs' })
  logo.append(logoPTT(96))
  Object.assign(logo.style, { left: '126px', top: '190px', opacity: '0' })
  const bullets = [
    ['01', 'Reparamos <em>componentes de maquinaria minera</em>.'],
    ['02', 'Dos talleres principales: <em>Santiago</em> y <em>Antofagasta</em>.'],
    ['03', 'Operamos un <em>contrato de mantención</em> dentro de la minera.'],
    ['04', 'Un área de <em>Ingeniería y Desarrollo</em> que genera mejoras en los componentes.'],
  ].map(([n, t]) => el('div', { class: 'abs', html: `<div style="display:flex;gap:22px;align-items:flex-start"><span class="mono" style="color:var(--amber);font-size:18px;letter-spacing:.2em;padding-top:12px">${n}</span><div class="headline" style="font-size:46px;line-height:1.02;max-width:1000px;text-transform:none;letter-spacing:0">${t}</div></div>` }))
  bullets.forEach((b, i) => Object.assign(b.style, { left: '120px', top: `${470 + i * 108}px`, opacity: '0' }))
  const tagID = tag('Lo retomamos al cierre: mejoras de Ingeniería y Desarrollo', 120, 930, 'info')
  root.append(bg, dust.canvas, kicker, logo, ...bullets, tagID)

  return {
    id: 'empresa', title: 'Quiénes somos', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      tl.fromTo(kicker, { opacity: 0, letterSpacing: '.8em' }, { opacity: 1, letterSpacing: '.32em', duration: 0.9, ease: 'power3.out' }, at + 0.2)
      tl.fromTo(logo, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, at + 0.5)
      tl.fromTo(q('#em-map'), { opacity: 0, attr: { transform: 'translate(1330 140) scale(.95)' } }, { opacity: 1, attr: { transform: 'translate(1330 100) scale(.95)' }, duration: 1.2, ease: 'power3.out' }, at + 0.4)
      tl.fromTo(q('#clm path'), { strokeDasharray: 3200, strokeDashoffset: 3200 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, at + 0.4)
      bullets.forEach((b, i) => tl.fromTo(b, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, at + 1.4 + i * 1.3))
      // Pines (aparecen con la idea 02) y contrato en faena (idea 03)
      tl.fromTo([q('#em-pin-anf'), q('#em-pin-scl')], { opacity: 0, scale: 0.3, transformOrigin: '0 0' }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.3, ease: 'back.out(2)' }, at + 2.8)
      tl.to([q('#em-t1'), q('#em-t2')], { opacity: 1, duration: 0.5, stagger: 0.3 }, at + 3.2)
      tl.fromTo([q('#pa-ring'), q('#ps-ring')], { attr: { r: 12 }, opacity: 0.9 }, { attr: { r: 36 }, opacity: 0, duration: 1.4, repeat: 5, ease: 'power2.out' }, at + 3.1)
      tl.fromTo(q('#em-pin-mine'), { opacity: 0, scale: 0.3, transformOrigin: '0 0' }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, at + 4.2)
      // Ingeniería: se destaca
      tl.fromTo(bullets[3].querySelectorAll('em'), { color: '#ffffff' }, { color: '#e0262b', duration: 0.6 }, at + 5.8)
      pop(tl, tagID, at + 6.4)
      tl.to([kicker, logo, ...bullets, tagID], { opacity: 0, y: -20, duration: 0.5, stagger: 0.03, ease: 'power2.in' }, at + 8.8)
      sceneLeave(tl, root, at + 9.3, 0.9)
      return 10.2
    },
  }
}
