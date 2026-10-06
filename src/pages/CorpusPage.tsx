import { useMemo, useState } from 'react'
import { reviewData } from '../data'
import type { Study } from '../types'
import { Badge, DoiLink, PageHeader, SectionCard } from '../components/UI'
import { Icon } from '../components/Icon'

function StudyDrawer({study,onClose}:{study:Study,onClose:()=>void}){
 const q=study.quality
 return <div className="drawer-layer" onMouseDown={(e:any)=>{if(e.currentTarget===e.target)onClose()}}><aside className="drawer"><div className="drawer-head"><div><div className="drawer-badges"><Badge tone={study.finalIncluded?'success':'danger'}>{study.status}</Badge><span className="persistent-id">ID #{study.screeningId}</span></div><h2>{study.title}</h2><p>{study.authors}</p></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div><div className="drawer-body">
  <div className="metadata-grid"><div><span>Ano</span><strong>{study.year}</strong></div><div><span>Área</span><strong>{study.area}</strong></div><div><span>Qualidade</span><strong>{q.total}/14 · {q.class}</strong></div><div><span>Documento</span><strong>{study.documentType}</strong></div></div>
  <div className="drawer-section"><h3>DOI</h3><DoiLink doi={study.doi}/></div>
  <div className="drawer-section"><h3>Resumo</h3><p>{study.abstract||'Resumo não disponível nesta matriz.'}</p></div>
  <div className="drawer-section"><h3>Palavras-chave</h3><div className="chip-list">{study.keywordsNormalized.map(k=><span key={k}>{k}</span>)}</div><small className="muted">Fonte: {study.keywordSource}</small></div>
  <div className="drawer-section"><h3>Técnicas explicitamente identificadas</h3><div className="chip-list technique">{study.techniques.map(k=><span key={k}>{k}</span>)}</div></div>
  <div className="drawer-section"><h3>Avaliação metodológica</h3><div className="score-grid">{[['Objetivo',q.objective],['Dados',q.data],['IA',q.aiJustification],['Validação',q.validation],['Métricas',q.metrics],['Limitações',q.limitations],['Reprod.',q.reproducibility]].map(([l,v])=><div key={String(l)}><span>{l}</span><b>{v}/2</b></div>)}</div></div>
  <div className="drawer-section provenance-panel"><h3>Proveniência dos dados</h3><p>Identificação e decisões de triagem: planilha final de rastreabilidade, vinculadas pelo ID interno #{study.screeningId}. Palavras-chave: {study.keywordSource}. Técnicas e avaliação metodológica: extração e conferência do estudo correspondente.</p></div>
  {!study.finalIncluded&&<><div className="callout danger"><Icon name="x"/><div><strong>Exclusão metodológica</strong><p>{study.statusDetail}</p></div></div><div className="history-box compact-history"><div><strong>Estado anterior</strong><p>{study.triage?.outcome||'Mantido como estudo primário após a triagem.'}</p></div><div><strong>Estado final</strong><p>{study.statusDetail}</p></div></div></>}
 </div></aside></div>
}

function ReviewDrawer({review,onClose}:{review:any,onClose:()=>void}){
 return <div className="drawer-layer" onMouseDown={(e:any)=>{if(e.currentTarget===e.target)onClose()}}><aside className="drawer"><div className="drawer-head"><div><div className="drawer-badges"><Badge tone="info">Revisão secundária</Badge><span className="persistent-id">ID #{review.screeningId}</span></div><h2>{review.title}</h2><p>{review.authors}</p></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div><div className="drawer-body">
  <div className="metadata-grid"><div><span>Ano</span><strong>{review.year}</strong></div><div><span>Natureza</span><strong>Estudo secundário</strong></div><div><span>Uso na revisão</span><strong>Apoio teórico</strong></div><div><span>ID de triagem</span><strong>#{review.screeningId}</strong></div></div>
  <div className="drawer-section"><h3>DOI</h3><DoiLink doi={review.doi}/></div>
  <div className="drawer-section"><h3>Resumo</h3><p>{review.abstract||'Resumo não disponível nesta matriz.'}</p></div>
  <div className="drawer-section"><h3>Palavras-chave e termos documentados</h3><div className="chip-list">{(review.keywords||[]).map((k:string)=><span key={k}>{k}</span>)}</div></div>
  <div className="drawer-section"><h3>Uso metodológico</h3><p>{review.use||'Contextualização teórica e discussão comparativa.'}</p></div>
  <div className="drawer-section provenance-panel"><h3>Proveniência dos dados</h3><p>Identificação, DOI, autores, ano e natureza do estudo provêm da planilha final de rastreabilidade, vinculados pelo ID interno #{review.screeningId}. O resumo e os termos associados foram preservados para consulta e contextualização.</p></div>
 </div></aside></div>
}

