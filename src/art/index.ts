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

/** Materiales compartidos; cada instancia mantiene recursos SVG independientes. */
function equipmentPaint(id: string) {
  return `<defs>
    <linearGradient id="${id}-paint" x2="0" y2="1"><stop stop-color="#ffdf62"/><stop offset=".42" stop-color="#ffcd11"/><stop offset="1" stop-color="#c99d05"/></linearGradient>
    <linearGradient id="${id}-glass" x2=".8" y2="1"><stop stop-color="#7fadb8"/><stop offset=".45" stop-color="#354f5b"/><stop offset="1" stop-color="#172933"/></linearGradient>
    <linearGradient id="${id}-metal" x2="0" y2="1"><stop stop-color="#b4bec4"/><stop offset=".45" stop-color="#697782"/><stop offset="1" stop-color="#35404a"/></linearGradient>
  </defs>`
}

/** Banda en bloques y tornillería, centradas para las rotaciones GSAP. */
function equipmentWheel(x: number, y: number, r: number, id: string, rim: string = C.cat) {
  return `<g id="${id}" transform="translate(${x} ${y})">
    <circle r="${r}" fill="#14171b"/>
    ${Array.from({ length: 28 }, (_, i) => `<path d="M${-r * .1} ${-r * .96} l${r * .17} 0 ${r * .06} ${r * .12} -${r * .18} 0Z" fill="#34393e" transform="rotate(${i * 360 / 28})"/>`).join('')}
    <circle r="${r * .78}" fill="#24282d" stroke="#454a4e" stroke-width="${r * .02}"/>
    <circle r="${r * .53}" fill="${rim}" stroke="#111820" stroke-width="${r * .04}"/>
    <circle r="${r * .43}" fill="none" stroke="#fff4bc" stroke-opacity=".45" stroke-width="${r * .035}"/>
    <circle r="${r * .26}" fill="${rim}" stroke="#5d542b" stroke-width="${r * .04}"/>
    ${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<circle cx="${Math.cos(a) * r * .34}" cy="${Math.sin(a) * r * .34}" r="${r * .033}" fill="#394048"/>` }).join('')}
    <circle r="${r * .12}" fill="#41464a"/>
  </g>`
}

function equipmentTrack(x: number, y: number, w: number, h: number) {
  return `<g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="${h / 2}" fill="#15191d" stroke="#525b60" stroke-width="3"/>
    <rect x="9" y="8" width="${w - 18}" height="${h - 16}" rx="${h / 2 - 8}" fill="#394146"/>
    ${Array.from({ length: 7 }, (_, i) => `<circle cx="${h / 2 + i * (w - h) / 6}" cy="${h / 2}" r="${h * .29}" fill="#687074" stroke="#1c2328" stroke-width="3"/><circle cx="${h / 2 + i * (w - h) / 6}" cy="${h / 2}" r="${h * .1}" fill="#252c30"/>`).join('')}
    ${Array.from({ length: Math.floor(w / 12) }, (_, i) => `<path d="M${12 + i * 11} 0 v7 M${12 + i * 11} ${h - 7} v7" stroke="#788084" stroke-width="3"/>`).join('')}
  </g>`
}

/* ---------------------------------------------------------------- */
/* Camión CAT 797 (vista lateral, ilustrativo)                        */
/* ---------------------------------------------------------------- */
export function truck797(id = 'truck') {
  // Photo-space coordinates preserve the lateral silhouette without stretching tires.
  // 1.36 × 94 = 127.84; axle y = 1.36 × 290 - 24 = 370.4.
  const wheel = (x: number, suffix: string) => `<g id="${id}-${suffix}" transform="translate(${x} 290)">
    <circle r="94" fill="#393736" stroke="#292a29" stroke-width="2"/>
    ${Array.from({ length: 36 }, (_, i) => `<path d="M-9 -92 L1 -95 10 -90 12 -82 4 -79 -7 -83Z" fill="${i % 2 ? '#53514d' : '#625f58'}" stroke="#363633" stroke-width="1" transform="rotate(${i * 10})"/>`).join('')}
    <circle r="83" fill="url(#${id}-rubber)" stroke="#777168" stroke-width="1.2"/>
    <circle r="74" fill="none" stroke="#595650" stroke-width="1"/>
    <circle r="52" fill="#aa8010" stroke="#292b27" stroke-width="3"/>
    <circle r="47" fill="#ffcd11" stroke="#edb91b" stroke-width="3"/>
    <circle r="41" fill="#c79808" stroke="#ffe05b" stroke-width="2"/>
    <path d="M-35 -21 A41 41 0 0 0 -20 36 L-8 21 3 -10Z" fill="#957016"/>
    <circle r="34" fill="#efbb0d" stroke="#957016" stroke-width="2"/>
    ${suffix === 'w1' ? '<path d="M-29 -17 Q-39 9 -20 29 L-7 24 1 7 -4 -16Z" fill="#ac8111"/>' : '<circle r="36" fill="none" stroke="#ffdc35" stroke-width="2"/>'}
    <path d="M-28 -17 A33 33 0 0 1 25 -21" fill="none" stroke="#ffdb40" stroke-width="3"/>
    <circle r="18" fill="#ffcd11" stroke="#b28c13" stroke-width="2"/>
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="${Math.cos(i * Math.PI / 6) * 27}" cy="${Math.sin(i * Math.PI / 6) * 27}" r="1.7" fill="#a27a13"/>`).join('')}
    <circle r="8" fill="#e6b10c" stroke="#b99012" stroke-width="2"/>
  </g>`
  return `${equipmentPaint(id)}
  <defs>
    <linearGradient id="${id}-body" x2="0" y2="1"><stop stop-color="#ffdc4b"/><stop offset="1" stop-color="#ffcd11"/></linearGradient>
    <linearGradient id="${id}-bed-paint" x2="0" y2="1"><stop stop-color="#ffda3e"/><stop offset="1" stop-color="#ecc01b"/></linearGradient>
    <linearGradient id="${id}-shade"><stop stop-color="#96731b"/><stop offset="1" stop-color="#d5a614"/></linearGradient>
    <radialGradient id="${id}-rubber"><stop stop-color="#45423e"/><stop offset=".8" stop-color="#514d48"/><stop offset="1" stop-color="#45433f"/></radialGradient>
  </defs>
  <g id="${id}">
  <g transform="translate(90 -24) scale(1.36)">
    <ellipse cx="328" cy="380" rx="309" ry="10" fill="#151a1c" opacity=".23"/>
    <!-- The far dual remains addressable but is mostly occluded in pure profile. -->
    ${wheel(473, 'w2')}
    <path d="M68 246 L260 221 516 214 541 244 512 325 352 336 218 316 56 317Z" fill="#37382d"/>
    <path d="M252 223 L276 218 285 252 419 242 468 214 504 224 419 277 266 284Z" fill="#9b7817"/>
    <path d="M261 238 L286 244 288 326 266 326Z" fill="#ffcd11"/>
    <path d="M281 227 L340 239 347 316 336 329 H283Z" fill="url(#${id}-body)" stroke="#aa8211" stroke-width="2"/>
    <circle cx="316" cy="313" r="10" fill="#9e7d1a" stroke="#ffe056" stroke-width="2"/>
    <path d="M354 322 L377 193" stroke="#6b5b2a" stroke-width="20"/>
    <path d="M355 317 L370 233" stroke="#e5b30d" stroke-width="15"/>
    <path d="M370 235 L379 188" stroke="url(#${id}-metal)" stroke-width="9"/>
    <circle cx="355" cy="318" r="9" fill="#e9b812" stroke="#8d6d17" stroke-width="2"/>
    <g id="${id}-bed">
      <!-- Short canopy, tall front wall and raised discharge lip, traced in profile. -->
      <path d="M27 29 L233 22 284 38 540 39 650 110 646 123 568 150 314 222 275 218 227 78 24 68Z" fill="url(#${id}-bed-paint)" stroke="#b38a18" stroke-width="2"/>
      <path d="M24 68 L38 42 214 42 243 95 225 100 199 68 49 74Z" fill="url(#${id}-shade)"/>
      <path d="M49 74 L92 95 110 82 181 83 209 111 225 115 217 89 194 68Z" fill="#967421"/>
      ${[49, 99, 151].map(x => `<path d="M${x} 45 h13 l22 27 -15 -2Z" fill="#e4b627"/>`).join('')}
      <path d="M238 39 L281 49 537 49 633 109 279 113Z" fill="#f7c72c"/>
      <path d="M239 41 L266 43 301 116 277 116Z" fill="#ffdf54"/>
      ${[310, 402, 496].map((x, i) => `<path d="M${x} 49 h13 l${i === 2 ? 29 : 24} 62 h-15Z" fill="#b99324"/><path d="M${x - 4} 48 h12 l24 61 h-13Z" fill="#ffdf55"/>`).join('')}
      <path d="M280 119 L648 113 638 126 288 139Z" fill="#ffe055"/>
      <path d="M285 140 L634 127 570 157 319 224 292 204Z" fill="url(#${id}-shade)"/>
      <path d="M300 143 L616 132 565 152 325 214Z" fill="#d2a51d"/>
      ${[320, 365, 412, 459, 506, 553].map((x, i) => `<path d="M${x} ${147 - i * 2} l16 -3 -5 ${43 - i * 6} q-2 13 -14 17 l-12 -8Z" fill="#b68c20"/><path d="M${x} ${147 - i * 2} l6 -1 -8 ${57 - i * 7} -7 3Z" fill="#f3c537"/>`).join('')}
      <path d="M302 211 L569 145 634 122" fill="none" stroke="#f8cc3b" stroke-width="5"/>
      <path d="M28 29 L233 22 284 38 540 39 650 110" fill="none" stroke="#ffe67d" stroke-width="6"/>
      <path d="M34 35 L230 29 281 45 537 46" fill="none" stroke="#b99529" stroke-width="2"/>
      <path d="M337 62 H398 L410 82 394 94 H349Z" fill="#282d2c"/>
      <path d="M371 94 H394 L411 81 408 75 391 87 H367Z" fill="#d9292f"/>
      <text x="355" y="83" fill="#fff" font-family="Arial, sans-serif" font-size="21" font-weight="800">797F</text>
      <path d="M431 63 H473 L484 87 H439Z" fill="#30322c"/>
      <text x="438" y="81" fill="#fff" font-family="Arial, sans-serif" font-size="18" font-weight="700">2104</text>
      <path d="M407 37 l2 12 m5 -12 2 12" stroke="#c44425" stroke-width="3"/>
      ${[559, 582, 605].map(x => `<ellipse cx="${x}" cy="110" rx="6" ry="3.5" fill="#514320"/>`).join('')}
    </g>
    <path d="M536 164 q-5 16 10 18 l9 -5 M547 162 q14 20 6 30 M283 214 q-9 16 4 33" fill="none" stroke="#44473c" stroke-width="2"/>
    <g id="${id}-cab">
      <path d="M66 156 L92 110 108 79 H172 L193 99 207 151Z" fill="#41443b" stroke="#272f2f" stroke-width="2"/>
      <path d="M99 139 L105 91 132 86 H163 L174 96 177 140Z" fill="url(#${id}-glass)" stroke="#303a3b" stroke-width="4"/>
      <path d="M109 95 L126 91 124 116 106 127Z M137 91 H157 L166 100 166 119 136 120Z" fill="#8ba5a5" opacity=".38"/>
      <path d="M133 88 V144 M170 96 L172 143 M103 121 H171" fill="none" stroke="#242f30" stroke-width="3"/>
      <path d="M138 123 H166 V153 H137Z" fill="#3c4744" stroke="#232e2d" stroke-width="2"/>
      <path d="M155 130 h8" stroke="#b2b9ae" stroke-width="2"/>
      <path d="M109 117 l14 -18 M142 118 l18 -16" stroke="#202d30" stroke-width="1.5"/>
      <path d="M101 79 H171 L182 88" fill="none" stroke="#555952" stroke-width="5"/>
      <path d="M185 137 V111 h10 v33 M91 111 H83 v20" fill="none" stroke="#303b3b" stroke-width="2"/>
      <rect x="79" y="117" width="7" height="15" rx="2" fill="#515d59"/>
      <path d="M24 150 H215 L231 169 224 182 205 170 H59 L35 189 21 182Z" fill="#ffcd11" stroke="#a27b0e" stroke-width="2"/>
      <path d="M60 172 H199 L232 197 244 233 229 221 Q214 181 166 181 H114 Q67 185 50 230 L36 232 38 199Z" fill="#d6a817"/>
      <path d="M49 231 Q69 180 119 180 H166 Q212 181 231 217 L236 239 216 221 Q176 191 123 198 L66 242Z" fill="#33332a"/>
      <path d="M22 182 H58 L48 231 H21Z" fill="url(#${id}-body)"/>
      <path d="M22 190 H33 V275 H19Z" fill="#343b36"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M21 ${195 + i * 6} h10" stroke="#717367" stroke-width="1.5"/>`).join('')}
      <path d="M32 179 H61 L57 198 H32Z" fill="#303630"/>
      <text x="34" y="190" fill="#fff" font-family="Arial, sans-serif" font-size="10" font-weight="700">797F</text>
      <path d="M33 198 H47 L58 189 56 199 H33Z" fill="#d32f32"/>
      <rect x="18" y="247" width="18" height="21" fill="#303a35"/>
      <text x="19" y="256" fill="#fff" font-family="Arial, sans-serif" font-size="8" font-weight="800">CAT</text>
      <path d="M25 261 l4 -5 4 5Z" fill="#ffcd11"/>
      <path d="M17 274 H39 V299 H12 V288 H17Z" fill="#e7b70e"/>
      <path d="M10 300 H48 V314 H10Z" fill="#ffcd11" stroke="#a5831b" stroke-width="2"/>
      <rect x="19" y="280" width="11" height="6" rx="1" fill="#fff4c2"/>
      <path d="M23 147 V128 H56 V149 M29 127 V164 M43 129 V165 M57 120 V164 M57 124 H90 M64 144 H211 M93 131 V162 M119 135 V161 M152 135 V160 M183 133 V162 M210 143 V163 M22 164 H224" fill="none" stroke="#374748" stroke-width="2" stroke-linejoin="round"/>
      ${[74, 119, 164, 208].map(x => `<path d="M${x} 148 h8" stroke="#f0f0d3" stroke-width="4"/>`).join('')}
      <path d="M217 162 L244 192 249 247 M219 152 L248 188 259 245" fill="none" stroke="#4a5045" stroke-width="2"/>
      ${[0, 1, 2, 3, 4].map(i => `<path d="M${235 + i * 3} ${190 + i * 11} l11 -1" stroke="#b7a154" stroke-width="2"/>`).join('')}
    </g>
    ${wheel(155, 'w1')}
    ${wheel(490, 'w3')}
    <!-- Narrow access ladder seen edge-on at the nose. -->
    <path d="M8 350 L20 166 M21 350 L32 167" fill="none" stroke="#c4a441" stroke-width="3"/>
    ${Array.from({ length: 14 }, (_, i) => `<path d="M${9 + i * .8} ${345 - i * 12.5} h13" stroke="#d9bd65" stroke-width="2.5"/>`).join('')}
    <path d="M5 331 L16 156 V129 Q16 125 20 125 H25 V160 M24 329 L35 159 V132" fill="none" stroke="#485653" stroke-width="2"/>
  </g>
  </g>`
}

/**
 * Mando Final exterior: cuerpo cónico amarillo con coronas dentadas
 * en ambos extremos. Longitud ≈ 520 px, centrado en (0,0), eje horizontal.
 */
export function finalDriveSide(id = 'fds', label = 'PTT') {
  // Elliptical sections share a horizontal axis; nearer faces look to the left.
  const faceRatio = .58
  const section = (x: number, r: number, fill: string, stroke = '#a37a23') =>
    `<ellipse cx="${x}" rx="${r * faceRatio}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`
  const barrel = (x: number, end: number, r: number) =>
    `<path d="M${x} ${-r} H${end} A${r * faceRatio} ${r} 0 0 1 ${end} ${r} H${x} A${r * faceRatio} ${r} 0 0 1 ${x} ${-r}Z" fill="url(#${id}-g)" stroke="#bc902a" stroke-width="1"/>`
  const bolts = (x: number, r: number, n: number, size: number) => Array.from({ length: n }, (_, i) => {
    const a = (i + .5) * Math.PI * 2 / n
    const bx = x + Math.cos(a) * r * faceRatio, by = Math.sin(a) * r
    return `<ellipse cx="${bx}" cy="${by + .8}" rx="${size * .75}" ry="${size}" fill="#795c26"/><ellipse cx="${bx - .4}" cy="${by - .5}" rx="${size * .58}" ry="${size * .73}" fill="url(#${id}-bolt)" stroke="#9c7c37" stroke-width=".45"/>`
  }).join('')
  const flange = (x: number, r: number, w: number, fid?: string) => {
    const point = (a: number, radius: number, shift = 0) => `${(x + shift + Math.cos(a) * radius * faceRatio).toFixed(2)} ${(Math.sin(a) * radius).toFixed(2)}`
    const teeth = Array.from({ length: 100 }, (_, i) => {
      const a = i * Math.PI / 50, d = Math.PI / 50
      return `<path d="M${point(a, r)} L${point(a + d * .18, r + 3)} L${point(a + d * .70, r + 3)} L${point(a + d, r)} L${point(a + d, r, w)} L${point(a + d * .70, r + 3, w)} L${point(a + d * .18, r + 3, w)} L${point(a, r, w)}Z" fill="url(#${id}-g)" stroke="#8a6a2a" stroke-width=".45"/><path d="M${point(a + d * .22, r + 2.7)} L${point(a + d * .22, r + 2.7, w)}" stroke="#ffe4a0" stroke-opacity=".7" stroke-width=".8"/>`
    }).join('')
    return `<g${fid ? ` id="${fid}"` : ''}>${barrel(x, x + w, r)}${teeth}${section(x, r - 2, `url(#${id}-face)`)}${section(x, r - 8, 'none', '#f5d477')}${section(x, r - 12, `url(#${id}-face)`, '#97712d')}${bolts(x, r - 6, 40, 1.9)}</g>`
  }
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2=".12" y2="1">
      <stop stop-color="#b48a32"/><stop offset=".12" stop-color="#f7d477"/><stop offset=".29" stop-color="#ffdc65"/><stop offset=".46" stop-color="#efb72b"/><stop offset=".65" stop-color="#edbc3f"/><stop offset=".84" stop-color="#b17b1e"/><stop offset="1" stop-color="#926621"/>
    </linearGradient>
    <linearGradient id="${id}-face" x1="0" y1=".8" x2="1" y2=".12"><stop stop-color="#806020"/><stop offset=".42" stop-color="#bb913b"/><stop offset=".74" stop-color="#ead080"/><stop offset="1" stop-color="#bd9545"/></linearGradient>
    <linearGradient id="${id}-rear" x1="0" y1="1" x2=".7" y2="0"><stop stop-color="#9b7b39"/><stop offset=".45" stop-color="#c4a35f"/><stop offset=".8" stop-color="#e2c782"/><stop offset="1" stop-color="#b99a52"/></linearGradient>
    <radialGradient id="${id}-cap" cx=".68" cy=".28" r=".85"><stop stop-color="#bb953c"/><stop offset=".56" stop-color="#8e7028"/><stop offset="1" stop-color="#66501f"/></radialGradient>
    <linearGradient id="${id}-bolt" x2=".4" y2="1"><stop stop-color="#fff0b6"/><stop offset=".45" stop-color="#d5b76b"/><stop offset="1" stop-color="#80632c"/></linearGradient>
    <radialGradient id="${id}-glint"><stop stop-color="#fff2b6" stop-opacity=".55"/><stop offset="1" stop-color="#fff0ae" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-shadow"><stop stop-color="#302614" stop-opacity=".28"/><stop offset="1" stop-color="#302614" stop-opacity="0"/></radialGradient>
  </defs>
  <g id="${id}">
    <ellipse cx="0" cy="130" rx="270" ry="17" fill="url(#${id}-shadow)"/>
    ${flange(185, 113, 13, `${id}-fl2`)}
    ${section(184, 94, `url(#${id}-rear)`)}
    ${section(183, 89, 'none', '#e8cf8c')}
    ${bolts(184, 83, 20, 2.8)}
    ${barrel(115, 181, 77)}
    <path d="M144 -75 A45 77 0 0 1 144 75 M169 -76 A45 77 0 0 1 169 76" fill="none" stroke="#a27b30" stroke-width="2"/>
    ${flange(112, 108, 12)}
    ${barrel(81, 110, 86)}
    ${section(81, 86, `url(#${id}-g)`)}
    <path d="M-130 -72 L-77 -56 Q-53 -50 -20 -52 L20 -59 Q41 -65 53 -79 L78 -86 A50 86 0 0 1 78 86 L53 79 Q30 57 -20 52 H-77 L-130 72Z" fill="url(#${id}-g)" stroke="#c09630" stroke-width="1.2"/>
    ${[54, 66, 77].map((x, i) => `<path d="M${x} ${-77 - i * 3} A${45 + i * 2} ${77 + i * 3} 0 0 1 ${x} ${77 + i * 3}" fill="none" stroke="${i === 1 ? '#ffe190' : '#b8882c'}" stroke-width="${i === 1 ? 3 : 2}"/>`).join('')}
    <path d="M-79 -43 Q-44 -36 8 -47 L14 -27 Q-36 -16 -76 -23Z" fill="url(#${id}-glint)"/>
    <path d="M-74 -17 L-66 23 Q-33 30 12 18 L5 -22 M-65 27 Q-28 36 16 22" fill="none" stroke="#b58a27" stroke-width="2"/>
    <path d="M-69 -17 L-62 19 Q-27 25 9 15" fill="none" stroke="#ffdf76" stroke-width="2.5"/>
    <path d="M-66 -48 l5 9 12 2 -5 -9Z M-14 -52 l6 9 13 -3 -7 -8Z M-59 41 l3 10 12 1 -2 -10Z M-3 38 l4 10 13 -3 -4 -10Z" fill="#ba8d29" opacity=".65"/>
    <path d="M-64 -48 l12 2 M-12 -52 l12 -2 M-57 41 l12 1 M-1 38 l12 -2" stroke="#ffe089" stroke-width="2"/>
    ${[-109, -94].map(x => `<path d="M${x} -64 A37 64 0 0 1 ${x} 64" fill="none" stroke="#c79529" stroke-width="4"/><path d="M${x + 3} -63 A37 63 0 0 1 ${x + 3} 63" fill="none" stroke="#ffdd73" stroke-width="2"/>`).join('')}
    ${flange(-132, 90, 13)}
    ${barrel(-202, -131, 88)}
    <path d="M-183 -87 H-139 M-179 86 H-137" stroke="#f9dd8f" stroke-width="2" opacity=".7"/>
    ${[-180, -172, -150].map((x, i) => `<path d="M${x} -88 A51 88 0 0 1 ${x} 88" fill="none" stroke="${i === 1 ? '#f5d37a' : '#b18a36'}" stroke-width="${i === 1 ? 3 : 1.5}"/>`).join('')}
    <path d="M-163 -83 A49 83 0 0 1 -163 83" fill="none" stroke="#ffe8a2" stroke-width="5" stroke-opacity=".3"/>
    ${flange(-203, 94, 13, `${id}-fl1`)}
    ${section(-205, 80, `url(#${id}-cap)`, '#e5bd5d')}
    ${section(-206, 72, 'none', '#644e22')}
    ${section(-206, 76, 'none', '#dfbd69')}
    ${section(-207, 65, 'none', '#c6a353')}
    ${bolts(-207, 69, 16, 3.2)}
    ${section(-208, 48, `url(#${id}-cap)`, '#e3bb59')}
    ${section(-209, 42, 'none', '#6c5527')}
    ${section(-210, 25, `url(#${id}-face)`, '#705822')}
    ${bolts(-210, 32, 8, 2.8)}
    ${section(-211, 14, `url(#${id}-cap)`, '#d1ad52')}
    <ellipse cx="-22" cy="-32" rx="80" ry="21" fill="url(#${id}-glint)"/>
    <ellipse cx="70" cy="-51" rx="24" ry="36" fill="url(#${id}-glint)"/>
    <g transform="translate(-25 4)">
      <rect x="-16" y="-7" width="32" height="14" rx="1.5" fill="#e0262b"/>
      <text y="3.2" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#fff">${safeLabel}</text>
      <circle cx="-13.5" cy="-4.5" r=".8" fill="#ffe5a1"/><circle cx="13.5" cy="4.5" r=".8" fill="#ffe5a1"/>
    </g>
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
  // R4 · obs. 01:09: avión reconocible — fuselaje con morro redondeado, ventanillas, alas en flecha, cola y dos motores. Morro hacia +x.
  const windows = Array.from({ length: 11 }, (_, i) => `<rect x="${118 + i * 14}" y="30" width="7" height="7" rx="2" fill="#243447"/>`).join('')
  return `
  <g id="${id}">
    <path d="M22 22 L60 8 L96 4 L116 40 L60 70 L22 60Z" fill="#cfd8e3"/>
    <path d="M22 60 L6 10 L20 8 L52 40Z" fill="#c2ccd8" stroke="#8fa0b4" stroke-width="1.5"/>
    <path d="M40 46 L60 44 L60 52 L44 56Z" fill="#8fa0b4"/>
    <path d="M110 44 L150 18 L170 18 L142 44 L200 44 L230 100 L210 100 L162 60 L120 56Z" fill="#dde4ec" stroke="#9aa9bb" stroke-width="1.2"/>
    <path d="M28 44 L120 20 L250 16 L300 22 L338 42 L300 62 L250 68 L120 66 L28 60 Q14 52 28 44Z" fill="#f2f5f8" stroke="#a9b6c5" stroke-width="1.5"/>
    <path d="M28 44 L120 20 L250 16 L300 22 L338 42 L120 42 Q40 44 28 44Z" fill="#ffffff" opacity=".7"/>
    <path d="M292 24 L316 30 L336 40 L300 46Z" fill="#2c3a4a"/>
    ${windows}
    <path d="M226 60 L256 96 L270 96 L246 60Z" fill="#c2ccd8" stroke="#8fa0b4" stroke-width="1.2"/>
    <rect x="186" y="58" width="44" height="18" rx="9" fill="#7f8fa3" stroke="#4d5b6c" stroke-width="1.5"/>
    <rect x="132" y="66" width="44" height="18" rx="9" fill="#7f8fa3" stroke="#4d5b6c" stroke-width="1.5"/>
    <path d="M120 40 L250 40 L250 46 L120 46Z" fill="${C.amber}" opacity=".9"/>
    <path d="M100 54 L124 40 L130 44 L108 58Z" fill="${C.amber}" opacity=".9"/>
  </g>`
}

