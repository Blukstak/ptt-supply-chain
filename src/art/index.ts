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
      <circle r="${r * 0.97}" fill="none" stroke="#22262c" stroke-width="${r * 0.09}" stroke-dasharray="${r * 0.16} ${r * 0.1}"/>
      <circle r="${r * 0.66}" fill="#262b32"/>
      <circle r="${r * 0.5}" fill="${C.cat}"/>
      <circle r="${r * 0.44}" fill="${C.catDark}"/>
      <circle r="${r * 0.3}" fill="#2a2f36"/>
      <circle r="${r * 0.12}" fill="#15181d"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<circle cx="${Math.cos((a * Math.PI) / 180) * r * 0.37}" cy="${Math.sin((a * Math.PI) / 180) * r * 0.37}" r="${r * 0.04}" fill="#15181d"/>`).join('')}
    </g>`
  return `
  <defs>
    <linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd94a"/><stop offset=".6" stop-color="${C.cat}"/><stop offset="1" stop-color="${C.catDark}"/></linearGradient>
    <linearGradient id="${id}-bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdc55"/><stop offset="1" stop-color="${C.catDark}"/></linearGradient>
    <linearGradient id="${id}-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a00"/><stop offset="1" stop-color="${C.catDark}"/></linearGradient>
  </defs>
  <g id="${id}">
    <ellipse cx="560" cy="470" rx="600" ry="26" fill="#000" opacity=".45"/>
    <!-- tolva (con visera que cubre la cabina) -->
    <g id="${id}-bed">
      <path d="M0 40 L1100 40 L1200 -10 L1230 100 L1150 300 L330 300 L330 190 L0 100Z" fill="url(#${id}-bed)"/>
      <path d="M0 40 L1100 40 L1100 100 L0 100Z" fill="#ffe27a"/>
      <path d="M0 40 L1100 40 L1100 60 L0 60Z" fill="#fff0b0" opacity=".7"/>
      <path d="M330 190 L1150 190" stroke="${C.catShadow}" stroke-width="6" opacity=".5"/>
      ${[420, 540, 660, 780, 900, 1020].map((x) => `<path d="M${x} 110 L${x} 300" stroke="${C.catShadow}" stroke-width="8" opacity=".5"/>`).join('')}
      <path d="M1100 40 L1200 -10 L1230 100 L1150 300 L1100 300Z" fill="url(#${id}-shade)"/>
      <text x="1130" y="200" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="34" fill="#111" transform="rotate(-70 1130 200)">797F</text>
      <!-- carga -->
      <path d="M340 110 Q720 20 1090 110Z" fill="#4a3d33"/><path d="M400 110 Q720 45 1030 110Z" fill="#5f5044"/>
    </g>
    <!-- plataforma + cabina + radiador -->
    <g id="${id}-cab">
      <rect x="-40" y="190" width="380" height="16" fill="#3a414b"/>
      <path d="M130 105 L130 190 L300 190 L300 105 L270 90 L150 90Z" fill="url(#${id}-body)"/>
      <path d="M150 100 L260 100 L280 150 L150 150Z" fill="#9fd8ff" opacity=".85"/>
      <rect x="150" y="150" width="130" height="8" fill="#1d2229"/>
      <!-- barandas -->
      <path d="M-40 150 L-40 190 M0 150 L0 190 M40 150 L40 190 M80 150 L80 190 M-40 150 L120 150 M-40 168 L120 168" stroke="#e9eef4" stroke-width="3" fill="none"/>
      <path d="M310 150 L310 190 M345 150 L345 190 M310 150 L345 150 M310 168 L345 168" stroke="#e9eef4" stroke-width="3" fill="none"/>
      <!-- radiador / frontal -->
      <rect x="-40" y="206" width="180" height="120" fill="#2a3441"/>
      <rect x="-30" y="214" width="160" height="104" fill="#1a2028"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="-24" y="${220 + i * 14}" width="148" height="5" fill="#3d4a5a"/>`).join('')}
      <rect x="-60" y="206" width="24" height="120" fill="${C.cat}"/>
      <rect x="140" y="206" width="190" height="120" fill="url(#${id}-body)"/>
      <rect x="180" y="220" width="120" height="50" rx="4" fill="#111418"/>
      <text x="240" y="256" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="${C.cat}">CAT</text>
      <!-- escalera diagonal -->
      <path d="M-70 440 L-40 206" stroke="#e9eef4" stroke-width="4"/><path d="M-100 440 L-70 206" stroke="#e9eef4" stroke-width="4"/>
      ${Array.from({ length: 9 }, (_, i) => { const t = i / 8, x = -70 + 30 * t, y = 440 - 234 * t; return `<path d="M${x - 30} ${y} L${x} ${y}" stroke="#e9eef4" stroke-width="3"/>` }).join('')}
      <rect x="-80" y="326" width="24" height="10" fill="#fff5c4"/>
      <rect x="-80" y="340" width="24" height="6" fill="${C.amber}"/>
    </g>
    <!-- chasis -->
    <rect x="80" y="300" width="1060" height="50" fill="#1d2229"/>
    <rect x="60" y="340" width="1100" height="28" fill="#111418"/>
    ${wheel(230, 370, 128, `${id}-w1`)}
    ${wheel(870, 370, 128, `${id}-w2`)}
    ${wheel(990, 370, 128, `${id}-w3`)}
  </g>`
}

/**
 * Mando Final (vista exterior, como el componente real): cilindro amarillo con bridas dentadas
 * en ambos extremos. Longitud ≈ 520 px, centrado en (0,0), eje horizontal.
 */
export function finalDriveSide(id = 'fds', label = 'PTT') {
  const flange = (x: number, r: number, w: number, fid: string) => {
    const n = Math.round(r / 5)
    const teeth = Array.from({ length: n }, (_, i) => {
      const y = -r + (i / n) * 2 * r
      return `<rect x="${x - w / 2 - 6}" y="${y}" width="${w + 12}" height="${(2 * r) / n * 0.5}" fill="#8a6a00" opacity=".7"/>`
    }).join('')
    const bolts = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return `<ellipse cx="${x + w / 2 + Math.cos(a) * w * 0.3}" cy="${Math.sin(a) * r * 0.86}" rx="3" ry="4" fill="#3a3000"/>` }).join('')
    return `<g id="${fid}">${teeth}<rect x="${x - w / 2}" y="${-r}" width="${w}" height="${2 * r}" rx="6" fill="url(#${id}-g)"/><ellipse cx="${x + w / 2}" cy="0" rx="${w * 0.35}" ry="${r}" fill="url(#${id}-g)"/>${bolts}<ellipse cx="${x + w / 2}" cy="0" rx="${w * 0.22}" ry="${r * 0.72}" fill="#c99d05"/><circle cx="${x + w / 2}" cy="0" r="${r * 0.2}" fill="#2a3441"/></g>`
  }
  return `
  <defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset=".45" stop-color="${C.cat}"/><stop offset="1" stop-color="#8a6a00"/></linearGradient>
  </defs>
  <g id="${id}">
    <ellipse cx="0" cy="130" rx="280" ry="18" fill="#000" opacity=".4"/>
    <!-- cuerpo cónico -->
    <path d="M-190 -70 L-40 -78 L60 -60 L170 -60 L170 60 L60 60 L-40 78 L-190 70Z" fill="url(#${id}-g)"/>
    <path d="M-190 -70 L-40 -78 L60 -60 L170 -60" stroke="#fff3b8" stroke-width="3" fill="none" opacity=".6"/>
    ${[-120, -60, 0, 110].map((x) => `<line x1="${x}" y1="-64" x2="${x}" y2="64" stroke="#8a6a00" stroke-width="3" opacity=".5"/>`).join('')}
    <!-- brida grande (lado rueda) -->
    ${flange(-220, 105, 50, `${id}-fl1`)}
    <!-- brida central -->
    <g><rect x="60" y="-80" width="26" height="160" rx="4" fill="#c99d05"/></g>
    <!-- brida pequeña (lado eje) -->
    ${flange(200, 84, 40, `${id}-fl2`)}
    <rect x="-70" y="-22" width="100" height="44" rx="4" fill="#e0262b"/>
    <text x="-20" y="11" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#fff" letter-spacing="2">${label}</text>
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
      ${[0, 1, 2, 3].map((i) => planet(((i * 90 + 45) * Math.PI) / 180, i)).join('')}
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
      <circle r="${r * 0.3}" fill="#e0262b"/>
      <text text-anchor="middle" y="${r * 0.08}" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="${r * 0.22}" fill="#fff" letter-spacing="1">PTT</text>
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

