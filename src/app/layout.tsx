import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aide achat ordinateur — Guide simple et clair',
  description: 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement pour que tu puisses magasiner en confiance.',
  keywords: 'ordinateur, achat, guide, aide, portable, bureau, budget, comparateur',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[--bg] text-[--text]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
