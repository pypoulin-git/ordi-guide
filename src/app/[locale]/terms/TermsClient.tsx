'use client'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { useTranslation } from '@/i18n/DictionaryContext'

export default function TermsClient() {
  const { t, locale } = useTranslation()
  const isFr = locale === 'fr'

  return (
    <>
      <PageHero
        title={t.terms.termsTitle}
        subtitle={t.terms.termsLastUpdated}
        gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)"
      />

      <section className="section">
        <div className="container max-w-3xl mx-auto space-y-8">

          {/* 1. Acceptance */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Acceptation des conditions' : 'Acceptance of Terms'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'En acc\u00e9dant au site Shop Compy (shopcompy.ca) et en l\u2019utilisant, vous acceptez d\u2019\u00eatre li\u00e9 par les pr\u00e9sentes conditions d\u2019utilisation. Si vous n\u2019acceptez pas ces conditions, veuillez ne pas utiliser le site.'
                : 'By accessing and using the Shop Compy website (shopcompy.ca), you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the site.'}
            </p>
          </div>

          {/* 2. Service description */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Description du service' : 'Description of Service'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Shop Compy est un guide d\u2019achat informatique gratuit destin\u00e9 aux consommateurs canadiens. Le site fournit des explications, des comparaisons et des recommandations personnalis\u00e9es pour aider les utilisateurs \u00e0 choisir un ordinateur adapt\u00e9 \u00e0 leurs besoins.'
                : 'Shop Compy is a free computer buying guide for Canadian consumers. The site provides explanations, comparisons, and personalized recommendations to help users choose a computer that fits their needs.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Shop Compy ne vend pas directement de produits. Lorsque vous cliquez sur un lien produit, vous \u00eates redirig\u00e9 vers le site d\u2019un d\u00e9taillant tiers (ex. Amazon, Best Buy, Canada Computers). Les prix affich\u00e9s sont en dollars canadiens (CAD) et peuvent varier selon le d\u00e9taillant et le moment de la consultation.'
                : 'Shop Compy does not sell products directly. When you click on a product link, you are redirected to a third-party retailer\u2019s website (e.g., Amazon, Best Buy, Canada Computers). Prices shown are in Canadian dollars (CAD) and may vary depending on the retailer and the time of viewing.'}
            </p>
          </div>

          {/* 3. Site usage */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Utilisation du site' : 'Site Usage'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Vous vous engagez \u00e0 utiliser le site de mani\u00e8re l\u00e9gitime et \u00e0 ne pas tenter de perturber son fonctionnement, d\u2019extraire son contenu de mani\u00e8re automatis\u00e9e (scraping), ou de l\u2019utiliser \u00e0 des fins ill\u00e9gales. Toute utilisation abusive peut entra\u00eener la restriction de votre acc\u00e8s.'
                : 'You agree to use the site in a legitimate manner and not to attempt to disrupt its operation, extract its content through automated means (scraping), or use it for illegal purposes. Any abusive use may result in restricted access.'}
            </p>
          </div>

          {/* 4. Affiliate links */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Liens affili\u00e9s' : 'Affiliate Links'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Certains liens vers des d\u00e9taillants pr\u00e9sents sur le site sont des liens d\u2019affiliation. Cela signifie que si vous effectuez un achat via ces liens, Shop Compy re\u00e7oit une petite commission de la part du d\u00e9taillant, sans frais suppl\u00e9mentaires pour vous.'
                : 'Some retailer links on the site are affiliate links. This means that if you make a purchase through these links, Shop Compy receives a small commission from the retailer, at no extra cost to you.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Nos recommandations restent bas\u00e9es sur la qualit\u00e9 des produits et vos besoins r\u00e9els, jamais sur les commissions. Les liens affili\u00e9s sont clairement identifi\u00e9s sur les pages produit.'
                : 'Our recommendations are always based on product quality and your real needs, never on commissions. Affiliate links are clearly identified on product pages.'}
            </p>
          </div>

          {/* 5. Intellectual property */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Propri\u00e9t\u00e9 intellectuelle' : 'Intellectual Property'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Le contenu du site (textes, illustrations, design, logo) est la propri\u00e9t\u00e9 de Shop Compy et est prot\u00e9g\u00e9 par les lois canadiennes sur le droit d\u2019auteur. Toute reproduction ou redistribution non autoris\u00e9e est interdite.'
                : 'The site\u2019s content (text, illustrations, design, logo) is the property of Shop Compy and is protected by Canadian copyright laws. Any unauthorized reproduction or redistribution is prohibited.'}
            </p>
          </div>

          {/* 6. AI-generated content */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Contenu g\u00e9n\u00e9r\u00e9 par l\u2019intelligence artificielle' : 'AI-Generated Content'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Shop Compy utilise l\u2019intelligence artificielle (Compy) pour analyser les produits, g\u00e9n\u00e9rer des recommandations et r\u00e9pondre aux questions des utilisateurs. Les r\u00e9ponses fournies par l\u2019IA sont \u00e0 titre informatif uniquement.'
                : 'Shop Compy uses artificial intelligence (Compy) to analyze products, generate recommendations, and answer user questions. Responses provided by the AI are for informational purposes only.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Ces informations ne constituent pas des conseils professionnels en informatique, en finances ou en consommation. Nous vous encourageons \u00e0 v\u00e9rifier les sp\u00e9cifications directement aupr\u00e8s du d\u00e9taillant avant tout achat.'
                : 'This information does not constitute professional advice in computing, finance, or consumer matters. We encourage you to verify specifications directly with the retailer before any purchase.'}
            </p>
          </div>

          {/* 7. Limitation of liability */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Limitation de responsabilit\u00e9' : 'Limitation of Liability'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed mb-3">
              {isFr
                ? 'Shop Compy fournit ses services \u00ab\u00a0tels quels\u00a0\u00bb, sans garantie d\u2019aucune sorte. Nous ne sommes pas responsables des d\u00e9cisions d\u2019achat prises sur la base des informations pr\u00e9sent\u00e9es sur le site.'
                : 'Shop Compy provides its services \u201cas is,\u201d without warranty of any kind. We are not responsible for purchasing decisions made based on the information presented on the site.'}
            </p>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'En aucun cas Shop Compy ne pourra \u00eatre tenu responsable de dommages directs, indirects, accessoires ou cons\u00e9cutifs d\u00e9coulant de l\u2019utilisation du site ou de l\u2019impossibilit\u00e9 de l\u2019utiliser.'
                : 'In no event shall Shop Compy be liable for any direct, indirect, incidental, or consequential damages arising from the use of the site or the inability to use it.'}
            </p>
          </div>

          {/* 8. Modifications */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Modifications des conditions' : 'Changes to These Terms'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Shop Compy se r\u00e9serve le droit de modifier ces conditions \u00e0 tout moment. Les modifications prennent effet d\u00e8s leur publication sur cette page. Nous vous encourageons \u00e0 consulter cette page r\u00e9guli\u00e8rement.'
                : 'Shop Compy reserves the right to modify these terms at any time. Changes take effect as soon as they are published on this page. We encourage you to review this page regularly.'}
            </p>
          </div>

          {/* 9. Governing law */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              {isFr ? 'Loi applicable' : 'Governing Law'}
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Les pr\u00e9sentes conditions sont r\u00e9gies par les lois de la province de Qu\u00e9bec et les lois f\u00e9d\u00e9rales du Canada qui s\u2019y appliquent. Tout litige sera soumis \u00e0 la comp\u00e9tence exclusive des tribunaux du district judiciaire de Qu\u00e9bec.'
                : 'These terms are governed by the laws of the Province of Quebec and the applicable federal laws of Canada. Any dispute shall be submitted to the exclusive jurisdiction of the courts of the judicial district of Quebec.'}
            </p>
          </div>

          {/* 10. Contact */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            <h2 className="text-xl font-bold mb-3 text-[var(--text)]">
              Contact
            </h2>
            <p className="text-[var(--text-subtle)] leading-relaxed">
              {isFr
                ? 'Pour toute question concernant ces conditions d\u2019utilisation, contactez-nous par courriel\u00a0:'
                : 'For any questions about these Terms of Service, contact us by email:'}
            </p>
            <p className="mt-2">
              <a href="mailto:support@shopcompy.ca"
                className="inline-flex items-center text-[var(--accent)] font-medium hover:underline"
                style={{ minHeight: '44px' }}>
                support@shopcompy.ca
              </a>
            </p>
          </div>

          {/* See also */}
          <div className="text-center text-sm text-[var(--text-muted)] pb-4 space-y-2">
            <p>{isFr ? 'Derni\u00e8re mise \u00e0 jour\u00a0: mars 2026' : 'Last updated: March 2026'}</p>
            <p>
              <Link href={`/${locale}/privacy`} className="text-[var(--accent)] hover:underline">
                {isFr ? 'Voir aussi\u00a0: Politique de confidentialit\u00e9' : 'See also: Privacy Policy'}
              </Link>
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
