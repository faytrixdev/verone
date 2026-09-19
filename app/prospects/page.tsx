'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CategoryBadge, EmptyState, PageHeader, Score, StatusBadge } from '@/components/ui'

interface Prospect {
  id: string
  first_name: string
  last_name: string
  job_title: string | null
  company: string | null
  city: string
  category: 'vip' | 'middle_manager' | 'employee' | null
  score: number | null
  status: string
  phone: string | null
  email: string | null
  source: string | null
  created_at: string
}

const mockProspects: Prospect[] = [
  {
    id: '1',
    first_name: 'Jean',
    last_name: 'Dupont',
    job_title: 'Directeur Général',
    company: 'Banque Internationale du Burkina',
    city: 'Ouagadougou',
    category: 'vip',
    score: 95,
    status: 'new',
    source: 'API Exa',
    phone: '+226 70 12 34 56',
    email: 'j.dupont@bib.bf',
    created_at: new Date(Date.now() - 3 * 864e5).toISOString(),
  },
  {
    id: '2',
    first_name: 'Marie',
    last_name: 'Sawadogo',
    job_title: 'Responsable Marketing',
    company: 'Société Générale de Financement',
    city: 'Bobo-Dioulasso',
    category: 'middle_manager',
    score: 78,
    status: 'to_contact',
    source: 'API Serper',
    phone: '+226 70 98 76 54',
    email: 'm.sawadogo@sgfb.bf',
    created_at: new Date(Date.now() - 5 * 864e5).toISOString(),
  },
  {
    id: '3',
    first_name: 'Abdul',
    last_name: 'Traoré',
    job_title: 'Chef de Projet',
    company: 'Construction S.A.',
    city: 'Koudougou',
    category: 'middle_manager',
    score: 65,
    status: 'contacted',
    source: 'API Exa',
    phone: '+226 70 55 44 33',
    email: 'a.traore@construction-sa.bf',
    created_at: new Date(Date.now() - 10 * 864e5).toISOString(),
  },
  {
    id: '4',
    first_name: 'François',
    last_name: 'Kaboré',
    job_title: 'Agent Commercial',
    company: 'Immobilière du Faso',
    city: 'Ouagadougou',
    category: 'employee',
    score: 42,
    status: 'interested',
    source: 'API Serper',
    phone: '+226 70 22 33 44',
    email: 'f.kabore@imofaso.bf',
    created_at: new Date(Date.now() - 15 * 864e5).toISOString(),
  },
  {
    id: '5',
    first_name: 'Colette',
    last_name: 'Youme',
    job_title: 'Cadre supérieure',
    company: "Ministère de l'Économie",
    city: 'Ouagadougou',
    category: 'vip',
    score: 88,
    status: 'client',
    source: 'API Exa',
    phone: '+226 70 77 88 99',
    email: 'c.youme@economie.bf',
    created_at: new Date(Date.now() - 20 * 864e5).toISOString(),
  },
  {
    id: '6',
    first_name: 'Pierre',
    last_name: 'Nikiema',
    job_title: 'Entrepreneur',
    company: 'Entreprise BTP',
    city: 'Bobo-Dioulasso',
    category: 'employee',
    score: 30,
    status: 'not_interested',
    source: 'API Serper',
    phone: '+226 70 11 22 33',
    email: 'p.nikiema@btp.bf',
    created_at: new Date(Date.now() - 25 * 864e5).toISOString(),
  },
]

const cities = ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou']

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [city, setCity] = useState('')
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchProspects = async () => {
      const { data, error } = await supabase.from('prospects').select('*')
      if (cancelled) return
      if (error || !data) {
        setProspects(mockProspects)
      } else {
        setProspects(data as Prospect[])
      }
      setLoading(false)
    }

    fetchProspects()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = prospects.filter((p) => {
    const q = search.trim().toLowerCase()
    const matchSearch =
      !q ||
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) ||
      (p.company || '').toLowerCase().includes(q)
    const matchCategory = !category || p.category === category
    const matchStatus = !status || p.status === status
    const matchCity = !city || p.city === city
    return matchSearch && matchCategory && matchStatus && matchCity
  })

  const handleImport = (prospect: Prospect) => {
    setNotice(`« ${prospect.first_name} ${prospect.last_name} » ajouté au CRM.`)
    setTimeout(() => setNotice(null), 3000)
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-forest-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prospects"
        subtitle={`${filtered.length} fiche(s) sur ${prospects.length}`}
        action={
          <button
            className="btn-primary"
            onClick={() => setNotice('Le formulaire d\'ajout manuel arrive dans la prochaine étape.')}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau prospect
          </button>
        }
      />

      {notice && (
        <div className="notice-bar">
          {notice}
        </div>
      )}

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="field-label">Recherche</label>
            <input
              type="text"
              className="field"
              placeholder="Nom, entreprise…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">Catégorie</label>
            <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Toutes</option>
              <option value="vip">VIP</option>
              <option value="middle_manager">Cadre moyen</option>
              <option value="employee">Employé</option>
            </select>
          </div>
          <div>
            <label className="field-label">Statut</label>
            <select className="field" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tous</option>
              <option value="new">Nouveau</option>
              <option value="to_contact">À contacter</option>
              <option value="contacted">Contacté</option>
              <option value="interested">Intéressé</option>
              <option value="client">Client</option>
              <option value="not_interested">Pas intéressé</option>
            </select>
          </div>
          <div>
            <label className="field-label">Ville</label>
            <select className="field" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Toutes</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun prospect ne correspond aux critères"
          hint="Modifiez les filtres ou lancez une recherche IA pour découvrir de nouveaux profils."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-sand-50">
                  <th className="eyebrow px-5 py-3 font-semibold">Prospect</th>
                  <th className="eyebrow hidden px-5 py-3 font-semibold md:table-cell">Entreprise</th>
                  <th className="eyebrow hidden px-5 py-3 font-semibold lg:table-cell">Ville</th>
                  <th className="eyebrow px-5 py-3 font-semibold">Catégorie</th>
                  <th className="eyebrow px-5 py-3 font-semibold">Score</th>
                  <th className="eyebrow hidden px-5 py-3 font-semibold sm:table-cell">Statut</th>
                  <th className="eyebrow hidden px-5 py-3 font-semibold lg:table-cell">Source</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-sand-50">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-ink-900">{p.first_name} {p.last_name}</p>
                      <p className="text-xs text-ink-400">{p.job_title || '—'}</p>
                    </td>
                    <td className="hidden px-5 py-3.5 text-ink-500 md:table-cell">{p.company || '—'}</td>
                    <td className="hidden px-5 py-3.5 text-ink-500 lg:table-cell">{p.city}</td>
                    <td className="px-5 py-3.5"><CategoryBadge category={p.category} /></td>
                    <td className="px-5 py-3.5"><Score score={p.score} /></td>
                    <td className="hidden px-5 py-3.5 sm:table-cell"><StatusBadge status={p.status} /></td>
                    <td className="hidden px-5 py-3.5 font-mono text-xs text-ink-400 lg:table-cell">{p.source || '—'}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleImport(p)}
                        className="rounded-md px-2.5 py-1.5 font-mono text-xs font-semibold text-ink-500 transition-colors hover:bg-sand-100 hover:text-ink-900"
                      >
                        Importer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}