export function CorpusPage(){
 const [q,setQ]=useState(''); const [scope,setScope]=useState<'final'|'all'|'excluded'>('final'); const [selected,setSelected]=useState<Study|null>(null); const [selectedReview,setSelectedReview]=useState<any|null>(null)
 const studies=reviewData.studies28 as unknown as Study[]
 const filtered=useMemo(()=>studies.filter(s=>{if(scope==='final'&&!s.finalIncluded)return false;if(scope==='excluded'&&s.finalIncluded)return false; const txt=[s.title,s.authors,s.area,s.techniques.join(' '),s.keywordsNormalized.join(' ')].join(' ').toLowerCase();return !q||txt.includes(q.toLowerCase())}),[studies,q,scope])
 return <>
  <PageHeader eyebrow="Síntese principal" title="Corpus final e estudos candidatos" description="Os 28 candidatos que chegaram à avaliação permanecem rastreáveis. O corpus analítico final contém 27 estudos; um estudo foi excluído na avaliação metodológica."/>
  <div className="stats-grid compact"><div className="mini-stat"><strong>27</strong><span>incluídos no corpus final</span></div><div className="mini-stat"><strong>1</strong><span>excluído metodologicamente</span></div><div className="mini-stat"><strong>6</strong><span>revisões secundárias de apoio</span></div></div>
  <SectionCard>
   <div className="table-toolbar"><label className="search-field"><Icon name="search"/><input value={q} onChange={(e:any)=>setQ(e.target.value)} placeholder="Buscar por título, autor, área, técnica ou palavra-chave"/></label><div className="segmented mini"><button className={scope==='final'?'active':''} onClick={()=>setScope('final')}>27 finais</button><button className={scope==='all'?'active':''} onClick={()=>setScope('all')}>28 candidatos</button><button className={scope==='excluded'?'active':''} onClick={()=>setScope('excluded')}>Excluído</button></div></div>
   <div className="study-grid">{filtered.map(s=><article className={'study-card '+(!s.finalIncluded?'excluded':'')} key={s.number} onClick={()=>setSelected(s)}><div className="study-card-top"><Badge tone={s.finalIncluded?'success':'danger'}>{s.finalIncluded?'Incluído':'Excluído'}</Badge><span>{s.year}</span></div><h3>{s.title}</h3><p>{s.authors}</p><div className="study-meta"><span><Icon name="layers" size={14}/>{s.area}</span><span><Icon name="quality" size={14}/>{s.quality.total}/14 · {s.quality.class}</span></div><div className="chip-list clamp">{s.techniques.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><button className="detail-link">Ver detalhes <Icon name="chevron" size={15}/></button></article>)}</div>
  </SectionCard>
  <SectionCard title="Revisões secundárias" subtitle="Seis estudos foram preservados como apoio teórico/comparativo e não integram a síntese principal."><div className="study-grid review-card-grid">{reviewData.reviews6.map((r:any)=><article className="study-card review-card" key={r.number} onClick={()=>setSelectedReview(r)}><div className="study-card-top"><Badge tone="info">Revisão secundária</Badge><span>{r.year}</span></div><h3>{r.title}</h3><p>{r.authors}</p><div className="study-meta"><span><Icon name="book" size={14}/>Apoio teórico/comparativo</span><span><Icon name="table" size={14}/>ID #{r.screeningId}</span></div>{r.keywords?.length>0&&<div className="chip-list clamp">{r.keywords.slice(0,4).map((k:string)=><span key={k}>{k}</span>)}</div>}<button className="detail-link">Ver detalhes <Icon name="chevron" size={15}/></button></article>)}</div></SectionCard>
  {selected&&<StudyDrawer study={selected} onClose={()=>setSelected(null)}/>} 
  {selectedReview&&<ReviewDrawer review={selectedReview} onClose={()=>setSelectedReview(null)}/>} 
 </>
}
