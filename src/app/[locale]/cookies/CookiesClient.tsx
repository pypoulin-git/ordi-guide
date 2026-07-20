'use client'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function CookiesClient() {
  const { t, locale } = useTranslation()
  const isFr = locale === 'fr'

  const openCookieManager = () => {
    window.dispatchEvent(new Event('manage-cookies'))
  }

  return (
    <>
      <PageHero
        title={t.cookies.cookiesTitle}
        subtitle={t.cookies.cookiesLastUpdated}
        gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)"
      />

      <section className="section">
        <div className="container max-w-3xl mx-auto space-y-8">
          {/* Intro */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? "Un témoin (« cookie ») est un petit fichier déposé dans votre navigateur. Shop Compy en utilise le moins possible. Par défaut, seuls les témoins strictement nécessaires au fonctionnement du site sont actifs. Aucun témoin d'analyse ou de publicité n'est déposé sans votre consentement explicite, donné via la bannière de consentement."
                : 'A cookie is a small file stored in your browser. Shop Compy uses as few as possible. By default, only cookies strictly necessary for the site to work are active. No analytics or advertising cookie is placed without your explicit consent, given through the consent banner.'}
            </p>
          </div>

          {/* Categories table */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-4 text-[var(--text)]">
              {isFr ? 'Catégories de témoins' : 'Cookie categories'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 pr-4 font-semibold text-[var(--text)]">
                      {isFr ? 'Catégorie' : 'Category'}
                    </th>
                    <th className="py-2 pr-4 font-semibold text-[var(--text)]">
                      {isFr ? 'Finalité' : 'Purpose'}
                    </th>
                    <th className="py-2 pr-4 font-semibold text-[var(--text)]">
                      {isFr ? 'Fournisseur' : 'Provider'}
                    </th>
                    <th className="py-2 font-semibold text-[var(--text)]">
                      {isFr ? 'Durée' : 'Duration'}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-subtle)]">
                  <tr className="border-b border-[var(--border)] align-top">
                    <td className="py-3 pr-4 font-medium text-[var(--text)]">
                      {isFr ? 'Essentiels' : 'Essential'}
                      <span className="block text-xs text-[var(--text-muted)] font-normal">
                        {isFr ? 'Toujours actifs' : 'Always on'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {isFr
                        ? 'Mémoriser votre langue et votre thème (clair/sombre), et votre choix de consentement.'
                        : 'Remember your language and theme (light/dark), and your consent choice.'}
                    </td>
                    <td className="py-3 pr-4">Shop Compy</td>
                    <td className="py-3">
                      {isFr ? '12 mois (stockage local)' : '12 months (local storage)'}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)] align-top">
                    <td className="py-3 pr-4 font-medium text-[var(--text)]">
                      {isFr ? 'Analytiques' : 'Analytics'}
                      <span className="block text-xs text-[var(--text-muted)] font-normal">
                        {isFr ? 'Consentement requis' : 'Consent required'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {isFr
                        ? 'Mesurer la fréquentation de façon anonyme (pages vues) pour améliorer le site. Aucune donnée personnelle.'
                        : 'Measure traffic anonymously (page views) to improve the site. No personal data.'}
                    </td>
                    <td className="py-3 pr-4">Vercel Analytics</td>
                    <td className="py-3">
                      {isFr ? 'Session (sans cookie persistant)' : 'Session (no persistent cookie)'}
                    </td>
                  </tr>
                  <tr className="align-top">
                    <td className="py-3 pr-4 font-medium text-[var(--text)]">
                      {isFr ? 'Publicitaires' : 'Advertising'}
                      <span className="block text-xs text-[var(--text-muted)] font-normal">
                        {isFr ? 'Consentement requis' : 'Consent required'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {isFr
                        ? 'Afficher des annonces pertinentes pour financer le projet, uniquement si vous acceptez.'
                        : 'Show relevant ads to fund the project, only if you accept.'}
                    </td>
                    <td className="py-3 pr-4">Google AdSense</td>
                    <td className="py-3">
                      {isFr ? "Jusqu'à 13 mois (Google)" : 'Up to 13 months (Google)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Managing consent */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Gérer ou retirer votre consentement' : 'Manage or withdraw your consent'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-4">
              {isFr
                ? 'Vous pouvez modifier vos préférences à tout moment, sans justification. Le retrait du consentement est aussi simple que son octroi.'
                : 'You can change your preferences at any time, without justification. Withdrawing consent is as easy as granting it.'}
            </p>
            <button
              type="button"
              onClick={openCookieManager}
              className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-[var(--accent)] text-sm font-medium text-[var(--accent)] hover:bg-[var(--bg-subtle)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ minHeight: '44px' }}
            >
              {isFr ? 'Gérer mes témoins' : 'Manage my cookies'}
            </button>
            <p className="text-[var(--text-muted)] text-sm mt-4">
              {isFr
                ? 'Vous pouvez aussi effacer les témoins déjà déposés directement dans les réglages de votre navigateur.'
                : 'You can also clear cookies already stored directly in your browser settings.'}
            </p>
          </div>

          {/* Related links */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'En savoir plus' : 'Learn more'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr ? 'Consultez notre ' : 'See our '}
              <Link
                href={`/${locale}/privacy`}
                className="text-[var(--accent)] font-medium hover:underline"
              >
                {isFr ? 'politique de confidentialité' : 'privacy policy'}
              </Link>
              {isFr
                ? ' pour le détail des données collectées et de vos droits sous la Loi 25 et la PIPEDA.'
                : ' for details on the data collected and your rights under Law 25 and PIPEDA.'}
            </p>
          </div>

          {/* Last updated */}
          <div className="text-center text-sm text-[var(--text-muted)] pb-4">
            {t.cookies.cookiesLastUpdated}
          </div>
        </div>
      </section>
    </>
  )
}
