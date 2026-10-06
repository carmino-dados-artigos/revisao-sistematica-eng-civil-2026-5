import type { ReactNode } from 'react'
import { Icon } from './Icon'

export function PageHeader({eyebrow,title,description,actions}:{eyebrow?:string,title:string,description:string,actions?:ReactNode}){
 return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{actions&&<div className="page-actions">{actions}</div>}</div>
}
export function StatCard({label,value,note,tone='blue',icon}:{label:string,value:string|number,note?:string,tone?:string,icon?:Parameters<typeof Icon>[0]['name']}){
 return <div className={'stat-card tone-'+tone}><div className="stat-top"><span>{label}</span>{icon&&<Icon name={icon}/>}</div><strong>{value}</strong>{note&&<small>{note}</small>}</div>
}
export function SectionCard({title,subtitle,children,className=''}:{title?:string,subtitle?:string,children:ReactNode,className?:string}){
 return <section className={'section-card '+className}>{(title||subtitle)&&<div className="section-head">{title&&<h2>{title}</h2>}{subtitle&&<p>{subtitle}</p>}</div>}<div className="section-body">{children}</div></section>
}
export function Badge({children,tone='neutral'}:{children:ReactNode,tone?:'success'|'warning'|'danger'|'info'|'violet'|'neutral'}){
 return <span className={'badge badge-'+tone}>{children}</span>
}
export function DoiLink({doi}:{doi?:string}){
 if(!doi) return <span className="muted">DOI não informado</span>
 return <a className="doi-link" href={'https://doi.org/'+doi} target="_blank" rel="noreferrer">{doi}<Icon name="external" size={14}/></a>
}
export function Empty({text}:{text:string}){return <div className="empty"><Icon name="info"/><span>{text}</span></div>}
