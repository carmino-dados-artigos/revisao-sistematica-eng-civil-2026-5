import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { reviewData } from '../data'
import { PageHeader, SectionCard } from '../components/UI'
import type { Study } from '../types'

function countBy(items:string[]){const m=new Map<string,number>();items.forEach(x=>m.set(x,(m.get(x)||0)+1));return [...m].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name))}
export function ResultsPage(){
 const final=(reviewData.studies28 as unknown as Study[]).filter(s=>s.finalIncluded)
 const areas=useMemo(()=>countBy(final.map(s=>s.area)),[final])
 const tech=useMemo(()=>countBy(final.flatMap(s=>s.techniques)).slice(0,16),[final])
 const kw=useMemo(()=>countBy(final.flatMap(s=>s.keywordsNormalized)).slice(0,18),[final])
 const years=useMemo(()=>countBy(final.map(s=>String(s.year))).sort((a,b)=>Number(a.name)-Number(b.name)),[final])
 return <>
  <PageHeader eyebrow="Síntese descritiva" title="Resultados do corpus final" description="Visualizações produzidas exclusivamente a partir dos 27 estudos finais. Áreas seguem a classificação da avaliação metodológica; técnicas são identificadas quando explicitamente citadas em título, resumo ou termos-chave."/>
  <div className="two-col">
   <SectionCard title="Áreas de aplicação" subtitle="Classificações registradas na matriz metodológica."><div className="chart-box tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={areas} layout="vertical" margin={{left:12,right:20}}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" allowDecimals={false}/><YAxis dataKey="name" type="category" width={180} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="count" name="Estudos" fill="#1E6BFF" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer></div></SectionCard>
   <SectionCard title="Técnicas mais recorrentes" subtitle="Contagem por estudo; um estudo pode contribuir para mais de uma técnica."><div className="chart-box tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={tech} layout="vertical" margin={{left:12,right:20}}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" allowDecimals={false}/><YAxis dataKey="name" type="category" width={190} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="count" name="Estudos" fill="#0D4FD7" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer></div></SectionCard>
  </div>
  <div className="two-col">
   <SectionCard title="Termos-chave recorrentes" subtitle="Palavras-chave do artigo quando recuperadas; em ausência, termos documentados na triagem do resumo."><div className="chart-box tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={kw} layout="vertical" margin={{left:12,right:20}}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" allowDecimals={false}/><YAxis dataKey="name" type="category" width={190} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="count" name="Estudos" fill="#063A9A" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer></div></SectionCard>
   <SectionCard title="Distribuição temporal" subtitle="Ano de publicação dos 27 estudos finais."><div className="chart-box tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={years}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" name="Estudos" fill="#0B2D5B" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></SectionCard>
  </div>
  <SectionCard title="Leitura dos resultados" subtitle="Eixos analíticos consolidados no manuscrito e operacionalizados no aplicativo.">
   <div className="result-pill-grid"><div><strong>Previsão e classificação</strong><p>Modelos supervisionados, ensembles e redes neurais aparecem em problemas de desempenho, risco e resposta estrutural.</p></div><div><strong>Monitoramento e inspeção</strong><p>Visão computacional, sensores, modelos digitais e SHM ampliam a observação de estruturas e infraestruturas.</p></div><div><strong>Otimização e decisão</strong><p>Metaheurísticas, modelos híbridos e métodos multicritério apoiam projeto, logística, segurança e gestão.</p></div><div><strong>Integração de domínio</strong><p>BIM, GIS, gêmeos digitais e modelos fisicamente informados conectam IA a conhecimento técnico e processos de engenharia.</p></div></div>
  </SectionCard>
 </>
}
