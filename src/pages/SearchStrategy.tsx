import { useState } from 'react'
import { reviewData } from '../data'
import { PageHeader, SectionCard } from '../components/UI'
import { Icon } from '../components/Icon'

function SearchCard({s}:{s:any}){
 const [open,setOpen]=useState(s.id===3); const [copied,setCopied]=useState(false)
 const copy=async()=>{await navigator.clipboard.writeText(s.query);setCopied(true);setTimeout(()=>setCopied(false),1300)}
 return <div className={'search-card '+(s.id===3?'active':'')}>
  <div className="search-card-head"><div><div className="search-id">{s.label}</div><h3>{s.count.toLocaleString('pt-BR')} registros</h3><p>{s.description}</p></div><div className="search-actions"><button className="icon-button" onClick={copy} title="Copiar string"><Icon name={copied?'check':'copy'}/></button><button className="text-button" onClick={()=>setOpen(v=>!v)}>{open?'Ocultar':'Ver string'}<Icon name="chevron"/></button></div></div>
  {open&&<pre className="code-block"><code>{s.query}</code></pre>}
 </div>
}
export function SearchStrategy(){return <>
 <PageHeader eyebrow="Reprodutibilidade" title="Estratégia de busca na Scopus" description="A busca foi construída de forma progressiva e aplicada aos campos de título, resumo e palavras-chave por meio do operador TITLE-ABS-KEY."/>
 <div className="search-timeline">{reviewData.searches.map((s:any,i:number)=><div key={s.id} className="timeline-step"><div className="timeline-badge">{i+1}</div><div className="timeline-body"><SearchCard s={s}/></div></div>)}</div>
 <SectionCard title="Relação com o corpus" subtitle="O conjunto utilizado na triagem deriva da terceira expressão.">
   <div className="search-flow"><span>290.062</span><i>refino</i><span>200.498</span><i>refino</i><span className="selected">241</span><i>triagem</i><span>27 estudos finais</span></div>
   <p className="body-text">O detalhamento integral das três expressões permanece disponível nesta interface para assegurar rastreabilidade e possibilidade de reprodução sem ampliar desnecessariamente o texto principal do capítulo.</p>
 </SectionCard>
 </>}
