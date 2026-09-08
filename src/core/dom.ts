/** Helpers mínimos para construir DOM/SVG sin framework. */
export const SVG_NS = 'http://www.w3.org/2000/svg'

type Attrs = Record<string, string | number | boolean | undefined>

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  children: (Node | string)[] | string = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  applyAttrs(node, attrs)
  append(node, children)
  return node
}

export function svg<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  children: (Node | string)[] | string = [],
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag)
  applyAttrs(node, attrs)
  append(node, children)
  return node
}

function applyAttrs(node: Element, attrs: Attrs) {
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue
    if (k === 'class') node.setAttribute('class', String(v))
    else if (k === 'html') node.innerHTML = String(v)
    else node.setAttribute(k, String(v))
  }
}

function append(node: Element, children: (Node | string)[] | string) {
  if (typeof children === 'string') {
    node.appendChild(document.createTextNode(children))
    return
  }
  for (const c of children) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
}

/** Envuelve cada palabra en <span class="w"> para animarlas de forma independiente. */
export function splitWords(text: string): HTMLSpanElement[] {
  return text.split(' ').map((w, i, arr) => {
    const s = el('span', { class: 'w' })
    s.textContent = i < arr.length - 1 ? w + ' ' : w
    return s
  })
}

export function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}
