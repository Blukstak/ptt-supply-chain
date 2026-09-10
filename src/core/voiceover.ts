/**
 * Locución del video: reproduce las notas de voz sincronizadas con la línea de tiempo
 * maestra. Funciona siempre (no solo en modo dev); el editor de `src/dev/` únicamente
 * añade la interfaz para recolocar los audios.
 *
 * Prioridad de la configuración de tiempos:
 *   1. lo que se haya guardado en el editor (localStorage)
 *   2. `src/voiceover.json`, que es lo que se publica
 *   3. el orden deducido del nombre original de cada nota de voz
 */
import gsap from 'gsap'
import type { Player } from './player'
import shipped from '../voiceover.json'

export interface Clip {
  id: string
  file: string
  label: string
  /** Segundo de la línea de tiempo maestra en que empieza a sonar. */
  start: number
  /** Recorte de entrada dentro del archivo (segundos). */
  offset: number
  /** Recorte de salida dentro del archivo (segundos). null = hasta el final. */
  end: number | null
}

export interface VoiceoverState { gap: number; clips: Clip[] }

/** Orden y posiciones deducidos del nombre original de cada nota de voz. */
export const DEFAULT_CLIPS: Clip[] = [
  { id: '01', file: 'audio/01.m4a', label: 'Parte 1', start: 0, offset: 0, end: null },
  { id: '02', file: 'audio/02.m4a', label: 'Parte 2', start: 0, offset: 0, end: null },
  { id: '03', file: 'audio/03.m4a', label: 'Parte 3', start: 0, offset: 0, end: null },
  { id: '04', file: 'audio/04.m4a', label: 'Parte 4', start: 0, offset: 0, end: null },
  { id: '05', file: 'audio/05.m4a', label: 'Parte 5', start: 0, offset: 0, end: null },
  { id: '06', file: 'audio/06.m4a', label: 'Parte 6', start: 0, offset: 0, end: null },
  // El nombre original decía "parte en min 1:49".
  { id: '07', file: 'audio/07.m4a', label: 'Parte 7', start: 109, offset: 0, end: null },
]

export const STORAGE_KEY = 'ptt.voiceover.v1'
export const MUTE_KEY = 'ptt.voiceover.muted'
export const DEFAULT_GAP = 0.6

function normalize(input: unknown): VoiceoverState | null {
  const parsed = input as VoiceoverState
  if (!Array.isArray(parsed?.clips) || !parsed.clips.length) return null
  const known = new Map(DEFAULT_CLIPS.map((c) => [c.id, c]))
  const clips = parsed.clips.filter((c) => known.has(c.id)).map((c) => ({ ...known.get(c.id)!, ...c }))
  if (!clips.length) return null
  return { gap: typeof parsed.gap === 'number' ? parsed.gap : DEFAULT_GAP, clips }
}

/** Configuración publicada (src/voiceover.json). */
export function shippedState(): VoiceoverState {
  return normalize(shipped) ?? { gap: DEFAULT_GAP, clips: DEFAULT_CLIPS.map((c) => ({ ...c })) }
}

/** Lo guardado desde el editor, si existe. */
export function loadSaved(): VoiceoverState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? normalize(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

export function save(state: VoiceoverState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2))
}

export function clearSaved() {
  localStorage.removeItem(STORAGE_KEY)
}

/** Estado efectivo: lo editado manda sobre lo publicado. */
export function resolveState(): VoiceoverState {
  const saved = loadSaved()
  return saved ? { gap: saved.gap, clips: saved.clips.map((c) => ({ ...c })) } : shippedState()
}

/**
 * Decide en cada frame qué clip debe sonar y en qué posición, para que el audio
 * respete pausas, saltos de capítulo y el final del video.
 */
export class VoiceoverTrack {
  readonly elements = new Map<string, HTMLAudioElement>()
  readonly durations = new Map<string, number>()
  private clips: Clip[] = []
  private onReady?: () => void
  activeId: string | null = null
  muted = false

