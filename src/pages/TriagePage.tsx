import { useMemo, useState } from 'react'
import { reviewData } from '../data'
import type { Study } from '../types'
import { Badge, DoiLink, PageHeader, SectionCard } from '../components/UI'
import { Icon } from '../components/Icon'

type Tab='route'|'screening'|'eligible'
const clean=(v:any)=>String(v??'')

type TraceRecord={id:number,title:string,year?:number,type?:string}

function tone(v:string){const s=v.toLowerCase();return s.includes('exclu')?'danger':s.includes('dúvida')?'warning':s.includes('revis')?'violet':'success'}

function TraceModal({record,onClose}:{record:TraceRecord,onClose:()=>void}){
 const route=(reviewData.route241 as any[]).find(r=>Number(r.ID)===record.id)
 const screen=(reviewData.screening36 as any[]).find(r=>Number(r.ID)===record.id)
 const eligible=(reviewData.eligible34 as any[]).find(r=>Number(r.ID)===record.id)
 const study=(reviewData.studies28 as unknown as Study[]).find(s=>s.screeningId===record.id)
 const review=(reviewData.reviews6 as any[]).find(r=>Number(r.screeningId)===record.id)
 const steps=[
  route&&{label:'Acesso aberto',decision:route['Decisão OA'],reason:route['Decisão OA']==='Excluir'?'Excluído por ausência de acesso aberto confirmado.':'Acesso aberto confirmado para continuidade da triagem.',source:'Rota 241 registros'},
  route&&!screen&&route['Decisão título']&&route['Decisão título']!=='Não avaliado'&&{label:'Leitura do título',decision:route['Decisão título'],reason:route['Critério título']||'',source:'Rota 241 registros'},
  screen&&{label:'Decisão pelo título',decision:screen['Decisão título'],reason:screen['Justificativa título']||screen['Critério título']||'',source:'Triagem 36'},
  screen&&{label:'Leitura do resumo',decision:screen['Decisão resumo'],reason:screen['Justificativa resumo']||screen['Critério resumo']||'',source:'Triagem 36'},
  screen&&{label:'Decisão final de triagem',decision:screen['Decisão final'],reason:screen['Justificativa final']||'',source:'Triagem 36'},
  eligible&&{label:'Natureza / destino metodológico',decision:eligible['Destino metodológico'],reason:eligible['Tipo documental']?`Tipo documental: ${eligible['Tipo documental']}.`:'',source:'Conjunto 34'},
  study&&{label:'Avaliação metodológica',decision:study.finalIncluded?'Incluído no corpus final':'Excluído na avaliação metodológica',reason:study.finalIncluded?`${study.quality.total}/14 — ${study.quality.class}.`:study.statusDetail,source:'Avaliação metodológica'}
 ].filter(Boolean) as {label:string,decision:string,reason:string,source:string}[]
 const history=study&&!study.finalIncluded?[
  {state:'Estado anterior',text:study.triage?.outcome||'Mantido como estudo primário após triagem.'},
  {state:'Estado final',text:study.statusDetail}
 ]:[]
 return <div className="modal-layer" role="dialog" aria-modal="true" onMouseDown={(e:any)=>{if(e.currentTarget===e.target)onClose()}}><div className="trace-modal">
  <div className="modal-head"><div><span className="persistent-id">ID interno #{record.id}</span><h2>{record.title}</h2><p>{record.year||''}{record.type?` · ${record.type}`:''}</p></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div>
  <div className="modal-body">
   <div className="trace-summary"><div><span>Base</span><strong>{reviewData.meta.database}</strong></div><div><span>Período da busca</span><strong>{reviewData.meta.searchPeriod}</strong></div><div><span>Identificador persistente</span><strong>#{record.id}</strong></div><div><span>Estado atual</span><strong>{study?(study.finalIncluded?'Corpus final':'Excluído metodologicamente'):review?'Revisão secundária':screen?.Desfecho||route?.Desfecho||'Triagem'}</strong></div></div>
   <section className="modal-section"><h3>Linha de decisão</h3><div className="decision-timeline">{steps.map((s,i)=><div className="decision-step" key={s.label+i}><div className="decision-marker">{i+1}</div><div><div className="decision-title"><strong>{s.label}</strong><Badge tone={tone(clean(s.decision)) as any}>{s.decision}</Badge></div>{s.reason&&<p>{s.reason}</p>}<small>Proveniência: {s.source}</small></div></div>)}</div></section>
   {history.length>0&&<section className="modal-section"><h3>Histórico de decisão</h3><div className="history-box">{history.map(h=><div key={h.state}><strong>{h.state}</strong><p>{h.text}</p></div>)}</div></section>}
   {screen&&<section className="modal-section"><h3>Evidências de triagem</h3><p className="modal-text">{screen.Resumo||'Resumo não registrado nesta etapa.'}</p>{screen['Palavras-chave']&&<><div className="chip-list">{clean(screen['Palavras-chave']).split(';').filter(Boolean).map((x:string)=><span key={x}>{x.trim()}</span>)}</div><small className="muted">Fonte das palavras-chave: {screen['Fonte das palavras-chave']||'não registrada'}</small></>}</section>}
   {eligible?.DOI&&<section className="modal-section"><h3>Identificação bibliográfica</h3><DoiLink doi={eligible.DOI}/></section>}
   <section className="modal-section provenance-panel"><h3>Proveniência</h3><p>As decisões de seleção vêm das abas de rastreabilidade da planilha final. Dados analíticos e avaliação metodológica são vinculados ao mesmo ID interno, preservando o encadeamento do registro entre as etapas.</p></section>
  </div>
 </div></div>
}

