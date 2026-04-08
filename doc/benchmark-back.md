# Benchmark — Backend

> Comparaison des solutions backend Node.js envisagées pour Project Candy.
> **Choix retenu : Express.js**

---

## Frameworks Node.js

| Critère               | Express 5        | Fastify 5        | Koa 2            | Hono 4           | NestJS           |
|-----------------------|------------------|------------------|------------------|------------------|------------------|
| Popularité            | ★★★★★            | ★★★★☆            | ★★★☆☆            | ★★★☆☆            | ★★★★☆            |
| Performance (req/s)   | ~50k             | ~85k             | ~55k             | ~100k+           | ~40k             |
| Courbe d'apprentissage| Très faible      | Faible           | Faible           | Faible           | Élevée           |
| TypeScript natif      | Via types        | Via types        | Via types        | Natif            | Natif            |
| Middleware ecosystem  | Très riche       | Riche            | Bon              | Bon              | Très riche       |
| Structure imposée     | Aucune           | Aucune           | Aucune           | Aucune           | Forte (Angular-like)|
| Idéal pour            | API REST simple  | API haute perf   | Middleware léger | Edge / Workers   | Gros projets     |

### Pourquoi Express ?
- Documentation et ressources abondantes
- Écosystème middleware le plus large (cors, helmet, multer, etc.)
- Zéro opinon sur la structure → liberté totale
- Suffisant largement pour un site vitrine (faible charge, pas de haute concurrence)
- Express 5 (stable depuis 2024) apporte le support natif async/await

---

## Middlewares essentiels

| Middleware       | Rôle                                          | Alternatif           |
|------------------|-----------------------------------------------|----------------------|
| `cors`           | Gestion des origines cross-domain             | Configurer manuellement |
| `helmet`         | Headers HTTP sécurité (XSS, HSTS...)          | Aucun recommandé     |
| `express-rate-limit` | Protection anti-spam sur `/api/contact`   | `upstash-ratelimit`  |
| `dotenv`         | Variables d'environnement                     | `@dotenvx/dotenvx`   |
| `zod`            | Validation des données entrantes (body)       | `joi`, `yup`         |
| `nodemailer`     | Envoi d'emails depuis le formulaire contact   | `resend` (API SaaS)  |

---

## Validation des entrées

| Solution   | Avantages                                 | Inconvénients              |
|------------|-------------------------------------------|----------------------------|
| **Zod**    | TypeScript-first, inférence de types      | Bundle légèrement plus lourd|
| Joi        | Mature, bien documenté                    | Pas de TS natif             |
| express-validator | Intégré Express, middleware style  | API verbeuse               |
| Yup        | Similaire Joi, orienté Formik             | Moins utilisé côté serveur  |

> Recommandation : **Zod** pour valider les bodies de requête et synchroniser les types front/back si TypeScript est adopté.

---

## Gestion des erreurs

Stratégie recommandée avec Express :
```
routes → middleware métier → error handler global (app.use avec 4 params)
```
- Toutes les routes `async` wrappées dans un `try/catch` ou un wrapper `asyncHandler`
- Un middleware d'erreur centralisé en fin de `app.js`
- Réponses d'erreur normalisées : `{ status, message, errors? }`

---

## Sécurité

| Mesure                       | Implémentation                         |
|------------------------------|----------------------------------------|
| Headers HTTP sécurisés       | `helmet()`                             |
| Protection CORS              | `cors({ origin: process.env.CLIENT_URL })` |
| Rate limiting                | `express-rate-limit` sur `/api/`       |
| Validation des entrées       | Zod sur chaque route POST              |
| Variables sensibles          | `.env` jamais committé (`.gitignore`)  |
| Injection SQL                | Prisma ORM (requêtes paramétrées)      |

---

## Décision finale

```
Express 5 + Zod (validation) + Helmet + CORS + express-rate-limit + Nodemailer
```
