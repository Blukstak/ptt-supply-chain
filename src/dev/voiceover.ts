/**
 * Modo dev de locución: pista de audio sincronizada con la línea de tiempo maestra.
 * Solo se carga si la página se abre con ?dev=1 (o #dev) — ver src/main.ts.
 */
import type { Player } from '../core/player'

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

/** Orden y posiciones por defecto, deducidos del nombre original de cada nota de voz. */
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
export const DEFAULT_GAP = 0.6

export interface VoiceoverState { gap: number; clips: Clip[] }

export function loadSaved(): VoiceoverState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as VoiceoverState
    if (!Array.isArray(parsed?.clips)) return null
    // Solo conservamos clips que sigan existiendo en el proyecto.
    const known = new Map(DEFAULT_CLIPS.map((c) => [c.id, c]))
    const clips = parsed.clips.filter((c) => known.has(c.id)).map((c) => ({ ...known.get(c.id)!, ...c }))
    if (!clips.length) return null
    return { gap: typeof parsed.gap === 'number' ? parsed.gap : DEFAULT_GAP, clips }
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

/**
 * Reproduce los clips siguiendo el tiempo del máster: cada frame decide qué clip
 * debe sonar y en qué posición, así el audio respeta pausas, saltos y capítulos.
 */
export class VoiceoverTrack {
  readonly elements = new Map<string, HTMLAudioElement>()
  /** Duración real de cada archivo, conocida al cargar los metadatos. */
  readonly durations = new Map<string, number>()
  private clips: Clip[] = []
  private onReady?: () => void
  activeId: string | null = null

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
      a.preload = 'metadata'
      pending++
      a.addEventListener('loadedmetadata', () => {
        this.durations.set(c.id, a.duration)
        if (--pending === 0) this.onReady?.()
      })
      a.addEventListener('error', () => {
        console.warn(`[voiceover] no se pudo cargar ${c.file}`)
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

  /** Llamar en cada tick con el tiempo del máster. */
  update(t: number, paused: boolean) {
    let active: string | null = null
    for (const c of this.clips) {
      const a = this.elements.get(c.id)
      if (!a) continue
      const span = this.spanOf(c)
      const inside = t >= c.start && t < c.start + span
      if (inside && !paused) {
        active = c.id
        const target = c.offset + (t - c.start)
        if (Math.abs(a.currentTime - target) > 0.3) a.currentTime = target
        if (a.paused) a.play().catch(() => {})
      } else {
        if (inside) active = c.id
        if (!a.paused) a.pause()
      }
    }
    this.activeId = active
  }

  stopAll() {
    for (const a of this.elements.values()) if (!a.paused) a.pause()
  }
}

/** Arranca el modo dev: engancha la pista al máster y monta el editor. */
export async function initDev(player: Player) {
  document.body.classList.add('dev-mode')
  const { mountEditor } = await import('./editor')
  mountEditor(player)
}
