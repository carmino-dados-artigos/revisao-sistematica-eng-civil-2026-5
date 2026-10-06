import { useMemo, useState } from 'react'
import { reviewData } from '../data'
import type { Study } from '../types'
import { PageHeader, SectionCard } from '../components/UI'
import { NetworkGraph, type NetworkMode } from '../components/NetworkGraph'

const modes:{key:NetworkMode,label:string,help:string}[]=[
 {key:'authors',label:'Autores comuns',help:'Mostra somente autores que aparecem em mais de um artigo e os estudos ligados a eles.'},
 {key:'articleKeywords',label:'Artigos × palavras-chave',help:'Rede bipartida entre estudos e palavras-chave/termos-chave documentados.'},
 {key:'areaKeywords',label:'Áreas × palavras-chave',help:'Relaciona cada área registrada às palavras-chave encontradas nos estudos da área.'},
 {key:'threeLayer',label:'Áreas × técnicas × palavras-chave',help:'Rede em três camadas que conecta domínio, técnica explicitamente citada e termos-chave.'},
 {key:'areaArea',label:'Áreas por palavras-chave',help:'Cada palavra-chave compartilhada gera uma aresta própria entre duas áreas.'}
]
export function NetworksPage(){
 const [mode,setMode]=useState<NetworkMode>('authors'); const [area,setArea]=useState('Todas')
 const final=(reviewData.studies28 as unknown as Study[]).filter(s=>s.finalIncluded)
 const areas=useMemo(()=>['Todas',...Array.from(new Set(final.map(s=>s.area))).sort()],[final])
 const filtered=area==='Todas'?final:final.filter(s=>s.area===area); const current=modes.find(m=>m.key===mode)!
 return <>
  <PageHeader eyebrow="Análise relacional" title="Redes do corpus" description="Explore relações entre estudos, autores, áreas, técnicas e palavras-chave. Os 27 estudos finais formam a base de todas as redes."/>
  <SectionCard>
   <div className="network-mode-grid">{modes.map(m=><button key={m.key} className={mode===m.key?'active':''} onClick={()=>setMode(m.key)}><strong>{m.label}</strong><span>{m.help}</span></button>)}</div>
   <div className="network-controls"><div><strong>{current.label}</strong><p>{current.help}</p></div><label>Filtrar área<select value={area} onChange={(e:any)=>setArea(e.target.value)}>{areas.map(a=><option key={a}>{a}</option>)}</select></label></div>
   <NetworkGraph key={mode+area} studies={filtered} mode={mode}/>
  </SectionCard>
  <div className="callout info"><div><strong>Como interpretar</strong><p>As redes representam coocorrência documental, não causalidade. Em “Áreas por palavras-chave”, múltiplas arestas podem ligar o mesmo par de áreas porque cada termo compartilhado é preservado individualmente.</p></div></div>
 </>
}
