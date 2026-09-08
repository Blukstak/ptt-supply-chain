import { el } from '../core/dom'
import { finalDrive } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave } from '../core/scene'

export function introScene(): Scene {
  const root = sceneRoot('intro')
  const bg = fullSvg(`
    <defs>
      <radialGradient id="in-g" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#151c26"/><stop offset="1" stop-color="#05070a"/></radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#in-g)"/>
    <g id="in-grid" opacity=".18" stroke="#3d4a5a" stroke-width="1">
      ${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 80} 0 V1080"/>`).join('')}
      ${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${i * 80} H1920"/>`).join('')}
    </g>
    <g id="in-fd" transform="translate(1400 540) scale(1.35)" opacity=".35">${finalDrive('in-fdrive', 260)}</g>
  `)
  const dust = new Dust({ count: 90, color: '245, 166, 35', speed: 0.25, size: [1, 2.2] })

  const kicker = el('div', { class: 'kicker abs' }, 'Power Train Technologies')
  Object.assign(kicker.style, { left: '120px', top: '400px' })
  const logo = el('div', { class: 'headline abs', html: 'PTT<em>.</em>' })
  Object.assign(logo.style, { left: '116px', top: '430px', fontSize: '200px' })
  const title = el('div', { class: 'abs', html: '<div class="kicker" style="color:var(--ink-2)">Supply Chain</div><div class="headline" style="font-size:64px;margin-top:10px">El ciclo de vida de un <em>Mando Final CAT 797</em></div>' })
  Object.assign(title.style, { left: '120px', top: '650px', maxWidth: '1300px' })
  const line = el('div', { class: 'abs' })
  Object.assign(line.style, { left: '120px', top: '630px', width: '0px', height: '4px', background: 'var(--amber)' })

  const hud = [
    el('div', { class: 'hud tl', html: '<b>PTT</b> · REPARACIÓN DE COMPONENTES MAYORES' }),
    el('div', { class: 'hud tr', html: 'SUPPLY CHAIN · <b>FILM 01</b>' }),
    el('div', { class: 'hud bl', html: 'MINERÍA · CAT 797F · MANDO FINAL' }),
    el('div', { class: 'hud br', html: '<b>1920×1080</b> · 03:45' }),
  ]
  root.append(bg, dust.canvas, kicker, logo, line, title, ...hud)

  return {
    id: 'intro', title: 'Intro', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const fd = bg.querySelector('#in-fd')!
      const ring = bg.querySelector('#in-fdrive-ringgear')!
      const carrier = bg.querySelector('#in-fdrive-carrier')!
      const sun = bg.querySelector('#in-fdrive-sun')!
      sceneEnter(tl, root, at, 1.4)
      tl.fromTo(fd, { opacity: 0, scale: 0.8, rotation: -20, transformOrigin: '50% 50%' }, { opacity: 0.35, scale: 1.35, rotation: 0, duration: 3, ease: 'power3.out' }, at)
      tl.to(ring, { rotation: 40, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, at)
      tl.to(carrier, { rotation: -120, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, at)
      tl.to(sun, { rotation: 360, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, at)
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1 }, at + 0.6)
      tl.fromTo(kicker, { opacity: 0, letterSpacing: '.8em' }, { opacity: 1, letterSpacing: '.32em', duration: 1.2, ease: 'power3.out' }, at + 1)
      tl.fromTo(logo, { opacity: 0, y: 60, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out' }, at + 1.5)
      tl.to(line, { width: 520, duration: 0.9, ease: 'power3.inOut' }, at + 2.6)
      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, at + 3.2)
      tl.to([kicker, logo, title, line], { opacity: 0, y: -30, duration: 0.7, stagger: 0.05, ease: 'power2.in' }, at + 9.6)
      sceneLeave(tl, root, at + 10.6, 1.2)
      return 11.5
    },
  }
}
