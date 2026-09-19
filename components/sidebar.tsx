'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const nav = [
  {
    href: '/',
    label: 'Tableau de bord',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    href: '/prospects',
    label: 'Prospects',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4m4 4a4 4 0 10-4-4m4 4h.01M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    href: '/ia-prospection',
    label: 'Prospection IA',
    badge: 'IA',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0zM10 6v8M6 10h8" />
      </svg>
    ),
  },
  {
    href: '/properties',
    label: 'Biens',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 21h20M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16m-10-8h4M9 9h.01M15 9h.01M15 13h.01M9 13h.01" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const items = (onNavigate?: () => void) =>
    nav.map((item) => {
      const active = isActive(item.href)
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            active
              ? 'bg-white/10 text-white'
              : 'text-white/65 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span className={active ? 'text-white' : 'text-white/40 group-hover:text-white/75'}>{item.icon}</span>
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-white/70">
              {item.badge}
            </span>
          )}
        </Link>
      )
    })

  const logo = (
    <div className="flex items-center gap-3 px-6 pb-8 pt-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-display text-sm font-bold tracking-tight text-white">
        VE
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-semibold tracking-tight">Verone</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Expertise &amp; Immobilier</p>
      </div>
    </div>
  )

  const demoCard = (
    <div className="m-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="eyebrow text-white/50">Mode démo</p>
      <p className="mt-1.5 text-xs leading-relaxed text-white/60">
        Recherche, qualification et classement simulateurs.
      </p>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0d1f18] text-white lg:flex">
        {logo}
        <nav className="flex-1 space-y-1 px-4">{items()}</nav>
        {demoCard}
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/5 bg-[#0d1f18] px-4 text-white lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-display text-xs font-bold tracking-tight text-white">
            VE
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-tight">Verone</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">Expertise &amp; Immobilier</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-[#0d1f18] text-white shadow-2xl">
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {logo}
            <nav className="flex-1 space-y-1 px-4">{items(() => setOpen(false))}</nav>
            {demoCard}
          </div>
        </div>
      )}
    </>
  )
}