/** R4 · obs. 01:28: repuestos reconocibles que salen de la caja (centrados en 0,0; radio ≈ 34). */
export function sparePart(id = 'sp', kind: 'seal' | 'bolt' | 'nut' | 'bearing' | 'gear' = 'gear') {
  const g = (inner: string) => `<g id="${id}">${inner}</g>`
  if (kind === 'seal') return g(`<circle r="34" fill="#c7cbd2" stroke="#8a8f98" stroke-width="3"/><circle r="27" fill="#2b2f36"/><circle r="20" fill="#1a1d22" stroke="#8a8f98" stroke-width="2"/><circle r="14" fill="none" stroke="#c0392b" stroke-width="4"/>`)
  if (kind === 'bolt') return g(`<g transform="rotate(-30)"><rect x="-12" y="-38" width="24" height="18" rx="2" fill="#9aa5b3" stroke="#5f6d7d" stroke-width="2"/><rect x="-7" y="-20" width="14" height="58" fill="#8a99ad" stroke="#5f6d7d" stroke-width="1.5"/>${Array.from({ length: 8 }, (_, i) => `<rect x="-7" y="${-14 + i * 7}" width="14" height="2.5" fill="#5f6d7d"/>`).join('')}</g>`)
  if (kind === 'nut') return g(`<path d="M0 -34 L29 -17 L29 17 L0 34 L-29 17 L-29 -17Z" fill="#b5bec9" stroke="#5f6d7d" stroke-width="3"/><circle r="15" fill="#2b2f36" stroke="#5f6d7d" stroke-width="2"/><circle r="10" fill="none" stroke="#8a8f98" stroke-width="2"/>`)
  if (kind === 'bearing') return g(`<circle r="34" fill="#d7dbe0" stroke="#5f6d7d" stroke-width="3"/><circle r="27" fill="#3a4049"/>${Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2; return `<circle cx="${Math.cos(a) * 21}" cy="${Math.sin(a) * 21}" r="5" fill="#eef1f4" stroke="#7d8896" stroke-width="1"/>` }).join('')}<circle r="14" fill="#d7dbe0" stroke="#5f6d7d" stroke-width="3"/><circle r="9" fill="#1a1d22"/>`)
  return g(`${Array.from({ length: 12 }, (_, i) => `<rect x="-5" y="-38" width="10" height="12" rx="1.5" fill="#8a99ad" stroke="#5f6d7d" stroke-width="1" transform="rotate(${i * 30})"/>`).join('')}<circle r="29" fill="#8a99ad" stroke="#5f6d7d" stroke-width="2"/><circle r="19" fill="#56657a"/><circle r="8" fill="#1d2229"/>`)
}

