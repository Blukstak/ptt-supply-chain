/**
 * Biblioteca de ilustración vectorial procedural (estética industrial / minera).
 * Cada función devuelve markup SVG. Los ids con prefijo permiten animar sub-partes.
 */

export const C = {
  sky1: '#0b1118', sky2: '#1a2330', dustSky: '#2c2a26',
  rock1: '#3a3129', rock2: '#4d4034', rock3: '#5f5044', rockLight: '#7a6858',
  cat: '#ffcd11', catDark: '#c99d05', catShadow: '#8a6a00',
  steel: '#2a3441', steel2: '#3d4a5a', steel3: '#56657a', steelLight: '#8a99ad',
  amber: '#f5a623', teal: '#2fd4c8', green: '#4ade80', red: '#f0503c',
  ink: '#e9eef4', ink2: '#9aa7b6',
}

/* ---------------------------------------------------------------- */
/* Fondos                                                              */
/* ---------------------------------------------------------------- */

/** Rajo minero con bancos escalonados, camino de acarreo y cielo polvoriento. */
export function minePit(id = 'mine') {
  const benches: string[] = []
  // bancos de la pared del rajo (izquierda y derecha), en perspectiva
  for (let i = 0; i < 7; i++) {
    const y = 380 + i * 78
    const inset = i * 95
    const c = i % 2 ? C.rock2 : C.rock1
    benches.push(`<path d="M-100 ${y} L${420 + inset} ${y + 20} L${520 + inset} ${y + 78} L-100 ${y + 78}Z" fill="${c}"/>`)
    benches.push(`<path d="M2020 ${y} L${1500 - inset} ${y + 20} L${1400 - inset} ${y + 78} L2020 ${y + 78}Z" fill="${c}"/>`)
    benches.push(`<path d="M-100 ${y} L${420 + inset} ${y + 20}" stroke="${C.rockLight}" stroke-opacity=".35" stroke-width="2"/>`)
    benches.push(`<path d="M2020 ${y} L${1500 - inset} ${y + 20}" stroke="${C.rockLight}" stroke-opacity=".35" stroke-width="2"/>`)
  }
  return `
  <defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sky1}"/><stop offset=".55" stop-color="${C.sky2}"/><stop offset="1" stop-color="${C.dustSky}"/>
    </linearGradient>
    <radialGradient id="${id}-sun" cx=".72" cy=".38" r=".35">
      <stop offset="0" stop-color="#f5a623" stop-opacity=".55"/><stop offset="1" stop-color="#f5a623" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a3d33"/><stop offset="1" stop-color="#2b241f"/>
    </linearGradient>
    <linearGradient id="${id}-haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9a27a" stop-opacity="0"/><stop offset="1" stop-color="#c9a27a" stop-opacity=".28"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#${id}-sky)"/>
  <rect width="1920" height="1080" fill="url(#${id}-sun)"/>
  <g id="${id}-far" opacity=".9">
    <path d="M0 470 L180 380 L330 420 L520 330 L700 400 L900 350 L1080 410 L1260 340 L1450 400 L1620 330 L1800 390 L1920 360 L1920 560 L0 560Z" fill="#232a34"/>
    <path d="M0 520 L200 450 L400 480 L640 420 L860 470 L1100 430 L1340 480 L1560 440 L1780 480 L1920 450 L1920 620 L0 620Z" fill="#1e2027"/>
  </g>
  <g id="${id}-benches">${benches.join('')}</g>
  <rect y="880" width="1920" height="200" fill="url(#${id}-floor)"/>
  <path id="${id}-road" d="M-50 1080 L560 900 L1340 900 L1980 1080Z" fill="#5a4b3e"/>
  <path d="M-50 1080 L560 900 L1340 900 L1980 1080Z" fill="url(#${id}-haze)"/>
  <g id="${id}-road-marks" stroke="#7a6858" stroke-width="3" stroke-dasharray="40 30" opacity=".5">
    <path d="M300 1010 L1620 1010"/>
  </g>
  <rect id="${id}-haze" width="1920" height="1080" fill="url(#${id}-haze)" opacity=".7"/>`
}

