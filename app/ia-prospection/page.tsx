'use client'

import { useState } from 'react'
import { Card, CategoryBadge, EmptyState, PageHeader, Score } from '@/components/ui'

interface SearchResult {
  id: string
  name: string
  position: string
  company: string
  city: string
  category: 'vip' | 'middle_manager' | 'employee'
  score: number
  reason: string
  selected: boolean
}

const mockSearchResults: SearchResult[] = [
  {
    id: '7',
    name: 'Alimata Ouédraogo',
    position: 'Directrice des Ressources Humaines',
    company: 'Mairie de Ouagadougou',
    city: 'Ouagadougou',
    category: 'vip',
    score: 92,
    reason: "Très intéressée par l'immobilier pour le redéploiement de son personnel.",
    selected: false,
  },
  {
    id: '8',
    name: 'Ibrahim Compaoré',
    position: 'Gérant',
    company: 'Ets COMPAORE ET FRERES',
    city: 'Bobo-Dioulasso',
    category: 'middle_manager',
    score: 85,
    reason: 'Recherche active une maison familiale.',
    selected: false,
  },
  {
    id: '9',
    name: 'Salimata Zongo',
    position: 'Notaire',
    company: 'Étude ZONGO',
    city: 'Ouagadougou',
    category: 'vip',
    score: 90,
    reason: "A besoin d'une villa pour un déménagement proche.",
    selected: false,
  },
  {
    id: '10',
    name: 'Boureima Ilboudo',
    position: 'Chef de chantier',
    company: 'BTP FASO',
    city: 'Koudougou',
    category: 'employee',
    score: 55,
    reason: 'Cherche un logement locatif proche du travail.',
    selected: false,
  },
  {
    id: '11',
    name: 'Fatoumata Barry',
    position: 'Avocate',
    company: 'Cabinet BARRY LAW',
    city: 'Ouagadougou',
    category: 'vip',
    score: 88,
    reason: 'Intéressée par un immeuble pour ses bureaux.',
    selected: false,
  },
  {
    id: '12',
    name: 'Seydou Kouanda',
    position: 'Comptable',
    company: 'FIDUCIAIRE SA',
    city: 'Bobo-Dioulasso',
    category: 'employee',
    score: 60,
    reason: 'Recherche un appartement à acheter.',
    selected: false,
  },
  {
    id: '13',
    name: 'Halima Traoré',
    position: 'Directrice Marketing',
    company: 'ONATEL',
    city: 'Ouagadougou',
    category: 'vip',
    score: 94,
    reason: 'Veut investir dans des terrains à Ouaga.',
    selected: false,
  },
  {
    id: '14',
    name: 'Oumar Sankara',
    position: "Chef d'agence",
    company: 'Accès Banque',
    city: 'Ouagadougou',
    category: 'middle_manager',
    score: 72,
    reason: 'Cherche un duplex moderne.',
    selected: false,
  },
  {
    id: '15',
    name: 'Marie Sawadogo',
    position: 'Responsable Marketing',
    company: 'SGF',
    city: 'Bobo-Dioulasso',
    category: 'middle_manager',
    score: 78,
    reason: 'Cherche une villa à Bobo-Dioulasso.',
    selected: false,
  },
  {
    id: '16',
    name: 'Bernard Nignan',
    position: 'Entrepreneur',
    company: 'NIGNAN INVEST',
    city: 'Ouagadougou',
    category: 'vip',
    score: 86,
    reason: "Envisage d'acheter un terrain pour investissement.",
    selected: false,
  },
  {
    id: '17',
    name: 'Fanta Zongo',
    position: 'Enseignante',
    company: 'Université de Ouaga',
    city: 'Ouagadougou',
    category: 'employee',
    score: 52,
    reason: 'Recherche un logement étudiant.',
    selected: false,
  },
  {
    id: '18',
    name: 'Moussa Kaboré',
    position: 'Directeur Général',
    company: 'SOFITEX',
    city: 'Bobo-Dioulasso',
    category: 'vip',
    score: 91,
    reason: "Souhaite s'installer à Ouaga pour le travail.",
    selected: false,
  },
]

const categories = [
  { value: 'vip', label: 'VIP' },
  { value: 'middle_manager', label: 'Cadre moyen' },
  { value: 'employee', label: 'Employé' },
]

const sectorOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Privé' },
  { value: 'bank', label: 'Banque / Finance' },
  { value: 'ong', label: 'ONG / Associations' },
  { value: 'big', label: 'Grandes entreprises' },
  { value: 'sme', label: 'PME / Indépendant' },
]

const assetTypes = ['Maison familiale', 'Villa', 'Duplex', 'Appartement', 'Immeuble bureau', 'Terrain', 'Locatif']

const pipeline: { label: string }[] = [
  { label: 'Recherche' },
  { label: 'Qualification' },
  { label: 'Classement' },
]

