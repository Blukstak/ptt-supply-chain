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
  return `${equipmentPaint(id)}
  <defs>
    <linearGradient id="${id}-body" x2="0" y2="1"><stop stop-color="#ffdf62"/><stop offset="1" stop-color="#ffcd11"/></linearGradient>
    <linearGradient id="${id}-bed-paint" x2="0" y2="1"><stop stop-color="#ffdc55"/><stop offset="1" stop-color="#c99d05"/></linearGradient>
    <linearGradient id="${id}-shade"><stop stop-color="#8a6a00"/><stop offset="1" stop-color="#c99d05"/></linearGradient>
  </defs>
  <g id="${id}">
    <ellipse cx="560" cy="486" rx="600" ry="18" fill="#000" opacity=".3"/>
    <!-- Dos ejes: el neumático interior del dual queda detrás del exterior. -->
    ${equipmentWheel(900, 377, 119, `${id}-w2`)}
    <path d="M874 260 H978 Q1060 370 978 496 H874 Q946 370 874 260Z" fill="#22272b"/>
    ${Array.from({ length: 15 }, (_, i) => `<path d="M${890 + 23 * Math.sin(i * Math.PI / 14)} ${268 + i * 15} h69 l9 7 h-68" fill="none" stroke="#454b4e" stroke-width="5"/>`).join('')}
    <path d="M80 295 H1110 V342 H740 L650 370 H330 L260 342 H80Z" fill="#272d32"/>
    <path d="M335 325 H875 M410 338 L555 276" stroke="#4b545b" stroke-width="18"/>
    <path d="M550 312 L630 175" stroke="#838e96" stroke-width="18"/><path d="M550 312 L596 233" stroke="#c99d05" stroke-width="30"/>
    <g id="${id}-bed">
      <path d="M-35 40 L365 22 L1100 117 L1200 90 L1230 150 L1150 281 L425 281 L330 102 L-35 83Z" fill="url(#${id}-bed-paint)" stroke="#9f7c08" stroke-width="4"/>
      <path d="M-35 40 L365 22 L1100 117 L1108 136 L355 46 L-35 61Z" fill="#ffe58a"/>
      <path d="M-35 83 L330 102 L370 164 L307 127 L-35 101Z" fill="url(#${id}-shade)"/>
      ${[30, 125, 220].map(x => `<path d="M${x} 63 l70 5 28 38 -19 -2Z" fill="#b38c0a"/>`).join('')}
      <path d="M353 67 L1110 148 L1196 125 L1130 239 L445 239Z" fill="#e9b809"/>
      ${[425, 540, 655, 770, 885, 1000, 1115].map(x => { const top = 77 + (x - 425) * .105; return `<path d="M${x} ${top} l22 2 23 ${248 - top} h-22Z" fill="#ffda45"/><path d="M${x + 22} ${top + 2} l23 ${246 - top} 8 -1 -23 ${top - 245}Z" fill="#a88305"/>` }).join('')}
      <path d="M420 254 L1145 254 L1150 281 L425 281Z" fill="#ffcf27"/>
      <path d="M462 277 L482 297 H1122 L1143 277" fill="#927208"/>
      <rect x="1030" y="139" width="86" height="43" rx="3" fill="#20272c"/>
      <path d="M1093 182 l23 -22 v22Z" fill="#bd252b"/><text x="1073" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="29" font-weight="700" fill="#fff">797F</text>
    </g>
    <path d="M-35 40 L365 22 L350 53 L-52 109 L-65 88Z" fill="#f5ca42" stroke="#af8812" stroke-width="3"/>
    <path d="M-28 47 L354 29 L343 51 L-39 99Z" fill="#22292c"/>
    <text x="160" y="66" text-anchor="middle" transform="rotate(-7 160 66)" fill="#fff" font-family="Arial" font-weight="700" font-size="26">CATERPILLAR</text>
    <g id="${id}-cab">
      <path d="M120 192 V112 L147 102 H290 L311 125 V192Z" fill="url(#${id}-body)" stroke="#806811" stroke-width="4"/>
      <path d="M139 113 H281 L294 135 V165 H139Z" fill="url(#${id}-glass)" stroke="#20292f" stroke-width="7"/>
      <path d="M216 112 V190 M139 170 V191 H294 V167 M216 112 V168 M142 151 L192 119" stroke="#95b8be" stroke-opacity=".55" stroke-width="4"/>
      <path d="M127 104 H298" stroke="#262d32" stroke-width="12"/>
      <rect x="264" y="176" width="22" height="5" fill="#343b40"/>
      <path d="M302 139 h28 v25" fill="none" stroke="#343b40" stroke-width="5"/><rect x="321" y="155" width="18" height="29" rx="3" fill="#242d33"/>
      <path d="M338 185 V118 h22 V95" fill="none" stroke="#41494e" stroke-width="15"/>
      <rect x="328" y="128" width="24" height="52" rx="4" fill="url(#${id}-metal)"/>
      <path d="M-55 193 H362 V210 H-55Z" fill="#ffcd11"/>
      <rect x="-51" y="210" width="174" height="149" fill="#b38d0a"/>
      <rect x="-40" y="219" width="151" height="129" rx="3" fill="#182127"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M-34 ${226 + i * 10} H106" stroke="#4c555b" stroke-width="4"/>`).join('')}
      <path d="M37 221 V347" stroke="#747e83" stroke-width="3"/>
      <path d="M125 208 H351 V243 L304 250 L267 275 H125Z" fill="url(#${id}-body)"/>
      <rect x="162" y="218" width="98" height="33" rx="3" fill="#242b30"/><text x="211" y="243" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="26">CAT</text>
      <path d="M-57 360 H126 V378 H-57Z" fill="#ffcd11"/>
      ${[-36, 79, 292].map(x => `<rect x="${x}" y="${x === 292 ? 216 : 357}" width="25" height="14" rx="3" fill="#faf0d4" stroke="#363b3e" stroke-width="3"/>`).join('')}
      <path d="M-54 191 V148 H112 M-54 168 H112 M-8 148 V191 M45 148 V191 M100 148 V191 M313 148 H359 V191 M313 170 H359 M313 148 V191" fill="none" stroke="#e5e7de" stroke-width="4" stroke-linejoin="round"/>
    </g>
    ${equipmentWheel(230, 370, 128, `${id}-w1`)}
    ${equipmentWheel(990, 370, 128, `${id}-w3`)}
    <!-- Escalera inclinada al frente del radiador, libre del neumático. -->
    <path d="M-96 440 L61 211 M-65 440 L92 211" stroke="#d3ac17" stroke-width="8"/>
    ${Array.from({ length: 12 }, (_, i) => { const y = 433 - i * 19, x = -91 + i * 13; return `<path d="M${x} ${y} h31" stroke="#ffe381" stroke-width="6"/>` }).join('')}
    <path d="M-99 420 V393 L46 180 H75 M-67 419 L91 189" fill="none" stroke="#e5e7de" stroke-width="4"/>
    <path d="M366 301 v61 h-29" fill="none" stroke="#c99d05" stroke-width="8"/>
  </g>`
}

/**
 * Mando Final exterior: cuerpo cónico amarillo con coronas dentadas
 * en ambos extremos. Longitud ≈ 520 px, centrado en (0,0), eje horizontal.
 */
export function finalDriveSide(id = 'fds', label = 'PTT') {
  const flange = (x: number, r: number, w: number, fid: string) => {
    const rx = 48
    const teeth = Array.from({ length: 96 }, (_, i) => {
      const a = i * Math.PI / 48, b = a + .014, c = a + .045
      const point = (angle: number, radial: number) => `${x + Math.cos(angle) * (rx + radial)} ${Math.sin(angle) * (r + radial)}`
      return `<path d="M${point(a, 0)} L${point(b, 3)} L${point(c, 3)} L${point(a + .062, 0)}Z" fill="#b28a0a" stroke="#7e6210" stroke-width=".7"/>`
    }).join('')
    return `<g id="${fid}">
      <path d="M${x - w} ${-r} H${x} A${rx} ${r} 0 0 1 ${x} ${r} H${x - w} A${rx} ${r} 0 0 1 ${x - w} ${-r}Z" fill="url(#${id}-g)"/>
      ${Array.from({ length: 46 }, (_, i) => { const y = -r + 5 + i * (2 * r - 10) / 45; const edge = x - rx * Math.sqrt(1 - (y / r) ** 2); return `<path d="M${edge - w} ${y} h${w}" stroke="#8e6b0c" stroke-width="1"/>` }).join('')}
      ${teeth}<ellipse cx="${x}" rx="${rx}" ry="${r}" fill="url(#${id}-g)" stroke="#8a6a0b" stroke-width="3"/>
      <ellipse cx="${x}" rx="39" ry="${r * .81}" fill="#b58c13" stroke="#ffe185" stroke-width="2"/>
      <ellipse cx="${x}" rx="30" ry="${r * .63}" fill="url(#${id}-g)" stroke="#826613" stroke-width="3"/>
      ${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12; return `<ellipse cx="${x + Math.cos(a) * 43}" cy="${Math.sin(a) * r * .91}" rx="2.2" ry="3.3" fill="#5e501f" stroke="#ffe5a1" stroke-width=".8"/>` }).join('')}
      <ellipse cx="${x}" rx="19" ry="${r * .38}" fill="#b98e23" stroke="#f2ce61" stroke-width="2"/>
      ${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<ellipse cx="${x + Math.cos(a) * 15}" cy="${Math.sin(a) * r * .29}" rx="2" ry="2.5" fill="#625329"/>` }).join('')}
      <ellipse cx="${x}" rx="11" ry="${r * .20}" fill="#927122" stroke="#e6ba4c" stroke-width="2"/>
    </g>`
  }
  return `<defs><linearGradient id="${id}-g" x2="0" y2="1"><stop stop-color="#ffe490"/><stop offset=".3" stop-color="#ffcd11"/><stop offset=".58" stop-color="#eabb20"/><stop offset="1" stop-color="#947015"/></linearGradient></defs>
  <g id="${id}">
    <ellipse cx="0" cy="130" rx="270" ry="15" fill="#000" opacity=".28"/>
    ${flange(208, 112, 28, `${id}-fl2`)}
    <path d="M-197 -76 L-135 -76 Q-106 -61 -70 -52 H12 Q57 -52 97 -89 L165 -100 V100 L97 89 Q57 52 12 52 H-70 Q-106 61 -135 76 H-197Z" fill="url(#${id}-g)" stroke="#a27b0f" stroke-width="2"/>
    <ellipse cx="165" rx="24" ry="89" fill="url(#${id}-g)" stroke="#bd9318" stroke-width="4"/>
    <path d="M143 -85 Q176 0 143 85 M111 -83 Q143 0 111 83 M-124 -72 Q-100 0 -124 72 M-101 -65 Q-78 0 -101 65" fill="none" stroke="#b38b16" stroke-width="6"/>
    <path d="M-76 -49 H43 L78 -65 M-76 49 H43 L78 65 M-76 -34 H37 M-76 34 H37" fill="none" stroke="#ffdf69" stroke-width="5"/>
    <path d="M-63 -53 V-37 M-12 -53 V-37 M38 -54 V-39 M-63 37 V54 M-12 37 V54 M38 39 V54" stroke="#b68b0d" stroke-width="4"/>
    ${flange(-182, 94, 30, `${id}-fl1`)}
    <rect x="-48" y="-13" width="61" height="25" rx="3" fill="#e0262b" stroke="#b51d24" stroke-width="2"/>
    <text x="-17" y="5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="#fff" letter-spacing="2">${label}</text>
    <circle cx="-44" cy="-9" r="2" fill="#e4e6e1"/><circle cx="9" cy="8" r="2" fill="#e4e6e1"/>
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
