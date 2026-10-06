import { useMemo, useState } from 'react'
import { reviewData } from '../data'
import type { Study } from '../types'
import { Badge, PageHeader, SectionCard } from '../components/UI'
import { Icon } from '../components/Icon'

const criteria=[
 ['objective','Clareza do objetivo'],['data','Descrição dos dados'],['aiJustification','Justificativa da técnica de IA'],['validation','Validação ou comparação'],['metrics','Adequação das métricas'],['limitations','Discussão das limitações'],['reproducibility','Reprodutibilidade']
] as const
const jkey:Record<string,string>={objective:'objective',data:'data',aiJustification:'ai',validation:'validation',metrics:'metrics',limitations:'limitations',reproducibility:'reproducibility'}

function QualityModal({study,onClose}:{study:Study,onClose:()=>void}){
 const q=study.quality
 return <div className="modal-layer" role="dialog" aria-modal="true" onMouseDown={(e:any)=>{if(e.currentTarget===e.target)onClose()}}><div className="quality-modal">
  <div className="modal-head"><div><div className="drawer-badges"><span className="persistent-id">ID #{study.screeningId}</span><Badge tone={study.finalIncluded?'success':'danger'}>{study.finalIncluded?'Incluído':'Excluído'}</Badge></div><h2>{study.title}</h2><p>{study.area} · {study.year}</p></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div>
  <div className="modal-body">
   <div className="quality-result-banner"><div><span>Pontuação</span><strong>{q.total}/14</strong></div><div><span>Classe</span><Badge tone={q.class==='Alta'?'success':q.class==='Média'?'warning':'danger'}>{q.class}</Badge></div><div><span>Status final</span><strong>{study.finalIncluded?'Corpus final':'Excluído metodologicamente'}</strong></div></div>
   <section className="modal-section"><h3>Decisões por critério</h3><div className="quality-decision-list">{criteria.map(([key,label],i)=>{const score=q[key];const reason=q.justifications[jkey[key]]||'Justificativa não registrada.';return <div key={key}><div className="criterion-score"><span>{i+1}</span><div><strong>{label}</strong><p>{reason}</p></div><b>{score}/2</b></div></div>})}</div></section>
   <section className="modal-section"><h3>Como a classe foi obtida</h3><div className="calculation-line"><span>{criteria.map(([k])=>q[k]).join(' + ')}</span><strong>= {q.total}/14</strong><Icon name="chevron" size={16}/><Badge tone={q.class==='Alta'?'success':q.class==='Média'?'warning':'danger'}>{q.class}</Badge></div><p className="modal-text">Faixas utilizadas: 0–5 = baixa; 6–10 = média; 11–14 = alta.</p></section>
   {!study.finalIncluded&&<section className="modal-section"><h3>Histórico de decisão</h3><div className="history-box"><div><strong>Estado anterior</strong><p>{study.triage?.outcome||'Mantido como estudo primário após a triagem.'}</p></div><div><strong>Estado final</strong><p>{study.statusDetail}</p></div></div></section>}
   <section className="modal-section provenance-panel"><h3>Proveniência</h3><p>Pontuações e justificativas derivam da aba “Avaliação metodológica” da planilha final e permanecem vinculadas ao registro pelo ID interno #{study.screeningId}.</p></section>
  </div>
 </div></div>
}

export function QualityPage(){
 const [onlyFinal,setOnlyFinal]=useState(true); const [q,setQ]=useState(''); const [selected,setSelected]=useState<Study|null>(null)
 const studies=reviewData.studies28 as unknown as Study[]
 const rows=useMemo(()=>studies.filter(s=>(!onlyFinal||s.finalIncluded)&&(!q||[s.title,s.area,s.quality.class].join(' ').toLowerCase().includes(q.toLowerCase()))),[studies,onlyFinal,q])
 return <>
  <PageHeader eyebrow="Avaliação metodológica" title="Qualidade dos estudos" description="Sete critérios pontuados de 0 a 2. Classificação: 0–5 baixa; 6–10 média; 11–14 alta. Clique em um estudo para consultar as decisões que formaram a pontuação e a classe."/>
  <div className="stats-grid compact"><div className="mini-stat success"><strong>23</strong><span>alta qualidade</span></div><div className="mini-stat warning"><strong>4</strong><span>qualidade média</span></div><div className="mini-stat"><strong>0</strong><span>baixa qualidade</span></div><div className="mini-stat danger"><strong>1</strong><span>exclusão metodológica</span></div></div>
  <SectionCard>
   <div className="table-toolbar"><label className="search-field"><Icon name="search"/><input value={q} onChange={(e:any)=>setQ(e.target.value)} placeholder="Buscar estudo, área ou classe"/></label><label className="check-label"><input type="checkbox" checked={onlyFinal} onChange={(e:any)=>setOnlyFinal(e.target.checked)}/>Mostrar apenas 27 finais</label></div>
   <div className="table-scroll clickable-table"><table className="quality-table"><thead><tr><th>ID</th><th>Estudo</th><th>Área</th><th>Obj.</th><th>Dados</th><th>IA</th><th>Val.</th><th>Métr.</th><th>Lim.</th><th>Reprod.</th><th>Total</th><th>Classe</th><th>Status</th></tr></thead><tbody>{rows.map(s=><tr key={s.number} className={!s.finalIncluded?'row-excluded':''} onClick={()=>setSelected(s)}><td><span className="persistent-id">#{s.screeningId}</span></td><td className="title-cell">{s.title}</td><td>{s.area}</td><td>{s.quality.objective}</td><td>{s.quality.data}</td><td>{s.quality.aiJustification}</td><td>{s.quality.validation}</td><td>{s.quality.metrics}</td><td>{s.quality.limitations}</td><td>{s.quality.reproducibility}</td><td><strong>{s.quality.total}</strong></td><td><Badge tone={s.quality.class==='Alta'?'success':s.quality.class==='Média'?'warning':'danger'}>{s.quality.class}</Badge></td><td><Badge tone={s.finalIncluded?'success':'danger'}>{s.finalIncluded?'Incluído':'Excluído'}</Badge></td></tr>)}</tbody></table></div>
  </SectionCard>
  <SectionCard title="Critérios utilizados" subtitle="A avaliação é operacional e documentada por estudo."><div className="criteria-grid">{[
   ['Clareza do objetivo','Objetivo/proposta explicitado e delimitado.'],['Descrição dos dados','Origem, composição e elementos suficientes para compreender a base/experimento.'],['Justificativa da técnica de IA','Aplicação e justificativa da técnica em relação ao problema.'],['Validação ou comparação','Validação quantitativa, comparação, teste independente ou confronto experimental.'],['Adequação das métricas','Métricas coerentes com a tarefa e utilizadas na avaliação.'],['Discussão das limitações','Limitações do próprio estudo ou agenda de validação/pesquisa futura.'],['Reprodutibilidade','Detalhamento técnico e disponibilidade de dados, código, parâmetros ou informação operacional.']
  ].map(([a,b],i)=><div key={a}><span>{i+1}</span><div><strong>{a}</strong><p>{b}</p></div></div>)}</div></SectionCard>
  {selected&&<QualityModal study={selected} onClose={()=>setSelected(null)}/>} 
 </>
}
