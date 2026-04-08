# Conventions — Project Candy

> Règles de développement à respecter sur l'ensemble du projet.

---

## Nommage

### Fichiers & dossiers

| Contexte                    | Convention        | Exemple                      |
|-----------------------------|-------------------|------------------------------|
| Composants React            | PascalCase        | `HeroSection.jsx`            |
| Hooks personnalisés         | camelCase + `use` | `useContactForm.js`          |
| Utilitaires / helpers       | camelCase         | `formatDate.js`              |
| Routes Express              | camelCase         | `contact.js`                 |
| Services                    | camelCase         | `contactService.js`          |
| Schémas Zod                 | camelCase         | `contactSchema.js`           |
| Dossiers                    | kebab-case        | `error-boundary/`            |
| Variables d'environnement   | UPPER_SNAKE_CASE  | `SMTP_HOST`                  |

### Code

| Contexte                    | Convention        |
|-----------------------------|-------------------|
| Variables / fonctions       | camelCase         |
| Constantes                  | UPPER_SNAKE_CASE  |
| Classes / composants React  | PascalCase        |
| Props React                 | camelCase         |
| Modèles Prisma              | PascalCase        |
| Champs Prisma               | camelCase         |

---

## JavaScript / React

- **Pas de `var`** → `const` par défaut, `let` si réassignation nécessaire
- **Fonctions fléchées** pour les composants et callbacks
- **Composants fonctionnels uniquement** (pas de class components)
- **Destructuring** systématique pour les props et imports
- **Imports absolus** côté client via alias Vite (`@/components/...`)
- **Un composant par fichier**
- Les composants de section vont dans `src/sections/`, les réutilisables dans `src/components/`

```jsx
// ✅ Bien
const HeroSection = ({ title, subtitle }) => {
  return <section>...</section>
}

export default HeroSection

// ❌ Éviter
export default function HeroSection(props) { ... }
```

---

## Express / Node.js

- **Async/await** partout, pas de callbacks (`express` 5 gère nativement)
- **Validation Zod** sur chaque route recevant un body
- **Pas de logique métier dans les routes** → délégué aux services
- **Toujours répondre avec un objet JSON structuré** :

```js
// Succès
res.status(200).json({ success: true, data: { ... } })

// Erreur
res.status(400).json({ success: false, message: 'Raison de l\'erreur', errors: [] })
```

- **Toutes les erreurs** remontent au middleware `errorHandler.js` central

---

## Prisma

- Le schéma `schema.prisma` est la **source de vérité** de la DB
- Toujours passer par `prisma migrate dev` pour modifier le schéma (jamais manuellement)
- Une seule instance Prisma Client exportée depuis `src/lib/prisma.js`
- Ne jamais appeler Prisma directement dans une route, passer par un service

```js
// server/src/lib/prisma.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma
```

---

## Git

### Branches
- `main` — code stable, déployé
- `develop` — intégration en cours
- `feature/nom-feature` — nouvelle fonctionnalité
- `fix/nom-bug` — correction de bug

### Messages de commit (Conventional Commits)

```
feat: ajouter formulaire de contact
fix: corriger validation email côté serveur  
style: ajuster padding section Hero
docs: mettre à jour README
chore: ajouter script de migration
refactor: extraire logique email dans mailer.js
```

### Fichiers jamais commités
- `server/.env`
- `server/prisma/dev.db`
- `node_modules/`
- `client/dist/`
- `client/.env.local`

---

## Sécurité (règles non négociables)

1. **Toujours valider les données entrantes** avec Zod avant tout traitement
2. **Ne jamais exposer les stack traces** en production (`NODE_ENV=production`)
3. **Ne jamais storer de secrets** dans le code ou les fichiers commités
4. **Rate limiting** sur toutes les routes publiques d'écriture (`/api/contact`)
5. **Helmet** activé sur toutes les requêtes Express
6. **CORS** restreint à `CLIENT_URL` uniquement en production
