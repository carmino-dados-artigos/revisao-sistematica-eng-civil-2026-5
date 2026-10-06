import { reviewData } from '../data'
import { PageHeader, SectionCard } from '../components/UI'

export function FlowPage(){
 const rows=reviewData.flow.filter((r:any)=>r.Etapa)
 return <>
  <PageHeader eyebrow="Processo de seleção" title="Fluxo metodológico" description="Cada etapa conserva sua entrada, procedimento, exclusões ou separações, saída e observação de controle."/>
  <SectionCard>
   <div className="method-flow-list">{rows.map((r:any,i:number)=><div key={i} className="method-flow-row"><div className="method-index">{i+1}</div><div className="method-name"><strong>{r.Etapa}</strong><span>{r.Procedimento}</span></div><div className="method-number"><small>Entrada</small><strong>{r.Entrada}</strong></div><div className="method-excluded"><small>Excluídos / separados</small><strong>{r['Excluídos/separados']}</strong></div><div className="method-number output"><small>Saída</small><strong>{r.Saída}</strong></div><div className="method-note">{r.Observação}</div></div>)}</div>
  </SectionCard>
  <SectionCard title="Leitura do fluxo" subtitle="A exclusão metodológica ocorre apenas após os 28 candidatos primários chegarem à avaliação.">
   <div className="big-sequence"><b>241</b><span>→</span><b>94</b><span>→</span><b>36</b><span>→</span><b>35</b><span>→</span><b>34</b><span>→</span><b>28</b><span>→</span><b className="accent">27</b></div>
  </SectionCard>
 </>
}
