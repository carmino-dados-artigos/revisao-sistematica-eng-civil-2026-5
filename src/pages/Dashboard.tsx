import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { reviewData } from '../data'
import { PageHeader, SectionCard, StatCard, Badge } from '../components/UI'
import { Icon } from '../components/Icon'
import type { PageKey } from '../types'

export function Dashboard({go}:{go:(p:PageKey)=>void}){
 const final=reviewData.studies28.filter((s:any)=>s.finalIncluded)
 const byYear=Object.entries(final.reduce((a:any,s:any)=>{a[s.year]=(a[s.year]||0)+1;return a},{})).map(([year,count])=>({year,count})).sort((a,b)=>Number(a.year)-Number(b.year))
 const quality=[{name:'Alta',value:23},{name:'Média',value:4},{name:'Baixa',value:0}]
 const colors=['#16A34A','#D97706','#DC2626']
 const stages=[['Busca final',241,'busca'],['Acesso aberto',94,'fluxo'],['Triagem de resumo',36,'triagem'],['Elegíveis',34,'triagem'],['Candidatos primários',28,'corpus'],['Corpus final',27,'corpus']] as const
 return <>
  <PageHeader eyebrow="Painel da revisão" title="Rastreabilidade, resultados e redes do corpus" description="Explore o percurso metodológico desde a estratégia de busca até o corpus final, a avaliação de qualidade e as relações entre autores, áreas, técnicas e palavras-chave."/>
  <div className="stats-grid">
    <StatCard label="Registros da busca final" value={241} note="Terceira string Scopus" tone="blue" icon="database"/>
    <StatCard label="Acesso aberto" value={94} note="147 excluídos nessa etapa" tone="cyan" icon="eye"/>
    <StatCard label="Candidatos primários" value={28} note="Após separação de 6 revisões" tone="violet" icon="layers"/>
    <StatCard label="Corpus final" value={27} note="1 exclusão metodológica" tone="green" icon="check"/>
  </div>
  <SectionCard title="Fluxo consolidado" subtitle="Da terceira string de busca à composição final do corpus primário.">
    <div className="flow-strip">
      {stages.map(([label,value,page],i)=><div key={label} className="flow-node-wrap">
        <button className={'flow-node '+(i===stages.length-1?'final':'')} onClick={()=>go(page as PageKey)}><strong>{value}</strong><span>{label}</span></button>
        {i<stages.length-1&&<div className="flow-arrow">→</div>}
      </div>)}
    </div>
    <div className="callout info"><Icon name="info"/><div><strong>Decisão metodológica final</strong><p>O estudo “Strain Decay Monitoring and Analytical Prediction...” chegou à avaliação metodológica, mas foi excluído porque o método principal não aplica IA; sua ocorrência permanece visível para preservar a rastreabilidade.</p></div></div>
  </SectionCard>
  <div className="two-col">
    <SectionCard title="Publicações por ano" subtitle="27 estudos primários finais.">
      <div className="chart-box"><ResponsiveContainer width="100%" height="100%"><BarChart data={byYear}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="year"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" name="Estudos" fill="#1E6BFF" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
    </SectionCard>
    <SectionCard title="Qualidade metodológica" subtitle="Distribuição após a exclusão metodológica.">
      <div className="quality-summary"><div className="chart-box small"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={quality.filter(x=>x.value>0)} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={3}>{quality.filter(x=>x.value>0).map((_,i)=><Cell key={i} fill={colors[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><strong>27</strong><span>avaliados</span></div></div><div className="quality-legend">{quality.map((q,i)=><div key={q.name}><span className="dot" style={{background:colors[i]}}/><span>{q.name}</span><strong>{q.value}</strong></div>)}</div></div>
    </SectionCard>
  </div>
  <SectionCard title="O que pode ser explorado" subtitle="A interface foi organizada para permitir auditoria e leitura analítica do mesmo conjunto de dados.">
    <div className="feature-grid">
      <button onClick={()=>go('busca')}><Icon name="code"/><strong>Strings de busca</strong><span>Três refinamentos completos e reproduzíveis.</span></button>
      <button onClick={()=>go('corpus')}><Icon name="book"/><strong>Estudos e DOI</strong><span>Consulta individual sem armazenar PDFs.</span></button>
      <button onClick={()=>go('resultados')}><Icon name="chart"/><strong>Gráficos</strong><span>Áreas, técnicas, anos e qualidade.</span></button>
      <button onClick={()=>go('redes')}><Icon name="network"/><strong>Redes</strong><span>Autores, palavras-chave, áreas e técnicas.</span></button>
    </div>
  </SectionCard>
  <div className="source-note"><Badge tone="info">Fonte principal</Badge> Planilha final consolidada; os 28 PDFs foram utilizados como material de conferência e não são distribuídos pelo site.</div>
 </>
}