/** R4 · obs. 01:28: llave de torque (reemplaza la "estrella"). Origen en el cabezal; el mango se extiende hacia +x. */
export function torqueWrench(id = 'tw') {
  return `<g id="${id}">
    <circle r="30" fill="#b5bec9" stroke="#4d5b6c" stroke-width="4"/><circle r="14" fill="#2b2f36" stroke="#8a8f98" stroke-width="3"/>
    <rect x="22" y="-11" width="200" height="22" rx="6" fill="#9aa5b3" stroke="#4d5b6c" stroke-width="3"/>
    <rect x="150" y="-14" width="80" height="28" rx="8" fill="#e0262b" stroke="#8e1a1e" stroke-width="3"/>
    <rect x="96" y="-6" width="40" height="12" fill="#2b2f36"/>
  </g>`
}

/** R4 · obs. 02:03 (Imagen 4): transmisión CAT — cuerpo cilíndrico amarillo con tapas, brida frontal, bloque de válvulas y patas. Centrada en (0,0), ≈ 320 × 220. */
export function transmission(id = 'tx') {
  // Compact casting, with elliptical covers normal to the receding shaft axis.
  const bolt = (x: number, y: number, r = 2.2) => `<g transform="translate(${x} ${y})"><ellipse cy=".8" rx="${r + .6}" ry="${r + .4}" fill="#765522"/><path d="M${-r} 0 l${r / 2} ${-r * .85} h${r} l${r / 2} ${r * .85} -${r / 2} ${r * .85} h${-r}Z" fill="url(#${id}-bolt)" stroke="#8a682c" stroke-width=".45"/><path d="M${-r * .5} ${-r * .6} h${r}" stroke="#ffe4a0" stroke-width=".6"/></g>`
  const ring = (x: number, y: number, rx: number, ry: number, n: number, size = 2.2) => Array.from({ length: n }, (_, i) => {
    const a = (i + .5) * 2 * Math.PI / n
    return bolt(x + Math.cos(a) * rx, y + Math.sin(a) * ry, size)
  }).join('')
  return `<defs>
    <linearGradient id="${id}-y" x2=".12" y2="1"><stop stop-color="#b48a32"/><stop offset=".12" stop-color="#f7d477"/><stop offset=".3" stop-color="#ffdc65"/><stop offset=".48" stop-color="#efb72b"/><stop offset=".68" stop-color="#edbc3f"/><stop offset="1" stop-color="#926621"/></linearGradient>
    <linearGradient id="${id}-c" x1="0" y1=".8" x2="1" y2=".12"><stop stop-color="#896225"/><stop offset=".4" stop-color="#c39538"/><stop offset=".76" stop-color="#edcc79"/><stop offset="1" stop-color="#bd9545"/></linearGradient>
    <linearGradient id="${id}-bolt" x2=".4" y2="1"><stop stop-color="#fff0b6"/><stop offset=".45" stop-color="#d5b76b"/><stop offset="1" stop-color="#80632c"/></linearGradient>
    <radialGradient id="${id}-glint"><stop stop-color="#fff2b6" stop-opacity=".5"/><stop offset="1" stop-color="#fff0ae" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-shadow"><stop stop-color="#302614" stop-opacity=".3"/><stop offset="1" stop-color="#302614" stop-opacity="0"/></radialGradient>
  </defs><g id="${id}"><g transform="scale(.9 1)">
    <ellipse cx="4" cy="116" rx="153" ry="13" fill="url(#${id}-shadow)"/>
    <!-- Rear bell flange and the descending auxiliary gear housing. -->
    <path d="M49 -89 Q103 -94 126 -40 L131 10 112 42 66 42 33 -16Z" fill="url(#${id}-y)" stroke="#9e742a" stroke-width="1.2"/>
    <path d="M64 21 L127 7 123 91 94 116 45 96 32 47Z" fill="url(#${id}-y)" stroke="#986e25" stroke-width="1.2"/>
    <path d="M94 39 L127 24 123 91 94 116Z" fill="#b0832e"/>
    <path d="M40 44 L92 62 94 116 46 97Z" fill="url(#${id}-c)" stroke="#b08634"/>
    <path d="M96 46 l22 -10 -1 22 -21 10Z M98 78 l17 -8 -1 18 -16 10Z" fill="#44463e" stroke="#d4ad58" stroke-width="1.5"/>
    <path d="M45 90 l13 4 1 10 -13 -5Z M75 101 l12 4 1 8 -12 -4Z" fill="#e4b548"/>
    ${[48, 66, 85].map(x => bolt(x, 97 + (x - 48) * .36, 1.6)).join('')}
    <ellipse cx="62" cy="64" rx="23" ry="26" fill="#b38939" stroke="#f0cd75" stroke-width="2"/>
    <ellipse cx="58" cy="64" rx="19" ry="24" fill="url(#${id}-c)" stroke="#896329"/>
    <ellipse cx="57" cy="64" rx="11" ry="15" fill="#535248" stroke="#d8b35f" stroke-width="3"/>
    <ellipse cx="54" cy="64" rx="6" ry="10" fill="#302f29"/>
    ${ring(57, 64, 16, 21, 8, 1.6)}
    <ellipse cx="75" cy="-21" rx="51" ry="81" fill="url(#${id}-c)" stroke="#9e782f" stroke-width="1.5"/>
    <ellipse cx="70" cy="-22" rx="49" ry="78" fill="url(#${id}-y)" stroke="#f2d07d" stroke-width="1.3"/>
    ${ring(72, -22, 44, 72, 20)}
    <!-- Broad cylindrical wall; ribs follow its curved cross-section. -->
    <path d="M-68 -70 L57 -97 C100 -91 124 -3 75 49 L-55 76Z" fill="url(#${id}-y)" stroke="#ab7e2a" stroke-width="1.2"/>
    ${[36, 47, 58].map(x => `<path d="M${x} -93 C${x + 43} -69 ${x + 61} 4 ${x + 21} 53" fill="none" stroke="#b8892b" stroke-width="1.9"/><path d="M${x - 2} -92 C${x + 41} -68 ${x + 58} 4 ${x + 18} 53" fill="none" stroke="#f8d373" stroke-width="1.2"/>`).join('')}
    <path d="M-51 -52 L38 -72 M-43 58 L58 35" stroke="#ffe49a" stroke-width="2" opacity=".65"/>
    <path d="M-19 -52 L-7 -57 8 27 -3 35Z" fill="#e5ae34"/>
    <path d="M-18 -52 L-5 27" stroke="#f8d57c" stroke-width="2"/>
    <!-- Thick front flange with a closed service cover and small lower pump. -->
    <path d="M-83 -77 L-60 -81 C-7 -77 20 36 -39 77 L-61 82Z" fill="url(#${id}-y)" stroke="#98702a"/>
    <ellipse cx="-77" cy="1" rx="53" ry="79" fill="url(#${id}-c)" stroke="#906c2d" stroke-width="1.5"/>
    <ellipse cx="-79" cy="1" rx="47" ry="72" fill="url(#${id}-y)" stroke="#f1d182" stroke-width="1.5"/>
    <ellipse cx="-86" cy="-20" rx="36" ry="48" fill="url(#${id}-c)" stroke="#936b28" stroke-width="1.5"/>
    <path d="M-111 -48 C-92 -75 -61 -52 -53 -24" fill="none" stroke="#f6d992" stroke-width="1.5"/>
    ${ring(-79, 1, 47, 72, 16, 2.5)}
    ${ring(-86, -20, 33, 45, 10, 1.7)}
    <path d="M-120 -7 L-57 6 -55 11 -121 -2Z" fill="#a27b30"/>
    <path d="M-120 -8 L-57 5" stroke="#e8c273" stroke-width="1.3"/>
    <path d="M-129 -25 l13 -4 8 7 -1 21 -14 2 -8 -8Z M-124 22 l16 -2 9 14 -4 18 -15 1 -9 -11Z" fill="url(#${id}-c)" stroke="#936d2b"/>
    ${bolt(-122, -18)}${bolt(-121, 32)}
    <ellipse cx="-84" cy="45" rx="23" ry="28" fill="url(#${id}-y)" stroke="#99712c"/>
    <ellipse cx="-88" cy="46" rx="18" ry="24" fill="url(#${id}-c)" stroke="#f1d18a"/>
    ${ring(-88, 46, 15, 20, 8, 1.7)}
    <ellipse cx="-90" cy="46" rx="7" ry="10" fill="#9d782f" stroke="#daba70"/>
    <path d="M-53 36 l20 -6 12 9 -2 27 -20 8 -12 -10Z" fill="#606257" stroke="#bca35f"/>
    ${bolt(-47, 42, 1.5)}${bolt(-29, 60, 1.5)}
    <!-- Raised hydraulic valve chest, cap screws, plugs and rigid oil line. -->
    <path d="M-55 -77 V-106 L-9 -116 17 -106 V-65 L-29 -54 -55 -64Z" fill="url(#${id}-y)" stroke="#ad8131"/>
    <path d="M-55 -106 L-9 -116 17 -106 -29 -96Z" fill="#edc76e" stroke="#ae8332"/>
    <path d="M-29 -96 L17 -106 V-65 L-29 -54Z" fill="url(#${id}-y)"/>
    <path d="M-48 -98 v21 l12 4 v-23" fill="url(#${id}-c)" stroke="#9d742d"/>
    ${[-44, -23, -3, 10].map((x, i) => bolt(x, -105 + (i % 2 ? 2 : -3), 1.7)).join('')}
    <path d="M-7 -117 v-6 h15 v5 M-39 -109 v-8 h10" fill="none" stroke="#5b594b" stroke-width="2"/>
    <path d="M-122 29 C-140 14 -131 -20 -128 -33 Q-126 -39 -119 -36 L-109 -31" fill="none" stroke="#454b46" stroke-width="2.8"/>
    <path d="M-125 28 C-136 12 -128 -14 -126 -31" fill="none" stroke="#b6b39a" stroke-width=".8"/>
    <path d="M-128 -12 l10 2 M-129 9 l10 2" stroke="#d9ad51" stroke-width="4"/>
    <path d="M-106 -40 l13 -3 9 6 -1 11 -16 -1Z" fill="#686a58" stroke="#a9a074"/>
    <path d="M-103 -37 l16 4 M-102 -32 l16 4" stroke="#bbb38a" stroke-width="1.3"/>
    <path d="M-117 -20 Q-91 -10 -71 -18" fill="none" stroke="#353f37" stroke-width="3"/>
    <path d="M-115 -16 Q-89 -4 -73 -11" fill="none" stroke="#8c8b69" stroke-width="1.4"/>
    <path d="M-114 3 l24 5 v9 l-22 -5Z M-110 18 l23 5 v7 l-20 -5Z" fill="url(#${id}-y)" stroke="#ae8539"/>
    <path d="M-64 64 l8 -15 5 -3 M-47 71 l9 -7 M-118 51 l5 8" fill="none" stroke="#e6bf64" stroke-width="2.5"/>
    <path d="M-43 -88 l12 -3 v13 l-12 3Z" fill="#af8130" stroke="#e6c274"/>
    ${bolt(-39, -82, 2)}
    <path d="M-17 -105 v14 M-3 -108 v13 M11 -109 v13" stroke="#e0b760" stroke-width="2"/>
    <path d="M104 -76 v-14 q4 -10 9 0 v17" fill="none" stroke="#a68b48" stroke-width="3"/>
    <path d="M96 17 l23 -9 5 3 -1 7 -25 9Z" fill="#383f36" stroke="#9f9b70"/>
    <ellipse cx="73" cy="97" rx="9" ry="11" fill="url(#${id}-y)" stroke="#a27a2c"/>
    <ellipse cx="73" cy="97" rx="3" ry="5" fill="#686447"/>
    ${ring(73, 97, 7, 9, 6, 1)}
    <path d="M-92 -51 l11 -3 5 5 -2 9 -12 -1Z" fill="url(#${id}-y)" stroke="#8e6c2d"/>
    ${bolt(-86, -47, 2.2)}
    <path d="M-117 -27 l6 2 v9 l-6 -2Z M-79 -21 l6 -2 v10 l-6 1Z" fill="url(#${id}-bolt)"/>
    <path d="M-48 -92 l6 -2 v9 l-6 2Z M-47 -70 l7 -1 v9 l-7 1Z" fill="#e4ba60" stroke="#9b762e"/>
    ${bolt(-45, -88, 1.5)}${bolt(-44, -66, 1.5)}
    <path d="M-23 -110 l9 -2 4 3 -8 2Z" fill="#71694b"/>
    <path d="M-13 -91 l12 -3 v9 l-12 3Z" fill="#c59439" stroke="#eac778"/>
    ${bolt(-7, -88, 2)}
    <path d="M-40 37 l5 -1 7 5 -1 17 -6 3 -5 -4Z" fill="#707264"/>
    ${[43, 55].map(y => `<ellipse cx="-33" cy="${y}" rx="1.2" ry="1.7" fill="#353c35"/>`).join('')}
    <path d="M36 76 l9 3 2 16 -8 -3Z" fill="#d8a744" stroke="#a98033"/>
    <path d="M104 70 l10 -5 v5 l-10 5Z" fill="#e4c072"/>
    ${bolt(112, 31, 1.5)}${bolt(117, 87, 1.5)}
    <ellipse cx="7" cy="-36" rx="40" ry="23" fill="url(#${id}-glint)"/>
  </g></g>`
}

