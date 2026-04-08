# Architecture — Project Candy

> Vue d'ensemble de l'architecture technique du projet.

---

## Stack technique retenue

| Couche       | Technologie              | Version |
|--------------|--------------------------|---------|
| Frontend     | React                    | 19.x    |
| Bundler      | Vite                     | 6.x     |
| Styling      | Tailwind CSS             | 4.x     |
| Backend      | Express.js               | 5.x     |
| Runtime      | Node.js                  | 22.x LTS|
| ORM          | Prisma                   | 6.x     |
| Base données | SQLite                   | 3.x     |
| Validation   | Zod                      | 3.x     |
| Email        | Nodemailer               | 6.x     |

---

## Structure des dossiers

```
Project_Candy/
├── doc/                        # Documentation & benchmarks
│   ├── benchmark-front.md
│   ├── benchmark-back.md
│   ├── benchmark-db.md
│   ├── architecture.md         # Ce fichier
│   ├── conventions.md
│   └── roadmap.md
│
├── client/                     # Application React (Vite)
│   ├── public/                 # Assets statiques (favicon, og-image...)
│   ├── src/
│   │   ├── assets/             # Images, fonts, icons
│   │   ├── components/         # Composants réutilisables (Button, Card...)
│   │   ├── sections/           # Sections de la page (Hero, About, Contact...)
│   │   ├── hooks/              # Custom hooks React
│   │   ├── lib/                # Utilitaires (api client, helpers)
│   │   ├── App.jsx             # Composant racine
│   │   └── main.jsx            # Point d'entrée Vite
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # API Express.js
│   ├── prisma/
│   │   ├── schema.prisma       # Schéma de la base de données
│   │   ├── migrations/         # Historique des migrations
│   │   └── dev.db              # Fichier SQLite (ignoré en prod)
│   ├── src/
│   │   ├── routes/             # Définition des routes Express
│   │   │   └── contact.js      # Route POST /api/contact
│   │   ├── middlewares/        # Middlewares personnalisés
│   │   │   └── errorHandler.js
│   │   ├── services/           # Logique métier (email, db queries)
│   │   │   ├── mailer.js
│   │   │   └── contactService.js
│   │   ├── validators/         # Schémas Zod
│   │   │   └── contactSchema.js
│   │   └── app.js              # Configuration Express
│   ├── index.js                # Point d'entrée serveur
│   ├── .env                    # Variables d'environnement (non committé)
│   ├── .env.example            # Template des variables d'environnement
│   └── package.json
│
├── .gitignore
├── package.json                # Scripts racine (dev, build...)
└── README.md
```

---

## Flux de données

```
Navigateur
    │
    ├── [Requêtes statiques] ──→ Vite dev server (dev) / Express static (prod)
    │                              React App (SPA)
    │
    └── [Requêtes API] ──→ Express.js /api/*
                                │
                                ├── Middleware: CORS, Helmet, Rate Limit
                                ├── Validation: Zod
                                ├── Service: logique métier
                                │       ├── Prisma → SQLite
                                │       └── Nodemailer → SMTP
                                └── Réponse JSON
```

---

## Séparation dev / production

### Développement
- `client/` tourne sur `http://localhost:5173` (Vite HMR)
- `server/` tourne sur `http://localhost:3001`
- Vite proxy `/api` → `http://localhost:3001` (pas de CORS à gérer en dev)
- `concurrently` lance les deux depuis la racine : `npm run dev`

### Production
- `npm run build` génère `client/dist/`
- Express sert les fichiers statiques depuis `dist/` ET expose `/api`
- Un seul process, un seul port

---

## Variables d'environnement (server/.env)

```env
# Serveur
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:5173

# Base de données
DATABASE_URL="file:./prisma/dev.db"

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=contact@example.com
SMTP_PASS=secret
MAIL_TO=admin@example.com
```
