import { el } from '../core/dom'
import { minePit, motorGrader, bulldozer, drillRig, komatsuTruck, truck797 } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, sceneLeave, photoBg, tag, pop } from '../core/scene'

/**
 * NUESTROS CLIENTES (R2 · obs. 3) — título grande arriba, texto de Romina y los equipos que reparamos:
 * motoniveladora, bulldozer, perforadora, camión Komatsu y CAT 797F.
 */
export function clientesScene(): Scene {
  const root = sceneRoot('clientes')
  const bg = fullSvg(minePit('mine'))
  const dust = new Dust({ count: 120, color: '201, 162, 122', speed: 0.4, size: [1, 3], area: { x: 0, y: 500, w: 1920, h: 600 } })
  const machines = [
    { id: 'cm-1', label: 'Motoniveladora', x: 40, s: 0.62, art: motorGrader('mg') },
    { id: 'cm-2', label: 'Bulldozer', x: 420, s: 0.62, art: bulldozer('bz') },
    { id: 'cm-3', label: 'Perforadora', x: 760, s: 0.62, art: drillRig('dr') },
    { id: 'cm-4', label: 'Camión Komatsu', x: 1000, s: 0.62, art: komatsuTruck('km') },
    { id: 'cm-5', label: 'Camión CAT 797F', x: 1400, s: 0.36, art: `<g transform="translate(60 -498)">${truck797('c97')}</g>` },
  ]
  const art = fullSvg(machines.map((m) => `<g id="${m.id}" transform="translate(${m.x} 905) scale(${m.s})" opacity="0">${m.art}</g>`).join(''))
  const title = el('div', { class: 'abs', html: '<div class="kicker">Para quién trabajamos</div><div class="headline" style="font-size:112px;margin-top:8px">Nuestros <em>clientes</em></div>' })
  Object.assign(title.style, { left: '120px', top: '90px', opacity: '0' })
  const intro = el('div', { class: 'sub abs', html: 'Nuestros principales clientes son la <b style="color:var(--ink);font-weight:600">gran minería del país</b>. Ellos desmontan componentes de sus camiones de extracción y equipos de apoyo, y nosotros los bajamos a nuestros talleres.' })
  Object.assign(intro.style, { left: '120px', top: '300px', maxWidth: '1100px', opacity: '0', fontSize: '32px', textShadow: '0 4px 24px rgba(0,0,0,.8)' })
  const labels = machines.map((m) => tag(m.label, m.x + 30, 930, ''))
  const tagEq = tag('Equipos que reparamos · camiones de extracción y equipos de apoyo', 120, 470, 'info')
  root.append(bg)
  photoBg(root, 'mine-day.jpg', bg)
  root.append(dust.canvas, art, title, intro, tagEq, ...labels)

  return {
    id: 'clientes', title: 'Nuestros clientes', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      tl.fromTo(q('#mine-benches'), { y: 40 }, { y: 0, duration: 5, ease: 'power2.out' }, at)
      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, at + 0.3)
      tl.fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, at + 1)
      pop(tl, tagEq, at + 2.2)
      machines.forEach((m, i) => {
        tl.fromTo(q(`#${m.id}`), { opacity: 0, attr: { transform: `translate(${m.x + 80} 905) scale(${m.s})` } }, { opacity: 1, attr: { transform: `translate(${m.x} 905) scale(${m.s})` }, duration: 0.8, ease: 'power3.out' }, at + 2.4 + i * 0.55)
        pop(tl, labels[i], at + 2.8 + i * 0.55)
      })
      tl.to([title, intro, tagEq, ...labels, art], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, at + 7.8)
      sceneLeave(tl, root, at + 8.2, 0.9)
      return 9.1
    },
  }
}
