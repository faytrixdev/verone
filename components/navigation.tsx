import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-y border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16l-4-4 4-4m0 0l4 4-4 4m0-4h12a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">CRM Immobilier</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary">
              Profil
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary">
              Déconnexion
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}