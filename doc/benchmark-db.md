# Benchmark — Base de données

> Comparaison des solutions de base de données envisagées pour Project Candy.
> **Choix retenu : SQLite + Prisma**

---

## Systèmes de base de données

| Critère               | SQLite           | PostgreSQL       | MySQL 8          | MongoDB          | PlanetScale      |
|-----------------------|------------------|------------------|------------------|------------------|------------------|
| Type                  | Relationnel      | Relationnel      | Relationnel      | Document (NoSQL) | Relationnel (MySQL)|
| Hébergement           | Fichier local    | Serveur requis   | Serveur requis   | Atlas (SaaS) ou serveur | SaaS uniquement |
| Setup                 | Zéro             | Modéré           | Modéré           | Modéré           | Rapide (SaaS)    |
| Performances lecture  | Très bonnes      | Excellentes      | Bonnes           | Bonnes           | Excellentes      |
| Concurrence écriture  | Faible           | Très élevée      | Élevée           | Élevée           | Très élevée      |
| ACID                  | Oui              | Oui              | Oui              | Partiel          | Oui              |
| Coût                  | Gratuit          | Gratuit / payant | Gratuit / payant | Gratuit (limité) | Free tier        |
| Idéal pour            | Projets légers   | Production robuste| Production standard| Données flexibles| SaaS serverless |

### Pourquoi SQLite ?
- Aucun processus serveur à gérer → zéro infrastructure
- Données stockées dans un seul fichier `.db` (sauvegarde triviale)
- Performances largement suffisantes pour un site vitrine (faible concurrence)
- Migreable vers PostgreSQL avec Prisma sans changer le code applicatif
- Idéal pour développer localement puis déployer sur un VPS simple

---

## ORM / Query Builders

| Critère               | Prisma 6         | Drizzle ORM      | Sequelize        | TypeORM          | Knex.js          |
|-----------------------|------------------|------------------|------------------|------------------|------------------|
| Type                  | ORM              | ORM léger        | ORM              | ORM              | Query builder    |
| TypeScript            | ★★★★★ (généré)   | ★★★★★ (natif)    | ★★★☆☆            | ★★★★☆            | ★★★☆☆            |
| DX (expérience dev)   | Excellente       | Très bonne       | Moyenne          | Bonne            | Moyenne          |
| Migrations            | Intégrées        | Intégrées        | Intégrées        | Intégrées        | Manuel           |
| Prisma Studio (GUI)   | Oui              | Non              | Non              | Non              | Non              |
| Performance           | Bonne            | Excellente       | Bonne            | Bonne            | Excellente       |
| Courbe d'apprentissage| Faible           | Faible           | Moyenne          | Moyenne          | Moyenne          |
| Support SQLite        | Oui              | Oui              | Oui              | Oui              | Oui              |

### Pourquoi Prisma ?
- Schéma déclaratif dans `schema.prisma` → source de vérité unique
- Client TypeScript auto-généré → zéro erreur de typage sur les requêtes
- `prisma migrate` intégré pour gérer les évolutions de schéma
- Prisma Studio : interface visuelle pour inspecter la DB en développement
- Migration vers PostgreSQL = changer 2 lignes dans le schéma

---

## Schéma de données — Site vitrine

Besoins minimaux identifiés :

```prisma
model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String?
  message   String
  createdAt DateTime @default(now())
  read      Boolean  @default(false)
}
```

Extensions possibles selon l'évolution du projet :
- `Project` — pour un portfolio dynamique
- `BlogPost` — pour un blog/actualités
- `User` — pour un accès admin protégé

---

## Comparaison hébergement DB selon déploiement

| Cible déploiement     | DB recommandée               | Notes                              |
|-----------------------|------------------------------|------------------------------------|
| VPS (OVH, Hetzner...) | SQLite ou PostgreSQL local   | SQLite suffit, PostgreSQL si charge |
| Railway               | PostgreSQL Railway           | Passer de SQLite à PostgreSQL      |
| Render                | PostgreSQL Render            | Free tier disponible               |
| Fly.io                | SQLite + LiteFS (répliqué)   | SQLite en production viable        |
| Vercel                | Vercel Postgres / Turso      | SQLite serverless (Turso)          |

---

## Décision finale

```
SQLite (développement + production légère) + Prisma 6
→ Migreable vers PostgreSQL sans refactoring applicatif
```
