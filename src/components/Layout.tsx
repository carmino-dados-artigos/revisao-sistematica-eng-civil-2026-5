import { useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import type { PageKey } from '../types'

const items: {key:PageKey,label:string,icon:Parameters<typeof Icon>[0]['name']}[] = [
  {key:'visao',label:'Visão geral',icon:'home'},
  {key:'busca',label:'Estratégia de busca',icon:'search'},
  {key:'fluxo',label:'Fluxo metodológico',icon:'flow'},
  {key:'triagem',label:'Triagem e elegibilidade',icon:'table'},
  {key:'corpus',label:'Corpus final',icon:'book'},
  {key:'resultados',label:'Resultados',icon:'chart'},
  {key:'redes',label:'Redes',icon:'network'},
  {key:'qualidade',label:'Avaliação metodológica',icon:'quality'},
  {key:'metodologia',label:'Metodologia',icon:'method'}
]

export function Layout({page,setPage,children}:{page:PageKey,setPage:(p:PageKey)=>void,children:ReactNode}){
  const [open,setOpen]=useState(false)
  return <div className="app-shell">
    <aside className={'sidebar '+(open?'open':'')}>
      <div className="brand">
        <div className="brand-mark"><img src="./wubi-icon.png" alt="Wubi Tecnologia da Informação" /></div>
        <div><strong>IA & Engenharia Civil</strong><span>Revisão sistemática exploratória</span><small>Wubi Tecnologia da Informação</small></div>
      </div>
      <nav className="nav-list" aria-label="Navegação principal">
        {items.map(item=><button key={item.key} className={'nav-item '+(page===item.key?'active':'')} onClick={()=>{setPage(item.key);setOpen(false)}}>
          <Icon name={item.icon}/><span>{item.label}</span>
        </button>)}
      </nav>
      <div className="sidebar-foot">
        <div className="tiny-label">CORPUS FINAL</div>
        <div className="sidebar-kpi"><strong>27</strong><span>estudos primários</span></div>
        <div className="sidebar-note">1 exclusão metodológica após a avaliação dos 28 candidatos.</div>
      </div>
    </aside>
    {open && <button className="scrim" onClick={()=>setOpen(false)} aria-label="Fechar menu"/>}
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setOpen(v=>!v)}><Icon name={open?'close':'menu'}/></button>
        <div className="top-title"><span>Aplicações da IA na Engenharia Civil</span><small>Scopus · revisão sistemática exploratória</small></div>
        <a className="ghost-link" href="https://github.com/carmino-dados-artigos/revisao-sistematica-eng-civil-2026-5" target="_blank" rel="noreferrer" title="Repositório complementar"><Icon name="github"/>GitHub</a>
      </header>
      <div className="content">{children}</div>
      <footer className="footer"><span>Dados consolidados da revisão · PRISMA 2020 · Scopus</span><span>Wubi Tecnologia da Informação · Interface estática para GitHub Pages</span></footer>
    </main>
  </div>
}
