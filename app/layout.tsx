import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import Sidebar from '@/components/sidebar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata = {
  title: 'Verone Expertise & Immobilier',
  description: 'CRM immobilier avec prospection assistée par IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}>
      <body>
        <Sidebar />
        <div className="lg:pl-64">
          <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </body>
    </html>
  )
}