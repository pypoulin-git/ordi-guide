# Rapport QA hebdo — 2026-04-27

## 1. TL;DR

État global : **dégradé** — pipeline catalogue cassé depuis 7 jours (cron muet). Site live OK (200 sur 11 routes), compliance remontée à **92%** (vs 90%). **8 issues créées** (1 critical, 4 medium, 3 low) · **2 auto-fix** commités. Pire incident : `/api/health/catalogue` `status=fail`, dernière run 166.6h.

## 2. 🔴 Bugs critiques

| Finding | Fichier | Issue |
| ------- | ------- | ----- |
| Cron catalogue cassé depuis 2026-04-20 (166h sans run) | `.github/workflows/*.yml` | [#1](https://github.com/pypoulin-git/ordi-guide/issues/1) |

## 3. 🟠 Anomalies

| Finding | Avant | Après | Issue |
| ------- | ----- | ----- | ----- |
| 2 URLs Apple génériques résiduelles | 4 (avant fix `4ce3577`) | 2 | [#5](https://github.com/pypoulin-git/ordi-guide/issues/5) |
| Pages FR sans `<meta name="description">` | 11/11 | 11/11 | [#2](https://github.com/pypoulin-git/ordi-guide/issues/2) |
| SearchBar `setInterval` sans clearInterval garanti | leak potentiel | inchangé | [#4](https://github.com/pypoulin-git/ordi-guide/issues/4) |
| Blog page : H1 → H3 skip (a11y WCAG 1.3.1) | présent | inchangé | [#6](https://github.com/pypoulin-git/ordi-guide/issues/6) |
| ProductCard `role="img"` redondant sur `<img>` | présent | inchangé | [#7](https://github.com/pypoulin-git/ordi-guide/issues/7) |

## 4. 🟡 Améliorations ROI > 2h

| Finding | Effort | Gain | Issue |
| ------- | ------ | ---- | ----- |
| CSP `report-uri` endpoint | 1h | Visibilité violations XSS | [#3](https://github.com/pypoulin-git/ordi-guide/issues/3) |
| Trusted Types directive (CSP) | 4h | Hardening anti-XSS | Tier 3 |
| Rate limit headers visibles | 2h | UX devs API | Tier 3 |

## 5. 📦 Dépendances

- Major bumps : aucun nouveau cette semaine.
- Vulns ≥ high : 0
- Vulns moderate : 2 (postcss < 8.4.31 XSS, follow-redirects auth leak) — `audit fix` requiert `--force` (breaking Next 9.3.3). Issue [#8](https://github.com/pypoulin-git/ordi-guide/issues/8).

## 6. 🔗 Vérification affiliés (12 produits)

> Échantillon non exécuté cette session — bot-gates Amazon/Walmart bloquent l'auto. Reportée à audit suivant avec Playwright headed (cf. plan virtual-meandering-backus §4.4).

Données indirectes via `/api/health/catalogue` :
- 111 produits actifs · 64 (58%) `priceSource=ai` non re-vérifiés
- 0 image manquante · 10 en promo · 0 doublon URL

## 7. ✅ Prochaines étapes (top 5, priorisé)

| # | Action | Fichier | Effort | Impact | Issue |
| - | ------ | ------- | ------ | ------ | ----- |
| 1 | Réparer cron catalogue | `.github/workflows/` | 1h | critical | [#1](https://github.com/pypoulin-git/ordi-guide/issues/1) |
| 2 | Meta description sur 11 pages | `src/app/[locale]/*/page.tsx` | 2h | medium (SEO) | [#2](https://github.com/pypoulin-git/ordi-guide/issues/2) |
| 3 | CSP `report-uri` endpoint | `src/proxy.ts` + nouvelle route | 1h | medium | [#3](https://github.com/pypoulin-git/ordi-guide/issues/3) |
| 4 | Apple URLs résiduelles purger | `agent/sources/apple.js` | 30min | medium | [#5](https://github.com/pypoulin-git/ordi-guide/issues/5) |
| 5 | npm overrides postcss + follow-redirects | `package.json` | 1h | low | [#8](https://github.com/pypoulin-git/ordi-guide/issues/8) |

## 8. 📊 Métriques vs précédente

- Total produits : **111** (delta : +0 — cron à l'arrêt)
- % prix vérifiés (pas AI) : **42%** (delta inchangé)
- % images présentes : **100%** (delta inchangé)
- Compliance score : **92%** (delta +2pp grâce au fix cookie consent commit `4ce3577`)
- Tests CI : non re-exécutés cette session
- Dernière release Vercel : commit `4ce3577` (vendredi 24 avril)

## 9. ✅ Auto-fixés cette session

- Typo i18n FR : `'Gerer les temoins'` → `'Gérer les témoins'` (`src/i18n/dictionaries/fr.ts:41`)
- Refresh `data/compliance-report.json` (false positive `cookie-optin` purgé — bug déjà corrigé en `4ce3577`)

## 10. ⚠️ Tier 3 — entrées planning mensuel (pas d'issue créée)

- Trusted Types directive (CSP hardening) — `src/proxy.ts:8`
- Rate limit response headers (`X-RateLimit-*`) sur `/api/*`
- Clauses légales manquantes : portabilité (FR), désindexation (FR), third-party (EN), portability (EN)
- Currency CHF détecté côté Dell scanner — pas critique mais à surveiller
- Lighthouse CI sur PR (budgets perf/a11y)
- Cron `affiliate-health.js` weekly 100% URLs
