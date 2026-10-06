import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cytoscape, { Core, ElementDefinition } from 'cytoscape'
import type { Study } from '../types'
import { Icon } from './Icon'

export type NetworkMode='authors'|'articleKeywords'|'areaKeywords'|'threeLayer'|'areaArea'
const palette={article:'#063A9A',author:'#1E6BFF',keyword:'#0D4FD7',area:'#0B2D5B',technique:'#1E6BFF',edge:'#AAB5C4'}
const eid=(prefix:string,s:string)=>prefix+'-'+btoa(unescape(encodeURIComponent(s))).replace(/[^a-zA-Z0-9]/g,'').slice(0,42)
const authors=(s:string)=>s.split(';').map(x=>x.trim()).filter(Boolean)

function build(studies:Study[],mode:NetworkMode):ElementDefinition[]{
 const nodes=new Map<string,ElementDefinition>(); const edges:ElementDefinition[]=[]
 const addNode=(id:string,label:string,type:string,extra:any={})=>{if(!nodes.has(id))nodes.set(id,{data:{id,label,type,...extra}})}
 if(mode==='authors'){
   const map=new Map<string,Study[]>()
   studies.forEach(s=>authors(s.authors).forEach(a=>{const arr=map.get(a)||[];arr.push(s);map.set(a,arr)}))
   ;[...map.entries()].filter(([,ss])=>new Set(ss.map(x=>x.number)).size>1).forEach(([a,ss])=>{
     const aid=eid('author',a); addNode(aid,a,'author',{count:ss.length})
     const uniq=[...new Map(ss.map(s=>[s.number,s])).values()]
     uniq.forEach(s=>{const sid='study-'+s.number;addNode(sid,'#'+s.number+' '+s.title,'article',{year:s.year});edges.push({data:{id:aid+'-'+sid,source:aid,target:sid,label:a,weight:1}})})
   })
 }
 if(mode==='articleKeywords'){
   studies.forEach(s=>{const sid='study-'+s.number;addNode(sid,'#'+s.number+' '+s.title,'article',{year:s.year});s.keywordsNormalized.slice(0,10).forEach(k=>{const kid=eid('kw',k);addNode(kid,k,'keyword');edges.push({data:{id:sid+'-'+kid,source:sid,target:kid,label:k,weight:1}})})})
 }
 if(mode==='areaKeywords'){
   const counts=new Map<string,number>()
   studies.forEach(s=>s.keywordsNormalized.slice(0,10).forEach(k=>{const key=s.area+'|||'+k;counts.set(key,(counts.get(key)||0)+1)}))
   counts.forEach((count,key)=>{const [a,k]=key.split('|||');const aid=eid('area',a),kid=eid('kw',k);addNode(aid,a,'area');addNode(kid,k,'keyword');edges.push({data:{id:aid+'-'+kid,source:aid,target:kid,label:k,weight:count}})})
 }
 if(mode==='threeLayer'){
   studies.forEach(s=>{const aid=eid('area',s.area);addNode(aid,s.area,'area');s.techniques.slice(0,8).forEach(t=>{const tid=eid('tech',t);addNode(tid,t,'technique');edges.push({data:{id:aid+'-'+tid+'-'+s.number,source:aid,target:tid,label:'',weight:1}});s.keywordsNormalized.slice(0,6).forEach(k=>{const kid=eid('kw',k);addNode(kid,k,'keyword');edges.push({data:{id:tid+'-'+kid+'-'+s.number,source:tid,target:kid,label:k,weight:1}})})})})
 }
 if(mode==='areaArea'){
   const byArea=new Map<string,Set<string>>();studies.forEach(s=>{const set=byArea.get(s.area)||new Set<string>();s.keywordsNormalized.forEach(k=>set.add(k));byArea.set(s.area,set)})
   const arr=[...byArea.entries()];arr.forEach(([a])=>addNode(eid('area',a),a,'area'))
   for(let i=0;i<arr.length;i++)for(let j=i+1;j<arr.length;j++){
     const [a,ka]=arr[i],[b,kb]=arr[j];const shared=[...ka].filter(k=>kb.has(k));shared.forEach((k,idx)=>edges.push({data:{id:eid('edge',a+b+k+idx),source:eid('area',a),target:eid('area',b),label:k,weight:1}}))
   }
 }
 return [...nodes.values(),...edges]
}

function graphOptions(mode:NetworkMode, expanded:boolean){
 const compact=mode==='authors'||mode==='articleKeywords'
 return {
  padding: expanded?48:compact?18:30,
  nodeRepulsion: compact?3500:8000,
  idealEdgeLength: compact?55:90,
  componentSpacing: compact?45:100,
 }
}

