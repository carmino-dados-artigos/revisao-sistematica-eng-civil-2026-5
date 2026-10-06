import { reviewData } from '../data'
import { PageHeader, SectionCard } from '../components/UI'
import { Icon } from '../components/Icon'

export function MethodologyPage(){return <>
 <PageHeader eyebrow="Método" title="Critérios, questões e proveniência" description="Síntese operacional da revisão sistemática exploratória e das regras usadas para compor o corpus."/>
 <div className="two-col">
  <SectionCard title="Parâmetros da revisão"><div className="definition-list"><div><span>Base</span><strong>{reviewData.meta.database}</strong></div><div><span>Período da busca</span><strong>{reviewData.meta.searchPeriod}</strong></div><div><span>Relato</span><strong>{reviewData.meta.reportingGuideline}</strong></div><div><span>Corpus final</span><strong>{reviewData.meta.finalPrimaryCount} estudos primários</strong></div><div><span>Revisões de apoio</span><strong>{reviewData.meta.secondaryReviewCount}</strong></div></div></SectionCard>
  <SectionCard title="Questões de pesquisa"><ol className="research-questions">{reviewData.researchQuestions.map((q:string,i:number)=><li key={q}><span>QP{i+1}</span><p>{q}</p></li>)}</ol></SectionCard>
 </div>
 <SectionCard title="Critérios de elegibilidade" subtitle="Regras preservadas conforme a planilha final."><div className="table-scroll"><table><thead><tr><th>Dimensão</th><th>Critério</th><th>Aplicação</th><th>Observação</th></tr></thead><tbody>{reviewData.criteria.map((r:any,i:number)=><tr key={i}><td><strong>{r.Dimensão}</strong></td><td>{r.Critério}</td><td>{r.Aplicação}</td><td>{r.Observação}</td></tr>)}</tbody></table></div></SectionCard>
 <SectionCard title="Proveniência dos dados" subtitle="Separação entre fonte quantitativa, evidência documental e texto interpretativo.">
  <div className="provenance-grid"><div><Icon name="table"/><strong>Planilha final</strong><p>Fonte de verdade para contagens, triagem, áreas, status e avaliação metodológica.</p></div><div><Icon name="book"/><strong>28 artigos</strong><p>Material de conferência para termos, técnicas e evidências; os PDFs não são redistribuídos no app.</p></div><div><Icon name="method"/><strong>Manuscrito</strong><p>Fonte complementar para questões de pesquisa, estrutura interpretativa e organização dos resultados.</p></div><div><Icon name="external"/><strong>DOI</strong><p>Identificador persistente usado para acesso à publicação original sem armazenar arquivos no GitHub Pages.</p></div></div>
 </SectionCard>
 <div className="callout info"><Icon name="info"/><div><strong>Integridade e rastreabilidade</strong><p>{reviewData.meta.dataNote}</p></div></div>
 </>}
