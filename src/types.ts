export type PageKey = 'visao' | 'busca' | 'fluxo' | 'triagem' | 'corpus' | 'resultados' | 'redes' | 'qualidade' | 'metodologia'

export interface Study {
  number: number
  screeningId: number
  title: string
  authors: string
  year: number
  doi: string
  documentType: string
  area: string
  abstract: string
  keywords: string[]
  keywordsNormalized: string[]
  keywordSource: string
  techniques: string[]
  finalIncluded: boolean
  status: string
  statusDetail: string
  quality: {
    objective: number; data: number; aiJustification: number; validation: number; metrics: number; limitations: number; reproducibility: number
    total: number; class: string
    justifications: Record<string,string>
  }
  triage: Record<string,string>
}
