# ROUTINE HEBDO — QA/UX Shop Compy

> Prompt autonome lancé chaque lundi 07h00 ET par le cron `weekly-qa`.
> **Version** : 2026-04-21 (v1).
> **Ne pas modifier sans tester en dry-run** (`--dry-run` saute les `gh issue create`).

---

## CONTEXTE

Projet : `C:\Users\pypou\OneDrive\Bureau\NemoClaw\ordi-guide` (Next.js 16 + Tailwind 4 + Vercel).
Prod : https://ordi-guide.vercel.app (→ shopcompy.ca quand domaine acheté).
Stack QA existant :

- `agent/auditor.js` — checks catalogue (prix, CPU, stale, duplicatas URL, catégorie)
- `agent/compliance-audit.js` — Loi 25 / PIPEDA / CASL (mercredi 8h ET)
- Vitest + Playwright (`ci.yml` + `e2e.yml` dans `.github/workflows/`)
- `data/catalogue.json` (~110-150 produits auto-générés)
- Dictionnaires i18n `src/i18n/dictionaries/{fr,en}.ts`

**IMPORTANT** — lis `node_modules/next/dist/docs/` avant toute modification code Next.js (AGENTS.md — Next.js 16 a des breaking changes vs 15).

---

## OBJECTIF

Produire en une seule passe :

1. Fichier `data/weekly-qa-report-YYYY-MM-DD.md` (rapport humain-lisible)
2. 1 GitHub issue par finding actionnable (tier 1 + 2)
3. Auto-fix immédiat pour les tier 1 (déterministes, réversibles)
4. Alerte Discord si ≥1 bug critique créé

---

## SCAN — 3 Explore agents EN PARALLÈLE

### Agent A — Code & composants (src/)

- Routes `src/app/[locale]/*` : inventaire, diff vs semaine passée (git log)
- Grep `TODO|FIXME|HACK|console\.log|debugger` dans `src/` — delta vs précédent scan
- Composants critiques : `ProductCard`, `CatalogueLayout`, `SearchBar`, `Header`, `Footer`, `CookieConsent`, `ComparateurClient`
  - A11y : `aria-*`, `alt=`, focus visible, contraste (si Lighthouse accessible)
  - États manquants : loading, error, empty
  - Images broken handling (`onError`)
- i18n parity : échantillon 20 clés aléatoires `fr.ts` vs `en.ts` — texte FR qui leak dans EN ou inversement
- `npm outdated` — lister UNIQUEMENT les bumps MAJEURS (next, react, tailwindcss, @vercel/\*)
- `npm audit --json` — vulnérabilités `critical` + `high` seulement

### Agent B — Catalogue & liens affiliés (CRITIQUE)

- `data/catalogue.json` : total, par source, par catégorie, % `priceSource=ai`, % `imageUrl` manquants
- **Échantillon aléatoire de 12 produits** (mix sources) :
  - 3 amazon, 2 apple, 2 newegg, 2 dell|hp|lenovo, 1 walmart, 1 canadacomputers, 1 microsoft
- Pour chaque produit échantillonné :
  - `WebFetch` de l'URL affiliée
  - Reporter : HTTP status, titre page, prix extrait si regex `\$[\d,]+(\.\d{2})?` trouve un match
  - Comparer prix page vs prix catalogue : match ±5%, hors-stock, redirection 3xx vers autre produit
  - URL Apple type `/buy-mac/...` sans config markers (`chip|memory|storage|cpu|gpu|ultra|apple-m\d`) → flag
  - Si bot-gate (Amazon 503, Walmart challenge) → noter `"blocked"` explicite (pas de devinette)
- Duplicatas URL canoniques (strip `tag|utm_*|ref|dgc|cid`) — doit être 0 (auditor.js le fait déjà au run)
- Produits `lastVerified` > 10 jours : lister (auditor staleDaysPage=14 par défaut)

### Agent C — Site live + perf + compliance

- `WebFetch` :
  - `/fr`, `/en` (accueil)
  - `/fr/catalogue`, `/fr/comparateur`, `/fr/blog`, `/fr/glossaire`, `/fr/guide`
  - `/fr/about`, `/fr/privacy`, `/fr/terms`, `/fr/contact`
  - `/api/health/catalogue`
- Pour chaque : status HTTP, metadata (`<title>`, `<meta name="description">`, og:title présents ?), erreurs rendu visibles dans HTML
- 3 produits aléatoires via `/fr/catalogue/[id]` : page charge ? prix affiché ? CTA affiliate cliquable ?
- `data/compliance-report.json` : score actuel vs semaine passée, nouveaux warnings/fails ?
- Blog : nombre articles FR/EN cohérent ? dernier article < 14 jours ? (si blog-agent NOVA activé)

---

## TRIAGE DES FINDINGS

Classer chaque finding dans **un seul** tier :

### Tier 1 — AUTO-FIX dans cette session (5% des cas)

Critères stricts : réversible en 1 commit, détection déterministe, zero chance de casser prod.

Exemples :

- Duplicata URL catalogue (déjà géré par auditor.js)
- Leak FR dans `en.ts` ou inverse (remplacer par équivalent via dict existant)
- Dead `console.log` en prod code (`src/app` ou `src/components`)
- Import inutilisé flaggé par eslint

Commit message : `fix(qa): auto-fix weekly QA — <short>` + push.
Mentionner dans le rapport : section "✅ Auto-fixés".

