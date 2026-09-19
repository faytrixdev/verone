'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, PageHeader, StatCard, StatusBadge, EmptyState } from '@/components/ui'

interface Stats {
  totalProspects: number
  newProspects: number
  vipProspects: number
  middleManagerProspects: number
  employeeProspects: number
  availableProperties: number
  opportunities: number
  pendingRequests: number
}

const mockStats: Stats = {
  totalProspects: 23,
  newProspects: 5,
  vipProspects: 3,
  middleManagerProspects: 8,
  employeeProspects: 12,
  availableProperties: 7,
  opportunities: 4,
  pendingRequests: 2,
}

const recent = [
  { name: 'Jean Dupont', detail: 'Directeur Général — Banque Internationale du Burkina', status: 'new' },
  { name: 'Marie Sawadogo', detail: 'Responsable Marketing — SGF', status: 'to_contact' },
  { name: 'Colette Youme', detail: 'Ministère de l\'Économie', status: 'interested' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setStats(mockStats)
    setLoading(false)
  }, [])

  if (loading || !stats) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-forest-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre activité commerciale et immobilière."
        action={
          <Link
            href="/ia-prospection"
            className="btn-primary"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0zM10 6v8M6 10h8" />
            </svg>
            Lancer une recherche
          </Link>
        }
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Prospects" value={stats.totalProspects} hint="au total commercialisé" />
        <StatCard label="Nouveaux" value={stats.newProspects} hint="à qualifier cette semaine" />
        <StatCard label="Opportunités" value={stats.opportunities} hint="affaires en cours" />
        <StatCard label="Biens disponibles" value={stats.availableProperties} hint="à la vente ou en location" />
      </section>

      <section>
        <p className="eyebrow mb-3">Répartition des prospects</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="flex items-center justify-between gap-4 p-5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-500">VIP</span>
            <span className="font-mono text-2xl font-semibold text-ink-950">{stats.vipProspects}</span>
          </Card>
          <Card className="flex items-center justify-between gap-4 p-5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-500">Cadres moyens</span>
            <span className="font-mono text-2xl font-semibold text-ink-950">{stats.middleManagerProspects}</span>
          </Card>
          <Card className="flex items-center justify-between gap-4 p-5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-500">Employés</span>
            <span className="font-mono text-2xl font-semibold text-ink-950">{stats.employeeProspects}</span>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-base font-semibold text-ink-950">Prospects récents</p>
            <Link href="/prospects" className="font-mono text-xs font-semibold tracking-wide text-ink-500 transition-colors hover:text-ink-900">
              Tout voir →
            </Link>
          </div>
          <div className="space-y-3">
            {recent.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-sand-50 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">{p.name}</p>
                  <p className="truncate text-xs text-ink-400">{p.detail}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-base font-semibold text-ink-950">Pipeline IA</p>
            <span className="rounded-full bg-sand-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink-500">— / 100</span>
          </div>
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-sand-100" />
          <p className="mt-4 text-sm leading-relaxed text-ink-500">
            Aucune campagne de prospection IA n&apos;a encore été lancée. Configurez vos critères pour découvrir de nouveaux prospects qualifiés.
          </p>
          <Link href="/ia-prospection" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-ink-700">
            <span className="rounded-md bg-sand-100 px-2 py-0.5 font-mono text-[11px] text-ink-500">Démarrer</span>
            Prospection IA →
          </Link>
        </Card>
      </section>

      {stats.pendingRequests > 0 && (
        <section>
          <p className="eyebrow mb-3">Demandes en attente</p>
          <EmptyState title={`${stats.pendingRequests} demande(s) à traiter`} hint="Les demandes immobilières seront disponibles dans la prochaine version." />
        </section>
      )}
    </div>
  )
}