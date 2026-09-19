'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, EmptyState, PageHeader, TypeBadge } from '@/components/ui'

interface Property {
  id: string
  title: string
  description: string | null
  type: 'villa' | 'house' | 'duplex' | 'apartment' | 'building' | 'office' | 'land' | 'other'
  price: number
  currency: string
  city: string
  neighborhood: string | null
  bedrooms: number | null
  bathrooms: number | null
  surface: number | null
  status: 'available' | 'under_contract' | 'sold' | 'rented' | 'off_market'
  created_at: string
}

const mockProperties: Property[] = [
  {
    id: 'p1',
    title: 'Villa moderne 4 chambres',
    description: 'Villa moderne avec jardin, proche du quartier des affaires.',
    type: 'villa',
    price: 95000000,
    currency: 'XOF',
    city: 'Ouagadougou',
    neighborhood: 'Ouaga 2000',
    bedrooms: 4,
    bathrooms: 3,
    surface: 350,
    status: 'available',
    created_at: new Date(Date.now() - 2 * 864e5).toISOString(),
  },
  {
    id: 'p2',
    title: 'Appartement standing 3 pièces',
    description: 'Appartement au cœur du centre-ville, résidence sécurisée.',
    type: 'apartment',
    price: 35000000,
    currency: 'XOF',
    city: 'Bobo-Dioulasso',
    neighborhood: 'Centre-ville',
    bedrooms: 2,
    bathrooms: 1,
    surface: 120,
    status: 'available',
    created_at: new Date(Date.now() - 6 * 864e5).toISOString(),
  },
  {
    id: 'p3',
    title: 'Duplex familial 5 chambres',
    description: 'Duplex spacieux dans un quartier calme et résidentiel.',
    type: 'duplex',
    price: 120000000,
    currency: 'XOF',
    city: 'Ouagadougou',
    neighborhood: 'Karpala',
    bedrooms: 5,
    bathrooms: 4,
    surface: 420,
    status: 'available',
    created_at: new Date(Date.now() - 12 * 864e5).toISOString(),
  },
  {
    id: 'p4',
    title: 'Immeuble commercial',
    description: 'Immeuble de bureaux en plein centre, idéal pour les sociétés.',
    type: 'building',
    price: 450000000,
    currency: 'XOF',
    city: 'Ouagadougou',
    neighborhood: 'Centre-ville',
    bedrooms: null,
    bathrooms: null,
    surface: 900,
    status: 'available',
    created_at: new Date(Date.now() - 20 * 864e5).toISOString(),
  },
  {
    id: 'p5',
    title: 'Maison traditionnelle rénovée',
    description: 'Maison avec cour, rénovée, dans un quartier populaire.',
    type: 'house',
    price: 25000000,
    currency: 'XOF',
    city: 'Koudougou',
    neighborhood: 'Zakin',
    bedrooms: 3,
    bathrooms: 2,
    surface: 180,
    status: 'under_contract',
    created_at: new Date(Date.now() - 30 * 864e5).toISOString(),
  },
  {
    id: 'p6',
    title: 'Terrain à bâtir 600 m²',
    description: 'Terrain plat titré, parfait pour construire une villa.',
    type: 'land',
    price: 15000000,
    currency: 'XOF',
    city: 'Ouagadougou',
    neighborhood: 'Ouaga 2000',
    bedrooms: null,
    bathrooms: null,
    surface: 600,
    status: 'available',
    created_at: new Date(Date.now() - 40 * 864e5).toISOString(),
  },
  {
    id: 'p7',
    title: 'Appartement locatif',
    description: 'Appartement meublé, loué 350 000 FCFA/mois.',
    type: 'apartment',
    price: 350000,
    currency: 'XOF',
    city: 'Bobo-Dioulasso',
    neighborhood: 'Accart-Ville',
    bedrooms: 2,
    bathrooms: 1,
    surface: 90,
    status: 'rented',
    created_at: new Date(Date.now() - 45 * 864e5).toISOString(),
  },
]