### Tier 2 — GitHub issue avec prompt pré-briefé (85% des cas)

Pour chaque finding :

```bash
gh issue create \
  --title "[QA] <short descriptive title>" \
  --label "qa-auto,<severity>" \
  --body "$(cat <<'EOF'
## Contexte
<pourquoi>

## Impact
<1 phrase>

## Repro
- Étape 1...
- Observé : ...
- Attendu : ...

## Fichiers concernés
- chemin/fichier.ts:42

## Fix suggéré
<intention, pas le code>

## Effort estimé
<15min | 30min | 1h | 2h | 4h | 1j>

## Impact estimé
<critical | high | medium | low>

---

<!-- claude-prompt:begin
Tu travailles dans C:\Users\pypou\OneDrive\Bureau\NemoClaw\ordi-guide (Next.js 16, Tailwind 4, Vercel).
IMPORTANT : lis node_modules/next/dist/docs/ avant toute modif code Next.js (AGENTS.md).

PROBLÈME
<décrire 1-2 phrases>

FICHIERS
- <chemin:ligne>

CE QU'IL FAUT FAIRE
1. <étape concrète>
2. <étape concrète>

VÉRIFICATION
- npm run build → clean
- <test spécifique si applicable>

LIVRABLE
Commit unique avec message "fix(<scope>): <description>" + push origin main.
claude-prompt:end -->
EOF
)"
```

**Labels** (créer au préalable via `gh label create` si absents) :

- `qa-auto` — toujours (filtrage dashboard)
- `bug-critical` — bloque usage utilisateur ou conformité
- `bug` — comportement incorrect sans blocage
- `ux` — dégradation expérience
- `enhancement` — amélioration ROI > 2h
- `ready` — PY l'a priorisé pour cette semaine (ajouté manuellement)

### Tier 3 — Entrée "Prochaines étapes" du rapport (10% des cas)

Findings stratégiques : refactor gros composant, dette architecturale, nouvelle feature. Pas d'issue créée. Listés dans section 7 du rapport pour planning mensuel.

---

## LIVRABLE — Rapport markdown

Fichier : `data/weekly-qa-report-YYYY-MM-DD.md` (date ISO du lundi).

Structure (< 1500 mots, chaque chiffre cité) :

```markdown
# Rapport QA hebdo — YYYY-MM-DD

## 1. TL;DR

5 lignes max : état global + pire incident trouvé + nombre d'issues créées + nombre d'auto-fixés.

## 2. 🔴 Bugs critiques

Fichier:ligne + repro précise + issue # créée.

## 3. 🟠 Anomalies

Dégradation silencieuse. Chiffres avant/après.

## 4. 🟡 Améliorations ROI > 2h

Effort estimé + gain attendu.

## 5. 📦 Dépendances

Major bumps + vulns ≥ high uniquement.

## 6. 🔗 Vérification affiliés (12 produits)

| Produit | Source | Prix catalogue | Prix page | Match ±5% | Status HTTP |
| ------- | ------ | -------------- | --------- | --------- | ----------- |
| ...     | ...    | ...            | ...       | ✅/❌/🚫  | ...         |

## 7. ✅ Prochaines étapes (top 5, priorisé)

| # | Action | Fichier | Effort | Impact | Issue |
| - | ------ | ------- | ------ | ------ | ----- |

## 8. 📊 Métriques vs précédente

- Total produits : N (delta)
- % prix vérifiés (pas AI) : X% (delta)
- % images présentes : X% (delta)
- Compliance score : X% (delta)
- Tests CI : pass/fail
- Dernière release Vercel : commit `abcd123` il y a Xj

## 9. ✅ Auto-fixés cette session

Liste commits générés automatiquement.
```

---

## DISCORD ALERT

Si ≥1 issue label `bug-critical` créée cette session :

```bash
# Via webhook direct (pas de secret dans le repo, lu depuis .env.local)
node scripts/notify-discord.js \
  --channel catalogue \
  --title "⚠️ QA hebdo — N bug(s) critique(s)" \
  --body "Rapport : data/weekly-qa-report-YYYY-MM-DD.md · Issues : <liens>"
```

Si script `notify-discord.js` n'existe pas, créer avec `gh api https://discord.com/api/webhooks/...` en fallback (token dans `DISCORD_WEBHOOK_CATALOGUE`).

---

## COMMIT FINAL

```bash
git add data/weekly-qa-report-*.md
git commit -m "chore(qa): rapport hebdo YYYY-MM-DD (N findings, M auto-fix)"
git push origin main
```

---

## CONTRAINTES

- NE PAS faire de modifications code hors Tier 1 (scan + report + issues uniquement)
- Si bloqué par bot-detection, dire `"non vérifiable auto"` explicitement
- Rapport < 1500 mots
- Cite CHAQUE chiffre (pas de "beaucoup", "plusieurs")
- En cas d'échec partiel (e.g. Gemini down), continuer et noter dans le rapport ce qui n'a pas pu être scanné

---

## SUCCÈS

- Fichier rapport créé et commité sur main
- N issues GitHub créées avec label `qa-auto`
- Tier 1 auto-fix commités (si applicable)
- Discord alert envoyée si critique
- PY peut en < 10 min : ouvrir GitHub → tag `ready` sur 3-5 issues → session Claude Code avec `/gh-fix <n>`