/** Suelo genérico de nave industrial con líneas de perspectiva + luces. */
export function industrialFloor(id = 'floor', tone = '#101620') {
  const lines: string[] = []
  for (let i = -6; i <= 6; i++) {
    lines.push(`<path d="M960 620 L${960 + i * 420} 1080" stroke="#ffffff" stroke-opacity=".06" stroke-width="2"/>`)
  }
  for (let i = 0; i < 6; i++) {
    const y = 640 + i * i * 14
    lines.push(`<path d="M0 ${y} L1920 ${y}" stroke="#ffffff" stroke-opacity=".05" stroke-width="1"/>`)
  }
  return `
  <defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tone}"/><stop offset="1" stop-color="#05070a"/></linearGradient>
    <linearGradient id="${id}-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b232f"/><stop offset="1" stop-color="#0a0e14"/></linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#${id}-g)"/>
  <rect y="620" width="1920" height="460" fill="url(#${id}-fl)"/>
  ${lines.join('')}
  <path d="M0 620 L1920 620" stroke="#ffffff" stroke-opacity=".12" stroke-width="2"/>`
}

/** Luminarias colgantes de nave (cono de luz). */
export function hangingLights(id = 'lights', xs = [300, 780, 1260, 1700], y = 90) {
  return `<g id="${id}">${xs
    .map(
      (x) => `
    <line x1="${x}" y1="0" x2="${x}" y2="${y}" stroke="#4a5563" stroke-width="3"/>
    <path d="M${x - 46} ${y} L${x + 46} ${y} L${x + 30} ${y + 26} L${x - 30} ${y + 26}Z" fill="#2c3542"/>
    <ellipse cx="${x}" cy="${y + 26}" rx="30" ry="6" fill="#fff5d6"/>
    <path d="M${x - 30} ${y + 26} L${x - 360} 1080 L${x + 360} 1080 L${x + 30} ${y + 26}Z" fill="#fff0c4" opacity=".05"/>`,
    )
    .join('')}</g>`
}

