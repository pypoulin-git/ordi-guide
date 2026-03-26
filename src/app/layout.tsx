import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AnalogyProvider } from '@/contexts/AnalogyContext'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shop Compy — Guide simple pour choisir ton ordinateur',
  description: 'Choisir un ordinateur n\'est pas compliqué. On t\'explique tout simplement pour que tu puisses magasiner en confiance. Zéro jargon, zéro pub.',
  keywords: 'ordinateur, achat, guide, aide, portable, bureau, budget, comparateur, Shop Compy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[--bg] text-[--text]">
        <AnalogyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AnalogyProvider>
      </body>
    </html>
  )
}
