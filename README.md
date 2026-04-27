# Project Candy 🍬

Site vitrine pour une boutique de gâteaux de bonbons — présentant les créations, les services et un formulaire de contact.

(En Cours ...)

---

## Stack

- **Frontend** — React 19 + Vite 6 + Tailwind CSS 4
- **Backend** — Node.js + Express 5
- **Base de données** — SQLite + Prisma 6

---

## Prérequis

- Node.js 22+
- npm 10+

---

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd Project_Candy

# Installer les dépendances (racine + client + serveur)
npm install
npm install --prefix client
npm install --prefix server
```

---

## Lancer le projet en développement

```bash
npm run dev
```

Le client est accessible sur `http://localhost:5173` et l'API sur `http://localhost:3001`.

---

## Variables d'environnement

Copier le fichier d'exemple et renseigner les valeurs :

```bash
cp server/.env.example server/.env
```

---

## Documentation

Les fichiers de documentation se trouvent dans le dossier [`doc/`](doc/) :

- [`benchmark-front.md`](doc/benchmark-front.md) — Choix du frontend
- [`benchmark-back.md`](doc/benchmark-back.md) — Choix du backend
- [`benchmark-db.md`](doc/benchmark-db.md) — Choix de la base de données
- [`architecture.md`](doc/architecture.md) — Architecture & structure du projet
- [`conventions.md`](doc/conventions.md) — Conventions de développement
- [`roadmap.md`](doc/roadmap.md) — Roadmap & fonctionnalités
