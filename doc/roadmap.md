# Roadmap — Project Candy

> Suivi des fonctionnalités prévues, en cours et terminées.
> Mise à jour au fil du développement.

---

## Phase 1 — Setup & Infrastructure

- [ ] Initialiser le monorepo (package.json racine + scripts)
- [ ] Créer le projet client (Vite + React + Tailwind)
- [ ] Créer le projet serveur (Express + Prisma + SQLite)
- [ ] Configurer le proxy Vite → Express en développement
- [ ] Configurer le `.gitignore` complet
- [ ] Initialiser le dépôt Git + première branche `develop`
- [ ] Configurer les variables d'environnement (`.env.example`)
- [ ] Configurer le schéma Prisma initial + migration
- [ ] Configurer Helmet, CORS, rate limiting sur Express

---

## Phase 2 — Frontend : Pages & Sections

- [ ] Layout global (header, footer, navigation)
- [ ] Section Hero (accroche principale, call-to-action)
- [ ] Section À propos
- [ ] Section Services / Offres
- [ ] Section Portfolio / Réalisations *(si applicable)*
- [ ] Section Témoignages *(si applicable)*
- [ ] Section FAQ *(si applicable)*
- [ ] Section Contact (formulaire)
- [ ] Page 404

---

## Phase 3 — Backend : API

- [ ] Route `POST /api/contact` — réception du formulaire
  - [ ] Validation Zod des champs
  - [ ] Sauvegarde en base SQLite via Prisma
  - [ ] Envoi d'email de confirmation (Nodemailer)
  - [ ] Réponse JSON normalisée
- [ ] Gestion globale des erreurs (middleware)
- [ ] Logs en développement (morgan)

---

## Phase 4 — Qualité & Finitions

- [ ] Responsive mobile / tablette / desktop
- [ ] Accessibilité (aria-labels, focus visible, contrastes)
- [ ] Meta tags SEO (title, description, og:image)
- [ ] Favicon + manifest
- [ ] Optimisation des images (format WebP, lazy loading)
- [ ] Animations / transitions (scroll reveal, hover states)
- [ ] Tests du formulaire (cas nominaux + cas d'erreur)

---

## Phase 5 — Déploiement

- [ ] Script de build production (`npm run build`)
- [ ] Configuration Express pour servir le build React
- [ ] Choix de la plateforme de déploiement
- [ ] Configuration des variables d'environnement en prod
- [ ] Configuration HTTPS / domaine
- [ ] Migration DB en production
- [ ] Monitoring basique (logs d'erreur)

---

## Backlog (idées futures)

> Fonctionnalités non prioritaires, à évaluer selon les besoins.

- [ ] Interface d'administration des messages de contact
- [ ] Authentification admin (JWT ou sessions)
- [ ] Blog / actualités avec éditeur Markdown
- [ ] Portfolio dynamique géré depuis un admin
- [ ] Système de newsletter
- [ ] Analytics (Plausible, Umami — respectueux RGPD)
- [ ] Migration vers PostgreSQL si montée en charge
- [ ] Tests automatisés (Vitest côté client, Jest/Supertest côté serveur)
- [ ] CI/CD (GitHub Actions)
- [ ] Internationalisation (i18n FR/EN)

---

## Notes & décisions

| Date       | Décision                                      | Raison                            |
|------------|-----------------------------------------------|------------------------------------|
| 2026-04-08 | Stack : React + Vite + Express + SQLite + Prisma | Simplicité, flexibilité, évolutivité |
| 2026-04-08 | Pas de Next.js                                | Contrôle total, séparation claire front/back |
| 2026-04-08 | SQLite en priorité                            | Zéro infrastructure, migreable vers PostgreSQL |
