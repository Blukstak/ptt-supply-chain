import gsap from 'gsap'
import { el } from './dom'

export interface Chapter { id: string; title: string; time: number }

/**
 * Controlador de reproducción: escala el stage 1920x1080 al viewport,
 * pinta la barra de progreso, capítulos y atajos de teclado.
 */
export class Player {
  readonly master: gsap.core.Timeline
  readonly stage: HTMLElement
  private wrap: HTMLElement
  private ui: HTMLElement
  private fill!: HTMLElement
  private timeEl!: HTMLElement
  private playBtn!: HTMLButtonElement
  private chapterBtns: HTMLButtonElement[] = []
  private chapters: Chapter[] = []
  private hideTimer = 0

  constructor(root: HTMLElement) {
    this.master = gsap.timeline({ paused: true, onUpdate: () => this.sync(), onComplete: () => this.onEnd() })
    this.wrap = el('div', { class: 'stage-wrap' })
    this.stage = el('div', { class: 'stage' })
    this.stage.append(
      el('div', { class: 'vignette' }),
      el('div', { class: 'grain' }),
      el('div', { class: 'letterbox top' }),
      el('div', { class: 'letterbox bottom' }),
    )
    this.wrap.append(this.stage)
    this.ui = this.buildUI()
    root.append(this.wrap, this.ui)

    window.addEventListener('resize', () => this.fit())
    this.fit()
    this.bindKeys()
    this.wrap.addEventListener('mousemove', () => this.wakeUI())
    this.wrap.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.player')) return
      this.toggle()
    })
  }

  setChapters(chapters: Chapter[]) {
    this.chapters = chapters
    const dur = this.master.duration()
    const bar = this.ui.querySelector('.progress')!
    const list = this.ui.querySelector('.chapters')!
    bar.querySelectorAll('.buf').forEach((n) => n.remove())
    list.innerHTML = ''
    this.chapterBtns = chapters.map((c) => {
      const mark = el('div', { class: 'buf', 'data-title': c.title })
      mark.style.left = `${(c.time / dur) * 100}%`
      bar.append(mark)
      const b = el('button', {}, c.title)
      b.addEventListener('click', () => this.seek(c.time))
      list.append(b)
      return b
    })
  }

  play() { this.master.play(); this.updatePlayIcon(); this.wakeUI() }
  pause() { this.master.pause(); this.updatePlayIcon(); this.wakeUI() }
  toggle() { this.master.paused() ? this.play() : this.pause() }
  seek(t: number) { this.master.seek(Math.max(0, Math.min(t, this.master.duration()))); this.sync(); if (this.master.paused()) this.updatePlayIcon() }
  restart() { this.master.restart(); this.updatePlayIcon() }

  private onEnd() { this.updatePlayIcon(); this.wakeUI(true) }

  private fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
    this.stage.style.transform = `scale(${s})`
  }

  private sync() {
    const t = this.master.time(), d = this.master.duration()
    this.fill.style.width = `${(t / d) * 100}%`
    this.timeEl.textContent = `${fmt(t)} / ${fmt(d)}`
    let active = -1
    this.chapters.forEach((c, i) => { if (t >= c.time - 0.01) active = i })
    this.chapterBtns.forEach((b, i) => b.classList.toggle('active', i === active))
  }

  private buildUI() {
    const ui = el('div', { class: 'player' })
    const progress = el('div', { class: 'progress' })
    this.fill = el('div', { class: 'fill' })
    progress.append(this.fill)
    progress.addEventListener('click', (e) => {
      const r = progress.getBoundingClientRect()
      this.seek(((e.clientX - r.left) / r.width) * this.master.duration())
    })
    this.playBtn = el('button', { class: 'btn', title: 'Reproducir / Pausar (espacio)' })
    this.playBtn.addEventListener('click', () => this.toggle())
    const restart = el('button', { class: 'btn', title: 'Reiniciar (R)', html: ICON.restart })
    restart.addEventListener('click', () => this.restart())
    const full = el('button', { class: 'btn', title: 'Pantalla completa (F)', html: ICON.full })
    full.addEventListener('click', () => toggleFullscreen())
    this.timeEl = el('div', { class: 'time' }, '00:00 / 00:00')
    const chapters = el('div', { class: 'chapters' })
    ui.append(progress, el('div', { class: 'controls' }, [this.playBtn, restart, full, this.timeEl, chapters]))
    this.updatePlayIcon()
    return ui
  }

  private updatePlayIcon() {
    this.playBtn.innerHTML = this.master.paused() || this.master.progress() === 1 ? ICON.play : ICON.pause
  }

  private wakeUI(keep = false) {
    this.ui.classList.remove('hidden')
    clearTimeout(this.hideTimer)
    if (!keep && !this.master.paused()) {
      this.hideTimer = window.setTimeout(() => this.ui.classList.add('hidden'), 2600)
    }
  }

  private bindKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') { e.preventDefault(); this.toggle() }
      if (e.key === 'ArrowRight') this.seek(this.master.time() + 5)
      if (e.key === 'ArrowLeft') this.seek(this.master.time() - 5)
      if (e.key.toLowerCase() === 'f') toggleFullscreen()
      if (e.key.toLowerCase() === 'r') this.restart()
      if (/^[1-9]$/.test(e.key)) { const c = this.chapters[Number(e.key) - 1]; if (c) this.seek(c.time) }
    })
  }
}

function fmt(s: number) {
  const m = Math.floor(s / 60), r = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
  else document.exitFullscreen?.()
}

const ICON = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
  restart: '<svg viewBox="0 0 24 24"><path d="M12 5V2L7 6l5 4V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/></svg>',
  full: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/></svg>',
}
