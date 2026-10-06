import type { SVGProps } from 'react'
import {
  Home, Search, SlidersHorizontal, Database, GitBranch, Table2, BookOpen, BarChart3,
  Network, BadgeCheck, FlaskConical, ExternalLink, Copy, Check, X, Menu, Info,
  Code2, Download, GitFork, ChevronRight, Layers3, Users, Tag, BrainCircuit, Eye,
  Maximize2, type LucideIcon
} from 'lucide-react'

export type IconName = 'home'|'search'|'filter'|'database'|'flow'|'table'|'book'|'chart'|'network'|'quality'|'method'|'external'|'copy'|'check'|'x'|'menu'|'close'|'info'|'code'|'download'|'github'|'chevron'|'layers'|'users'|'tag'|'brain'|'eye'|'expand'

const icons: Record<IconName, LucideIcon> = {
  home: Home,
  search: Search,
  filter: SlidersHorizontal,
  database: Database,
  flow: GitBranch,
  table: Table2,
  book: BookOpen,
  chart: BarChart3,
  network: Network,
  quality: BadgeCheck,
  method: FlaskConical,
  external: ExternalLink,
  copy: Copy,
  check: Check,
  x: X,
  menu: Menu,
  close: X,
  info: Info,
  code: Code2,
  download: Download,
  github: GitFork,
  chevron: ChevronRight,
  layers: Layers3,
  users: Users,
  tag: Tag,
  brain: BrainCircuit,
  eye: Eye,
  expand: Maximize2
}

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & { name: IconName; size?: number }
export function Icon({name,size=19,...props}:IconProps){
  const LucideComponent = icons[name]
  return <LucideComponent size={size} strokeWidth={1.8} aria-hidden="true" {...props}/>
}
