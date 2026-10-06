import { useEffect, useState, type ReactNode } from 'react'
import type { PageKey } from './types'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { SearchStrategy } from './pages/SearchStrategy'
import { FlowPage } from './pages/FlowPage'
import { TriagePage } from './pages/TriagePage'
import { CorpusPage } from './pages/CorpusPage'
import { ResultsPage } from './pages/ResultsPage'
import { NetworksPage } from './pages/NetworksPage'
import { QualityPage } from './pages/QualityPage'
import { MethodologyPage } from './pages/MethodologyPage'

const valid:PageKey[]=['visao','busca','fluxo','triagem','corpus','resultados','redes','qualidade','metodologia']
function initialPage():PageKey{const h=window.location.hash.replace('#/','') as PageKey;return valid.includes(h)?h:'visao'}
export default function App(){
 const [page,setPageState]=useState<PageKey>(initialPage())
 const setPage=(p:PageKey)=>{setPageState(p);window.location.hash='/'+p;window.scrollTo({top:0,behavior:'smooth'})}
 useEffect(()=>{const f=()=>setPageState(initialPage());window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[])
 let content:ReactNode
 switch(page){case'busca':content=<SearchStrategy/>;break;case'fluxo':content=<FlowPage/>;break;case'triagem':content=<TriagePage/>;break;case'corpus':content=<CorpusPage/>;break;case'resultados':content=<ResultsPage/>;break;case'redes':content=<NetworksPage/>;break;case'qualidade':content=<QualityPage/>;break;case'metodologia':content=<MethodologyPage/>;break;default:content=<Dashboard go={setPage}/>}
 return <Layout page={page} setPage={setPage}>{content}</Layout>
}
