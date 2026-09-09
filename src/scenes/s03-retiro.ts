import { el } from '../core/dom'
import { minePit, lowboyTruck, finalDriveSide, truck797 } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/**
 * ESCENA 3 — Retiro del componente y logística inversa.
 * Detención programada: se retira el mando final usado, se embala y sale de la faena rumbo a PTT.
 */
export function retiroScene(): Scene {
  const root = sceneRoot('retiro')
  const bg = fullSvg(minePit('mine2'))
  // Atardecer: teñimos el cielo
  const tint = el('div', { class: 'layer' })
  tint.style.background = 'linear-gradient(to bottom, rgba(120,60,20,.35), rgba(0,0,0,0) 60%)'
  const dust = new Dust({ count: 120, color: '201, 162, 122', speed: 0.4, size: [1, 3], area: { x: 0, y: 500, w: 1920, h: 600 } })

  const art = fullSvg(`
    <g id="rt-797" transform="translate(1250 560) scale(.5)" opacity="0">${truck797('rt')}</g>
    <g id="rt-semi" transform="translate(-1000 720) scale(.95)">${lowboyTruck('semi')}
      <g transform="translate(330 140) scale(.42)">${finalDriveSide('cr', 'FD-797')}</g>
    </g>
    <g id="rt-crate-big" transform="translate(760 420)" opacity="0">${finalDriveSide('crb', 'FD-797')}</g>
  `)
  const lt = lowerThird('Escena 03 · Retiro y logística inversa', 'Detención programada')
  const steps = el('div', { class: 'steps' })
  ;['Retiro del componente', 'Carga en cama baja', 'Guía de despacho', 'Trazabilidad activa'].forEach((s, i) => {
    steps.append(el('div', { class: 'step', html: `<span class="n">0${i + 1}</span>${s}` }))
  })
  Object.assign(steps.style, { left: '120px', top: '160px' })
  const tagId = tag('ID componente: FD-797-0412 · Serie 3XR01288', 760, 660, 'info')
  const tagGD = tag('Guía de despacho emitida · Destino: Taller PTT', 520, 940, 'ok')
  const q1 = quote('Cada componente tiene una historia. Nosotros la registramos.', 120, 380, 1500)

  root.append(bg)
  photoBg(root, 'mine-dusk.jpg', bg)
  root.append(tint, dust.canvas, art, lt, steps, tagId, tagGD, q1)

  return {
    id: 'retiro', title: 'Escena 3 · Retiro', root,
    onEnter: () => dust.start(), onLeave: () => dust.stop(),
    build(tl, at) {
      const q = (s: string) => root.querySelector(s) as SVGGElement
      const stepEls = Array.from(steps.children) as HTMLElement[]
      sceneEnter(tl, root, at, 1.4)
      showLowerThird(tl, lt, at + 0.6, 4)
      tl.to(q('#rt-797'), { opacity: 1, duration: 1 }, at + 0.3)
      tl.set(steps, { opacity: 1 }, at + 1)
      pop(tl, stepEls, at + 1.2)

      // 01 retiro: la caja grande "sale" del camión (desde la rueda) hacia el centro
      const s1 = at + 3.2
      tl.add(() => stepEls.forEach((s, i) => s.classList.toggle('active', i === 0)), s1)
      tl.fromTo(q('#rt-crate-big'), { opacity: 0, attr: { transform: 'translate(1500 720) scale(.2)' } }, { opacity: 1, attr: { transform: 'translate(760 460) scale(1.1)' }, duration: 1.4, ease: 'power3.out' }, s1)
      pop(tl, tagId, s1 + 1.2)
      // 02 embalaje: flash sobre la caja
      const s2 = s1 + 3.4
      tl.add(() => stepEls.forEach((s, i) => s.classList.toggle('active', i === 1)), s2)
      tl.fromTo(q('#crb'), { filter: 'brightness(2.2)' }, { filter: 'brightness(1)', duration: 0.8 }, s2)
      // 03 guía de despacho
      const s3 = s2 + 2.4
      tl.add(() => stepEls.forEach((s, i) => s.classList.toggle('active', i === 2)), s3)
      pop(tl, tagGD, s3)
      // 04 trazabilidad: la caja baja al camión, el camión cruza la pantalla
      const s4 = s3 + 2.8
      tl.add(() => stepEls.forEach((s, i) => s.classList.toggle('active', i === 3)), s4)
      tl.to([tagId, tagGD], { opacity: 0, duration: 0.5 }, s4)
      tl.to(q('#rt-crate-big'), { opacity: 0, attr: { transform: 'translate(760 460) scale(.3)' }, duration: 0.9, ease: 'power3.in' }, s4)
      tl.to(q('#rt-semi'), { attr: { transform: 'translate(2200 720) scale(.95)' }, duration: 8, ease: 'power1.inOut' }, s4 + 0.6)
      tl.to(['#semi-w0', '#semi-w1', '#semi-w2', '#semi-w3', '#semi-w4'].map(q), { rotation: 1400, transformOrigin: '50% 50%', duration: 8, ease: 'power1.inOut' }, s4 + 0.6)
      // Cita mientras el camión avanza
      tl.to(steps, { opacity: 0, y: -20, duration: 0.5 }, s4 + 2)
      const end = revealQuote(tl, q1, s4 + 2.6, 4)
      sceneLeave(tl, root, end + 0.2, 1)
      return end + 1.4 - at
    },
  }
}