/* ---------------------------------------------------------------- */
/* v1.2 — Referencias de Romina (docs/referencias)                     */
/* ---------------------------------------------------------------- */

/** Tracto rojo con cama baja (Imagen 4). Mide ~900 px de largo; el componente va sobre la cama en (620, 160). */
export function lowboyTruck(id = 'lowboy', cargo = false) {
  const wheel = (x: number, y: number, r: number, wid: string) => `<g id="${wid}" transform="translate(${x} ${y})"><circle r="${r}" fill="#0d0f12"/><circle r="${r * 0.55}" fill="#8a8f98"/><circle r="${r * 0.22}" fill="#2a2f36"/></g>`
  return `
  <defs>
    <linearGradient id="${id}-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a5f"/><stop offset=".5" stop-color="#e0262b"/><stop offset="1" stop-color="#8f1216"/></linearGradient>
    <linearGradient id="${id}-yel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd94a"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
  </defs>
  <g id="${id}">
    <ellipse cx="450" cy="292" rx="480" ry="16" fill="#000" opacity=".45"/>
    <!-- cama baja (amarilla) con cuello de cisne -->
    <g id="${id}-bed">
      <path d="M0 200 L60 200 L60 240 L560 240 L560 200 L760 200 L760 260 L0 260Z" fill="url(#${id}-yel)"/>
      <rect x="60" y="228" width="500" height="10" fill="#8a6a00"/>
      ${[120, 220, 320, 420].map((x) => `<rect x="${x}" y="240" width="60" height="6" fill="#5a4600"/>`).join('')}
      <rect x="0" y="180" width="60" height="20" fill="#8a6a00"/>
    </g>
    ${cargo ? `<g id="${id}-cargo">
      ${[[80, 150, 130], [220, 130, 140], [360, 110, 150]].map(([x, w, h], i) => `<g transform="translate(${x} ${240 - h})">${crate(`${id}-cr${i}`, w, h, ['EE.UU.', 'EUROPA', 'ASIA'][i])}</g>`).join('')}
      <rect x="60" y="100" width="500" height="6" fill="#111" opacity=".6"/><rect x="60" y="160" width="500" height="6" fill="#111" opacity=".6"/>
    </g>` : ''}
    ${wheel(100, 270, 28, `${id}-w0`)}${wheel(160, 270, 28, `${id}-w1`)}${wheel(220, 270, 28, `${id}-w2`)}
    <!-- tracto rojo -->
    <g id="${id}-cab">
      <path d="M700 260 L700 120 L740 40 L900 40 L920 90 L920 260Z" fill="url(#${id}-red)"/>
      <path d="M760 55 L890 55 L905 100 L760 100Z" fill="#bfe7ff" opacity=".85"/>
      <rect x="740" y="110" width="170" height="8" fill="#fff"/>
      <rect x="720" y="180" width="200" height="60" fill="#2a2f36"/>
      <rect x="740" y="130" width="80" height="24" rx="3" fill="#fff"/>
      <text x="780" y="148" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="18" fill="#e0262b">PTT</text>
      <rect x="900" y="200" width="24" height="12" fill="#fff5c4"/>
      <rect x="760" y="20" width="16" height="20" fill="#ff9f1c"/>
      <rect x="700" y="60" width="16" height="60" fill="#5b0e11"/>
    </g>
    ${wheel(760, 270, 34, `${id}-w3`)}${wheel(880, 270, 34, `${id}-w4`)}
    <!-- lanza / quinta rueda -->
    <rect x="560" y="200" width="140" height="20" fill="#8a6a00"/>
    <rect x="620" y="150" width="70" height="50" fill="#1d2229"/>
    <circle cx="655" cy="140" r="22" fill="#0d0f12"/>
  </g>`
}

