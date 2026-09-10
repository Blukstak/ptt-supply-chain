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
  VoiceoverTrack, clearSaved, loadSaved, save, shippedState,
  type Clip, type VoiceoverState,
} from '../core/voiceover'

const SNAP = 0.25          // rejilla de arrastre, en segundos
const SNAP_CHAPTER = 0.5   // imán a los capítulos, en segundos

const fmt = (t: number) => {
  const m = Math.floor(Math.abs(t) / 60)
  const s = Math.abs(t) % 60
  return `${t < 0 ? '-' : ''}${m}:${s.toFixed(1).padStart(4, '0')}`
}

export function mountEditor(player: Player, voice: { track: VoiceoverTrack; state: VoiceoverState }) {
  document.body.classList.add('dev-mode')
  const playerUI = document.querySelector('.player')
  const progress = document.querySelector('.player .progress')
  if (!playerUI || !progress) return

  const duration = player.master.duration()
  const chapterTimes = player.chapterList.map((c) => c.time)

  // Editamos exactamente la pista que suena en el video.
  const track = voice.track
  const state: VoiceoverState = voice.state
  let dirty = false

  // Las duraciones llegan de forma asíncrona: repintamos cuando estén.
  const waitForDurations = () => {
    if (state.clips.every((c) => track.durations.has(c.id))) render()
    else setTimeout(waitForDurations, 120)
  }

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
      <button class="da-btn" data-act="revert" title="Vuelve a lo último guardado en este navegador">Revertir</button>
      <button class="da-btn" data-act="defaults" title="Descarta lo del navegador y carga src/voiceover.json">Desde archivo</button>
      <button class="da-btn" data-act="copy" title="Copia el contenido exacto de src/voiceover.json">Copiar JSON</button>
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

  /** Contenido exacto de src/voiceover.json. */
  function fileFormat(): string {
    return JSON.stringify({
      _comment: 'Tiempos de la locución publicada. Para cambiarlos: abrir la página con ?dev=1, mover los audios y pulsar Guardar (escribe este archivo si corre el servidor dev). start = segundo del video en que entra el audio; offset/end recortan dentro del archivo.',
      gap: state.gap,
      clips: state.clips.map((c) => ({ id: c.id, start: c.start, offset: c.offset, end: c.end })),
    }, null, 2)
  }

  /** Escribe src/voiceover.json a través del endpoint del servidor dev. */
  async function writeToProject(): Promise<boolean> {
    try {
      const res = await fetch('/__voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: fileFormat(),
      })
      return res.ok
    } catch {
      return false
    }
  }

  /** Sustituye el contenido del estado sin cambiar la referencia que usa la pista. */
  function applyState(next: VoiceoverState) {
    state.gap = next.gap
    state.clips.length = 0
    state.clips.push(...next.clips.map((c) => ({ ...c })))
    gapInput.value = String(state.gap)
    track.setClips(state.clips)
    render()
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
      // Se guarda en los dos sitios: el archivo del proyecto (persistente, es lo
      // que se publica) y el navegador (compatible con lo que ya había guardado).
      save(state)
      dirty = false
      flash('guardando…')
      writeToProject().then((ok) => {
        flash(ok ? 'guardado en src/voiceover.json + navegador' : 'guardado en el navegador (sin servidor dev)')
      })
    } else if (act === 'revert') {
      const s = loadSaved()
      applyState(s ?? shippedState())
      dirty = false
      flash(s ? 'revertido a lo guardado' : 'sin nada guardado: se usa voiceover.json')
    } else if (act === 'defaults') {
      // Descarta lo del navegador y vuelve a lo que hay en el archivo del proyecto.
      clearSaved()
      fetch('/__voiceover').then((r) => (r.ok ? r.json() : shippedState())).catch(() => shippedState())
        .then((data) => {
          const next = Array.isArray(data?.clips) && data.clips.length
            ? { gap: typeof data.gap === 'number' ? data.gap : state.gap, clips: data.clips.map((c: Partial<Clip>) => ({ ...state.clips.find((x) => x.id === c.id)!, ...c })) }
            : shippedState()
          applyState(next as VoiceoverState)
          dirty = false
          flash('cargado desde src/voiceover.json')
        })
    } else if (act === 'fold') {
      const folded = panel.classList.toggle('folded')
      ;(panel.querySelector('.da-fold') as HTMLElement).textContent = folded ? '▴' : '▾'
    } else if (act === 'copy') {
      const fileJson = fileFormat()
      navigator.clipboard?.writeText(fileJson)
        .then(() => flash('JSON copiado · pégalo en src/voiceover.json'))
        .catch(() => flash('no se pudo copiar'))
    } else if (act === '__never__') {
      JSON.stringify({
        _comment: 'Tiempos de la locución publicada. Para cambiarlos: abrir la página con ?dev=1, mover los audios, pulsar Guardar y luego Copiar JSON, y pegar el resultado aquí. start = segundo del video en que entra el audio; offset/end recortan dentro del archivo.',
        gap: state.gap,
        clips: [],
      }, null, 2)
    }
  })

  // ---------- sincronía con la animación ----------
  gsap.ticker.add(() => {
    const t = player.master.time()
    cursor.style.left = `${pctOf(t)}%`
    if (track.activeId !== lastActive) {
      lastActive = track.activeId
      clipsBox.querySelectorAll('.da-clip').forEach((n) => {
        n.classList.toggle('active', (n as HTMLElement).dataset.id === lastActive)
      })
    }
  })
  let lastActive: string | null = null

  window.addEventListener('beforeunload', (e) => {
    if (!dirty) return
    e.preventDefault()
    e.returnValue = ''
  })

  render()
  waitForDurations()
}
