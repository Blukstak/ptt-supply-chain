import { industrialFloor, hangingLights, warehouseRack, lowboyTruck, pttWorker, crate } from '../art'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, lowerThird, showLowerThird, tag, pop, stepsBar, SUPPLY_STEPS } from '../core/scene'

/**
 * BODEGA PTT (R2 · obs. 10 y 11; R3 · obs. 5): dos flujos claramente distintos —
 * (a) recepción y revisión de la carga que llegó de los distintos países y
 * (b) picking de los repuestos que ya estaban en bodega —
 * se consolidan en una misma caja, y esa caja se entrega a taller.
 * La barra superior continúa los pasos 04–06 de la cadena de abastecimiento.
 */
export function bodegaScene(): Scene {
  const root = sceneRoot('bodega')
  // Cajas pequeñas: 3 de la carga internacional (salen del camión) y 2 de picking (salen del rack)
  const cargoBoxes = [['EE.UU.', 188, 655], ['EUROPA', 307, 645], ['ASIA', 426, 640]] as const
  const pickBoxes = [[1464, 372], [1614, 252]] as const
  const PAL = { x: 1250, y: 860 }
  const bg = fullSvg(`${industrialFloor('bf', '#0c1219')}${hangingLights('bl', [200, 640, 1080, 1520], 40)}
    <g id="bd-racks"><g transform="translate(1000 230)">${warehouseRack('r2', 5, 3, 150, 120)}</g></g>
    <text x="960" y="218" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="34" fill="#e0262b" letter-spacing="6">BODEGA · PTT</text>
    <g id="bd-semi" transform="translate(-1000 560) scale(.85)">${lowboyTruck('bds', true)}</g>
    <g id="bd-people" opacity="0">
      <g transform="translate(1020 715) scale(.42)">${pttWorker('bw1', true)}</g>
      <g transform="translate(1140 715) scale(.42)">${pttWorker('bw2', false)}</g>
    </g>
    <g id="bd-picker" transform="translate(1690 760) scale(.42)" opacity="0">${pttWorker('bw3', true)}</g>
    <g id="bd-scanfx" opacity="0"><rect x="350" y="645" width="268" height="118" rx="6" fill="#fff"/></g>
    <g id="bd-beam" opacity="0"><line x1="1040" y1="735" x2="560" y2="660" stroke="#f0503c" stroke-width="3"/><circle cx="560" cy="660" r="16" fill="none" stroke="#f0503c" stroke-width="3"/></g>
    <g id="bd-beam2" opacity="0"><line x1="1710" y1="780" x2="1510" y2="420" stroke="#f0503c" stroke-width="3"/><circle cx="1510" cy="420" r="16" fill="none" stroke="#f0503c" stroke-width="3"/></g>
    <g id="bd-pallet" opacity="0" transform="translate(${PAL.x} ${PAL.y})">
      <rect x="-20" y="0" width="340" height="14" fill="#7b5a3a"/><rect x="-20" y="14" width="340" height="10" fill="#5e422a"/>
      <rect x="-20" y="-170" width="340" height="170" fill="none" stroke="#e0262b" stroke-width="2" stroke-dasharray="8 6" opacity=".7"/>
    </g>
    <g id="bd-move">
      ${cargoBoxes.map(([l, x, y], i) => `<g class="bd-cargo" opacity="0" transform="translate(${x} ${y}) scale(.6)">${crate(`bdc${i}`, 130, 130, l)}</g>`).join('')}
      ${pickBoxes.map(([x, y], i) => `<g class="bd-pick" transform="translate(${x} ${y}) scale(.7)">${crate(`bdp${i}`, 130, 130, 'STOCK')}</g>`).join('')}
    </g>
    <g id="bd-big" opacity="0" transform="translate(${PAL.x} ${PAL.y - 180})">${crate('bdk', 300, 180, 'PTT')}
      <text x="150" y="-14" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="22" fill="#fff" letter-spacing="3">REPUESTOS DE BODEGA + COMPRAS · OT-4471</text></g>
  `)
  const lt = lowerThird('Bodega PTT', 'Bodega completa los repuestos para la reparación y entrega en la fecha planificada.')
  Object.assign((lt.querySelector('.headline') as HTMLElement).style, { fontSize: '50px', maxWidth: '1500px' })
  const { steps, activate } = stepsBar(SUPPLY_STEPS, 110, 40, true)
  const tagIn = tag('Recepción de la carga de EE.UU., Europa y Asia', 120, 250, 'info')
  const tagChk = tag('Personal PTT revisa la carga · ingreso al WMS', 120, 310, 'ok')
  const tagPick = tag('Picking de repuestos que ya están en bodega', 1160, 612, 'info')
  const tagCons = tag('Ambos flujos se consolidan en una misma caja', 1160, 920, 'ok')
  const tagTo = tag('Entrega a taller en la fecha planificada →', 1160, 980, 'ok')
  root.append(bg)
  photoBg(root, 'warehouse.jpg', bg)
  root.append(lt, steps, tagIn, tagChk, tagPick, tagCons, tagTo)

  return {
    id: 'bodega', title: 'Bodega', root,
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      sceneEnter(tl, root, at, 1)
      showLowerThird(tl, lt, at + 0.5, 3.4)
      tl.set(steps, { opacity: 1 }, at + 0.4)
      pop(tl, Array.from(steps.children), at + 0.5)
      // 04 — Recepción y revisión: el camión cargado llega y el personal revisa la carga
      tl.add(activate(3), at + 0.8)
      tl.to(q('#bd-semi'), { attr: { transform: 'translate(120 560) scale(.85)' }, duration: 2.6, ease: 'power2.out' }, at + 0.2)
      tl.to(['#bds-w0', '#bds-w1', '#bds-w2', '#bds-w3', '#bds-w4'].map(q), { rotation: 900, transformOrigin: '50% 50%', duration: 2.6, ease: 'power2.out' }, at + 0.2)
      pop(tl, tagIn, at + 1.2)
      tl.fromTo(q('#bd-people'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, at + 2.4)
      const scanAt = at + 3.0
      tl.to(q('#bd-beam'), { opacity: 1, duration: 0.12, repeat: 7, yoyo: true }, scanAt)
      // R5 · fluidez: destello por opacidad en vez de `filter: brightness()` sobre el grupo de carga
      tl.fromTo(q('#bd-scanfx'), { opacity: 0.55 }, { opacity: 0, duration: 0.6 }, scanAt + 0.6)
      pop(tl, tagChk, scanAt + 0.8)
      // Flujo (a): la carga internacional baja del camión a la zona de consolidación
      tl.to(q('#bd-pallet'), { opacity: 1, duration: 0.5 }, scanAt + 1)
      tl.to(root.querySelector('#bds-cargo')!, { opacity: 0, duration: 0.6 }, scanAt + 1.3)
      const cargo = Array.from(root.querySelectorAll('.bd-cargo')) as SVGGElement[]
      cargo.forEach((b, i) => {
        tl.set(b, { opacity: 1 }, scanAt + 1.2 + i * 0.25)
        tl.to(b, { attr: { transform: `translate(${PAL.x + i * 100} ${PAL.y - 80}) scale(.6)` }, duration: 0.9, ease: 'power2.inOut' }, scanAt + 1.2 + i * 0.25)
      })
      // Flujo (b) — 05 Picking: repuestos que ya estaban en bodega salen del rack
      const pickAt = scanAt + 1.9
      tl.add(activate(4), pickAt)
      tl.fromTo(q('#bd-picker'), { opacity: 0, attr: { transform: 'translate(1730 760) scale(.42)' } }, { opacity: 1, attr: { transform: 'translate(1690 760) scale(.42)' }, duration: 0.5, ease: 'power3.out' }, pickAt)
      tl.to(q('#bd-beam2'), { opacity: 1, duration: 0.12, repeat: 5, yoyo: true }, pickAt + 0.3)
      pop(tl, tagPick, pickAt + 0.2)
      const picks = Array.from(root.querySelectorAll('.bd-pick')) as SVGGElement[]
      picks.forEach((b, i) => {
        tl.to(b, { attr: { transform: `translate(${PAL.x + 50 + i * 100} ${PAL.y - 160}) scale(.6)` }, duration: 0.9, ease: 'power2.inOut' }, pickAt + 0.5 + i * 0.3)
      })
      // 06 — Consolidación en una sola caja y entrega a taller
      const consAt = pickAt + 2.0
      tl.add(activate(5), consAt)
      tl.to([tagPick, q('#bd-beam2')], { opacity: 0, duration: 0.3 }, consAt)
      tl.to([...cargo, ...picks], { opacity: 0, scale: 0.3, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.in', stagger: 0.05 }, consAt)
      tl.fromTo(q('#bd-big'), { opacity: 0, attr: { transform: `translate(${PAL.x + 75} ${PAL.y - 90}) scale(.5)` } }, { opacity: 1, attr: { transform: `translate(${PAL.x} ${PAL.y - 180}) scale(1)` }, duration: 0.6, ease: 'back.out(1.5)' }, consAt + 0.35)
      pop(tl, tagCons, consAt + 0.5)
      pop(tl, tagTo, consAt + 1.1)
      tl.to(q('#bd-big'), { attr: { transform: `translate(2100 ${PAL.y - 180}) scale(1)` }, duration: 1, ease: 'power2.in' }, consAt + 1.9)
      tl.to([tagIn, tagChk, tagCons], { opacity: 0, duration: 0.4 }, consAt + 2.2)
      sceneLeave(tl, root, consAt + 2.6, 0.9)
      return consAt + 3.5 - at
    },
  }
}
