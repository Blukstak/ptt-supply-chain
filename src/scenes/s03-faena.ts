import { el } from '../core/dom'
import { minePit, truck797, finalDriveSide, hoursGauge, fieldWorkshop, pttWorker, lowboyTruck } from '../art'
import { Dust } from '../fx/dust'
import { Scene, sceneRoot, fullSvg, artLayer, artAt, sceneEnter, photoBg, sceneLeave, quote, revealQuote, lowerThird, showLowerThird, tag, pop } from '../core/scene'

/** R6: mandos desde ambas ruedas traseras, con horómetros individuales; sin corte/lupa. */
export function faenaScene(): Scene {
  const root = sceneRoot('faena')
  const bg = fullSvg(minePit('mine1'))
  const dust = new Dust({ count:100, color:'201, 162, 122', speed:.5, size:[1,4] })
  const shedSvg = fullSvg(`<g id="fw-wrap" transform="translate(300 900) scale(1.3)">${fieldWorkshop('fw')}</g>
    <g id="fw-people" opacity="0"><g transform="translate(470 775) scale(.5)">${pttWorker('fwp1',true)}</g><g transform="translate(1560 775) scale(.5)">${pttWorker('fwp2',false)}</g></g>`)
  const truckSvg = artLayer(`<g id="truck-wrap" transform="translate(300 390) scale(.95)">${truck797('t')}</g>`,300,390)
  // Centros de los dos neumáticos traseros de truck797; exterior e interior.
  const hubs = [{x:1018.2,y:741.9},{x:996.2,y:741.9}]
  const positions = [{x:590,y:620},{x:1320,y:620}]
  const mandos = positions.map((p,i)=>artLayer(`<g transform="translate(${p.x} ${p.y})">${finalDriveSide(i===0?'fde':'fde2','PTT')}</g>`,p.x,p.y))
  const gauges = fullSvg(`<rect id="fd-bgrect" width="1920" height="1080" fill="#070b11" opacity="0"/>
    <g id="fd-link" opacity="0"><text x="960" y="160" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-size="52" font-weight="700" fill="#fff">MANDOS FINALES · CAT 797F</text><text x="960" y="207" text-anchor="middle" font-family="Arial" font-size="24" fill="#aeb8c4">Controlamos las horas de operación de cada mando</text></g>
    ${positions.map((p,i)=>`<g id="fd-gauge${i}" opacity="0"><g transform="translate(${p.x} 380)">${hoursGauge(`g${i+1}`,112).replace(/#f5a623/g,'#e0262b')}<text y="80" text-anchor="middle" font-family="Arial" font-size="18" fill="#c6ced7">MÁX. 18.000 H</text></g><path d="M${p.x} 491 V520" fill="none" stroke="#e0262b" stroke-width="3"/><text x="${p.x}" y="817" text-anchor="middle" font-family="Arial" font-size="22" fill="#e9eef4">MANDO ${i+1} · RUEDA TRASERA ${i===0?'IZQUIERDA':'DERECHA'}</text></g>`).join('')}`)
  // Los gauges quedan sobre los mandos; el fondo técnico debe estar detrás de ambos.
  const backdrop = fullSvg('')
  backdrop.append(gauges.querySelector('#fd-bgrect')!)
  const semiSvg = artLayer(`<g transform="translate(420 736) scale(.55)">${lowboyTruck('semi')}<g transform="translate(330 140) scale(.42)">${finalDriveSide('cr','PTT')}</g></g>`,667,818)
  const lt = lowerThird('Personal PTT en faena','Contrato de Mantención dentro de la minera')
  ;(lt.querySelector('.headline') as HTMLElement).style.fontSize='64px'
  const tagParts = tag('Reparamos motores, transmisiones, diferenciales, mandos finales y mazas',120,130,'info')
  const tagOut = tag('Retiramos los mandos finales de las ruedas traseras',120,100,'info')
  const tagLife = tag('Cambio programado · horas máximas: 18.000 h',590,900)
  const tagGD = tag('Trasladamos el componente a nuestro taller PTT',120,150,'ok')
  const quoteNode = quote('Todo comienza antes de que ocurra una falla',120,300,1500)
  quoteNode.append(el('div',{class:'w',style:'display:block;font-size:40px;font-weight:300;text-transform:none;color:var(--ink-2);margin-top:22px'},'(generalmente)'))
  root.append(bg); photoBg(root,'mine-day.jpg',bg)
  root.append(dust.canvas,shedSvg,truckSvg,backdrop,...mandos,gauges,semiSvg,lt,tagParts,tagOut,tagLife,tagGD,quoteNode)
  return {id:'faena',title:'Contrato en faena',root,onEnter:()=>dust.start(),onLeave:()=>dust.stop(),build(tl,at){
    const q=(s:string)=>root.querySelector(s)!
    const wheels=['#t-w1','#t-w2','#t-w3'].map(q)
    sceneEnter(tl,root,at,1.2)
    showLowerThird(tl,lt,at+.6,3)
    tl.to(q('#fw-door'),{y:-380,duration:1.2,ease:'power2.inOut'},at+.3)
    tl.to(q('#fw-people'),{opacity:1,duration:.5},at+.8)
    tl.fromTo(truckSvg,artAt(300,390,2100,601,.6/.95),{...artAt(300,390,676,601,.6/.95),duration:2.6,ease:'power2.out'},at+.6)
    tl.to(wheels,{rotation:-720,transformOrigin:'50% 50%',duration:2.8,ease:'power2.out'},at+.6)
    pop(tl,tagParts,at+3.6,2.4)
    tl.to(truckSvg,{...artAt(300,390,300,390,1),duration:1.2,ease:'power2.inOut'},at+4.2)
    tl.to([shedSvg,bg,dust.canvas],{opacity:.3,duration:.8},at+4.2)
    // Aprox. 00:30: primero giran las ruedas, luego salen los mandos desde sus centros.
    tl.to(wheels,{rotation:-1100,transformOrigin:'50% 50%',duration:2.4,ease:'power1.inOut'},at+6.0)
    pop(tl,tagOut,at+6.3,2.7)
    mandos.forEach((m,i)=>{
      const p=positions[i],h=hubs[i]
      tl.set(m,{opacity:0,...artAt(p.x,p.y,h.x,h.y,.13)},at)
      tl.to(m,{opacity:1,duration:.3},at+7.2+i*.55)
      tl.to(m,{...artAt(p.x,p.y,p.x,p.y,1),duration:1.8,ease:'power3.inOut'},at+7.4+i*.55)
      tl.to(q(`#fd-gauge${i}`),{opacity:1,duration:.5},at+9.3+i*.55)
      const val={v:0},hours=i===0?17650:17280
      tl.to(q(`#g${i+1}-arc`),{strokeDashoffset:2*Math.PI*112*(1-hours/18000),duration:1.4},at+9.4+i*.55)
      tl.to(val,{v:hours,duration:1.4,onUpdate:()=>{q(`#g${i+1}-val`).textContent=Math.round(val.v).toLocaleString('es-CL')}},at+9.4+i*.55)
    })
    tl.to(q('#fd-bgrect'),{opacity:.9,duration:1},at+8.2)
    tl.to(q('#fd-link'),{opacity:1,duration:.6},at+9.1)
    pop(tl,tagLife,at+11.4,3.2)
    const rAt=at+15.8
    tl.to([gauges,backdrop,...mandos,tagLife,truckSvg],{opacity:0,duration:.6},rAt-.5)
    tl.to([bg,dust.canvas],{opacity:1,duration:.8},rAt-.4)
    tl.set(semiSvg,{opacity:0,...artAt(667,818,-500,818,1)},at)
    tl.to(semiSvg,{opacity:1,duration:.2},rAt)
    tl.to(semiSvg,{...artAt(667,818,2300,818,1),duration:4,ease:'power1.inOut'},rAt)
    tl.to(['#semi-w0','#semi-w1','#semi-w2','#semi-w3','#semi-w4'].map(q),{rotation:1400,transformOrigin:'50% 50%',duration:4},rAt)
    pop(tl,tagGD,rAt+.6,2.7)
    const end=revealQuote(tl,quoteNode,rAt+.9,1.9)
    sceneLeave(tl,root,end,.9)
    return end+1-at
  }}
}
