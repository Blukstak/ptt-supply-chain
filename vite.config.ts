import { defineConfig, type Plugin } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const VOICEOVER_FILE = fileURLToPath(new URL('./src/voiceover.json', import.meta.url))

/**
 * Endpoint del modo dev para que el botón Guardar del editor de locución escriba
 * `src/voiceover.json` de verdad (y no solo en el navegador). Solo existe con
 * `vite dev`: en el sitio publicado no hay servidor y el editor cae a localStorage.
 */
function voiceoverApi(): Plugin {
  return {
    name: 'ptt-voiceover-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__voiceover', (req, res) => {
        const done = (code: number, body: unknown) => {
          res.statusCode = code
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }
        if (req.method === 'GET') {
          readFile(VOICEOVER_FILE, 'utf8').then((t) => done(200, JSON.parse(t))).catch(() => done(404, { error: 'sin archivo' }))
          return
        }
        if (req.method !== 'POST') return done(405, { error: 'método no permitido' })

        let raw = ''
        req.on('data', (chunk) => { raw += chunk; if (raw.length > 200_000) req.destroy() })
        req.on('end', async () => {
          try {
            const data = JSON.parse(raw)
            if (!Array.isArray(data?.clips) || !data.clips.length) return done(400, { error: 'faltan clips' })
            await writeFile(VOICEOVER_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8')
            done(200, { ok: true, file: 'src/voiceover.json' })
          } catch (e) {
            done(400, { error: String(e) })
          }
        })
      })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [voiceoverApi()],
  // Guardar no debe recargar la página entera mientras se está editando.
  server: { watch: { ignored: ['**/src/voiceover.json'] } },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