/** R4 · obs. 02:03 (Imagen 5): motor diésel CAT sobre bastidor negro — bloque, culatas, múltiples, turbo y cañerías. Centrado en (0,0), ≈ 420 × 220. */
export function engine(id = 'eng') {
  const bolt = (x: number, y: number, r = 1.7) => `<circle cx="${x}" cy="${y + .5}" r="${r + .5}" fill="#815d26"/><path d="M${x - r} ${y} l${r * .5} ${-r * .85} h${r} l${r * .5} ${r * .85} -${r * .5} ${r * .85} h${-r}Z" fill="url(#${id}-metal)"/>`
  const pipe = (d: string, w = 6, color = `url(#${id}-y)`) => `<path d="${d}" fill="none" stroke="#806027" stroke-width="${w + 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
  const turbo = (x: number) => `<g transform="translate(${x} -79)"><path d="M-16 4 V-15 Q-15 -23 -5 -23 H22 V-10 H9 V4Z" fill="url(#${id}-y)" stroke="#906a2c"/><ellipse rx="18" ry="16" fill="url(#${id}-y)" stroke="#9b742e"/><ellipse cx="-4" rx="11" ry="10" fill="#b79758" stroke="#f0d18a"/><ellipse cx="-5" rx="7" ry="6" fill="#42483f" stroke="#8b8c6f" stroke-width="2"/><path d="M-7 -5 l5 5 -5 5 M-11 0 h12" stroke="#7f8370" fill="none" stroke-width="1"/>${bolt(10, -6, 1.2)}${bolt(10, 8, 1.2)}</g>`
  return `<defs>
    <linearGradient id="${id}-y" x2=".12" y2="1"><stop stop-color="#b48a32"/><stop offset=".12" stop-color="#f7d477"/><stop offset=".3" stop-color="#ffdc65"/><stop offset=".48" stop-color="#efb72b"/><stop offset=".68" stop-color="#edbc3f"/><stop offset="1" stop-color="#926621"/></linearGradient>
    <linearGradient id="${id}-face" x1="0" y1=".8" x2="1" y2=".12"><stop stop-color="#896225"/><stop offset=".45" stop-color="#bf9137"/><stop offset=".8" stop-color="#edcc79"/><stop offset="1" stop-color="#bd9545"/></linearGradient>
    <linearGradient id="${id}-metal" x2=".3" y2="1"><stop stop-color="#f3df9d"/><stop offset=".5" stop-color="#b29e69"/><stop offset="1" stop-color="#655d40"/></linearGradient>
    <linearGradient id="${id}-steel" x2="0" y2="1"><stop stop-color="#65685c"/><stop offset=".3" stop-color="#393f39"/><stop offset="1" stop-color="#222823"/></linearGradient>
    <radialGradient id="${id}-shadow"><stop stop-color="#302614" stop-opacity=".32"/><stop offset="1" stop-color="#302614" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-glint"><stop stop-color="#fff2b6" stop-opacity=".4"/><stop offset="1" stop-color="#fff0ae" stop-opacity="0"/></radialGradient>
  </defs><g id="${id}">
    <ellipse cx="0" cy="117" rx="235" ry="13" fill="url(#${id}-shadow)"/>
    <!-- Skid has a visible top plane, crossmembers and fork pockets. -->
    <path d="M-214 90 L-191 77 H218 L203 94Z" fill="#666859" stroke="#363d35"/>
    ${[-177, -72, 58, 169].map(x => `<path d="M${x} 82 l17 -8 v31 l-17 11Z" fill="#353b34"/>`).join('')}
    <path d="M-215 94 H207 V108 H-215Z" fill="url(#${id}-steel)" stroke="#282e29"/>
    <path d="M-214 94 H207" stroke="#858473" stroke-width="2"/>
    <path d="M-184 101 h31 v12 h-31Z M144 101 h32 v12 h-32Z" fill="#222824" stroke="#585e51"/>
    <!-- Far cylinder bank and the flywheel bell, partially hidden by the near bank. -->
    <path d="M-171 -42 L-146 -68 H172 L199 -36 V46 L171 70 H-174Z" fill="url(#${id}-face)" stroke="#98712b"/>
    ${[-147, -96, -45, 6, 57, 108].map(x => `<path d="M${x} -64 v-19 l9 -7 h36 v24Z" fill="url(#${id}-y)" stroke="#a47c2f"/><path d="M${x + 3} -84 h38" stroke="#eed18a" stroke-width="2"/>`).join('')}
    <path d="M159 -44 L184 -50 C222 -34 224 39 196 62 L173 70Z" fill="url(#${id}-y)" stroke="#94702d"/>
    <ellipse cx="190" cy="8" rx="24" ry="52" fill="url(#${id}-face)" stroke="#e6c472" stroke-width="2"/>
    <ellipse cx="200" cy="9" rx="15" ry="43" fill="#4b5045" stroke="#9e833e" stroke-width="3"/>
    <ellipse cx="201" cy="9" rx="9" ry="30" fill="#292e28" stroke="#6c705e"/>
    <!-- Long crankcase and sloping oil sump. -->
    <path d="M-179 -13 L165 -13 179 3 V60 L153 76 H-153 L-180 53Z" fill="url(#${id}-y)" stroke="#936c27" stroke-width="1.3"/>
    <path d="M-154 56 H153 L136 86 H-124 L-150 75Z" fill="url(#${id}-face)" stroke="#a2792f"/>
    <path d="M-151 61 H146 M-129 80 H134" stroke="#f4cf72" stroke-width="1.5"/>
    <path d="M-175 47 H164" stroke="#85662b" stroke-width="2"/>
    ${[-154, -102, -50, 2, 54, 106].map(x => `<rect x="${x}" y="5" width="44" height="35" rx="5" fill="url(#${id}-face)" stroke="#a77b2d"/><path d="M${x + 4} 9 h34" stroke="#eecd79"/>${bolt(x + 5, 12, 1.2)}${bolt(x + 38, 34, 1.2)}`).join('')}
    ${Array.from({ length: 15 }, (_, i) => bolt(-165 + i * 23, 51, 1.3)).join('')}
    <!-- Individual heads, raised valve covers and injection equipment. -->
    ${[-156, -105, -54, -3, 48, 99].map((x, i) => `<g>
      <path d="M${x} -20 V-61 L${x + 8} -72 H${x + 44} V-21Z" fill="url(#${id}-y)" stroke="#9f7429"/>
      <path d="M${x - 2} -62 l9 -12 h36 l4 5 -8 12Z" fill="#edc773" stroke="#ae8537"/>
      <path d="M${x - 2} -62 l41 5 v12 l-41 -3Z" fill="url(#${id}-face)" stroke="#a2782e"/>
      <path d="M${x + 7} -68 h26 M${x + 4} -57 l27 2" stroke="#f9df99" stroke-width="1.3"/>
      ${bolt(x + 4, -61, 1.4)}${bolt(x + 35, -58, 1.4)}
      <rect x="${x + 8}" y="-43" width="14" height="17" rx="2" fill="url(#${id}-face)" stroke="#9b7129"/>
      <path d="M${x + 25} -45 v18 l9 7" fill="none" stroke="#f2cd72" stroke-width="4"/>
      ${pipe(`M${x + 10} 6 V-13 Q${x + 10} -19 ${x + 18} -19 V-43`, 1.5, '#d6bd7c')}
      <path d="M${x + 6} -44 v-7 h6 v8" stroke="#645d3c" stroke-width="1.4" fill="none"/>
      ${i % 2 === 0 ? `<path d="M${x + 29} -72 v-9 q0 -5 5 -5 h3 v13" fill="none" stroke="#887239" stroke-width="3"/>` : ''}
    </g>`).join('')}
    <!-- Cast exhaust runners merge into the long warm yellow manifold. -->
    ${[-136, -85, -34, 17, 68, 119].map(x => pipe(`M${x} -38 V-27 Q${x} -20 ${x + 9} -20 H${x + 18}`, 8)).join('')}
    ${pipe('M-154 -13 H145 Q158 -13 158 -28 V-55', 11)}
    <path d="M-149 -16 H144" stroke="#fbe19b" stroke-width="1.5"/>
    ${[-111, -60, -9, 42, 93].map(x => `<path d="M${x} -20 v14 m4 -14 v14" stroke="#ab8236" stroke-width="1.6"/>`).join('')}
    ${turbo(-99)}${turbo(99)}
    ${pipe('M-83 -80 H-59 Q-48 -80 -48 -69 V-57 M113 -82 H136 Q148 -82 148 -69 V-56', 8)}
    <!-- Upper balance line and individual injector fittings. -->
    ${pipe('M-160 -75 V-87 H-133 M-70 -79 V-91 H65 V-82 M125 -98 H162 V-71', 3)}
    ${[-146, -121, -70, -45, 32, 57, 108, 135].map((x, i) => `<path d="M${x} -73 v${i % 2 ? -12 : -7}" stroke="#7e7249" stroke-width="2"/><ellipse cx="${x}" cy="${i % 2 ? -85 : -80}" rx="3" ry="1.7" fill="url(#${id}-metal)"/>`).join('')}
    ${[-142, -91, -40, 11, 62, 113].map(x => `<g>
      <rect x="${x}" y="-44" width="7" height="13" rx="1" fill="url(#${id}-metal)" stroke="#897443" stroke-width=".6"/>
      <path d="M${x - 1} -41 h9 M${x - 1} -34 h9" stroke="#655f42" stroke-width="1.2"/>
      ${pipe(`M${x + 3} -32 V-5 Q${x + 3} 3 ${x + 11} 3 H${x + 18} V15`, 1.7, '#e4ca83')}
      ${pipe(`M${x + 18} -51 H${x + 27} V-29`, 1.3, '#777355')}
      <path d="M${x + 3} -26 h5 M${x + 3} -8 h5" stroke="#504f38" stroke-width="2"/>
    </g>`).join('')}
    <!-- Water rail, fuel lines and front accessory drive. -->
    ${pipe('M-174 29 H144 Q157 29 157 17', 7)}
    ${[-145, -78, -11, 56, 123].map(x => `<path d="M${x} 24 v10" stroke="#896b32" stroke-width="3"/>${bolt(x, 28, 1.3)}`).join('')}
    <path d="M-163 15 H142 M-148 19 H117" stroke="#b39955" stroke-width="1.5" fill="none"/>
    <path d="M-168 -51 L-178 -53 Q-198 -50 -194 -20 L-186 27 Q-182 36 -177 38 M173 -62 Q195 -58 187 -24 L179 13" fill="none" stroke="#393f36" stroke-width="7"/>
    <path d="M-178 -54 Q-197 -50 -193 -22 M174 -63 Q192 -57 188 -34" fill="none" stroke="#7a806b" stroke-width="1.5"/>
    <path d="M-193 -24 l8 -2 M184 -26 l8 2" stroke="#b6ac82" stroke-width="4"/>
    <path d="M-204 1 l23 -7 13 8 v43 l-12 10 -26 -4Z" fill="url(#${id}-y)" stroke="#9a7029"/>
    <ellipse cx="-197" cy="26" rx="13" ry="20" fill="url(#${id}-face)" stroke="#e5c374"/>
    <ellipse cx="-199" cy="26" rx="6" ry="11" fill="#6f6037" stroke="#bea25b"/>
    ${[-29, -11].map(x => `<rect x="${x}" y="34" width="13" height="26" rx="4" fill="url(#${id}-y)" stroke="#a58036"/><path d="M${x + 1} 38 h11" stroke="#f2d081"/>`).join('')}
    ${pipe('M-172 3 V-28 H-165 V-48', 4)}
    <path d="M-158 74 l-7 16 h-22 v-8 l13 -17 M144 73 l15 17 h26 v-8 l-18 -16" fill="url(#${id}-y)" stroke="#9b782f"/>
    <rect x="-134" y="78" width="16" height="23" fill="url(#${id}-steel)"/><rect x="121" y="78" width="16" height="23" fill="url(#${id}-steel)"/>
    <!-- Service pumps, braided hoses, clamps and lower return plumbing. -->
    ${[-118, 57].map(x => `<path d="M${x - 3} -34 h7 v12 h-7Z" fill="url(#${id}-metal)" stroke="#796c40" stroke-width=".6"/><path d="M${x - 4} -30 h9 M${x - 4} -25 h9" stroke="#676343" stroke-width="1.4"/>`).join('')}
    ${[-86, 80].map(x => `<rect x="${x - 4}" y="15" width="9" height="9" rx="1" fill="url(#${id}-metal)" stroke="#7c6b3b"/>${bolt(x, 19, 1.6)}`).join('')}
    ${Array.from({ length: 12 }, (_, i) => { const a = (i + .5) * Math.PI / 6; return bolt(190 + Math.cos(a) * 21, 8 + Math.sin(a) * 48, 1.5) }).join('')}
    ${[-154, -103, -52, -1, 50, 101].map(x => `<path d="M${x + 1} -45 h7 M${x + 1} -41 h7 M${x + 1} -37 h7" stroke="#967530" stroke-width="1"/>${bolt(x + 33, -31, 1.5)}${bolt(x + 33, -23, 1.5)}<path d="M${x + 38} -12 v8" stroke="#e1c384" stroke-width="3"/>`).join('')}
    <path d="M-197 -4 V-26 h10 v18 M-175 -57 v-9 h11 v14" fill="url(#${id}-y)" stroke="#937030"/>
    ${bolt(-170, -62, 2)}
    <path d="M-207 10 l8 -2 M-210 22 l8 -1 M-208 35 l7 2" stroke="#f2ce77" stroke-width="2.2"/>
    ${[-15, 0, 15, 30, 45].map(a => bolt(-197 + Math.cos(a * Math.PI / 45) * 10, 26 + Math.sin(a * Math.PI / 45) * 16, 1.2)).join('')}
    <path d="M-191 -6 Q-181 -13 -170 -5 L-159 5 M153 -45 Q174 -46 176 -28" fill="none" stroke="#b1a16c" stroke-width="2"/>
    <path d="M-134 -49 v5 M-84 -49 v5 M-33 -49 v5 M18 -49 v5 M69 -49 v5 M120 -49 v5" stroke="#655f42" stroke-width="3"/>
    <path d="M-72 -67 v11 M-65 -67 v11 M126 -66 v10 M133 -66 v10" stroke="#b0924c" stroke-width="2"/>
    <rect x="-49" y="-56" width="11" height="12" rx="2" fill="url(#${id}-face)" stroke="#8c6d2b"/>
    ${bolt(-43, -50, 2)}
    ${pipe('M-170 57 H-84 Q-75 57 -75 65 H70 Q85 65 85 51 H166 V36', 4)}
    ${pipe('M-161 43 H-120 Q-111 43 -111 32 V-3', 3)}
    <path d="M-119 -23 Q-131 -7 -113 9 L-86 18 M57 -33 Q40 -11 63 7 L80 21 M-52 33 Q-66 56 -44 63 H-19" fill="none" stroke="#44493b" stroke-width="2.6"/>
    <path d="M-118 -23 Q-128 -7 -112 7 M57 -32 Q43 -11 64 6" fill="none" stroke="#9a9876" stroke-width=".7"/>
    ${[-163, -72, 80, 157].map(x => `<rect x="${x}" y="39" width="11" height="13" rx="2" fill="url(#${id}-face)" stroke="#937332"/>${bolt(x + 5, 45, 1.6)}`).join('')}
    <path d="M-172 -16 l18 -1 v28 l-18 1Z" fill="url(#${id}-face)" stroke="#8d6e2f"/>
    ${[-11, -3, 5].map(y => `<path d="M-170 ${y} h12" stroke="#e4c175" stroke-width="1.4"/>`).join('')}
    <ellipse cx="-164" cy="20" rx="10" ry="8" fill="url(#${id}-metal)" stroke="#947b3f"/>
    ${bolt(-164, 20, 3)}
    <path d="M-137 82 h21 v5 h-21 M118 82 h21 v5 h-21" fill="#b69b55"/>
    <path d="M-130 85 v13 M128 85 v13" stroke="#818675" stroke-width="2"/>
    <rect x="21" y="2" width="35" height="18" rx="1" fill="#292e28" stroke="#c5a150"/>
    <text x="25" y="14" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#f6f4dd">CAT</text><path d="M34 17 l5 -6 5 6Z" fill="#efbe35"/>
    <ellipse cx="-22" cy="-2" rx="128" ry="10" fill="url(#${id}-glint)"/>
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

/** Tracto rojo con cama baja (Imagen 4). Mide ~900 px de largo; la carga se apoya en la cama rebajada (x=270…550, y=230). */
export function lowboyTruck(id = 'lowboy', cargo = false) {
  return `${equipmentPaint(id)}<defs>
    <linearGradient id="${id}-red" x2="0" y2="1"><stop stop-color="#ef4145"/><stop offset=".5" stop-color="#cb2029"/><stop offset="1" stop-color="#921b23"/></linearGradient>
    <linearGradient id="${id}-yel" x2="0" y2="1"><stop stop-color="#ffdb50"/><stop offset="1" stop-color="#c99d05"/></linearGradient>
  </defs><g id="${id}">
    <ellipse cx="450" cy="300" rx="480" ry="12" fill="#000" opacity=".28"/>
    <path d="M598 236 H918 V259 H598Z" fill="#303a42"/>
    <g id="${id}-bed">
      <path d="M0 195 H236 L270 230 H550 L595 190 H733 V214 H610 L573 260 H0Z" fill="url(#${id}-yel)" stroke="#99770b" stroke-width="2"/>
      <path d="M0 195 H236 L270 230 H550 L595 190 H733" fill="none" stroke="#ffe694" stroke-width="5"/>
      <path d="M268 230 H551 V237 H271Z" fill="#645640"/>
      ${[18, 58, 98, 138, 178, 218, 290, 340, 390, 440, 490, 539].map(x => `<path d="M${x} ${x < 240 ? 206 : 242} l19 0 -9 11Z" fill="#96730c"/><rect x="${x}" y="253" width="17" height="3" fill="#faf0cf"/>`).join('')}
      <path d="M6 194 L25 167 H53 L64 194 M74 194 L93 167 H121 L132 194" fill="#a4800e" stroke="#dfb627" stroke-width="3"/>
      <path d="M597 205 L621 216 M637 204 L661 216 M677 204 L701 216" stroke="#9e7b09" stroke-width="5"/>
    </g>
    ${cargo ? `<g id="${id}-cargo">
      ${[[278, 80, 110], [365, 82, 115], [454, 85, 120]].map(([x, w, h], i) => `<g transform="translate(${x} ${230 - h})">${crate(`${id}-cr${i}`, w, h, `<tspan font-size="${w * .065}">${['EE.UU.', 'EUROPA', 'ASIA'][i]}</tspan>`)}</g>`).join('')}
      <path d="M316 121 V230 M405 116 V230 M495 111 V230" fill="none" stroke="#343b40" stroke-width="7"/>
      <path d="M312 211 h8 M401 211 h8 M491 211 h8" stroke="#b1b9bc" stroke-width="8"/>
    </g>` : ''}
    ${[100, 160, 220].map((x, i) => equipmentWheel(x, 270, 28, `${id}-w${i}`, '#a4adb1')).join('')}
    <rect x="727" y="203" width="71" height="48" rx="8" fill="url(#${id}-metal)" stroke="#333d43" stroke-width="3"/>
    <path d="M740 204 V250 M784 204 V250" stroke="#c7cccd" stroke-width="4"/>
    <path d="M703 197 C682 173 698 152 717 178 M693 199 C672 175 688 154 708 180" fill="none" stroke="#303b42" stroke-width="4"/>
    <g id="${id}-cab">
      <!-- Tracto cab-over rojo de la foto; el rojo PTT se reserva a su placa. -->
      <path d="M781 244 V66 Q781 39 803 35 H886 Q911 35 916 65 L924 112 V242 H912 Q882 207 852 244Z" fill="url(#${id}-red)" stroke="#7f2028" stroke-width="2"/>
      <path d="M789 69 L798 41 Q850 29 900 45 L912 70Z" fill="#da3039"/>
      <path d="M799 71 H911 L917 88 H799Z" fill="#272f35"/>
      <path d="M824 90 H887 L895 146 H824Z" fill="url(#${id}-glass)" stroke="#1e282f" stroke-width="5"/>
      <path d="M889 91 H914 L920 143 H896Z" fill="url(#${id}-glass)" stroke="#1e282f" stroke-width="4"/>
      <path d="M829 126 L860 94" stroke="#93b2bb" stroke-width="3" opacity=".55"/>
      <path d="M817 87 V209 H842 M897 152 V210 M807 64 H901" stroke="#93252e" stroke-width="2" fill="none"/>
      <rect x="828" y="157" width="19" height="5" rx="2" fill="#282f35"/>
      <path d="M898 104 h30 v47" stroke="#28333b" stroke-width="4" fill="none"/><rect x="921" y="117" width="12" height="28" rx="4" fill="#202a31"/>
      <path d="M889 174 H923 V217 H897Z" fill="#222c33"/>
      ${[181, 189, 197, 205].map(y => `<path d="M898 ${y} H921" stroke="#75828a" stroke-width="3"/>`).join('')}
      <rect x="905" y="219" width="19" height="11" rx="2" fill="#fff0ca"/>
      <path d="M807 249 H836 M807 236 H837 M807 224 H839" stroke="#a0abb2" stroke-width="5"/>
      <path d="M841 251 Q850 220 881 220 Q911 220 920 251" fill="none" stroke="#30383f" stroke-width="12"/>
      <rect x="843" y="174" width="43" height="22" rx="2" fill="#e0262b" stroke="#f5d8d9"/><text x="864" y="190" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#fff">PTT</text>
      <path d="M807 207 H843 M888 207 H898" stroke="#f6dfda" stroke-width="4"/>
      <rect x="817" y="25" width="10" height="9" rx="3" fill="#f5a623"/>
      <path d="M771 196 V76 h-8" stroke="#515e65" stroke-width="9" fill="none"/>
      <path d="M771 189 V82" stroke="#bdc8cc" stroke-width="4"/>
      <path d="M794 102 h-17 v44" stroke="#28333b" stroke-width="4" fill="none"/><rect x="773" y="112" width="10" height="26" rx="3" fill="#263139"/>
      <path d="M899 212 L919 176 M898 175 L921 211" stroke="#78858b" stroke-width="1.5"/>
      <path d="M819 28 h59 l10 5 h-69Z" fill="#b9c3c6"/><path d="M811 30 V13" stroke="#46545b" stroke-width="2"/>
      <path d="M797 109 V194 H805" stroke="#9fadb4" stroke-width="6" fill="none"/>
    </g>
    ${equipmentWheel(642, 270, 34, `${id}-tractor-dual`, '#a4adb1')}
    <path d="M609 248 Q618 216 642 216 Q671 216 678 248" fill="none" stroke="#657079" stroke-width="9"/>
    <path d="M677 248 Q686 216 714 216 Q741 216 750 248" fill="none" stroke="#657079" stroke-width="9"/>
    ${equipmentWheel(710, 270, 34, `${id}-w3`, '#a4adb1')}${equipmentWheel(880, 270, 34, `${id}-w4`, '#a4adb1')}
    <g fill="#242b30" stroke="#485258" stroke-width="2">
      <rect x="647" y="176" width="57" height="14" rx="6"/><ellipse cx="675" cy="176" rx="27" ry="5"/><ellipse cx="675" cy="176" rx="11" ry="2" fill="#151b20"/>
      <rect x="650" y="158" width="54" height="14" rx="6"/><ellipse cx="677" cy="158" rx="26" ry="5"/><ellipse cx="677" cy="158" rx="11" ry="2" fill="#151b20"/>
    </g>
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
/** Letrero de estación (R4 · Taller): código, tipo de estación, mecánico y componente. `x` opcional para reubicarlo. */
export interface StationSign { code: string; mech: string; part: string; x?: number }
export const STATIONS_DESARME: StationSign[] = [
  { code: 'D1', mech: 'Cristián Araya', part: 'Mando final' },
  { code: 'D2', mech: 'Rodrigo Muñoz', part: 'Transmisión' },
  { code: 'D3', mech: 'Felipe Contreras', part: 'Motor' },
]
export const STATIONS_ARMADO: StationSign[] = [
  { code: 'A1', mech: 'Cristián Araya', part: 'Mando final' },
  { code: 'A2', mech: 'Rodrigo Muñoz', part: 'Transmisión' },
  { code: 'A3', mech: 'Felipe Contreras', part: 'Motor' },
]
export function pttWorkshop(id = 'ws', stations: StationSign[] = STATIONS_DESARME, kind: 'DESARME' | 'ARMADO' = 'DESARME') {
  const ribs = Array.from({ length: 48 }, (_, i) => `<rect x="${i * 40}" y="0" width="20" height="600" fill="#ffffff" opacity=".035"/>`).join('')
  const trusses = [200, 700, 1200, 1700].map((x) => `<path d="M${x - 250} 130 L${x} 40 L${x + 250} 130 M${x - 250} 130 L${x + 250} 130 M${x - 125} 85 L${x - 125} 130 M${x + 125} 85 L${x + 125} 130 M${x} 40 L${x} 130" stroke="#b9bec6" stroke-width="5" fill="none" opacity=".7"/>`).join('')
  const signs = stations.map((st, i) => { const x = st.x ?? 380 + i * 560; return `<g><rect x="${x - 140}" y="236" width="280" height="104" rx="4" fill="#f4f4f2" stroke="#c9ccd1" stroke-width="2"/><rect x="${x - 140}" y="236" width="8" height="104" fill="#e0262b"/><text x="${x - 118}" y="272" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="34" fill="#111">${st.code}</text><text x="${x - 70}" y="269" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="16" fill="#555" letter-spacing="1.5">ESTACIÓN DE ${kind}</text><text x="${x - 118}" y="298" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="19" fill="#222">Mecánico: ${st.mech}</text><text x="${x - 118}" y="324" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="17" fill="#e0262b" letter-spacing="1">Repara: ${st.part}</text></g>` }).join('')
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
  return `${equipmentPaint(id)}<g id="${id}"><g transform="translate(520 0) scale(-1 1)">
    <ellipse cx="260" cy="23" rx="270" ry="9" fill="#000" opacity=".28"/>
    <!-- Frente a la izquierda, tándem motor a la derecha y articulación bajo la cabina. -->
    <path d="M48 -30 L63 -67 L119 -93 L284 -68 L327 -51 H490 V-27 H323 L274 -53 L108 -74 L77 -27Z" fill="url(#${id}-paint)" stroke="#9a7809" stroke-width="2"/>
    <path d="M89 -73 L270 -46" stroke="#ffe991" stroke-width="3"/>
    <path d="M185 -63 L215 -24 M244 -56 L231 -24" stroke="#343d44" stroke-width="6"/>
    <path d="M188 -61 L204 -38 M244 -56 L237 -40" stroke="#a7b3bb" stroke-width="3"/>
    <ellipse cx="218" cy="-25" rx="48" ry="8" fill="#887014" stroke="#ffda48" stroke-width="4"/>
    <path d="M150 -25 Q218 -24 272 -50 L278 -19 Q211 16 145 20Z" fill="url(#${id}-paint)" stroke="#9a7809" stroke-width="2"/>
    <path d="M145 20 Q211 16 278 -19" fill="none" stroke="#9ca5ac" stroke-width="5"/>
    <path d="M300 -59 L305 -139 H375 L391 -59Z" fill="url(#${id}-paint)"/>
    <path d="M314 -131 H365 L377 -82 H310Z" fill="url(#${id}-glass)" stroke="#222c33" stroke-width="5"/>
    <path d="M342 -132 V-68 M309 -111 L332 -129" stroke="#7f9da6" stroke-width="2"/>
    <path d="M300 -142 H378" stroke="#ffcd11" stroke-width="9"/>
    <rect x="311" y="-154" width="8" height="8" rx="2" fill="#f5a623"/>
    <path d="M387 -112 H477 L502 -95 V-51 H388Z" fill="url(#${id}-paint)" stroke="#987609" stroke-width="2"/>
    <path d="M390 -112 H475 L484 -103 H390Z" fill="#2d3439"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${416 + i * 7} -96 v26" stroke="#8b700e" stroke-width="3"/>`).join('')}
    <path d="M456 -112 V-142 h-6" fill="none" stroke="#363e44" stroke-width="6"/>
    <path d="M295 -53 H391 M306 -65 v-35 M391 -65 v-38 M294 -92 h12" fill="none" stroke="#333d42" stroke-width="3"/>
    <path d="M326 -62 v35 M345 -62 v35 M326 -52 h19 M326 -41 h19 M326 -30 h19" fill="none" stroke="#a5afb5" stroke-width="3"/>
    <path d="M378 -33 H489" stroke="#3d454b" stroke-width="15"/>
    <path d="M499 -62 l17 8 -1 37 M507 -33 l12 0 -4 23" fill="none" stroke="#c99d05" stroke-width="8"/>
    ${[60, 400, 470].map((x, i) => equipmentWheel(x, -10, 34, `${id}-wheel${i}`)).join('')}
    <path d="M39 -43 L75 -39" stroke="#ffcd11" stroke-width="8"/>
    <path d="M291 -64 V-119 H302 M379 -70 V-125 H396 V-64 M380 -98 H396" fill="none" stroke="#303a3f" stroke-width="2"/>
    <path d="M165 -56 V-98 M179 -53 V-93" stroke="#303b40" stroke-width="7"/>
    <path d="M165 -96 V-67 M179 -92 V-63" stroke="#aebabe" stroke-width="3"/>
    <path d="M498 -42 L513 -23 M505 -40 L520 -21 M510 -35 L525 -16" stroke="#c99d05" stroke-width="4"/>
    <path d="M389 -61 H481 M398 -106 H476" stroke="#ffe384" stroke-width="2"/>
    <rect x="395" y="-99" width="17" height="11" fill="#252d32"/>
  </g></g>`
}

/** Bulldozer (Imagen 5). Ancho ~480, base en y=0. */
export function bulldozer(id = 'bz') {
  return `${equipmentPaint(id)}<g id="${id}">
    <ellipse cx="240" cy="4" rx="250" ry="10" fill="#000" opacity=".28"/>
    <!-- La referencia es un tractor topador sobre neumáticos. -->
    <path d="M114 -86 H397 V-40 H120Z" fill="#2a3035"/>
    <path d="M120 -137 H224 V-88 H117Z" fill="url(#${id}-paint)" stroke="#9a7809" stroke-width="2"/>
    <rect x="119" y="-128" width="28" height="44" fill="#293237"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M121 ${-122 + i * 5} h23" stroke="#606b72" stroke-width="2"/>`).join('')}
    <path d="M205 -118 L213 -186 H278 L288 -118Z" fill="#273138"/>
    <path d="M220 -176 H270 L278 -128 H216Z" fill="url(#${id}-glass)" stroke="#abb0a0" stroke-width="3"/>
    <path d="M247 -177 V-125 M218 -153 L243 -175" stroke="#89a4aa" stroke-width="2"/>
    <path d="M204 -188 H282" stroke="#30393e" stroke-width="8"/>
    <path d="M215 -190 v-12 M274 -188 v-9" stroke="#737b7d" stroke-width="2"/>
    <path d="M202 -155 h-13 v23 M281 -154 h12 v22" stroke="#303b40" stroke-width="3" fill="none"/>
    <rect x="185" y="-155" width="8" height="14" rx="2" fill="#29353b"/>
    <path d="M286 -140 H390 L412 -124 V-85 H283Z" fill="url(#${id}-paint)"/>
    <path d="M301 -139 v-33 h8 M327 -140 v-26 h8" stroke="#353e44" stroke-width="6" fill="none"/>
    ${Array.from({length: 12}, (_, i) => `<path d="M${326+i*5} -129 v31" stroke="#9b7b15" stroke-width="1.5"/>`).join('')}
    <path d="M293 -140 v-19 h93 v36 M320 -159 v19 M353 -159 v19" fill="none" stroke="#3d464b" stroke-width="2.5"/>
    <path d="M132 -89 Q177 -137 222 -88 M307 -89 Q351 -139 396 -87" stroke="#ffcd11" stroke-width="12" fill="none"/>
    ${equipmentWheel(175, -48, 49, `${id}-wheel0`)}${equipmentWheel(351, -48, 49, `${id}-wheel1`)}
    <path d="M252 -111 V-22 M269 -111 V-22 M252 -94 h17 M252 -76 h17 M252 -58 h17 M252 -40 h17 M252 -24 h17" stroke="#8b979d" stroke-width="3" fill="none"/>
    <path d="M285 -42 L108 -27 L68 -44" fill="none" stroke="#c99d05" stroke-width="12"/>
    <path d="M161 -120 L86 -65" stroke="#333d44" stroke-width="11"/><path d="M126 -95 L86 -65" stroke="#b7c2c8" stroke-width="6"/>
    <path d="M99 -142 L72 -73" stroke="#343d43" stroke-width="9"/><path d="M88 -112 L72 -73" stroke="#bec9cd" stroke-width="4"/>
    <path d="M11 -107 Q57 -126 137 -100 L140 -10 Q62 5 0 -10 L9 -29Z" fill="url(#${id}-paint)" stroke="#aa830b" stroke-width="2"/>
    <path d="M12 -106 L0 -23 L-2 -3 M137 -100 L140 -10" stroke="#a48217" stroke-width="3" fill="none"/>
    ${[20, 43, 66, 89, 112].map(x => `<circle cx="${x}" cy="-7" r="1.7" fill="#434a4c"/>`).join('')}
    <path d="M13 -98 Q64 -111 128 -94 L131 -20 Q61 -8 7 -19" fill="none" stroke="#ffe783" stroke-width="3"/>
    <path d="M0 -10 Q66 5 140 -10 L145 -3 Q66 14 -2 -3Z" fill="url(#${id}-metal)"/>
    <path d="M408 -106 L461 -12 M424 -104 L477 -12 M411 -93 h19 M420 -76 h19 M430 -59 h19 M440 -42 h19 M450 -25 h19" fill="none" stroke="#69767c" stroke-width="3"/>
    <rect x="290" y="-120" width="28" height="16" rx="2" fill="#e0262b"/><text x="304" y="-109" fill="#fff" font-family="Arial" font-size="10" text-anchor="middle" font-weight="700">PTT</text>
  </g>`
}

/** Perforadora de tiro (Imagen 6). Ancho ~300, alto ~460, base en y=0. */
export function drillRig(id = 'dr') {
  return `${equipmentPaint(id)}<g id="${id}">
    <ellipse cx="150" cy="4" rx="165" ry="10" fill="#000" opacity=".28"/>
    ${equipmentTrack(43, -49, 218, 38)}
    ${equipmentTrack(20, -35, 215, 32)}
    <path d="M26 -77 H281 V-57 H26Z" fill="#c99d05"/>
    <path d="M135 -129 H263 V-78 H133Z" fill="url(#${id}-paint)" stroke="#9a7809" stroke-width="2"/>
    <path d="M150 -137 H252 V-129 H150Z" fill="#e4bc24"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${191 + i * 6} -117 v25" stroke="#97770d" stroke-width="2"/>`).join('')}
    <rect x="153" y="-119" width="29" height="26" fill="#ffd842" stroke="#ab890f" stroke-width="2"/>
    <path d="M247 -137 v-25 h8" fill="none" stroke="#353d42" stroke-width="6"/>
    <g transform="translate(0 1) matrix(1 0 0 .60 0 -31)"><path d="M58 -148 H130 V-79 H52Z" fill="url(#${id}-paint)"/>
    <path d="M63 -141 H119 V-102 H60Z" fill="url(#${id}-glass)" stroke="#303b42" stroke-width="4"/>
    <path d="M91 -141 V-99 M62 -118 L81 -139" stroke="#87a3aa" stroke-width="2"/>
    </g>
    <!-- Mástil calado, carro de avance y barra hasta el suelo. -->
    <path d="M62 -77 V-461 L72 -470 H99 L108 -458 V-77" fill="none" stroke="#333c41" stroke-width="9"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M66 ${-455 + i * 30} L104 ${-425 + i * 30} M104 ${-455 + i * 30} L66 ${-425 + i * 30}" stroke="#626d70" stroke-width="3"/>`).join('')}
    <path d="M73 -455 V-79 M101 -455 V-79" stroke="#a4aa9f" stroke-width="3"/>
    <path d="M87 -452 V-8" stroke="#c7ccbf" stroke-width="5"/>
    <path d="M81 -450 V-164" stroke="#ffcd11" stroke-width="5"/>
    <rect x="71" y="-443" width="37" height="34" rx="3" fill="#ffcd11" stroke="#977510" stroke-width="2"/>
    <rect x="83" y="-410" width="16" height="17" fill="#c99d05"/>
    <path d="M102 -422 C115 -435 117 -360 113 -310 L113 -164" fill="none" stroke="#1e292f" stroke-width="5"/>
    <path d="M105 -225 L229 -135 M105 -205 L200 -134" stroke="#d3aa0e" stroke-width="4"/>
    <path d="M105 -175 L167 -133" stroke="#afbbc0" stroke-width="4"/>
    <rect x="56" y="-470" width="56" height="9" fill="#3a4245"/>
    <path d="M62 -304 H108 M61 -160 H109" stroke="#ffcd11" stroke-width="6"/>
    <path d="M26 -77 V-105 H53 M26 -92 H53 M141 -78 V-96 H278 V-78 M168 -96 V-78 M251 -96 V-78" fill="none" stroke="#3d494f" stroke-width="2.5"/>
    <path d="M264 -74 V-23 M19 -69 V-19" stroke="#c99d05" stroke-width="11"/>
    <path d="M254 -20 h22 M9 -17 h21" stroke="#454e50" stroke-width="5"/>
    <path d="M30 -74 V-4 M276 -72 V-4" stroke="#9ca6aa" stroke-width="7"/><path d="M20 -3 H43 M266 -3 H287" stroke="#343d42" stroke-width="6"/>
    <path d="M70 -391 V-211 M76 -391 V-211" stroke="#202a2f" stroke-width="2"/>
    <path d="M155 -130 V-87 H184 V-130 M159 -102 h6" stroke="#b18a0b" stroke-width="1.5" fill="none"/>
    <path d="M265 -122 h14 v34 M265 -112 h14 M265 -102 h14 M265 -92 h14" stroke="#596568" stroke-width="2" fill="none"/>
    <rect x="148" y="-85" width="26" height="5" fill="#faf0d4"/>
  </g>`
}

/** Camión de extracción Komatsu (Imagen 7): cabina cuadrada a la izquierda sobre la plataforma, tolva. Ancho ~560, base y=0. */
export function komatsuTruck(id = 'km') {
  return `${equipmentPaint(id)}<g id="${id}">
    <ellipse cx="280" cy="22" rx="292" ry="10" fill="#000" opacity=".28"/>
    ${equipmentWheel(428, -38, 62, `${id}-wheel-inner`)}
    <path d="M155 -125 H510 L497 -72 H166Z" fill="#ad870e"/>
    <path d="M60 -79 H514 V-43 H60Z" fill="#2c343a"/>
    <path d="M203 -59 L274 -146" stroke="#aab4b9" stroke-width="8"/><path d="M203 -59 L245 -111" stroke="#b48a08" stroke-width="16"/>
    <path d="M-8 -232 L166 -250 L499 -215 L538 -209 L560 -153 L525 -101 H193 L132 -220 L-8 -221Z" fill="url(#${id}-paint)" stroke="#9c7909" stroke-width="2"/>
    <path d="M-8 -232 L166 -250 L499 -215 L501 -207 L159 -239 L-8 -223Z" fill="#ffe786"/>
    <path d="M-8 -222 H132 L151 -186 L114 -208 H-8Z" fill="#a27e08"/>
    <path d="M169 -218 L524 -190 L536 -151 L510 -126 H211Z" fill="#eabc12"/>
    ${[212, 285, 358, 431].map(x => `<path d="M${x} ${-215 + (x - 212) * .08} l8 1 19 69 -8 0Z" fill="#ffe068"/>`).join('')}
    <path d="M194 -116 H534 L525 -101 H193Z" fill="#c09509"/>
    <rect x="399" y="-185" width="104" height="26" fill="#252f37"/><text x="451" y="-167" fill="#fff" font-family="Arial" font-size="15" font-weight="700" text-anchor="middle">KOMATSU</text>
    <path d="M26 -218 H112 V-164 H23Z" fill="#ffcd11"/>
    <path d="M33 -211 H103 V-176 H31Z" fill="url(#${id}-glass)" stroke="#273238" stroke-width="4"/>
    <path d="M66 -211 V-177 M34 -188 L53 -208" stroke="#89a8b0" stroke-width="2"/>
    <path d="M72 -214 V-166 M32 -171 V-159 H109 V-171 M92 -164 h11" stroke="#48565b" stroke-width="2" fill="none"/>
    <path d="M109 -200 h15 v23" stroke="#2d373c" stroke-width="2" fill="none"/><rect x="119" y="-194" width="8" height="18" rx="2" fill="#253039"/>
    <text x="55" y="-228" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#233c60">KOMATSU</text>
    <path d="M23 -222 H106" stroke="#283238" stroke-width="6"/>
    <path d="M130 -169 V-216 h9" fill="none" stroke="#414b50" stroke-width="7"/>
    <rect x="-9" y="-167" width="170" height="11" fill="#ffcd11"/>
    <path d="M-8 -168 V-191 H20 M-8 -180 H20 M117 -165 V-190 H159 V-165 M118 -177 H159" fill="none" stroke="#303c42" stroke-width="2.5"/>
    <rect x="-5" y="-156" width="68" height="102" fill="#ba900b"/>
    <rect x="2" y="-147" width="56" height="85" fill="#202a30"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M5 ${-142 + i * 8} H55" stroke="#536168" stroke-width="2"/>`).join('')}
    ${Array.from({length: 9}, (_, i) => `<path d="M${7+i*6} -145 v81" stroke="#637074" stroke-width="1"/>`).join('')}
    <path d="M67 -153 H179 V-123 Q117 -125 77 -82 H67Z" fill="#ffcd11"/>
    <path d="M-10 -54 H69 V-42 H-10Z" fill="#ffcd11"/>
    ${equipmentWheel(112, -42, 66, `${id}-wheel0`)}${equipmentWheel(464, -38, 62, `${id}-wheel1`)}
    <path d="M-12 -41 L22 -158 M1 -41 L35 -158" stroke="#c6a426" stroke-width="3"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${-10 + i * 3.5} ${-48 - i * 12} h13" stroke="#ffde6c" stroke-width="3"/>`).join('')}
    <path d="M57 -153 V-40 M66 -153 V-40 M57 -139 h9 M57 -124 h9 M57 -109 h9 M57 -94 h9 M57 -79 h9 M57 -64 h9 M57 -49 h9" stroke="#ddd9b3" stroke-width="2" fill="none"/>
    <path d="M-17 -51 V-73 L16 -186 H35" stroke="#d9ded6" stroke-width="2" fill="none"/>
    <rect x="74" y="-146" width="28" height="10" rx="2" fill="#fff2c8"/>
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