/* ---------------------------------------------------------------- */
/* Camión CAT 797 (vista lateral, ilustrativo)                        */
/* ---------------------------------------------------------------- */
export function truck797(id = 'truck') {
  const wheel = (cx: number, cy: number, r: number, wid: string) => `
    <g id="${wid}" transform="translate(${cx} ${cy})">
      <circle r="${r}" fill="#0d0f12"/>
      <circle r="${r * 0.96}" fill="none" stroke="#1e2126" stroke-width="${r * 0.08}" stroke-dasharray="${r * 0.18} ${r * 0.12}"/>
      <circle r="${r * 0.62}" fill="#2a2f36"/>
      <circle r="${r * 0.58}" fill="#3a414b"/>
      <circle r="${r * 0.3}" fill="#1a1d22"/>
      <circle r="${r * 0.22}" fill="${C.cat}"/>
      <circle r="${r * 0.08}" fill="#111"/>
      ${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${Math.cos((a * Math.PI) / 180) * r * 0.42}" cy="${Math.sin((a * Math.PI) / 180) * r * 0.42}" r="${r * 0.045}" fill="#15181d"/>`).join('')}
    </g>`
  return `
  <defs>
    <linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cat}"/><stop offset="1" stop-color="${C.catDark}"/></linearGradient>
    <linearGradient id="${id}-bed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a6270"/><stop offset="1" stop-color="#2c333d"/></linearGradient>
  </defs>
  <g id="${id}">
    <!-- sombra -->
    <ellipse cx="520" cy="392" rx="560" ry="26" fill="#000" opacity=".45"/>
    <!-- tolva -->
    <g id="${id}-bed">
      <path d="M120 60 L980 60 L1060 110 L1060 250 L200 250 L120 200Z" fill="url(#${id}-bed)"/>
      <path d="M120 60 L980 60 L1060 110 L200 110Z" fill="#6f7886"/>
      <path d="M140 130 L1040 130" stroke="#1d2229" stroke-width="10"/>
      <path d="M140 190 L1040 190" stroke="#1d2229" stroke-width="10"/>
      ${[260, 380, 500, 620, 740, 860, 980].map((x) => `<path d="M${x} 110 L${x} 250" stroke="#1d2229" stroke-width="8"/>`).join('')}
      <path d="M980 60 L1200 20 L1200 70 L1060 110Z" fill="#8a94a2"/>
      <path d="M1180 25 L1180 300" stroke="#6f7886" stroke-width="16"/>
      <!-- carga -->
      <path d="M200 60 Q500 -40 980 60Z" fill="#4a3d33"/>
      <path d="M260 60 Q520 -10 900 60Z" fill="#5f5044"/>
    </g>
    <!-- chasis -->
    <rect x="80" y="250" width="1000" height="60" fill="#1d2229"/>
    <rect x="40" y="290" width="1080" height="34" fill="#111418"/>
    <!-- cabina + capó (frente a la izquierda) -->
    <g id="${id}-cab">
      <path d="M0 130 L0 260 L130 260 L130 120 L60 110Z" fill="url(#${id}-body)"/>
      <path d="M-60 250 L-60 300 L60 300 L60 250Z" fill="#1d2229"/>
      <path d="M-40 250 L130 250 L130 300 L-40 300Z" fill="#23282f"/>
      <path d="M0 130 L60 110 L130 120 L130 200 L0 200Z" fill="${C.catDark}"/>
      <rect x="20" y="132" width="90" height="46" rx="4" fill="#9fd8ff" opacity=".85"/>
      <rect x="10" y="182" width="112" height="60" fill="#3a414b"/>
      <rect x="20" y="190" width="90" height="44" fill="#26303a"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="24" y="${196 + i * 10}" width="82" height="3" fill="#1a2028"/>`).join('')}
      <path d="M-60 250 L-100 250 L-100 290 L-60 290Z" fill="#2c333d"/>
      <path d="M-160 200 L-100 200 L-100 250 L-160 250Z" fill="#2c333d"/>
      <rect x="-40" y="222" width="180" height="14" fill="${C.cat}"/>
      <!-- escalera -->
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="-30" y="${300 + i * 14}" width="70" height="4" fill="#3d4a5a"/>`).join('')}
      <!-- luces -->
      <rect x="-56" y="262" width="14" height="10" fill="#fff5c4"/>
      <rect x="-56" y="278" width="14" height="6" fill="${C.amber}"/>
    </g>
    <!-- estanque / motor -->
    <rect x="160" y="250" width="200" height="90" rx="6" fill="#3a414b"/>
    <rect x="620" y="250" width="240" height="90" rx="6" fill="#2c333d"/>
    ${wheel(220, 350, 118, `${id}-w1`)}
    ${wheel(860, 350, 118, `${id}-w2`)}
    ${wheel(960, 350, 118, `${id}-w3`)}
    <!-- escape -->
    <rect x="400" y="230" width="36" height="24" fill="#111418"/>
    <text x="330" y="292" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="44" fill="#111" letter-spacing="2">797F</text>
  </g>`
}

/* ---------------------------------------------------------------- */
/* Mando Final (corte técnico, planetario)                            */
/* ---------------------------------------------------------------- */
export function finalDrive(id = 'fd', r = 260) {
  const teeth = (radius: number, n: number, h: number) => {
    let d = ''
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2, a1 = ((i + 0.5) / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2
      const p = (a: number, rr: number) => `${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`
      d += `${i ? 'L' : 'M'}${p(a0, radius)} L${p(a0 + (a1 - a0) * 0.35, radius + h)} L${p(a1 + (a2 - a1) * 0.65, radius + h)} L${p(a2, radius)} `
    }
    return d + 'Z'
  }
  const planet = (a: number, i: number) => {
    const rr = r * 0.56, cx = Math.cos(a) * rr, cy = Math.sin(a) * rr
    return `<g id="${id}-p${i}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)})">
      <path d="${teeth(r * 0.2, 14, r * 0.035)}" fill="#8a99ad"/>
      <circle r="${r * 0.15}" fill="#56657a"/><circle r="${r * 0.07}" fill="#1d2229"/>
    </g>`
  }
  return `
  <defs>
    <radialGradient id="${id}-hub" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5a6a80"/><stop offset=".7" stop-color="#2f3947"/><stop offset="1" stop-color="#1b222b"/></radialGradient>
    <radialGradient id="${id}-ring" cx=".5" cy=".5" r=".5"><stop offset=".75" stop-color="#2c333d"/><stop offset="1" stop-color="#1a1e24"/></radialGradient>
  </defs>
  <g id="${id}">
    <g id="${id}-housing">
      <circle r="${r * 1.28}" fill="url(#${id}-ring)" stroke="#111418" stroke-width="6"/>
      ${Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return `<circle cx="${Math.cos(a) * r * 1.16}" cy="${Math.sin(a) * r * 1.16}" r="${r * 0.03}" fill="#111418"/>` }).join('')}
      <circle r="${r * 1.06}" fill="#1e242c"/>
    </g>
    <g id="${id}-ringgear">
      <path d="${teeth(r * 0.9, 58, -r * 0.05)}" fill="#3d4a5a" fill-rule="evenodd"/>
      <circle r="${r * 0.9}" fill="none" stroke="#4d5b6d" stroke-width="3"/>
    </g>
    <g id="${id}-carrier">
      ${[0, 1, 2].map((i) => planet(((i * 120 + 90) * Math.PI) / 180, i)).join('')}
    </g>
    <g id="${id}-sun">
      <path d="${teeth(r * 0.24, 16, r * 0.04)}" fill="#c9a86b"/>
      <circle r="${r * 0.17}" fill="url(#${id}-hub)"/>
      <circle r="${r * 0.05}" fill="#0f1216"/>
    </g>
    <g id="${id}-hubface" opacity="0">
      <circle r="${r * 1.06}" fill="url(#${id}-hub)"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<circle cx="${Math.cos(a) * r * 0.78}" cy="${Math.sin(a) * r * 0.78}" r="${r * 0.05}" fill="#111418"/>` }).join('')}
      <circle r="${r * 0.36}" fill="#1a1e24"/>
      <circle r="${r * 0.3}" fill="${C.cat}"/>
      <text text-anchor="middle" y="${r * 0.08}" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="${r * 0.22}" fill="#111">CAT</text>
    </g>
  </g>`
}

