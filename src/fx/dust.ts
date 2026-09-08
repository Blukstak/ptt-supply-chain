/** Partículas de polvo / chispas en canvas. Ligero, sin dependencias. */
export interface DustOptions {
  count?: number
  color?: string
  speed?: number
  size?: [number, number]
  drift?: number
  area?: { x: number; y: number; w: number; h: number }
}

export class Dust {
  readonly canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private parts: { x: number; y: number; vx: number; vy: number; r: number; a: number; life: number }[] = []
  private raf = 0
  private running = false
  private opts: Required<DustOptions>

  constructor(opts: DustOptions = {}) {
    this.opts = {
      count: 140, color: '201, 162, 122', speed: 0.6, size: [1, 3.5], drift: 0.4,
      area: { x: 0, y: 0, w: 1920, h: 1080 }, ...opts,
    }
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'fx'
    this.canvas.width = 1920
    this.canvas.height = 1080
    this.ctx = this.canvas.getContext('2d')!
    for (let i = 0; i < this.opts.count; i++) this.parts.push(this.spawn(true))
  }

  private spawn(anywhere = false) {
    const a = this.opts.area
    return {
      x: a.x + Math.random() * a.w,
      y: anywhere ? a.y + Math.random() * a.h : a.y + a.h + 10,
      vx: (Math.random() - 0.3) * this.opts.drift,
      vy: -(0.2 + Math.random()) * this.opts.speed,
      r: this.opts.size[0] + Math.random() * (this.opts.size[1] - this.opts.size[0]),
      a: 0.15 + Math.random() * 0.5,
      life: Math.random(),
    }
  }

  start() { if (this.running) return; this.running = true; this.tick() }
  stop() { this.running = false; cancelAnimationFrame(this.raf) }

  private tick = () => {
    if (!this.running) return
    const { ctx } = this
    ctx.clearRect(0, 0, 1920, 1080)
    const a = this.opts.area
    for (let i = 0; i < this.parts.length; i++) {
      const p = this.parts[i]
      p.x += p.vx + Math.sin(p.life * 6 + i) * 0.15
      p.y += p.vy
      p.life += 0.004
      if (p.y < a.y - 10 || p.x < a.x - 10 || p.x > a.x + a.w + 10) this.parts[i] = this.spawn()
      ctx.beginPath()
      ctx.fillStyle = `rgba(${this.opts.color}, ${p.a * (0.6 + 0.4 * Math.sin(p.life * 10))})`
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    this.raf = requestAnimationFrame(this.tick)
  }
}
