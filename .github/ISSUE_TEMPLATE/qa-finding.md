---
name: QA finding (auto)
about: Finding détecté par le scan QA hebdo
title: '[QA] '
labels: qa-auto
assignees: ''
---

## Contexte

<!-- Pourquoi ce finding existe. Ex: "Apple URL générique détectée dans scan 2026-04-21 — 3 produits concernés, landing picker sans prix." -->

## Impact

<!-- Une phrase : qui est affecté + quel comportement cassé. Ex: "Utilisateur clique 'Voir sur Apple' → arrive sur un picker au lieu de la fiche, pas de prix visible." -->

## Repro

<!-- Étapes déterministes si bug vérifiable, ou fichier:ligne si code smell -->

- [ ] Étape 1
- [ ] Étape 2
- [ ] Observé : ...
- [ ] Attendu : ...

## Fichiers concernés

- `chemin/fichier.ts:42`

## Fix suggéré

<!-- Ce que le fix devrait faire (pas le code, juste l'intention) -->

## Effort estimé

<!-- Une des valeurs : 15min | 30min | 1h | 2h | 4h | 1j | >1j -->

## Impact estimé

<!-- critical (bloque) | high (dégrade UX) | medium (hygiène) | low (nice-to-have) -->

---

<!-- claude-prompt:begin
Tu travailles dans C:\Users\pypou\OneDrive\Bureau\NemoClaw\ordi-guide (Next.js 16, Tailwind 4, Vercel).
IMPORTANT : lis node_modules/next/dist/docs/ avant toute modif code Next.js (AGENTS.md).

PROBLÈME
<!-- décrire 1-2 phrases -->

FICHIERS
- <!-- chemin:ligne -->

CE QU'IL FAUT FAIRE
1. <!-- étape concrète -->
2. <!-- étape concrète -->

VÉRIFICATION
- npm run build → clean
- <!-- test spécifique si applicable : curl, playwright spec, vitest... -->

LIVRABLE
Commit unique avec message "fix(<scope>): <description>" + push origin main.
claude-prompt:end -->
