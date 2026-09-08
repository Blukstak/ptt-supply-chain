/**
 * Red de nodos con paquetes de datos viajando por las aristas.
 * Representa el flujo de información entre áreas de Supply Chain.
 */
export interface FlowNode { x: number; y: number }
export interface FlowEdge { from: number; to: number }

export class DataFlow {
  readonly canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private packets: { e: number; t: number; speed: number }[] = []
  private raf = 0
  private running = false
  intensity = 1

  constructor(private nodes: FlowNode[], private edges: FlowEdge[], private color = '245, 166, 35') {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'fx'
    this.canvas.width = 1920
    this.canvas.height = 1080
    this.ctx = this.canvas.getContext('2d')!
    edges.forEach((_, i) => { for (let k = 0; k < 3; k++) this.packets.push({ e: i, t: Math.random(), speed: 0.003 + Math.random() * 0.004 }) })
  }

  start() { if (this.running) return; this.running = true; this.tick() }
  stop() { this.running = false; cancelAnimationFrame(this.raf) }

  private tick = () => {
    if (!this.running) return
    const { ctx } = this
    ctx.clearRect(0, 0, 1920, 1080)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = `rgba(${this.color}, ${0.18 * this.intensity})`
    for (const e of this.edges) {
      const a = this.nodes[e.from], b = this.nodes[e.to]
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
    }
    for (const p of this.packets) {
      p.t += p.speed * this.intensity
      if (p.t > 1) p.t = 0
      const e = this.edges[p.e], a = this.nodes[e.from], b = this.nodes[e.to]
      const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
      const g = ctx.createRadialGradient(x, y, 0, x, y, 14)
      g.addColorStop(0, `rgba(${this.color}, ${0.9 * this.intensity})`)
      g.addColorStop(1, `rgba(${this.color}, 0)`)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill()
    }
    for (const n of this.nodes) {
      ctx.fillStyle = `rgba(${this.color}, ${0.9 * this.intensity})`
      ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2); ctx.fill()
    }
    this.raf = requestAnimationFrame(this.tick)
  }
}