/* ---------------------------------------------------------------- */
/* Personas / equipos                                                  */
/* ---------------------------------------------------------------- */
export function technician(id = 'tech', color = C.cat, withTablet = true) {
  return `
  <g id="${id}">
    <ellipse cx="0" cy="250" rx="60" ry="10" fill="#000" opacity=".4"/>
    <!-- piernas -->
    <rect x="-28" y="110" width="24" height="130" rx="6" fill="#26303a"/>
    <rect x="4" y="110" width="24" height="130" rx="6" fill="#1f2831"/>
    <rect x="-32" y="232" width="32" height="16" rx="4" fill="#111"/><rect x="0" y="232" width="32" height="16" rx="4" fill="#111"/>
    <!-- torso -->
    <path d="M-38 0 L38 0 L44 118 L-44 118Z" fill="${color}"/>
    <rect x="-44" y="40" width="88" height="10" fill="#c9c9c9" opacity=".8"/>
    <rect x="-44" y="70" width="88" height="10" fill="#c9c9c9" opacity=".8"/>
    <!-- brazos -->
    <rect x="-64" y="6" width="22" height="90" rx="10" fill="${color}" transform="rotate(12 -53 6)"/>
    <rect x="42" y="6" width="22" height="90" rx="10" fill="${color}" transform="rotate(${withTablet ? -40 : -12} 53 6)"/>
    ${withTablet ? `<g transform="translate(40 40) rotate(-12)"><rect x="0" y="0" width="70" height="50" rx="4" fill="#111418" stroke="#4d5b6d" stroke-width="2"/><rect x="6" y="6" width="58" height="38" fill="${C.teal}" opacity=".6"/></g>` : ''}
    <!-- cabeza y casco -->
    <circle cx="0" cy="-28" r="22" fill="#d9a67a"/>
    <path d="M-28 -34 Q0 -78 28 -34 Z" fill="#fff"/>
    <rect x="-32" y="-38" width="64" height="8" rx="3" fill="#fff"/>
    <rect x="-22" y="-50" width="44" height="6" fill="${C.amber}"/>
  </g>`
}

