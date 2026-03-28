'use client'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function PrivacyClient() {
  const { t, locale } = useTranslation()
  const isFr = locale === 'fr'

  return (
    <>
      <PageHero
        title={t.privacy.privacyTitle}
        subtitle={t.privacy.privacyLastUpdated}
        gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)"
      />

      <section className="section">
        <div className="container max-w-3xl mx-auto space-y-8">

          {/* 1. Data collected */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Quelles données sont collectées' : 'What data is collected'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Shop Compy utilise Vercel Analytics pour mesurer la fréquentation du site. Ces données sont anonymes : aucune information personnelle n\'est collectée par défaut.'
                : 'Shop Compy uses Vercel Analytics to measure site traffic. This data is anonymous: no personal information is collected by default.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Si vous acceptez les cookies via la bannière, un espace publicitaire Google AdSense peut placer des cookies pour afficher des annonces pertinentes.'
                : 'If you accept cookies via the banner, a Google AdSense ad space may place cookies to display relevant ads.'}
            </p>
          </div>

          {/* 2. How data is used */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Comment les données sont utilisées' : 'How data is used'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Les données anonymes de fréquentation nous aident à comprendre quelles pages sont les plus utiles et à améliorer le contenu du site. Les cookies publicitaires, si acceptés, permettent d\'afficher des annonces plus pertinentes pour financer le projet.'
                : 'Anonymous traffic data helps us understand which pages are most useful and improve the site content. Advertising cookies, if accepted, allow for more relevant ads to be displayed to fund the project.'}
            </p>
          </div>

          {/* 3. Third-party services */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Services tiers' : 'Third-party services'}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-subtle)]">
              <li>
                <strong>Vercel</strong> — {isFr ? 'Hébergement et analytiques anonymes.' : 'Hosting and anonymous analytics.'}
              </li>
              <li>
                <strong>Google AdSense</strong> — {isFr ? 'Publicité (uniquement si consentement donné via la bannière cookies).' : 'Advertising (only if consent given via cookie banner).'}
              </li>
              <li>
                <strong>Google Gemini API</strong> — {isFr ? 'Moteur de recommandation pour le comparateur. Aucune donnée personnelle n\'est envoyée.' : 'Recommendation engine for the comparator. No personal data is sent.'}
              </li>
              <li>
                <strong>Stripe</strong> — {isFr ? 'Traitement des paiements pour le support expert et les dons. Vos informations de paiement sont gérées directement par Stripe.' : 'Payment processing for expert support and donations. Your payment information is handled directly by Stripe.'}
              </li>
            </ul>
          </div>

          {/* 4. Cookies */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              Cookies
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Par défaut, Shop Compy utilise uniquement des cookies essentiels au fonctionnement du site (préférence de langue, thème). Aucun cookie publicitaire ou de suivi n\'est placé sans votre consentement explicite.'
                : 'By default, Shop Compy only uses cookies essential to site operation (language preference, theme). No advertising or tracking cookies are placed without your explicit consent.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Si vous acceptez via la bannière cookies, Google AdSense peut placer des cookies pour personnaliser les annonces. Vous pouvez retirer votre consentement à tout moment en effaçant vos cookies de navigateur.'
                : 'If you accept via the cookie banner, Google AdSense may place cookies to personalize ads. You can withdraw your consent at any time by clearing your browser cookies.'}
            </p>
          </div>

          {/* 5. Your rights */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Vos droits' : 'Your rights'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'En vertu de la Loi sur la protection des renseignements personnels et les documents électroniques (PIPEDA) et de la Loi 25 du Québec, vous avez le droit de :'
                : 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec\'s Law 25, you have the right to:'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-subtle)]">
              <li>{isFr ? 'Accéder aux données que nous détenons sur vous' : 'Access any data we hold about you'}</li>
              <li>{isFr ? 'Demander la correction de données inexactes' : 'Request correction of inaccurate data'}</li>
              <li>{isFr ? 'Demander la suppression de vos données' : 'Request deletion of your data'}</li>
              <li>{isFr ? 'Retirer votre consentement aux cookies à tout moment' : 'Withdraw your cookie consent at any time'}</li>
            </ul>
          </div>

          {/* 6. Contact */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              Contact
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Pour toute question relative à la confidentialité de vos données, contactez-nous par courriel :'
                : 'For any questions about your data privacy, contact us by email:'}
            </p>
            <p className="mt-2">
              <a href="mailto:support@shopcompy.ca"
                className="inline-flex items-center text-[var(--accent)] font-medium hover:underline"
                style={{ minHeight: '44px' }}>
                support@shopcompy.ca
              </a>
            </p>
          </div>

          {/* 7. Last updated */}
          <div className="text-center text-sm text-[var(--text-muted)] pb-4">
            {isFr ? 'Dernière mise à jour : mars 2026' : 'Last updated: March 2026'}
          </div>

        </div>
      </section>
    </>
  )
}