const statusMap: Record<string, { label: string; cls: string }> = {
  available: { label: 'Disponible', cls: 'bg-forest-950 text-white border-forest-950' },
  under_contract: { label: 'Sous compromis', cls: 'bg-sand-100 text-ink-700 border' },
  sold: { label: 'Vendu', cls: 'bg-white text-ink-500 border' },
  rented: { label: 'Loué', cls: 'bg-white text-ink-500 border' },
  off_market: { label: 'Retiré', cls: 'bg-white text-ink-400 border' },
}

const typeOptions = [
  { value: '', label: 'Tous les types' },
  { value: 'villa', label: 'Villa' },
  { value: 'house', label: 'Maison' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'apartment', label: 'Appartement' },
  { value: 'building', label: 'Immeuble' },
  { value: 'office', label: 'Bureau' },
  { value: 'land', label: 'Terrain' },
]

const cityOptions = ['Toutes les villes', 'Ouagadougou', 'Bobo-Dioulasso', 'Koudougou']

const formatPrice = (price: number, currency: string) =>
  `${new Intl.NumberFormat('fr-FR').format(price)} ${currency}`

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    let cancelled = false

    const fetchProperties = async () => {
      const { data, error } = await supabase.from('properties').select('*')
      if (cancelled) return
      if (error || !data) {
        setProperties(mockProperties)
      } else {
        setProperties(data as Property[])
      }
      setLoading(false)
    }

    fetchProperties()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = properties.filter((p) => {
    const matchType = !typeFilter || p.type === typeFilter
    const matchStatus = !statusFilter || p.status === statusFilter
    const matchCity = !cityFilter || p.city === cityFilter
    return matchType && matchStatus && matchCity
  })

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
        title="Biens"
        subtitle={`${filtered.length} bien(s) sur ${properties.length}`}
        action={
          <button
            className="btn-primary"
            onClick={() => alert("L'ajout manuel d'un bien arrive dans la prochaine étape.")}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau bien
          </button>
        }
      />

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="field-label">Type</label>
            <select className="field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {typeOptions.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Statut</label>
            <select className="field" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="under_contract">Sous compromis</option>
              <option value="sold">Vendu</option>
              <option value="rented">Loué</option>
              <option value="off_market">Retiré</option>
            </select>
          </div>
          <div>
            <label className="field-label">Ville</label>
            <select className="field" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
              {cityOptions.map((c) => (
                <option key={c} value={c === 'Toutes les villes' ? '' : c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun bien ne correspond aux filtres"
          hint="Modifiez les filtres pour afficher d'autres biens immobiliers."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((p) => {
            const status = statusMap[p.status] || { label: p.status, cls: 'bg-ink-950/5 text-ink-500 border-ink-950/10' }
            return (
              <Card key={p.id} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold text-ink-950">{p.title}</p>
                    <p className="font-mono text-xs text-ink-400">
                      {p.city}
                      {p.neighborhood ? ` · ${p.neighborhood}` : ''}
                    </p>
                  </div>
                  <span className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${status.cls}`}>
                    {status.label}
                  </span>
                </div>

                {p.description && <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.description}</p>}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <TypeBadge type={p.type} />
                  {p.bedrooms !== null && (
                    <span className="rounded-md border border-ink-950/10 bg-ink-950/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-700">
                      {p.bedrooms} ch.
                    </span>
                  )}
                  {p.surface !== null && (
                    <span className="rounded-md border border-ink-950/10 bg-ink-950/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-700">
                      {p.surface} m²
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-sand-100 pt-4">
                  <span className="font-mono text-lg font-semibold text-ink-950">{formatPrice(p.price, p.currency)}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
                    {p.status === 'rented' ? 'Loyer mensuel' : p.status === 'sold' || p.status === 'under_contract' ? 'Prix de vente' : 'Prix'}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}