export function forklift(id = 'fork') {
  return `
  <g id="${id}">
    <ellipse cx="90" cy="150" rx="110" ry="10" fill="#000" opacity=".4"/>
    <rect x="30" y="60" width="140" height="70" rx="8" fill="${C.cat}"/>
    <path d="M40 60 L60 10 L130 10 L140 60Z" fill="#1d2229"/>
    <rect x="70" y="20" width="50" height="30" fill="#9fd8ff" opacity=".7"/>
    <rect x="150" y="0" width="14" height="140" fill="#3d4a5a"/>
    <rect x="170" y="0" width="8" height="140" fill="#56657a"/>
    <g id="${id}-fork"><rect x="164" y="110" width="110" height="8" fill="#8a99ad"/></g>
    <circle cx="60" cy="140" r="22" fill="#111"/><circle cx="60" cy="140" r="10" fill="#3d4a5a"/>
    <circle cx="140" cy="140" r="22" fill="#111"/><circle cx="140" cy="140" r="10" fill="#3d4a5a"/>
  </g>`
}

/* ---------------------------------------------------------------- */
/* Logística                                                            */
/* ---------------------------------------------------------------- */
export function crate(id = 'crate', w = 220, h = 140, label = 'PTT') {
  return `
  <g id="${id}">
    <rect width="${w}" height="${h}" fill="#7b5a3a"/>
    <rect x="6" y="6" width="${w - 12}" height="${h - 12}" fill="#9c7349"/>
    ${[0.25, 0.5, 0.75].map((f) => `<rect x="${w * f - 4}" y="0" width="8" height="${h}" fill="#5e422a"/>`).join('')}
    <rect x="0" y="${h * 0.42}" width="${w}" height="10" fill="#5e422a"/>
    <rect x="${w * 0.1}" y="${h * 0.62}" width="${w * 0.36}" height="${h * 0.24}" fill="#f0ede6"/>
    <text x="${w * 0.28}" y="${h * 0.8}" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="${h * 0.16}" fill="#111">${label}</text>
    ${barcode(`${id}-bc`, w * 0.55, h * 0.64, w * 0.35, h * 0.2)}
  </g>`
}

export function barcode(id = 'bc', x = 0, y = 0, w = 120, h = 40) {
  let s = `<g id="${id}" transform="translate(${x} ${y})"><rect width="${w}" height="${h}" fill="#fff"/>`
  let cx = w * 0.05
  let seed = 7
  while (cx < w * 0.95) {
    seed = (seed * 9301 + 49297) % 233280
    const bw = 1 + (seed % 4) * (w / 120)
    s += `<rect x="${cx}" y="${h * 0.1}" width="${bw}" height="${h * 0.7}" fill="#111"/>`
    cx += bw + 1 + (seed % 3) * (w / 120)
  }
  return s + `</g>`
}

export function semiTruck(id = 'semi', accent = C.amber) {
  return `
  <g id="${id}">
    <ellipse cx="380" cy="212" rx="420" ry="16" fill="#000" opacity=".45"/>
    <rect x="0" y="40" width="560" height="150" rx="6" fill="#3d4a5a"/>
    <rect x="0" y="40" width="560" height="18" fill="#56657a"/>
    ${[80, 160, 240, 320, 400, 480].map((x) => `<rect x="${x}" y="58" width="4" height="132" fill="#2a3441"/>`).join('')}
    <rect x="0" y="190" width="560" height="14" fill="#1d2229"/>
    <g id="${id}-cab">
      <path d="M580 190 L580 70 L640 40 L760 40 L790 100 L790 190Z" fill="${accent}"/>
      <path d="M650 55 L740 55 L760 100 L650 100Z" fill="#9fd8ff" opacity=".8"/>
      <rect x="600" y="140" width="190" height="50" fill="#1d2229"/>
      <rect x="770" y="120" width="30" height="12" fill="#fff5c4"/>
    </g>
    ${[80, 160, 470, 660, 740].map((x, i) => `<g id="${id}-w${i}" transform="translate(${x} 200)"><circle r="30" fill="#0d0f12"/><circle r="14" fill="#3d4a5a"/><circle r="5" fill="#111"/></g>`).join('')}
  </g>`
}

