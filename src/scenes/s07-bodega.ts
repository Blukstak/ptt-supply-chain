import { industrialFloor, hangingLights, warehouseRack, lowboyTruck, pttWorker, crate } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * BODEGA PTT (R2 · obs. 10 y 11): el camión cargado llega a bodega, el personal revisa la carga,
 * se ingresa al WMS y la carga pasa directo a taller para el armado.
 */
export function bodegaScene(): Scene {
  const root = sceneRoot('bodega')
  const bg = fullSvg(`${industrialFloor('bf', '#0c1219')}${hangingLights('bl', [200, 640, 1080, 1520], 40)}
    <g id="bd-racks"><g transform="translate(1000 230)">${warehouseRack('r2', 5, 3, 150, 120)}</g></g>
    <text x="960" y="200" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="34" fill="#e0262b" letter-spacing="6">BODEGA · PTT</text>
    <g id="bd-semi" transform="translate(-1000 560) scale(.85)">${lowboyTruck('bds', true)}</g>
    <g id="bd-people" opacity="0">
      <g transform="translate(980 530)">${pttWorker('bw1', true)}</g>
      <g transform="translate(1090 540) scale(.95)">${pttWorker('bw2', false)}</g>
    </g>
    <g id="bd-beam" opacity="0"><line x1="1010" y1="580" x2="560" y2="660" stroke="#f0503c" stroke-width="3"/><circle cx="560" cy="660" r="16" fill="none" stroke="#f0503c" stroke-width="3"/></g>
    <g id="bd-move">${[0, 1].map((i) => `<g class="bd-box" opacity="0" transform="translate(${300 + i * 140} 640) scale(.7)">${crate(`bdc${i}`, 130, 130, ['EUROPA', 'ASIA'][i])}</g>`).join('')}</g>
  `)
  const lt = lowerThird('Bodega PTT', 'Revisión e ingreso de la carga')
  const tagIn = tag('Carga de EE.UU., Europa y Asia · llegada a bodega', 120, 150, 'info')
  const tagChk = tag('Personal PTT revisa la carga · ingreso al WMS', 120, 210, 'ok')
  const tagTo = tag('De bodega, directo a taller para el armado →', 1150, 900, 'ok')
  root.append(bg)
  photoBg(root, 'warehouse.jpg', bg)
  root.append(lt, tagIn, tagChk, tagTo)

  return {
    id: 'bodega', title: 'Bodega', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      tl.to(q('#bd-semi'), { attr: { transform: 'translate(120 560) scale(.85)' }, duration: 2.6, ease: 'power2.out' }, at + 0.2)
      tl.to(['#bds-w0', '#bds-w1', '#bds-w2', '#bds-w3', '#bds-w4'].map(q), { rotation: 900, transformOrigin: '50% 50%', duration: 2.6, ease: 'power2.out' }, at + 0.2)
      pop(tl, tagIn, at + 1.2)
      tl.fromTo(q('#bd-people'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, at + 2.4)
      const scanAt = at + 3.2
      tl.to(q('#bd-beam'), { opacity: 1, duration: 0.12, repeat: 7, yoyo: true }, scanAt)
      tl.fromTo(root.querySelector('#bds-cargo')!, { filter: 'brightness(1.8)' }, { filter: 'brightness(1)', duration: 0.6 }, scanAt + 0.6)
      pop(tl, tagChk, scanAt + 0.8)
      // Cajas van al rack (ingreso) …
      const boxes = Array.from(root.querySelectorAll('.bd-box')) as SVGGElement[]
      boxes.forEach((b, i) => {
        tl.set(b, { opacity: 1 }, scanAt + 1.4 + i * 0.4)
        tl.to(b, { attr: { transform: `translate(${1170 + i * 300} ${i ? 372 : 252}) scale(.7)` }, duration: 0.9, ease: 'power2.inOut' }, scanAt + 1.4 + i * 0.4)
      })
      // … y de bodega pasan directo a taller (salen por la derecha)
      const outAt = scanAt + 3.6
      pop(tl, tagTo, outAt)
      boxes.forEach((b, i) => tl.to(b, { attr: { transform: `translate(2100 ${i ? 372 : 252}) scale(.7)` }, duration: 1, ease: 'power2.in' }, outAt + 0.6 + i * 0.25))
      tl.to([tagIn, tagChk], { opacity: 0, duration: 0.4 }, outAt + 1.4)
      sceneLeave(tl, root, outAt + 2, 0.9)
      return outAt + 2.9 - at
    },
  }
}
