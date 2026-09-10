import { el } from '../core/dom'
import { pttWorkshop, finalDriveLayers, finalDriveSide, pttWorker, warehouseRack, crate, sparePart, torqueWrench, STATIONS_ARMADO } from '../art'
import { Scene, sceneRoot, fullSvg, artLayer, artAt, sceneEnter, sceneLeave, tag, pop } from '../core/scene'

/** Armado por capas, apriete visible, control y dos opciones de atención. */
export function tallerScene(): Scene {
  const root = sceneRoot('taller')
  const BOX = { x: 1490, y: 750 }
  const parts = [
    { kind: 'gear', src: 'stock', x: 1400, y: 535 }, { kind: 'bearing', src: 'stock', x: 1500, y: 535 }, { kind: 'seal', src: 'stock', x: 1600, y: 535 },
    { kind: 'bolt', src: 'buy', x: 1400, y: 675 }, { kind: 'nut', src: 'buy', x: 1500, y: 675 }, { kind: 'bearing', src: 'buy', x: 1600, y: 675 },
  ] as const
  const bg = fullSvg(`${pttWorkshop('tf', STATIONS_ARMADO.map((st,i)=>({...st,x:[960,380,1500][i]})), 'ARMADO')}
    <rect width="1920" height="150" fill="#101720" opacity=".96"/>
    <rect id="tl-dim" width="1920" height="1080" fill="#080d14" opacity="0"/>
    <g id="tl-stand">
      <ellipse cx="950" cy="806" rx="290" ry="22" fill="#070b11" opacity=".3"/>
      <path d="M720 710 H1190 V735 H720Z" fill="#74818b"/>
      <path d="M735 735 V805 M1175 735 V805" stroke="#3a454f" stroke-width="22"/>
      <path d="M751 695 V671 Q780 655 810 668 V710 M1100 710 V611 Q1124 593 1150 608 V697" fill="#4b5761" stroke="#98a3a9" stroke-width="4"/>
    </g>
    <g id="tl-t1" transform="translate(490 790) scale(.42)">${pttWorker('tt1', false)}</g>
    <g id="tl-t2" transform="translate(1270 790) scale(.42)">${pttWorker('tt2', true)}</g>
    <g id="tl-boxes"><g class="tl-box" transform="translate(-400 ${BOX.y})">${crate('tlc0', 300, 150, 'PTT')}</g></g>
    <g id="tl-parts">${parts.map((p, i) => `<g class="tl-part" opacity="0" transform="translate(${BOX.x + 150} ${BOX.y + 60}) scale(.1)"><circle r="44" fill="#101923" stroke="${p.src === 'stock' ? '#98b4a5' : '#b6c5d2'}" stroke-width="3"/>${sparePart(`tp${i}`, p.kind)}</g>`).join('')}</g>
    <g id="tl-right" opacity="0"><g transform="translate(1140 415) scale(.58)">${warehouseRack('tlr', 4, 3, 190, 130)}</g><g id="tl-stock" transform="translate(1440 740) scale(.75)">${finalDriveSide('tls', 'PTT')}</g></g>
    <line id="tl-split" x1="960" y1="260" x2="960" y2="855" stroke="#6a7580" stroke-width="2" opacity="0"/>
  `)
  // The component and tool have separate foreground layers; the socket stays on one bolt.
  const component = artLayer(`<g id="tl-fd" transform="translate(960 535)">${finalDriveLayers('tfd')}</g>`,960,535)
  const tool = fullSvg(`<g id="tl-torque" opacity="0"><circle cx="774" cy="675" r="19" fill="none" stroke="#e0262b" stroke-width="3"/><g id="tl-wrench" transform="translate(774 675) scale(.55)"><g id="tl-wrench-in">${torqueWrench('tw')}</g></g><path id="tl-torque-check" d="M754 672 l14 14 27 -30" fill="none" stroke="#f1f5f2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></g>`)
  const heading = el('div',{class:'abs',html:'<div class="kicker">Taller PTT · Armado del mando final</div><div class="headline" style="font-size:60px;margin-top:10px">Cada pieza, <em>en su lugar</em></div>'})
  Object.assign(heading.style,{left:'120px',top:'48px',opacity:'0'})
  const tagStock = tag('Repuestos de bodega',1340,455,'')
  const tagBuy = tag('Repuestos de compras',1340,595,'')
  const phaseNames = ['Carcasa y eje','Primera reducción','Segunda reducción','Wheel · cuerpo exterior','Apriete controlado','Pruebas y certificación PTT']
  const phases = phaseNames.map((name,i)=>{
    const n=el('div',{class:'abs',html:`<span style="color:#e0262b;font-size:22px;margin-right:18px">${String(i+1).padStart(2,'0')}</span>${name}`})
    Object.assign(n.style,{left:'620px',top:'815px',width:'680px',textAlign:'center',fontFamily:'var(--font-display)',fontSize:'34px',fontWeight:'600',color:'#fff',opacity:'0'})
    return n
  })
  const prog=el('div',{class:'abs',html:'<div style="width:520px;height:5px;background:#ffffff26;border-radius:6px;overflow:hidden"><div id="tl-fill" style="height:100%;width:0;background:#e0262b"></div></div>'})
  Object.assign(prog.style,{left:'700px',top:'880px',opacity:'0'})
  const stamp=el('div',{class:'abs',html:'<div style="font-family:var(--font-display);font-size:32px;color:#e9f0ec;border:1px solid #9fb8aa;padding:14px 24px;border-radius:8px;background:#17261f">✓ Control de calidad aprobado</div>'})
  Object.assign(stamp.style,{left:'1180px',top:'365px',opacity:'0'})
  const optionsTitle=el('div',{class:'abs',html:'<div class="kicker">2 opciones para nuestros clientes</div><div class="headline" style="font-size:54px;margin-top:10px">Reparación y <em>Venta Intercambio</em></div>'})
  Object.assign(optionsTitle.style,{left:'120px',top:'65px',opacity:'0'})
  const option=(x:number,n:string,title:string,copy:string)=>{
    const d=el('div',{class:'abs',html:`<div class="kicker">Opción ${n}</div><div class="headline" style="font-size:54px;margin-top:10px">${title}</div><div class="sub" style="font-size:28px;margin-top:14px">${copy}</div>`})
    Object.assign(d.style,{left:`${x}px`,top:'255px',width:'720px',opacity:'0'});return d
  }
  const hL=option(120,'1','Reparación','Reparamos el componente que nos entrega el cliente.')
  const hR=option(1040,'2','Venta Intercambio','Stock disponible a cambio del componente del cliente.')
  root.append(bg,component,tool,heading,tagStock,tagBuy,...phases,prog,stamp,optionsTitle,hL,hR)
  return {id:'taller',title:'Taller PTT',root,build(tl,at){
    const q=(s:string)=>root.querySelector(s)!
    sceneEnter(tl,root,at,1)
    tl.to(heading,{opacity:1,duration:.6},at+.4)
    // Park the hoist above the work area: no detached triangle through the component.
    tl.set(q('#tf-hoist'),{opacity:0},at)
    tl.to(q('#tl-dim'),{opacity:.16,duration:.7},at+.5)
    const layers=['base','reduction1','reduction2','wheel']
    layers.forEach((layer,i)=>tl.set(q(`#tfd-${layer}`),{x:i===0?0:-150,y:i===0?-65:0,opacity:0},at))
    tl.set(q('#tfd-cover'),{opacity:0},at)
    const box=q('.tl-box')
    tl.to(box,{attr:{transform:`translate(${BOX.x} ${BOX.y})`},duration:1,ease:'power3.out'},at+.2)
    const partEls=Array.from(root.querySelectorAll('.tl-part'))
    partEls.forEach((p,i)=>{
      tl.set(p,{opacity:1},at+.9+i*.09)
      tl.to(p,{attr:{transform:`translate(${parts[i].x} ${parts[i].y}) scale(1)`},duration:.5,ease:'power3.out'},at+.9+i*.09)
      tl.to(p,{attr:{transform:'translate(815 585) scale(.15)'},opacity:0,duration:.65,ease:'power2.inOut'},at+2.3+i*.1)
    })
    pop(tl,tagStock,at+1.1,1.8);pop(tl,tagBuy,at+1.35,1.55)
    tl.to(box,{opacity:0,duration:.4},at+3)
    const starts=[2.55,3.5,4.5,5.7]
    layers.forEach((layer,i)=>{
      tl.to(q(`#tfd-${layer}`),{x:0,y:0,opacity:1,duration:.7,ease:'power2.inOut'},at+starts[i])
      tl.fromTo(phases[i],{opacity:0,y:10},{opacity:1,y:0,duration:.2},at+starts[i])
      tl.to(phases[i],{opacity:0,duration:.18},at+(starts[i+1]??6.6)-.18)
      tl.fromTo(q('#tl-fill'),{width:`${i*25}%`},{width:`${(i+1)*25}%`,duration:.7,ease:'power2.inOut'},at+starts[i])
    })
    tl.to(prog,{opacity:1,duration:.3},at+2.55)
    tl.to(q('#tfd-cover'),{opacity:1,duration:.3},at+5.35)
    // Short socket strokes, after the exterior is mounted, around a fixed contact point.
    tl.to(q('#tl-torque'),{opacity:1,duration:.2},at+6.6)
    tl.fromTo(q('#tl-wrench-in'),{rotation:45},{rotation:15,svgOrigin:'0 0',duration:.24,repeat:3,yoyo:true,ease:'power2.inOut'},at+6.65)
    tl.to(phases[4],{opacity:1,duration:.2},at+6.6)
    tl.to(q('#tl-wrench'),{opacity:0,duration:.2},at+7.55)
    tl.to(q('#tl-torque-check'),{opacity:1,duration:.2},at+7.6)
    tl.to([q('#tl-torque'),phases[4]],{opacity:0,duration:.2},at+7.95)
    tl.to(phases[5],{opacity:1,duration:.25},at+8)
    tl.fromTo(component,{scale:1},{scale:1.004,duration:.15,repeat:3,yoyo:true},at+8)
    tl.fromTo(stamp,{opacity:0,y:12},{opacity:1,y:0,duration:.35,ease:'power3.out'},at+8.25)
    // Both options arrive together and remain readable for more than four seconds.
    const alt=at+9.1
    tl.to([heading,stamp,prog,...phases,q('#tl-t1'),q('#tl-t2'),q('#tl-stand'),q('#tf-signs')],{opacity:0,duration:.4},alt)
    tl.to(q('#tl-dim'),{opacity:.78,duration:.6},alt)
    tl.to(component,{...artAt(960,535,495,620,1.15),duration:.8,ease:'power3.inOut'},alt)
    tl.to(q('#tl-split'),{opacity:.6,duration:.6},alt+.2)
    tl.to([optionsTitle,hL,hR,q('#tl-right')],{opacity:1,duration:.6},alt+.3)
    tl.to([component,q('#tl-right'),hL,hR,optionsTitle],{opacity:0,duration:.5},at+14.65)
    sceneLeave(tl,root,at+14.7,.9)
    return 15.6
  }}
}