/** Técnico con uniforme PTT (polera negra con franja roja, pantalón gris) — Imágenes 5 y 6. */
export function pttWorker(id = 'w', withTablet = true, shirt = '#1e2126') {
  return `
  <g id="${id}">
    <ellipse cx="0" cy="250" rx="60" ry="10" fill="#000" opacity=".4"/>
    <rect x="-28" y="110" width="24" height="130" rx="6" fill="#4b525c"/>
    <rect x="4" y="110" width="24" height="130" rx="6" fill="#3e444d"/>
    <rect x="-32" y="232" width="32" height="16" rx="4" fill="#111"/><rect x="0" y="232" width="32" height="16" rx="4" fill="#111"/>
    <path d="M-38 0 L38 0 L44 118 L-44 118Z" fill="${shirt}"/>
    <path d="M-38 0 L-20 0 L-26 118 L-44 118Z" fill="#e0262b"/>
    <rect x="-64" y="6" width="22" height="90" rx="10" fill="${shirt}" transform="rotate(12 -53 6)"/>
    <rect x="42" y="6" width="22" height="90" rx="10" fill="${shirt}" transform="rotate(${withTablet ? -40 : -12} 53 6)"/>
    ${withTablet ? `<g transform="translate(40 40) rotate(-12)"><rect width="70" height="50" rx="4" fill="#111418" stroke="#4d5b6d" stroke-width="2"/><rect x="6" y="6" width="58" height="38" fill="#2fd4c8" opacity=".6"/></g>` : ''}
    <text x="0" y="60" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="16" fill="#fff" opacity=".85">PTT</text>
    <circle cx="0" cy="-28" r="22" fill="#d9a67a"/>
    <path d="M-22 -34 Q0 -60 22 -34 Z" fill="#2a2a2a"/>
  </g>`
}

