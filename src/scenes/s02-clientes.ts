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
    { id: 'cm-4', label: 'Camiones de extracción', x: 1000, s: 0.62, art: komatsuTruck('km') },
    { id: 'cm-5', label: 'Camión CAT 797F', x: 1400, s: 0.36, art: `<g transform="translate(60 -498)">${truck797('c97')}</g>` },
  ]
  const art = fullSvg(machines.map((m) => `<g id="${m.id}" transform="translate(${m.x} 905) scale(${m.s})" opacity="0">${m.art}</g>`).join(''))
  const title = el('div', { class: 'abs', html: '<div class="kicker" style="font-family:var(--font-display);font-size:54px;font-weight:600;letter-spacing:.14em;line-height:1">Nuestros clientes</div><div class="headline" style="font-size:132px;margin-top:14px">La gran <em>minería</em></div>' })
  // R5 · obs. 1: el título "Nuestros clientes" pasa de kicker de 18 px a 54 px (display), sobre "La gran minería".
  Object.assign(title.style, { left: '120px', top: '90px', opacity: '0' })
  // R4 · obs. 00:17: se elimina el párrafo; queda solo el título grande.
  const labels = machines.map((m) => tag(m.label, m.x + 30, 930, ''))
  const tagEq = tag('Componentes de los siguientes equipos, entre otros.', 120, 400, 'info')
  root.append(bg)
  photoBg(root, 'mine-day.jpg', bg)
  root.append(dust.canvas, art, title, tagEq, ...labels)

  return {
    id: 'clientes', title: 'Nuestros clientes', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      tl.fromTo(q('#mine-benches'), { y: 40 }, { y: 0, duration: 5, ease: 'power2.out' }, at)
      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, at + 0.3)
      pop(tl, tagEq, at + 2.2)
      machines.forEach((m, i) => {
        tl.fromTo(q(`#${m.id}`), { opacity: 0, attr: { transform: `translate(${m.x + 80} 905) scale(${m.s})` } }, { opacity: 1, attr: { transform: `translate(${m.x} 905) scale(${m.s})` }, duration: 0.8, ease: 'power3.out' }, at + 2.4 + i * 0.55)
        pop(tl, labels[i], at + 2.8 + i * 0.55)
      })
      tl.to([title, tagEq, ...labels, art], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, at + 7.3)
      sceneLeave(tl, root, at + 7.7, 0.9)
      return 8.6
    },
  }
}