function GraphCanvas({elements,mode,labels,expanded,onCy,onSelected}:{elements:ElementDefinition[],mode:NetworkMode,labels:boolean,expanded:boolean,onCy:(cy:Core|null)=>void,onSelected:(d:any)=>void}){
 const ref=useRef<HTMLDivElement|null>(null)
 useEffect(()=>{
  if(!ref.current)return
  const compact=mode==='authors'||mode==='articleKeywords'
  const opts=graphOptions(mode,expanded)
  const cy=cytoscape({container:ref.current,elements,style:[
   {selector:'node',style:{'background-color':'#64748B','label':'data(label)','font-size':compact?8:10,'color':'#1F2937','text-wrap':'wrap','text-max-width':compact?'105px':'130px','text-valign':'bottom','text-margin-y':compact?5:7,'width':compact?18:24,'height':compact?18:24,'border-width':2,'border-color':'#fff','overlay-padding':3}},
   {selector:'node[type="article"]',style:{'background-color':palette.article,'width':compact?22:30,'height':compact?22:30}},
   {selector:'node[type="author"]',style:{'background-color':palette.author,'width':compact?22:34,'height':compact?22:34}},
   {selector:'node[type="keyword"]',style:{'background-color':palette.keyword,'width':compact?15:18,'height':compact?15:18}},
   {selector:'node[type="area"]',style:{'background-color':palette.area,'shape':'round-rectangle','width':38,'height':26}},
   {selector:'node[type="technique"]',style:{'background-color':palette.technique,'shape':'diamond','width':24,'height':24}},
   {selector:'edge',style:{'line-color':palette.edge,'width':compact?0.8:'mapData(weight,1,5,1,4)','curve-style':'bezier','opacity':compact?0.4:0.55,'label':labels?'data(label)':'','font-size':compact?7:8,'text-background-color':'#fff','text-background-opacity':0.92,'text-background-padding':'2px','text-rotation':'autorotate','target-arrow-shape':'none'}},
   {selector:':selected',style:{'border-color':'#1E6BFF','border-width':4,'line-color':'#1E6BFF','opacity':1}}
  ],layout:{name:mode==='threeLayer'?'breadthfirst':'cose',animate:false,...opts} as any,minZoom:0.12,maxZoom:3.5,wheelSensitivity:0.18})
  cy.on('tap','node, edge',(e:any)=>onSelected(e.target.data()))
  cy.ready(()=>cy.fit(undefined,expanded?48:22))
  onCy(cy)
  return()=>{onCy(null);cy.destroy()}
 },[elements,mode,labels,expanded,onCy,onSelected])
 return <div className={'network-canvas '+(expanded?'expanded':'')} ref={ref}/>
}

function savePng(cy:Core|null,mode:NetworkMode){
 if(!cy)return
 const data=cy.png({full:true,scale:2,bg:'#FFFFFF'})
 const a=document.createElement('a'); a.href=data; a.download=`rede-${mode}.png`; document.body.appendChild(a); a.click(); a.remove()
}

export function NetworkGraph({studies,mode}:{studies:Study[],mode:NetworkMode}){
 const [labels,setLabels]=useState(mode==='areaArea'); const [selected,setSelected]=useState<any>(null); const [expanded,setExpanded]=useState(false)
 const [cy,setCy]=useState<Core|null>(null); const [modalCy,setModalCy]=useState<Core|null>(null)
 const elements=useMemo(()=>build(studies,mode),[studies,mode])
 const nodeCount=elements.filter((e:any)=>!e.data.source).length, edgeCount=elements.length-nodeCount
 const select=useCallback((d:any)=>setSelected(d),[])
 return <>
  <div className="network-wrap">
   <div className="network-toolbar">
    <div><strong>{nodeCount}</strong> nós <span>·</span> <strong>{edgeCount}</strong> arestas</div>
    <div className="network-toolbar-actions">
     <label className="toggle"><input type="checkbox" checked={labels} onChange={(e:any)=>setLabels(e.target.checked)}/><span/>Rótulos nas arestas</label>
     <button className="network-action" onClick={()=>savePng(cy,mode)} title="Baixar grafo como PNG"><Icon name="download" size={15}/>Baixar PNG</button>
     <button className="network-action" onClick={()=>setExpanded(true)} title="Abrir grafo ampliado"><Icon name="expand" size={15}/>Ampliar</button>
    </div>
   </div>
   <GraphCanvas elements={elements} mode={mode} labels={labels} expanded={false} onCy={setCy} onSelected={select}/>
   {selected&&<div className="network-selection"><button onClick={()=>setSelected(null)}><Icon name="close" size={15}/></button><strong>{selected.label||'Relação selecionada'}</strong>{selected.type&&<span>Tipo: {selected.type}</span>}{selected.weight&&<span>Peso: {selected.weight}</span>}</div>}
  </div>
  {expanded&&<div className="graph-modal-layer" role="dialog" aria-modal="true" onMouseDown={(e:any)=>{if(e.currentTarget===e.target)setExpanded(false)}}>
   <div className="graph-modal">
    <div className="graph-modal-head"><div><strong>Visualização ampliada</strong><span>{nodeCount} nós · {edgeCount} arestas</span></div><div className="graph-modal-actions"><button className="network-action" onClick={()=>savePng(modalCy,mode)}><Icon name="download" size={15}/>Baixar PNG</button><button className="icon-button" onClick={()=>setExpanded(false)}><Icon name="close"/></button></div></div>
    <GraphCanvas elements={elements} mode={mode} labels={labels} expanded={true} onCy={setModalCy} onSelected={select}/>
   </div>
  </div>}
 </>
}
