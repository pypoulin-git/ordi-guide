# Weekly QA Report — 2026-05-25

**Agent** : claude-code (scheduled-task shopcompy-weekly-qa)
**Projet** : ordi-guide / Shop Compy (https://ordi-guide.vercel.app)
**Stack** : Next.js 16.2.4 + Tailwind 4 + Vercel

---

## Résumé exécutif

7 findings, 0 issues GH créées (gh non authentifié — WSL only, `gh auth login` requis), 1 auto-fix commité.
Pire incident : 5 fichiers de tests en échec total (`jest is not defined`) — suite de tests partiellement aveugle.

---

## Build & Contenu

| Check | Résultat |
|---|---|
| `npm run build` | ✅ OK |
| Articles FR | 19 articles |
| Articles EN | 19 articles — slugs 100% synchronisés |
| Fraîcheur articles | ✅ Tous < 6 mois |
| Catalogue | 110 produits |
| Catégories vides | ⚠️ 3 : `peripheral`, `storage`, `accessory` |

---

## ESLint

**Avant fix** : 93 erreurs, 5 avertissements

| Fichier | Règle | N | Tier |
|---|---|---|---|
| `src/content/articles.fr.ts` | `no-useless-escape` | 43 | **1 — auto-fixé** |
| `src/content/articles.fr-PC_PY.ts` | `no-useless-escape` | 43 | ignoré (backup machine) |
| `src/app/api/blog-ask/route.ts` | `no-control-regex` | 1 | 2 |
| `src/components/ProductCard.tsx` | `jsx-a11y/no-noninteractive-tabindex` | 1 | 2 |
| `src/components/SpecTooltip.tsx` | `jsx-a11y/no-static-element-interactions` | 1 | 2 |
| `src/components/__tests__/*.test.tsx` | `jsx-a11y/alt-text` | 4 | 2 |

**Après fix** : articles.fr.ts passe ESLint (0 erreur).

---

## Tests Vitest

| Résultat | Détail |
|---|---|
| 5 fichiers en échec | `ReferenceError: jest is not defined` |
| 2 fichiers OK | — |
| 12 assertions passées | (issues internes uniquement) |

**Cause** : Les 5 fichiers utilisent `jest.mock()` mais vitest ne fournit pas l'objet `jest` même avec `globals: true`. Fix requis : remplacer `jest.mock()` → `vi.mock()` dans 5 fichiers.

Fichiers affectés :
- `src/components/__tests__/AnalogyToggle.test.tsx`
- `src/components/__tests__/CatalogueFilters.test.tsx`
- `src/components/__tests__/Header.test.tsx`
- `src/components/__tests__/ProductCard.test.tsx`
- `src/components/__tests__/SearchBar.test.tsx`

---

## Liens affiliés (check-links.mjs)

110 produits vérifiés — **7 non-OK** — tous non vérifiables auto (bot-detection / HEAD bloqué).

| Produit | Source | Raison |
|---|---|---|
| Surface Thunderbolt 4 Dock | microsoft.com | Timeout 5s |
| Apple Mac mini 2024 M4 | amazon.ca | HTTP 405 (HEAD bloqué) |
| ViprTech Reaper 2.0 | amazon.ca | HTTP 405 (HEAD bloqué) |
| Apple MacBook Air 13" M3 | amazon.ca | HTTP 405 (HEAD bloqué) |
| Skytech Nebula Gaming PC | amazon.ca | HTTP 405 (HEAD bloqué) |
| ThinkVision 27" QHD Pack | lenovo.com | fetch failed (bot-detection) |
| ThinkVision T27p-30 27" UHD | lenovo.com | fetch failed (bot-detection) |

→ **non vérifiable auto** pour tous (Amazon bloque HEAD requests, Lenovo protégé, Microsoft slow).
Les produits sont probablement encore actifs — vérification manuelle recommandée pour les 2 Lenovo.

---

## Dépendances outdated

| Package | Actuel | Disponible | Type |
|---|---|---|---|
| `next` | 16.2.4 | 16.2.6 | patch ⚠️ |
| `react` + `react-dom` | 19.2.5 | 19.2.6 | patch |
| `tailwindcss` | 4.2.2 | 4.3.0 | minor |
| `typescript-eslint` | 8.58.2 | 8.59.4 | patch |
| `eslint` | 10.2.1 | 10.4.0 | minor |
| `vitest` | 4.1.4 | 4.1.7 | patch |
| `@playwright/test` | 1.59.1 | 1.60.0 | minor |
| `lint-staged` | 16.4.0 | **17.0.5** | **MAJOR** |
| `typescript` | 5.9.3 | **6.0.3** | **MAJOR** |

Priorité : `next@16.2.6` (patch de sécurité/bug). Majeurs à traiter avec soin.

---

## Compliance (rapport du 2026-05-13 — non re-exécuté ce cycle)

Score précédent : **90%** (57/63 checks OK, 1 fail critique, 5 warnings)

| Item | Statut |
|---|---|
| Cookie consent pré-coché | ❌ FAIL critique — opt-in requis |
| Termes manquants FR (portabilité, désindexation) | ⚠️ warning |
| Termes manquants EN (third party) | ⚠️ warning |

---

## Findings Tier 2 (issues GH à créer manuellement — gh non auth)

> `gh auth login` requis avant de pouvoir créer des issues depuis WSL.

| # | Titre | Sévérité | Labels |
|---|---|---|---|
| 1 | Vitest: `jest is not defined` — 5 fichiers tests en échec | high | `qa-auto`, `bug`, `testing` |
| 2 | a11y: `no-noninteractive-tabindex` in ProductCard.tsx | high | `qa-auto`, `accessibility` |
| 3 | a11y: `no-static-element-interactions` in SpecTooltip.tsx | medium | `qa-auto`, `accessibility` |
| 4 | `next@16.2.6` patch update pending | high | `qa-auto`, `dependencies` |
| 5 | Catalogue: 3 catégories vides (peripheral, storage, accessory) | medium | `qa-auto`, `content` |
| 6 | Compliance: cookie consent opt-in — critique persistant depuis 2026-05-13 | high | `qa-auto`, `compliance` |

---

## Tier 1 auto-fix commité

- `src/content/articles.fr.ts` : 43 × `no-useless-escape` corrigés (`\"` → `"` dans strings single-quoted)