/**
 * Nave del taller PTT (Imágenes 5-7): muros blancos ondulados, cerchas, puente grúa amarillo,
 * letreros de estación (D1, D2…), mesas de trabajo y carros de herramientas rojos.
 */
export function pttWorkshop(id = 'ws', stations = ['D1', 'D2', 'D3']) {
  const ribs = Array.from({ length: 48 }, (_, i) => `<rect x="${i * 40}" y="0" width="20" height="600" fill="#ffffff" opacity=".035"/>`).join('')
  const trusses = [200, 700, 1200, 1700].map((x) => `<path d="M${x - 250} 130 L${x} 40 L${x + 250} 130 M${x - 250} 130 L${x + 250} 130 M${x - 125} 85 L${x - 125} 130 M${x + 125} 85 L${x + 125} 130 M${x} 40 L${x} 130" stroke="#b9bec6" stroke-width="5" fill="none" opacity=".7"/>`).join('')
  const signs = stations.map((s, i) => { const x = 380 + i * 560; return `<g><rect x="${x - 130}" y="250" width="260" height="74" rx="4" fill="#f4f4f2" stroke="#c9ccd1" stroke-width="2"/><rect x="${x - 130}" y="250" width="8" height="74" fill="#e0262b"/><text x="${x}" y="281" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#111">${s}</text><text x="${x}" y="308" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="16" fill="#555" letter-spacing="1.5">ESTACIÓN DE DESARME</text></g>` }).join('')
  const table = (x: number) => `<g><rect x="${x}" y="720" width="340" height="16" fill="#2a2f36"/><rect x="${x + 10}" y="736" width="14" height="120" fill="#1d2229"/><rect x="${x + 316}" y="736" width="14" height="120" fill="#1d2229"/><rect x="${x + 10}" y="800" width="320" height="8" fill="#1d2229"/></g>`
  const cart = (x: number) => `<g><rect x="${x}" y="760" width="110" height="110" rx="4" fill="#e0262b"/>${[0, 1, 2, 3].map((i) => `<rect x="${x + 8}" y="${768 + i * 26}" width="94" height="20" fill="#b3181d"/><rect x="${x + 44}" y="${775 + i * 26}" width="22" height="5" fill="#f1f1f1"/>`).join('')}<circle cx="${x + 20}" cy="878" r="8" fill="#111"/><circle cx="${x + 90}" cy="878" r="8" fill="#111"/></g>`
  return `
  <defs>
    <linearGradient id="${id}-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8d9d6"/><stop offset="1" stop-color="#a9aba8"/></linearGradient>
    <linearGradient id="${id}-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4f57"/><stop offset="1" stop-color="#1c1f24"/></linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#${id}-wall)"/>
  ${ribs}
  <rect width="1920" height="140" fill="#c4c6c3"/>
  ${trusses}
  <!-- puente grúa -->
  <rect x="0" y="150" width="1920" height="34" fill="#f2c318"/><rect x="0" y="184" width="1920" height="10" fill="#b8860b"/>
  <g id="${id}-hoist"><rect x="900" y="194" width="140" height="50" fill="#f2c318"/><line id="${id}-cable" x1="970" y1="244" x2="970" y2="360" stroke="#333" stroke-width="4"/><path d="M950 360 L990 360 L970 390Z" fill="#e0262b"/></g>
  <g id="${id}-signs">${signs}</g>
  <rect x="0" y="620" width="1920" height="460" fill="url(#${id}-fl)"/>
  <rect x="0" y="616" width="1920" height="8" fill="#f2c318" opacity=".6"/>
  ${[-6, -4, -2, 0, 2, 4, 6].map((i) => `<path d="M960 620 L${960 + i * 420} 1080" stroke="#fff" stroke-opacity=".05" stroke-width="2"/>`).join('')}
  <g id="${id}-furniture">${table(120)}${cart(520)}${table(1460)}${cart(1300)}</g>`
}

