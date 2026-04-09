import type { Metadata } from 'next'
import AuditLoi25Client from './AuditLoi25Client'
import { BASE_URL } from '@/lib/constants'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'

  const title = isFr
    ? 'Audit conformité Loi 25 — PME du Québec | Shop Compy'
    : 'Law 25 Compliance Audit — Quebec SMBs | Shop Compy'

  const description = isFr
    ? 'Audit de conformité Loi 25, PIPEDA et CASL pour PME du Québec. Trois forfaits prix fixes (499 / 999 / 1 999 $ CAD), livrés sous 7 jours.'
    : 'Law 25, PIPEDA and CASL compliance audit for Quebec SMBs. Three fixed-price packages ($499 / $999 / $1,999 CAD), delivered within 7 days.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/audit-loi25`,
      languages: {
        'fr-CA': `${BASE_URL}/fr/audit-loi25`,
        'en-CA': `${BASE_URL}/en/audit-loi25`,
      },
    },
  }
}

export default function AuditLoi25Page() {
  return <AuditLoi25Client />
}