export default function IaProspectionPage() {
  const [city, setCity] = useState('Ouagadougou')
  const [sector, setSector] = useState('')
  const [assetType, setAssetType] = useState('')
  const [category, setCategory] = useState('')
  const [count, setCount] = useState(10)
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [searchedFor, setSearchedFor] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const selectedCount = results?.filter((r) => r.selected).length ?? 0

  const runSearch = () => {
    setSearching(true)
    setResults(null)
    setNotice(null)
    const parts = [
      city,
      sector ? sectorOptions.find((s) => s.value === sector)?.label : null,
      assetType || null,
      category ? categories.find((c) => c.value === category)?.label : null,
      `${count} prospects`,
    ]
    setSearchedFor(parts.filter(Boolean).join(' · '))
    setTimeout(() => {
      const sliced = mockSearchResults
        .filter((r) => (!category || r.category === category) && (!city || r.city === city))
        .slice(0, count)
        .map((r) => ({ ...r, selected: false }))
      setResults(sliced)
      setSearching(false)
    }, 1500)
  }

  const toggle = (id: string) => {
    setResults((prev) => prev?.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)) ?? null)
  }

  const toggleAll = () => {
    if (!results?.length) return
    const allSelected = results.every((r) => r.selected)
    setResults(results.map((r) => ({ ...r, selected: !allSelected })))
  }

  const importSelected = () => {
    setNotice(`${selectedCount} prospect${selectedCount > 1 ? 's' : ''} importé${selectedCount > 1 ? 's' : ''} dans le CRM.`)
    setResults((prev) => prev?.filter((r) => !r.selected) ?? null)
    setTimeout(() => setNotice(null), 3000)
  }

  const cityOptions = ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou']

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prospection IA"
        subtitle="Trouvez des prospects qualifiés en fonction de vos critères puis importez les profils retenus dans le CRM."
      />

      {notice && (
        <div className="notice-bar">
          {notice}
        </div>
      )}

      <section>
        <p className="eyebrow mb-3">Pipeline de traitement</p>
        <Card className="p-5">
          <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
            {pipeline.map((step, i) => (
              <div key={step.label} className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-line bg-sand-50 px-4 py-3">
                  <span className="font-mono text-sm font-semibold text-ink-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-ink-900">{step.label}</span>
                </div>
                {i < pipeline.length - 1 && (
                  <svg className="mx-auto h-4 w-6 shrink-0 rotate-90 text-ink-400 md:mx-0 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-500">
            Le moteur cherche sur le web, qualifie chaque profil selon votre ICP puis le classe en <strong className="font-semibold text-ink-900">VIP</strong>,{' '}
            <strong className="font-semibold text-ink-900">Cadre moyen</strong> ou <strong className="font-semibold text-ink-900">Employé</strong> avec un score de pertinence.
          </p>
        </Card>
      </section>

      <section>
        <p className="eyebrow mb-3">Critères de recherche</p>
        <Card className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="field-label">Ville</label>
              <select className="field" value={city} onChange={(e) => setCity(e.target.value)}>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Secteur</label>
              <select className="field" value={sector} onChange={(e) => setSector(e.target.value)}>
                <option value="">Tous</option>
                {sectorOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Type de bien</label>
              <select className="field" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                <option value="">Tous</option>
                {assetTypes.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Catégorie</label>
              <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Toutes</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Nombre de prospects</label>
              <input
                type="number"
                className="field"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className="btn-primary" onClick={runSearch} disabled={searching}>
              {searching ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950 border-t-transparent" />
                  Recherche en cours…
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0zM10 6v8M6 10h8" />
                  </svg>
                  Lancer la recherche
                </>
              )}
            </button>
          </div>
        </Card>
      </section>

      {searching && (
        <Card className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <div className="relative">
            <div className="h-14 w-14 animate-pulse rounded-full border-2 border-forest-500" />
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
            </div>
          </div>
          <div>
            <p className="font-display text-base font-semibold text-ink-900">Recherche de prospects en cours…</p>
            <p className="mt-1 text-sm text-ink-400">Le moteur parcourt le web, qualifie les profils puis les classe selon votre ICP.</p>
          </div>
        </Card>
      )}

      {!searching && results === null && (
        <EmptyState
          title="Aucune recherche lancée"
          hint="Configurez vos critères puis lancez la recherche pour découvrir des prospects qualifiés (mode démo : résultats simulés)."
        />
      )}

      {!searching && results !== null && results.length === 0 && (
        <EmptyState
          title="Aucun résultat pour ces critères"
          hint="Élargissez la ville ou la catégorie, ou augmentez le nombre de prospects demandés."
          action={
            <button className="btn-primary" onClick={runSearch}>
              Relancer la recherche
            </button>
          }
        />
      )}

      {!searching && results && results.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-base font-semibold text-ink-950">Résultats de la recherche</p>
              <p className="font-mono text-xs text-ink-400">{searchedFor}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAll}
                className="rounded-md border border-line bg-white px-3 py-2 font-mono text-xs font-semibold text-ink-700 transition-colors hover:bg-sand-50"
              >
                {results.every((r) => r.selected) ? 'Tout désélectionner' : 'Tout sélectionner'}
              </button>
              <button className="btn-primary" onClick={importSelected} disabled={selectedCount === 0}>
                Importer ({selectedCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {results.map((r) => (
              <Card key={r.id} className="flex gap-4 p-5">
                <label className="relative flex cursor-pointer items-start pt-1">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={r.selected}
                    onChange={() => toggle(r.id)}
                  />
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-line bg-white transition-colors peer-checked:border-forest-950 peer-checked:bg-forest-950">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </label>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-ink-900">{r.name}</p>
                    <div className="flex items-center gap-2">
                      <CategoryBadge category={r.category} />
                      <span className="rounded-md bg-sand-100 px-2 py-0.5 font-mono text-xs font-semibold text-ink-700">{r.score}</span>
                    </div>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-500">
                    {r.position} · {r.company}
                  </p>
                  <p className="font-mono text-xs text-ink-400">{r.city}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-700">{r.reason}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}