/**
 * Editor de locución (solo modo dev).
 * Monta una pista sobre la barra de progreso del reproductor: cada nota de voz es
 * un bloque que se arrastra para mover su inicio, se estira por los bordes para
 * recortar entrada/salida, y se puede reordenar y secuenciar con un delay fijo.
 * Guardar / Revertir persisten en localStorage.
 */
import gsap from 'gsap'
import type { Player } from '../core/player'
import './dev.css'
import {
  DEFAULT_CLIPS, DEFAULT_GAP, VoiceoverTrack, clearSaved, loadSaved, save,
  type Clip, type VoiceoverState,
} from './voiceover'

const SNAP = 0.25          // rejilla de arrastre, en segundos
const SNAP_CHAPTER = 0.5   // imán a los capítulos, en segundos

const fmt = (t: number) => {
  const m = Math.floor(Math.abs(t) / 60)
  const s = Math.abs(t) % 60
  return `${t < 0 ? '-' : ''}${m}:${s.toFixed(1).padStart(4, '0')}`
}

export function mountEditor(player: Player) {
  const playerUI = document.querySelector('.player')
  const progress = document.querySelector('.player .progress')
  if (!playerUI || !progress) return

  const duration = player.master.duration()
  const chapterTimes = player.chapterList.map((c) => c.time)

  const saved = loadSaved()
  let state: VoiceoverState = saved
    ? { gap: saved.gap, clips: saved.clips.map((c) => ({ ...c })) }
    : { gap: DEFAULT_GAP, clips: DEFAULT_CLIPS.map((c) => ({ ...c })) }
  let dirty = false
  let firstLayoutPending = !saved

  const track = new VoiceoverTrack(state.clips, () => {
    // Con las duraciones ya conocidas, si no había nada guardado dejamos una
    // disposición inicial razonable: 1..6 en secuencia y la 7 en su minuto 1:49.
    if (firstLayoutPending) {
      firstLayoutPending = false
      sequence(state.clips.filter((c) => c.id !== '07'), 0, state.gap)
      dirty = false
    }
    render()
  })

  // ---------- DOM ----------
  const panel = document.createElement('div')
  panel.className = 'dev-audio'
  panel.innerHTML = `
    <div class="da-head">
      <span class="da-title">Locución<b>DEV</b></span>
      <label class="da-field">delay <input class="da-gap" type="number" step="0.1" min="0" value="${state.gap}"> s</label>
      <button class="da-btn" data-act="seq" title="Coloca todos los audios en el orden de la lista, uno tras otro, separados por el delay">Secuenciar</button>
      <span class="da-grow"></span>
      <button class="da-btn da-primary" data-act="save">Guardar</button>
      <button class="da-btn" data-act="revert" title="Vuelve a lo último guardado">Revertir</button>
      <button class="da-btn" data-act="defaults" title="Descarta lo guardado y vuelve al orden original">Por defecto</button>
      <button class="da-btn" data-act="copy" title="Copia el JSON para dejarlo fijo en el proyecto">Copiar JSON</button>
      <span class="da-status"></span>
      <button class="da-btn da-fold" data-act="fold" title="Plegar el panel">▾</button>
    </div>
    <div class="da-lane"><div class="da-ticks"></div><div class="da-clips"></div><div class="da-cursor"></div></div>
    <div class="da-list"></div>
    <div class="da-hint"><span class="da-totals"></span>Arrastra el bloque para mover · los bordes para recortar entrada/salida · ↑↓ reordena · imán a capítulos y a ¼ s</div>
  `
  playerUI.insertBefore(panel, progress)

  const lane = panel.querySelector('.da-lane') as HTMLElement
  const clipsBox = panel.querySelector('.da-clips') as HTMLElement
  const ticksBox = panel.querySelector('.da-ticks') as HTMLElement
  const listBox = panel.querySelector('.da-list') as HTMLElement
  const cursor = panel.querySelector('.da-cursor') as HTMLElement
  const status = panel.querySelector('.da-status') as HTMLElement
  const gapInput = panel.querySelector('.da-gap') as HTMLInputElement
  const totals = panel.querySelector('.da-totals') as HTMLElement

  // Reglilla: marca cada 10 s y línea por capítulo.
  ticksBox.innerHTML = [
    ...Array.from({ length: Math.floor(duration / 10) + 1 }, (_, i) => {
      const t = i * 10
      return `<span class="da-tick" style="left:${(t / duration) * 100}%"><i></i>${t % 30 === 0 ? `<em>${fmt(t)}</em>` : ''}</span>`
    }),
    ...chapterTimes.map((t) => `<span class="da-chap" style="left:${(t / duration) * 100}%"></span>`),
  ].join('')

  // ---------- utilidades ----------
  const pctOf = (t: number) => (t / duration) * 100
  const timePerPx = () => duration / lane.getBoundingClientRect().width

  function snap(t: number): number {
    const near = chapterTimes.find((c) => Math.abs(c - t) < SNAP_CHAPTER)
    if (near !== undefined) return near
    return Math.round(t / SNAP) * SNAP
  }

  function sequence(clips: Clip[], from: number, gap: number) {
    let cur = from
    for (const c of clips) {
      c.start = Math.round(cur * 100) / 100
      cur += track.spanOf(c) + gap
    }
    markDirty()
  }

  function markDirty() {
    dirty = true
    status.textContent = 'sin guardar'
    status.className = 'da-status warn'
  }

  function flash(msg: string) {
    status.textContent = msg
    status.className = 'da-status ok'
    setTimeout(() => { if (!dirty) { status.textContent = ''; status.className = 'da-status' } }, 2000)
  }

  // ---------- render ----------
  /** Actualiza en vivo solo el bloque que se está arrastrando. */
  function paintClip(c: Clip) {
    const node = clipsBox.querySelector(`.da-clip[data-id="${c.id}"]`) as HTMLElement | null
    if (!node) return
    node.style.left = `${pctOf(c.start)}%`
    node.style.width = `${pctOf(track.spanOf(c))}%`
    const time = node.querySelector('.da-time')
    if (time) time.textContent = fmt(c.start)
  }

  /** Ids de clips que pisan a otro: dos locuciones sonando a la vez. */
  function overlapping(): Set<string> {
    const out = new Set<string>()
    const sorted = [...state.clips].sort((a, b) => a.start - b.start)
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1], cur = sorted[i]
      if (cur.start < prev.start + track.spanOf(prev) - 0.01) { out.add(prev.id); out.add(cur.id) }
    }
    return out
  }

  function render() {
    const over = overlapping()
    clipsBox.innerHTML = state.clips.map((c, i) => {
      const span = track.spanOf(c)
      const full = track.durations.get(c.id) ?? 0
      const missing = full === 0
      return `<div class="da-clip${missing ? ' missing' : ''}${over.has(c.id) ? ' overlap' : ''}" data-id="${c.id}" style="left:${pctOf(c.start)}%;width:${pctOf(span)}%">
        <span class="da-handle l"></span>
        <span class="da-name">${i + 1}. ${c.label}${missing ? ' · sin archivo' : ''}</span>
        <span class="da-time">${fmt(c.start)}</span>
        <span class="da-handle r"></span>
      </div>`
    }).join('')

    const sum = state.clips.reduce((n, c) => n + track.spanOf(c), 0)
    const last = Math.max(...state.clips.map((c) => c.start + track.spanOf(c)), 0)
    totals.innerHTML = `locución ${fmt(sum)} · termina en ${fmt(last)} · animación ${fmt(duration)}` +
      (last > duration + 0.05 ? ' <b class="da-warn">· se pasa del final</b>' : '') + ' &nbsp;·&nbsp; '

    listBox.innerHTML = state.clips.map((c, i) => {
      const full = track.durations.get(c.id) ?? 0
      return `<div class="da-row" data-id="${c.id}">
        <button class="da-mini" data-move="-1" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button class="da-mini" data-move="1" ${i === state.clips.length - 1 ? 'disabled' : ''}>↓</button>
        <span class="da-row-name">${c.label}</span>
        <label>inicio <input class="da-num" data-f="start" type="number" step="0.1" value="${c.start.toFixed(1)}"></label>
        <span class="da-row-dur">dura ${fmt(track.spanOf(c))}${c.offset > 0 || (c.end !== null && c.end < full) ? ' · recortado' : ''}${over.has(c.id) ? ' <b class="da-warn">· pisa a otro</b>' : ''}</span>
        <button class="da-mini" data-act="here" title="Mover el inicio al punto actual de la animación">⤓ aquí</button>
        <button class="da-mini" data-act="preview" title="Saltar la animación al inicio de este audio">▶</button>
      </div>`
    }).join('')
  }

  // ---------- arrastre en la pista ----------
  let drag: { id: string; mode: 'move' | 'l' | 'r'; x0: number; c0: Clip } | null = null

  clipsBox.addEventListener('pointerdown', (e) => {
    const target = e.target as HTMLElement
    const block = target.closest('.da-clip') as HTMLElement | null
    if (!block) return
    const id = block.dataset.id!
    const clip = state.clips.find((c) => c.id === id)
    if (!clip) return
    const mode = target.classList.contains('l') ? 'l' : target.classList.contains('r') ? 'r' : 'move'
    drag = { id, mode, x0: e.clientX, c0: { ...clip } }
    block.classList.add('dragging')
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* sin puntero activo */ }
    e.preventDefault()
  })

  clipsBox.addEventListener('pointermove', (e) => {
    if (!drag) return
    const clip = state.clips.find((c) => c.id === drag!.id)!
    const full = track.durations.get(clip.id) ?? 0
    const dt = (e.clientX - drag.x0) * timePerPx()

    if (drag.mode === 'move') {
      clip.start = Math.max(0, Math.min(duration - 0.1, snap(drag.c0.start + dt)))
    } else if (drag.mode === 'l') {
      // Recorta la entrada manteniendo el contenido donde está.
      const end = drag.c0.end ?? full
      const offset = Math.max(0, Math.min(end - 0.2, drag.c0.offset + dt))
      clip.offset = Math.round(offset * 100) / 100
      clip.start = Math.max(0, snap(drag.c0.start + (clip.offset - drag.c0.offset)))
    } else {
      const end = Math.max(clip.offset + 0.2, Math.min(full || Infinity, (drag.c0.end ?? full) + dt))
      clip.end = Math.round(end * 100) / 100
    }
    markDirty()
    paintClip(clip)
  })

  const endDrag = () => {
    if (!drag) return
    drag = null
    clipsBox.querySelectorAll('.dragging').forEach((n) => n.classList.remove('dragging'))
    render()
  }
  clipsBox.addEventListener('pointerup', endDrag)
  clipsBox.addEventListener('pointercancel', endDrag)

  // ---------- lista: reordenar, editar, saltar ----------
  listBox.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button') as HTMLButtonElement | null
    if (!btn) return
    const id = btn.closest('.da-row')!.getAttribute('data-id')!
    const i = state.clips.findIndex((c) => c.id === id)
    if (btn.dataset.move) {
      const j = i + Number(btn.dataset.move)
      if (j < 0 || j >= state.clips.length) return
      ;[state.clips[i], state.clips[j]] = [state.clips[j], state.clips[i]]
      markDirty(); render()
    } else if (btn.dataset.act === 'here') {
      state.clips[i].start = Math.round(player.master.time() * 100) / 100
      markDirty(); render()
    } else if (btn.dataset.act === 'preview') {
      player.seek(state.clips[i].start)
    }
  })

  listBox.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement
    if (!input.classList.contains('da-num')) return
    const id = input.closest('.da-row')!.getAttribute('data-id')!
    const clip = state.clips.find((c) => c.id === id)!
    clip.start = Math.max(0, Number(input.value) || 0)
    markDirty(); render()
  })

  // ---------- barra de acciones ----------
  gapInput.addEventListener('change', () => { state.gap = Math.max(0, Number(gapInput.value) || 0); markDirty() })

  panel.querySelector('.da-head')!.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest('button')?.dataset.act
    if (!act) return
    if (act === 'seq') {
      sequence(state.clips, state.clips[0]?.start ?? 0, state.gap)
      render()
    } else if (act === 'save') {
      save(state)
      dirty = false
      flash('guardado')
    } else if (act === 'revert') {
      const s = loadSaved()
      state = s ? { gap: s.gap, clips: s.clips.map((c) => ({ ...c })) } : { gap: DEFAULT_GAP, clips: DEFAULT_CLIPS.map((c) => ({ ...c })) }
      gapInput.value = String(state.gap)
      track.setClips(state.clips)
      dirty = false
      flash(s ? 'revertido a lo guardado' : 'sin nada guardado: valores por defecto')
      render()
    } else if (act === 'defaults') {
      clearSaved()
      state = { gap: DEFAULT_GAP, clips: DEFAULT_CLIPS.map((c) => ({ ...c })) }
      gapInput.value = String(state.gap)
      sequence(state.clips.filter((c) => c.id !== '07'), 0, state.gap)
      dirty = false
      flash('valores por defecto')
      render()
    } else if (act === 'fold') {
      const folded = panel.classList.toggle('folded')
      ;(panel.querySelector('.da-fold') as HTMLElement).textContent = folded ? '▴' : '▾'
    } else if (act === 'copy') {
      navigator.clipboard?.writeText(JSON.stringify(state, null, 2))
        .then(() => flash('JSON copiado'))
        .catch(() => flash('no se pudo copiar'))
    }
  })

  // ---------- sincronía con la animación ----------
  gsap.ticker.add(() => {
    const t = player.master.time()
    track.update(t, player.master.paused())
    cursor.style.left = `${pctOf(t)}%`
    if (track.activeId !== lastActive) {
      lastActive = track.activeId
      clipsBox.querySelectorAll('.da-clip').forEach((n) => {
        n.classList.toggle('active', (n as HTMLElement).dataset.id === lastActive)
      })
    }
  })
  let lastActive: string | null = null

  // Handle de depuración: window.__voiceover.track / .state
  ;(window as unknown as { __voiceover: unknown }).__voiceover = { track, get state() { return state }, render }

  window.addEventListener('beforeunload', (e) => {
    if (!dirty) return
    e.preventDefault()
    e.returnValue = ''
  })

  render()
}