  constructor(clips: Clip[], onReady?: () => void) {
    this.onReady = onReady
    this.setClips(clips)
  }

  setClips(clips: Clip[]) {
    this.clips = clips
    let pending = 0
    for (const c of clips) {
      if (this.elements.has(c.id)) continue
      const a = new Audio(`${import.meta.env.BASE_URL}${c.file}`)
      a.preload = 'auto'
      a.muted = this.muted
      pending++
      a.addEventListener('loadedmetadata', () => {
        this.durations.set(c.id, a.duration)
        if (--pending === 0) this.onReady?.()
      })
      a.addEventListener('error', () => {
        // Sin archivo (p. ej. en el sitio publicado si la locución aún no se sube).
        this.durations.set(c.id, 0)
        if (--pending === 0) this.onReady?.()
      })
      this.elements.set(c.id, a)
    }
    if (pending === 0) this.onReady?.()
  }

  /** Duración en la línea de tiempo (respeta el recorte). */
  spanOf(c: Clip): number {
    const full = this.durations.get(c.id) ?? 0
    const end = c.end ?? full
    return Math.max(0.05, end - c.offset)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    for (const a of this.elements.values()) a.muted = muted
    try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0') } catch { /* modo privado */ }
  }

  /** Llamar en cada tick con el tiempo del máster. `stopped` fuerza silencio. */
  update(t: number, stopped: boolean) {
    let active: string | null = null
    for (const c of this.clips) {
      const a = this.elements.get(c.id)
      if (!a) continue
      const inside = t >= c.start && t < c.start + this.spanOf(c)
      if (inside) active = c.id
      if (inside && !stopped) {
        const target = c.offset + (t - c.start)
        if (Math.abs(a.currentTime - target) > 0.3) a.currentTime = target
        if (a.paused) a.play().catch(() => { /* falta el gesto del usuario */ })
      } else if (!a.paused) {
        a.pause()
      }
    }
    this.activeId = active
  }

  stopAll() {
    for (const a of this.elements.values()) if (!a.paused) a.pause()
  }
}

/** Enciende la locución del video y añade el botón de silencio al reproductor. */
export function initVoiceover(player: Player): { track: VoiceoverTrack; state: VoiceoverState } {
  const state = resolveState()
  const track = new VoiceoverTrack(state.clips)

  let muted = false
  try { muted = localStorage.getItem(MUTE_KEY) === '1' } catch { /* modo privado */ }
  track.setMuted(muted)

  const duration = player.master.duration()
  gsap.ticker.add(() => {
    const t = player.master.time()
    // Al final del video o en pausa, silencio: si no, el clip se quedaría en bucle.
    track.update(t, player.master.paused() || t >= duration - 0.01)
  })

  mountMuteButton(track)
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && !(e.target as HTMLElement)?.closest('input')) {
      track.setMuted(!track.muted)
      syncMuteButton(track)
    }
  })

  return { track, state }
}

const ICON_ON = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-1 7-4.5 7-8.8s-3-7.8-7-8.8z"/></svg>'
const ICON_OFF = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm18.6 3l2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1z"/></svg>'

function mountMuteButton(track: VoiceoverTrack) {
  const controls = document.querySelector('.player .controls')
  const time = controls?.querySelector('.time')
  if (!controls || !time) return
  const btn = document.createElement('button')
  btn.className = 'btn btn-mute'
  btn.title = 'Silenciar locución (M)'
  btn.addEventListener('click', () => { track.setMuted(!track.muted); syncMuteButton(track) })
  controls.insertBefore(btn, time)
  syncMuteButton(track)
}

function syncMuteButton(track: VoiceoverTrack) {
  const btn = document.querySelector('.btn-mute')
  if (btn) {
    btn.innerHTML = track.muted ? ICON_OFF : ICON_ON
    btn.classList.toggle('is-muted', track.muted)
  }
}
