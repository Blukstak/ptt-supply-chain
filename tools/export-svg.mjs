/**
 * Exporta el arte procedural de src/art/index.ts a archivos .svg autónomos.
 *
 *   node tools/export-svg.mjs                 → exporta truck797
 *   node tools/export-svg.mjs bulldozer km    → exporta los que le pases
 *
 * Las cajas (bbox) están medidas en el navegador con tools/equipos.html, porque
 * calcularlas fuera de un DOM real no es fiable.
 */
import { build } from 'esbuild'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/exports')
const PAD = 14

/** fn → { id, bbox medido en el navegador, nombre de archivo, título } */
const ITEMS = {
  truck797:       { id: 't',   box: [96.8, 5.9, 877.2, 500.5], file: 'cat-797f',        title: 'Camión de extracción CAT 797F' },
  komatsuTruck:   { id: 'km',  box: [5, -271, 550, 296],       file: 'komatsu-830e',    title: 'Camión de extracción Komatsu 830E' },
  bulldozer:      { id: 'bz',  box: [0, -218, 500, 231],       file: 'bulldozer',       title: 'Bulldozer' },
  motorGrader:    { id: 'mg',  box: [0, -158, 534, 175],       file: 'motoniveladora',  title: 'Motoniveladora' },
  drillRig:       { id: 'dr',  box: [-15, -470, 330, 484],     file: 'perforadora',     title: 'Perforadora' },
  lowboyTruck:    { id: 'lb',  box: [-30, 13, 963, 299],       file: 'cama-baja',       title: 'Tracto con cama baja' },
  finalDriveSide: { id: 'fds', box: [-292, -103, 584, 259],    file: 'mando-final',     title: 'Mando final' },
}

const wanted = process.argv.slice(2)
const names = wanted.length ? wanted : ['truck797']

// Empaquetamos el módulo de arte para poder ejecutarlo en Node.
const tmp = join(ROOT, 'node_modules/.cache/art.mjs')
await mkdir(dirname(tmp), { recursive: true })
await build({ entryPoints: [join(ROOT, 'src/art/index.ts')], bundle: true, format: 'esm', outfile: tmp, logLevel: 'silent' })
const art = await import(`file://${tmp}?t=${Date.now()}`)

await mkdir(OUT, { recursive: true })
for (const name of names) {
  const item = ITEMS[name]
  if (!item || typeof art[name] !== 'function') {
    console.error(`✗ ${name}: no existe o no está medido en ITEMS`)
    continue
  }
  const [x, y, w, h] = item.box
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x - PAD} ${y - PAD} ${w + PAD * 2} ${h + PAD * 2}" width="${Math.round(w + PAD * 2)}" height="${Math.round(h + PAD * 2)}" role="img" aria-label="${item.title}">
<title>${item.title} · PTT</title>
${art[name](item.id)}
</svg>
`
  const path = join(OUT, `${item.file}.svg`)
  await writeFile(path, svg, 'utf8')
  console.log(`✓ ${path}  (${(svg.length / 1024).toFixed(1)} KB)`)
}
await rm(tmp, { force: true })