export function cargoShip(id = 'ship') {
  const boxes: string[] = []
  const cols = ['#c0392b', '#2980b9', '#27ae60', '#e67e22', '#8e44ad', '#16a085']
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) boxes.push(`<rect x="${80 + c * 60}" y="${60 - r * 26}" width="56" height="24" fill="${cols[(r * 3 + c) % cols.length]}"/>`)
  return `
  <g id="${id}">
    <g id="${id}-cargo">${boxes.join('')}</g>
    <path d="M0 90 L720 90 L680 160 L40 160Z" fill="#1d2229"/>
    <path d="M0 90 L720 90 L700 120 L20 120Z" fill="#2f3947"/>
    <rect x="600" y="0" width="80" height="90" fill="#e9eef4"/>
    <rect x="610" y="10" width="60" height="8" fill="#26303a"/><rect x="610" y="26" width="60" height="8" fill="#26303a"/>
    <rect x="640" y="-30" width="14" height="30" fill="#c0392b"/>
  </g>`
}

export function airplane(id = 'plane') {
  return `
  <g id="${id}">
    <path d="M0 40 L260 30 L330 44 L260 58 L0 48Z" fill="#e9eef4"/>
    <path d="M60 30 L110 -10 L130 -10 L100 30Z" fill="#cfd8e3"/>
    <path d="M120 44 L180 90 L210 90 L160 44Z" fill="#cfd8e3"/>
    <path d="M110 40 L190 10 L200 22 L150 44Z" fill="#dfe6ee"/>
    <rect x="150" y="34" width="8" height="6" fill="#111"/>
    <path d="M290 34 L330 44 L290 52Z" fill="${C.amber}"/>
  </g>`
}

export function warehouseRack(id = 'rack', bays = 4, levels = 3, bayW = 150, levelH = 120) {
  const w = bays * bayW, h = levels * levelH
  const boxes: string[] = []
  let seed = 11
  for (let l = 0; l < levels; l++) for (let b = 0; b < bays; b++) {
    seed = (seed * 9301 + 49297) % 233280
    if (seed % 5 === 0) continue
    const x = b * bayW + 14, y = l * levelH + 22
    const bw = bayW - 28, bh = levelH - 30
    boxes.push(`<g class="${id}-box"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${seed % 3 === 0 ? '#7b5a3a' : '#5a6270'}"/><rect x="${x}" y="${y}" width="${bw}" height="6" fill="rgba(255,255,255,.18)"/>${barcode(`${id}-bc-${l}-${b}`, x + bw * 0.55, y + bh * 0.62, bw * 0.38, bh * 0.28)}</g>`)
  }
  return `
  <g id="${id}">
    ${boxes.join('')}
    ${Array.from({ length: bays + 1 }, (_, i) => `<rect x="${i * bayW - 6}" y="-10" width="12" height="${h + 10}" fill="#2f5fb3"/>`).join('')}
    ${Array.from({ length: levels + 1 }, (_, i) => `<rect x="-6" y="${i * levelH - 4}" width="${w + 12}" height="10" fill="${C.amber}"/>`).join('')}
  </g>`
}

