import { el, svg, splitWords } from './dom'

/**
 * Cada escena construye su DOM y añade sus tweens a la línea de tiempo maestra
 * a partir de una posición (label). Devuelve la duración que ocupa.
 */
export interface Scene {
  id: string
  title: string
  root: HTMLElement
  /** Añade tweens al master empezando en `at`. Debe devolver la duración total de la escena. */
  build(master: gsap.core.Timeline, at: number): number
  /** Efectos de canvas: se activan/desactivan al entrar/salir de la escena. */
  onEnter?(): void
  onLeave?(): void
}

export function sceneRoot(id: string): HTMLElement {
  return el('div', { class: 'scene', id: `scene-${id}` })
}

export function fullSvg(inner: string, cls = 'full'): SVGSVGElement {
  const s = svg('svg', { class: cls, viewBox: '0 0 1920 1080', preserveAspectRatio: 'xMidYMid slice' })
  s.innerHTML = inner
  return s
}

/** Crea un bloque de cita grande con palabras separadas, listo para animar. */
export function quote(text: string, x = 120, y = 440, maxW = 1400): HTMLElement {
  const q = el('div', { class: 'quote abs' })
  q.style.left = `${x}px`; q.style.top = `${y}px`; q.style.maxWidth = `${maxW}px`
  q.append(...splitWords(text))
  return q
}

/** Tween estándar de entrada de cita palabra por palabra. */
export function revealQuote(tl: gsap.core.Timeline, q: HTMLElement, at: number, hold = 3.5) {
  const words = q.querySelectorAll('.w')
  tl.set(q, { opacity: 1 }, at)
  tl.fromTo(words, { yPercent: 110, opacity: 0, rotateX: -40 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.09, ease: 'power4.out' }, at)
  tl.to(words, { yPercent: -60, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'power3.in' }, at + hold)
  return at + hold + 0.6
}

/** Lower-third con kicker + título. */
export function lowerThird(kicker: string, title: string): HTMLElement {
  const lt = el('div', { class: 'lower-third' })
  lt.append(el('div', { class: 'bar' }), el('div', { class: 'kicker' }, kicker), el('div', { class: 'headline', style: 'font-size:72px' }, title))
  return lt
}

export function showLowerThird(tl: gsap.core.Timeline, lt: HTMLElement, at: number, hold = 4) {
  const [bar, k, h] = Array.from(lt.children) as HTMLElement[]
  tl.set(lt, { opacity: 1 }, at)
  tl.fromTo(bar, { width: 0 }, { width: 140, duration: 0.6, ease: 'power3.out' }, at)
  tl.fromTo(k, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, at + 0.15)
  tl.fromTo(h, { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.out' }, at + 0.3)
  tl.to(lt, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, at + hold)
  tl.set(lt, { y: 0 }, at + hold + 0.6)
}

/** Etiqueta tipo HUD en una posición. */
export function tag(text: string, x: number, y: number, kind: '' | 'ok' | 'info' = ''): HTMLElement {
  const t = el('div', { class: `tag abs ${kind}` }, text)
  t.style.left = `${x}px`; t.style.top = `${y}px`
  return t
}

export function pop(tl: gsap.core.Timeline, node: Element | Element[], at: number, hold?: number) {
  tl.fromTo(node, { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.6)' }, at)
  if (hold !== undefined) tl.to(node, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' }, at + hold)
}

/** Transición: entrada/salida de escena (fade + zoom sutil). Devuelve helpers. */
export function sceneEnter(tl: gsap.core.Timeline, root: HTMLElement, at: number, dur = 1) {
  tl.set(root, { visibility: 'visible' }, at)
  tl.fromTo(root, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: dur, ease: 'power2.out' }, at)
}
export function sceneLeave(tl: gsap.core.Timeline, root: HTMLElement, at: number, dur = 0.9) {
  tl.to(root, { opacity: 0, scale: 0.98, duration: dur, ease: 'power2.in' }, at)
  tl.set(root, { visibility: 'hidden' }, at + dur)
}

/** Wipe con barra ámbar que cruza la pantalla (transición marcada). */
export function wipe(tl: gsap.core.Timeline, stage: HTMLElement, at: number) {
  const bar = el('div', { class: 'abs' })
  Object.assign(bar.style, { left: '0', top: '0', width: '100%', height: '100%', background: 'var(--amber)', zIndex: '50', transformOrigin: 'left', pointerEvents: 'none', visibility: 'hidden' })
  stage.append(bar)
  tl.set(bar, { visibility: 'visible', scaleX: 0, transformOrigin: 'left' }, at)
  tl.to(bar, { scaleX: 1, duration: 0.45, ease: 'power4.inOut' }, at)
  tl.set(bar, { transformOrigin: 'right' }, at + 0.46)
  tl.to(bar, { scaleX: 0, duration: 0.45, ease: 'power4.inOut' }, at + 0.5)
  tl.set(bar, { visibility: 'hidden' }, at + 0.96)
}

/**
 * Fondo fotográfico opcional: si existe /media/<file>, reemplaza el fondo vectorial `vectorBg`
 * (ver public/media/README.md). Si no existe, no hace nada.
 */
export function photoBg(root: HTMLElement, file: string, vectorBg: Element) {
  const img = el('img', { class: 'layer', src: `${import.meta.env.BASE_URL}media/${file}`, alt: '' })
  Object.assign(img.style, { objectFit: 'cover', width: '100%', height: '100%', opacity: '0', transition: 'opacity .8s' })
  img.addEventListener('load', () => {
    img.style.opacity = '1'
    ;(vectorBg as HTMLElement).style.opacity = '0'
  })
  img.addEventListener('error', () => img.remove())
  root.append(img)
}

/** Logo institucional PTT · Marubeni Group (HTML). `size` = tamaño base en px. */
export function logoPTT(size = 120): HTMLElement {
  const l = el('div', { class: 'ptt-logo', html: '<span class="l1">Power</span><span class="l2">Train</span><span class="l3">Technologies</span><span class="l4">Marubeni Group</span>' })
  l.style.fontSize = `${size}px`
  return l
}