/**
 * Mapa Mercator estilo satelital (Imagen 8): océano azul con grilla, continentes verde/tierra.
 * Espacio 1000×560. Puntos útiles: Chile-Antofagasta (270,415), Houston (190,225), Rotterdam (500,150), Singapur (770,320), Shanghái (800,240).
 */
export function mercatorMap(id = 'merc') {
  const land = [
    // Norteamérica + Groenlandia
    'M40 60 L150 40 L200 20 L280 30 L300 60 L260 110 L230 140 L260 170 L250 220 L220 260 L200 290 L170 300 L120 250 L90 200 L60 150 L40 100Z',
    'M300 10 L360 5 L370 60 L330 90 L300 60Z',
    // Sudamérica
    'M215 300 L270 295 L320 330 L330 380 L305 440 L280 500 L262 540 L250 520 L240 460 L225 400 L210 350Z',
    // Europa
    'M440 110 L520 90 L580 100 L600 130 L570 170 L520 180 L470 175 L440 150Z',
    // África
    'M460 200 L540 190 L600 230 L610 300 L580 380 L540 420 L510 410 L470 340 L455 270Z',
    // Asia
    'M600 90 L700 60 L820 60 L900 90 L940 150 L900 210 L840 250 L780 270 L720 250 L660 200 L620 160Z',
    'M760 270 L800 280 L790 320 L760 310Z',
    // Australia
    'M790 380 L860 370 L890 420 L850 460 L800 450 L780 410Z',
  ]
  const grid = [...Array.from({ length: 21 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="560" stroke="#fff" stroke-opacity=".12"/>`), ...Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1000" y2="${i * 50}" stroke="#fff" stroke-opacity=".12"/>`)].join('')
  return `
  <defs>
    <linearGradient id="${id}-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b6fa8"/><stop offset="1" stop-color="#0f4f80"/></linearGradient>
    <linearGradient id="${id}-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f8f4a"/><stop offset=".5" stop-color="#8a8f5a"/><stop offset="1" stop-color="#b9a77a"/></linearGradient>
  </defs>
  <g id="${id}">
    <rect width="1000" height="560" fill="url(#${id}-sea)"/>
    ${land.map((d) => `<path d="${d}" fill="url(#${id}-land)" stroke="#3f5a2e" stroke-width="1.5"/>`).join('')}
    ${grid}
  </g>`
}

/** Logo institucional PTT · Marubeni Group como SVG (para usar dentro de gráficos). */
export function pttLogoSvg(id = 'logo', size = 60) {
  return `
  <g id="${id}" transform="skewX(-8)" font-family="Barlow Condensed, sans-serif" font-weight="700">
    <text y="0" font-size="${size}" fill="#e0262b">POWER</text>
    <line x1="0" y1="${size * 0.14}" x2="${size * 2.85}" y2="${size * 0.14}" stroke="#e0262b" stroke-width="${size * 0.05}"/>
    <text y="${size * 1.06}" font-size="${size}" fill="#ffffff">TRAIN</text>
    <line x1="0" y1="${size * 1.2}" x2="${size * 2.85}" y2="${size * 1.2}" stroke="#e0262b" stroke-width="${size * 0.05}"/>
    <text y="${size * 1.82}" font-size="${size * 0.62}" fill="#8a8f98">TECHNOLOGIES</text>
    <text x="${size * 1.4}" y="${size * 2.2}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${size * 0.3}" fill="#e0262b">Marubeni Group</text>
  </g>`
}


/* ---------------------------------------------------------------- */
/* R2 — Ronda 2 de observaciones (docs/referencias/r2-*)              */
/* ---------------------------------------------------------------- */

/** Mapa de Chile simplificado (caja 260×900). Marcadores: Antofagasta (150,150), Santiago (128,380). */
export function chileMap(id = 'cl') {
  const d = 'M118 0 L162 12 L172 60 L166 130 L160 200 L158 270 L152 330 L146 390 L142 450 L138 510 L134 570 L128 630 L118 690 L110 750 L104 810 L120 860 L150 890 L110 900 L70 880 L60 830 L64 770 L72 710 L80 650 L88 590 L94 530 L100 470 L104 410 L110 350 L112 290 L114 220 L112 150 L110 80 Z'
  return `
  <defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4453"/><stop offset="1" stop-color="#1e2530"/></linearGradient>
  </defs>
  <g id="${id}">
    <path d="${d}" fill="url(#${id}-g)" stroke="#8a99ad" stroke-width="2" stroke-opacity=".7"/>
    <path d="${d}" fill="none" stroke="#e0262b" stroke-width="1" stroke-opacity=".25" transform="translate(6 6)"/>
  </g>`
}

/** Marcador de ubicación (pin) con anillo pulsante. */
export function pin(id = 'pin', label = '') {
  return `<g id="${id}">
    <circle id="${id}-ring" r="18" fill="none" stroke="#e0262b" stroke-width="2" opacity=".7"/>
    <circle r="9" fill="#e0262b" stroke="#fff" stroke-width="2"/>
    ${label ? `<text x="30" y="8" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="30" fill="#e9eef4" letter-spacing="2">${label}</text>` : ''}
  </g>`
}

/** Galpón de taller PTT dentro de la faena (contrato de mantención). Ancho ~1100, alto ~420; origen esquina inferior izquierda. */
export function fieldWorkshop(id = 'fw') {
  return `
  <g id="${id}">
    <path d="M0 0 L0 -300 L60 -340 L1040 -340 L1100 -300 L1100 0Z" fill="#c9ccd1"/>
    <path d="M0 -300 L60 -340 L1040 -340 L1100 -300Z" fill="#9aa0a8"/>
    ${Array.from({ length: 27 }, (_, i) => `<rect x="${10 + i * 40}" y="-300" width="18" height="300" fill="#fff" opacity=".18"/>`).join('')}
    <rect x="0" y="-300" width="1100" height="14" fill="#e0262b"/>
    <rect x="80" y="-250" width="940" height="250" fill="#1a1e24"/>
    <rect x="80" y="-250" width="940" height="250" fill="url(#${id}-in)"/>
    <clipPath id="${id}-clip"><rect x="80" y="-250" width="940" height="250"/></clipPath>
    <g clip-path="url(#${id}-clip)"><g id="${id}-door"><rect x="80" y="-250" width="940" height="250" fill="#3a3f47"/>${Array.from({ length: 6 }, (_, i) => `<rect x="84" y="${-246 + i * 41}" width="932" height="36" fill="#4b525c"/>`).join('')}</g></g>
    <rect x="360" y="-330" width="380" height="60" rx="4" fill="#f4f4f2"/>
    <rect x="360" y="-330" width="10" height="60" fill="#e0262b"/>
    <text x="550" y="-306" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="24" fill="#e0262b" letter-spacing="2">TALLER PTT EN FAENA</text>
    <text x="550" y="-282" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="15" fill="#444" letter-spacing="1.5">CONTRATO DE MANTENCIÓN · DENTRO DE LA MINERA</text>
  </g>
  <defs><linearGradient id="${id}-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff5d6" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>`
}

/** Motoniveladora (Imagen 4). Ancho ~520, ruedas en y=0. */
export function motorGrader(id = 'mg') {
  return `<g id="${id}">
    <ellipse cx="260" cy="4" rx="280" ry="10" fill="#000" opacity=".4"/>
    <path d="M40 -60 L200 -60 L200 -30 L470 -30 L470 -60 L520 -60 L520 -10 L40 -10Z" fill="${C.cat}"/>
    <path d="M200 -110 L200 -60 L120 -60 L120 -80Z" fill="#c99d05"/>
    <path d="M300 -60 L300 -150 L390 -150 L410 -60Z" fill="#1d2229"/>
    <path d="M310 -140 L385 -140 L398 -95 L310 -95Z" fill="#9fd8ff" opacity=".8"/>
    <rect x="410" y="-120" width="90" height="60" fill="#111418"/>
    <rect x="200" y="-90" width="100" height="30" fill="#c99d05"/>
    <path d="M150 -30 L260 -30 L300 -20 L140 -8Z" fill="#8a99ad"/>
    <path d="M110 -12 L300 -12 L300 -2 L110 -2Z" fill="#2a3441" transform="rotate(-10 200 -8)"/>
    <path d="M60 -60 L20 -90 L20 -100 L110 -100" stroke="#c99d05" stroke-width="8" fill="none"/>
    ${[60, 400, 470].map((x) => `<g><circle cx="${x}" cy="-10" r="34" fill="#0d0f12"/><circle cx="${x}" cy="-10" r="16" fill="${C.cat}"/><circle cx="${x}" cy="-10" r="6" fill="#1d2229"/></g>`).join('')}
  </g>`
}

/** Bulldozer (Imagen 5). Ancho ~480, base en y=0. */
export function bulldozer(id = 'bz') {
  return `<g id="${id}">
    <ellipse cx="240" cy="4" rx="260" ry="10" fill="#000" opacity=".4"/>
    <path d="M0 -60 L30 -140 L110 -140 L120 -20 L0 -20Z" fill="#c99d05"/>
    <path d="M6 -56 L34 -132 L100 -132 L108 -30 L6 -30Z" fill="${C.cat}"/>
    <rect x="130" y="-110" width="260" height="70" fill="${C.cat}"/>
    <path d="M200 -110 L210 -190 L320 -190 L330 -110Z" fill="#1d2229"/>
    <path d="M215 -182 L312 -182 L320 -125 L215 -125Z" fill="#9fd8ff" opacity=".8"/>
    <rect x="330" y="-120" width="80" height="80" fill="#111418"/>
    <rect x="390" y="-170" width="10" height="60" fill="#333"/>
    <path d="M120 -80 L60 -60" stroke="#8a8f98" stroke-width="10"/>
    <rect x="120" y="-50" width="300" height="50" rx="25" fill="#1d2229"/>
    <rect x="130" y="-40" width="280" height="30" rx="15" fill="#2a2f36"/>
    ${[150, 210, 270, 330, 390].map((x) => `<circle cx="${x}" cy="-25" r="10" fill="#4b525c"/>`).join('')}
  </g>`
}

/** Perforadora de tiro (Imagen 6). Ancho ~300, alto ~460, base en y=0. */
export function drillRig(id = 'dr') {
  return `<g id="${id}">
    <ellipse cx="150" cy="4" rx="170" ry="10" fill="#000" opacity=".4"/>
    <rect x="30" y="-60" width="240" height="50" rx="20" fill="#1d2229"/>
    <rect x="40" y="-50" width="220" height="30" rx="15" fill="#2a2f36"/>
    <rect x="40" y="-130" width="230" height="70" fill="${C.cat}"/>
    <rect x="200" y="-190" width="70" height="60" fill="#1d2229"/>
    <rect x="206" y="-184" width="58" height="34" fill="#9fd8ff" opacity=".8"/>
    <rect x="60" y="-460" width="70" height="330" fill="${C.cat}"/>
    <rect x="70" y="-450" width="50" height="310" fill="#111418"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M70 ${-440 + i * 30} L120 ${-410 + i * 30}" stroke="${C.cat}" stroke-width="4"/>`).join('')}
    <rect x="90" y="-440" width="10" height="330" fill="#8a8f98"/>
    <rect x="50" y="-470" width="90" height="14" fill="#c99d05"/>
    <path d="M130 -420 L200 -130" stroke="${C.cat}" stroke-width="8"/>
  </g>`
}

/** Camión de extracción Komatsu (Imagen 7): cabina cuadrada a la izquierda sobre la plataforma, tolva. Ancho ~560, base y=0. */
export function komatsuTruck(id = 'km') {
  return `<g id="${id}">
    <ellipse cx="280" cy="4" rx="300" ry="10" fill="#000" opacity=".4"/>
    <path d="M110 -170 L470 -170 L520 -230 L560 -100 L520 -60 L110 -60Z" fill="${C.cat}"/>
    <path d="M110 -170 L470 -170 L470 -140 L110 -140Z" fill="#ffe27a"/>
    <path d="M0 -180 L120 -180 L120 -100 L0 -100Z" fill="${C.cat}"/>
    <path d="M10 -240 L90 -240 L100 -180 L10 -180Z" fill="#1d2229"/>
    <path d="M16 -232 L84 -232 L92 -196 L16 -196Z" fill="#9fd8ff" opacity=".8"/>
    <rect x="0" y="-180" width="120" height="6" fill="#fff"/>
    <rect x="0" y="-100" width="130" height="50" fill="#1d2229"/>
    <rect x="40" y="-90" width="60" height="16" rx="3" fill="#111"/>
    <text x="70" y="-78" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff">KOMATSU</text>
    <rect x="60" y="-70" width="440" height="30" fill="#111418"/>
    ${[90, 400, 470].map((x) => `<g><circle cx="${x}" cy="-30" r="54" fill="#0d0f12"/><circle cx="${x}" cy="-30" r="24" fill="#2a2f36"/><circle cx="${x}" cy="-30" r="8" fill="#111"/></g>`).join('')}
  </g>`
}

/** Mesa de laboratorio de Ingeniería y Desarrollo (microscopio + monitor). Origen: borde superior de la mesa, centro. */
export function labBench(id = 'lab') {
  return `<g id="${id}">
    <rect x="-260" y="0" width="520" height="18" fill="#dfe3e8"/>
    <rect x="-240" y="18" width="16" height="140" fill="#9aa0a8"/><rect x="224" y="18" width="16" height="140" fill="#9aa0a8"/>
    <!-- microscopio -->
    <g transform="translate(-150 0)">
      <rect x="-40" y="-14" width="80" height="14" rx="4" fill="#2a2f36"/>
      <path d="M20 -14 L20 -110 Q20 -130 0 -130 L-10 -130" stroke="#3d4a5a" stroke-width="12" fill="none"/>
      <rect x="-30" y="-150" width="20" height="60" rx="4" fill="#2a3441" transform="rotate(-20 -20 -120)"/>
      <rect x="-24" y="-60" width="14" height="24" fill="#8a99ad"/>
    </g>
    <!-- monitor -->
    <g transform="translate(120 0)">
      <rect x="-30" y="-20" width="60" height="20" fill="#2a2f36"/><rect x="-6" y="-60" width="12" height="40" fill="#2a2f36"/>
      <rect x="-120" y="-190" width="240" height="132" rx="6" fill="#0b0f15" stroke="#3d4a5a" stroke-width="3"/>
      <g id="${id}-screen" font-family="JetBrains Mono, monospace" font-size="11" fill="#2fd4c8">
        <text x="-104" y="-166">MEDICIÓN · DUREZA HRC</text>
        <polyline points="-104,-100 -80,-120 -56,-110 -32,-140 -8,-125 16,-150 40,-135 64,-155 88,-140" fill="none" stroke="#2fd4c8" stroke-width="2"/>
        <text x="-104" y="-72" fill="#e0262b">MEJORA PROPUESTA · v2</text>
      </g>
    </g>
    <!-- lupa / cuaderno -->
    <rect x="-40" y="-8" width="80" height="8" fill="#e0262b"/>
  </g>`
}

/** Pieza (engranaje planetario) suelta, para el laboratorio / mejora. */
export function loosePart(id = 'part', r = 40) {
  const teeth = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return `<rect x="-5" y="${-r - 8}" width="10" height="14" fill="#8a99ad" transform="rotate(${(a * 180) / Math.PI})"/>` }).join('')
  return `<g id="${id}">${teeth}<circle r="${r}" fill="#8a99ad"/><circle r="${r * 0.7}" fill="#56657a"/><circle r="${r * 0.3}" fill="#1d2229"/></g>`
}