export function TriagePage(){
 const [tab,setTab]=useState<Tab>('route'); const [q,setQ]=useState(''); const [status,setStatus]=useState('todos'); const [page,setPage]=useState(1); const [selected,setSelected]=useState<TraceRecord|null>(null); const pageSize=20
 const data:any[]=tab==='route'?reviewData.route241:tab==='screening'?reviewData.screening36:reviewData.eligible34
 const filtered=useMemo(()=>data.filter((r:any)=>{
  const text=JSON.stringify(r).toLowerCase(); if(q&&!text.includes(q.toLowerCase())) return false
  if(status==='todos') return true
  const s=(r.Desfecho||r['Destino metodológico']||r['Decisão final']||'').toLowerCase(); return s.includes(status)
 }),[data,q,status])
 const pages=Math.max(1,Math.ceil(filtered.length/pageSize)); const rows=filtered.slice((page-1)*pageSize,page*pageSize)
 const setT=(t:Tab)=>{setTab(t);setQ('');setStatus('todos');setPage(1)}
 const open=(r:any)=>setSelected({id:Number(r.ID),title:r.Título,year:r.Ano,type:r['Tipo documental']||r.Tipo})
 return <>
  <PageHeader eyebrow="Rastreabilidade" title="Triagem e elegibilidade" description="Consulte os 241 registros recuperados, os 36 registros avaliados por resumo e o conjunto de 34 registros mantidos antes da separação por natureza. Clique em qualquer registro para abrir sua trajetória de decisão."/>
  <div className="segmented"><button className={tab==='route'?'active':''} onClick={()=>setT('route')}>Rota 241</button><button className={tab==='screening'?'active':''} onClick={()=>setT('screening')}>Triagem 36</button><button className={tab==='eligible'?'active':''} onClick={()=>setT('eligible')}>Conjunto 34</button></div>
  <SectionCard>
   <div className="table-toolbar"><label className="search-field"><Icon name="search"/><input value={q} onChange={(e:any)=>{setQ(e.target.value);setPage(1)}} placeholder="Buscar por título, decisão, critério..."/></label><select value={status} onChange={(e:any)=>{setStatus(e.target.value);setPage(1)}}><option value="todos">Todos os desfechos</option><option value="inclu">Incluídos / mantidos</option><option value="exclu">Excluídos</option><option value="revisão">Revisões</option></select><span className="result-count">{filtered.length} registros</span></div>
   <div className="table-scroll clickable-table">
    {tab==='route'&&<table><thead><tr><th>ID</th><th>Título</th><th>Ano</th><th>Tipo</th><th>Etapa máxima</th><th>Desfecho</th></tr></thead><tbody>{rows.map((r:any)=><tr key={r.ID} onClick={()=>open(r)}><td><span className="persistent-id">#{r.ID}</span></td><td className="title-cell">{r.Título}</td><td>{r.Ano}</td><td>{r['Tipo documental']}</td><td>{r['Etapa máxima']}</td><td><Badge tone={clean(r.Desfecho).toLowerCase().includes('exclu')?'danger':'info'}>{r.Desfecho}</Badge></td></tr>)}</tbody></table>}
    {tab==='screening'&&<table><thead><tr><th>ID</th><th>Título</th><th>Ano</th><th>Decisão título</th><th>Decisão resumo</th><th>Desfecho</th></tr></thead><tbody>{rows.map((r:any)=><tr key={r.ID} onClick={()=>open(r)}><td><span className="persistent-id">#{r.ID}</span></td><td className="title-cell"><strong>{r.Título}</strong></td><td>{r.Ano}</td><td>{r['Decisão título']}</td><td>{r['Decisão resumo']}</td><td><Badge tone={clean(r.Desfecho).toLowerCase().includes('exclu')?'danger':clean(r.Desfecho).toLowerCase().includes('revis')?'violet':'success'}>{r.Desfecho}</Badge></td></tr>)}</tbody></table>}
    {tab==='eligible'&&<table><thead><tr><th>ID</th><th>Título</th><th>Autores</th><th>Ano</th><th>Tipo</th><th>Destino metodológico</th></tr></thead><tbody>{rows.map((r:any)=><tr key={r.ID} onClick={()=>open(r)}><td><span className="persistent-id">#{r.ID}</span></td><td className="title-cell">{r.Título}</td><td>{r.Autores}</td><td>{r.Ano}</td><td>{r['Tipo documental']}</td><td>{r['Destino metodológico']}</td></tr>)}</tbody></table>}
   </div>
   <div className="pagination"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Anterior</button><span>Página {page} de {pages}</span><button disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Próxima</button></div>
  </SectionCard>
  {selected&&<TraceModal record={selected} onClose={()=>setSelected(null)}/>} 
 </>
}