/* ---------------------------------------------------------------- */
/* Interfaces (WMS / pantallas)                                        */
/* ---------------------------------------------------------------- */
export function wmsScreen(id = 'wms', w = 760, h = 470) {
  const rows = [
    ['FD-797-0412', 'MANDO FINAL CAT 797F', 'A-12-03', 'RESERVADO'],
    ['SEAL-KIT-8821', 'KIT SELLOS DUO-CONE', 'B-04-11', 'OK'],
    ['BRG-3391-T', 'RODAMIENTO CÓNICO', 'B-05-02', 'OK'],
    ['GEAR-RING-1204', 'CORONA PLANETARIA', 'C-01-07', 'IMPORT.'],
    ['PLT-CARR-778', 'PORTA PLANETARIOS', 'C-01-09', 'OK'],
  ]
  return `
  <g id="${id}">
    <rect width="${w}" height="${h}" rx="10" fill="#0b0f15" stroke="#2a3441" stroke-width="2"/>
    <rect width="${w}" height="46" rx="10" fill="#141b24"/>
    <circle cx="22" cy="23" r="6" fill="${C.red}"/><circle cx="42" cy="23" r="6" fill="${C.amber}"/><circle cx="62" cy="23" r="6" fill="${C.green}"/>
    <text x="${w / 2}" y="29" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" fill="${C.ink2}" letter-spacing="3">PTT · WMS · INVENTARIO EN TIEMPO REAL</text>
    <g transform="translate(24 76)">
      <text font-family="JetBrains Mono, monospace" font-size="12" fill="${C.amber}" letter-spacing="2">SKU</text>
      <text x="170" font-family="JetBrains Mono, monospace" font-size="12" fill="${C.amber}" letter-spacing="2">DESCRIPCIÓN</text>
      <text x="470" font-family="JetBrains Mono, monospace" font-size="12" fill="${C.amber}" letter-spacing="2">UBIC.</text>
      <text x="590" font-family="JetBrains Mono, monospace" font-size="12" fill="${C.amber}" letter-spacing="2">ESTADO</text>
      ${rows.map((r, i) => {
        const y = 40 + i * 52
        const col = r[3] === 'OK' ? C.green : r[3] === 'RESERVADO' ? C.teal : C.amber
        return `<g class="${id}-row" transform="translate(0 ${y})">
          <rect x="-10" y="-22" width="${w - 28}" height="44" rx="4" fill="#ffffff" opacity="${i % 2 ? 0.02 : 0.045}"/>
          <text font-family="JetBrains Mono, monospace" font-size="15" fill="${C.ink}">${r[0]}</text>
          <text x="170" font-family="Inter, sans-serif" font-size="15" fill="${C.ink2}">${r[1]}</text>
          <text x="470" font-family="JetBrains Mono, monospace" font-size="15" fill="${C.ink}">${r[2]}</text>
          <rect x="586" y="-12" width="${r[3].length * 10 + 16}" height="24" rx="12" fill="${col}" opacity=".16"/>
          <text x="594" y="4" font-family="JetBrains Mono, monospace" font-size="12" fill="${col}" letter-spacing="1">${r[3]}</text>
        </g>`
      }).join('')}
    </g>
    <g transform="translate(24 ${h - 70})">
      <rect width="${w - 48}" height="50" rx="6" fill="#141b24"/>
      <text x="16" y="31" font-family="JetBrains Mono, monospace" font-size="14" fill="${C.teal}" id="${id}-status">▮ SCAN LISTO — ESPERANDO CÓDIGO</text>
    </g>
  </g>`
}

/** Gauge de horas de operación (arco). */
export function hoursGauge(id = 'gauge', r = 150) {
  const circ = 2 * Math.PI * r
  return `
  <g id="${id}">
    <circle r="${r}" fill="none" stroke="#1e2630" stroke-width="18"/>
    <circle id="${id}-arc" r="${r}" fill="none" stroke="${C.amber}" stroke-width="18" stroke-linecap="round"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ}" transform="rotate(-90)"/>
    <text id="${id}-val" text-anchor="middle" y="14" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="${r * 0.5}" fill="${C.ink}">0</text>
    <text text-anchor="middle" y="${r * 0.36}" font-family="JetBrains Mono, monospace" font-size="${r * 0.11}" fill="${C.ink2}" letter-spacing="3">HORAS OPERACIÓN</text>
  </g>`
}

/** Mapa mundial simplificado (puntos) + ruta de importación. */
export function worldMap(id = 'map') {
  // Bloques simplificados de continentes en una proyección equirectangular 1000x500
  const blobs = [
    'M70 90 L200 60 L330 80 L360 140 L300 200 L250 260 L190 250 L120 200 L80 150Z', // Norteamérica
    'M230 270 L300 280 L330 330 L310 420 L270 470 L240 440 L220 360Z', // Sudamérica
    'M470 80 L560 70 L610 100 L590 150 L520 170 L470 140Z', // Europa
    'M470 180 L560 170 L610 220 L600 320 L550 380 L500 350 L470 260Z', // África
    'M610 70 L780 60 L900 90 L920 160 L860 230 L760 250 L680 220 L620 170Z', // Asia
    'M780 330 L860 320 L890 380 L840 410 L790 390Z', // Oceanía
  ]
  return `
  <g id="${id}">
    ${blobs.map((d) => `<path d="${d}" fill="#1b232e" stroke="#2f3b4b" stroke-width="1.5"/>`).join('')}
  </g>`
}
