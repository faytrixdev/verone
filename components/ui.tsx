import type { ReactNode } from 'react'

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow mb-1.5">Verone Expertise &amp; Immobilier</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-950">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <Card className="flex flex-col gap-1 p-5">
      <span className="eyebrow">{label}</span>
      <span className="font-mono text-[2.5rem] font-semibold leading-none tracking-tight text-ink-950">{value}</span>
      {hint && <span className="mt-1 text-xs text-ink-400">{hint}</span>}
    </Card>
  )
}

const categoryMap: Record<string, { label: string; cls: string }> = {
  vip: { label: 'VIP', cls: 'bg-forest-950 text-white' },
  middle_manager: { label: 'Cadre moyen', cls: 'bg-sand-100 text-ink-700 border' },
  employee: { label: 'Employé', cls: 'bg-white text-ink-500 border' },
}

export function CategoryBadge({ category }: { category: string | null | undefined }) {
  if (!category || !categoryMap[category]) {
    return <span className="font-mono text-xs text-ink-400">—</span>
  }
  const cfg = categoryMap[category]
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

const statusMap: Record<string, { label: string; cls: string }> = {
  new: { label: 'Nouveau', cls: 'bg-white text-ink-700 border' },
  to_contact: { label: 'À contacter', cls: 'bg-white text-ink-700 border' },
  contacted: { label: 'Contacté', cls: 'bg-sand-100 text-ink-700 border' },
  interested: { label: 'Intéressé', cls: 'bg-sand-100 text-ink-700 border' },
  client: { label: 'Client', cls: 'bg-forest-950 text-white border-forest-950' },
  not_interested: { label: 'Pas intéressé', cls: 'bg-white text-ink-500 border' },
  inactive: { label: 'Inactif', cls: 'bg-white text-ink-400 border' },
}

export function StatusBadge({ status }: { status: string | null | undefined }) {
  const cfg = status && statusMap[status] ? statusMap[status] : { label: status || '—', cls: 'bg-white text-ink-500 border' }
  return (
    <span className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

export function Score({ score }: { score: number | null }) {
  if (score === null || score === undefined) return <span className="font-mono text-xs text-ink-400">—</span>
  return <span className="font-mono text-sm font-semibold text-ink-700">{score}</span>
}

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-ink-400">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
      </div>
      <p className="font-display text-base font-semibold text-ink-900">{title}</p>
      {hint && <p className="max-w-sm text-sm text-ink-400">{hint}</p>}
      {action}
    </Card>
  )
}

export function TypeBadge({ type }: { type: string | null }) {
  const map: Record<string, { label: string }> = {
    villa: { label: 'Villa' },
    house: { label: 'Maison' },
    duplex: { label: 'Duplex' },
    apartment: { label: 'Appartement' },
    building: { label: 'Immeuble' },
    office: { label: 'Bureau' },
    land: { label: 'Terrain' },
    other: { label: 'Autre' },
  }
  const cfg = type && map[type] ? map[type] : { label: type || '—' }
  return (
    <span className="inline-flex rounded-md border border-ink-950/10 bg-ink-950/5 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-ink-700">
      {cfg.label}
    </span>
  )
}