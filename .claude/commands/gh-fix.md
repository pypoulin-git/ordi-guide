---
description: Charger une issue GitHub QA et exécuter son <!-- claude-prompt --> pré-briefé
argument-hint: <numéro de l'issue>
allowed-tools: Bash(gh issue view:*), Bash(gh issue comment:*), Bash(gh issue close:*), Bash(npm run build:*), Bash(git:*), Read, Edit, Write, Glob, Grep
---

# /gh-fix $ARGUMENTS

Tu charges l'issue GitHub `#$ARGUMENTS` du repo courant, tu extrais le bloc `<!-- claude-prompt:begin ... claude-prompt:end -->` contenu dans son body, puis tu exécutes ce prompt comme ton instruction principale.

## Étapes

1. Lire l'issue :

   ```bash
   gh issue view $ARGUMENTS --json number,title,labels,body
   ```

2. Extraire le contenu entre `<!-- claude-prompt:begin` et `claude-prompt:end -->`. C'est ta mission.

3. Si le bloc est absent, malformé ou vide → abandonner et rapporter à l'utilisateur. Ne PAS improviser un fix depuis le titre seul.

4. Exécuter le prompt extrait :
   - Lire les fichiers listés en section `FICHIERS`
   - Appliquer `CE QU'IL FAUT FAIRE` étape par étape
   - Valider avec `VÉRIFICATION` (build, test, etc.)
   - Commit selon `LIVRABLE` (format `fix(<scope>): <description>`)

5. Push et fermer l'issue avec un commentaire qui référence le commit :

   ```bash
   git push origin main
   COMMIT_SHA=$(git rev-parse HEAD)
   gh issue comment $ARGUMENTS --body "Fixed in $COMMIT_SHA"
   gh issue close $ARGUMENTS --reason completed
   ```

## Contraintes

- Respecter `C:\Users\pypou\OneDrive\Bureau\NemoClaw\ordi-guide\AGENTS.md` (lire `node_modules/next/dist/docs/` avant toute modif Next.js)
- Si l'issue a le label `bug-critical`, tester end-to-end avant de fermer (curl prod, smoke test, etc.)
- Si le fix est plus gros que prévu dans l'issue (2x l'effort estimé), STOPPER et commenter l'issue avec le delta détecté au lieu de continuer en aveugle
- Ne jamais skip les hooks pré-commit (pas de `--no-verify`)
