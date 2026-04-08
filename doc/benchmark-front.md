# Benchmark — Frontend

> Comparaison des solutions frontend envisagées pour Project Candy.
> **Choix retenu : React + Vite**

---

## Frameworks / Librairies UI

| Critère              | React 19         | Vue 3            | Svelte 5         | SolidJS          |
|----------------------|------------------|------------------|------------------|------------------|
| Popularité           | ★★★★★            | ★★★★☆            | ★★★☆☆            | ★★☆☆☆            |
| Courbe d'apprentissage | Moyenne        | Faible           | Faible           | Moyenne          |
| Écosystème / libs    | Très riche       | Riche            | Limité           | Limité           |
| Performance runtime  | Bonne            | Bonne            | Excellente       | Excellente       |
| Taille du bundle     | ~42 KB (gzip)    | ~34 KB (gzip)    | ~2 KB (gzip)     | ~7 KB (gzip)     |
| TypeScript natif     | Oui              | Oui              | Oui              | Oui              |
| Server Components    | Oui (RSC)        | Non              | Non              | Non              |
| Communauté FR        | Très active      | Active           | Moyenne          | Faible           |

### Pourquoi React ?
- Ecosystème le plus riche (libs UI, hooks, testing)
- Profil connu → maintenance facilitée
- Compatible avec n'importe quel backend Node.js sans couplage fort
- Les Server Components ne sont pas nécessaires ici (site vitrine, pas SSR obligatoire)

---

## Bundlers

| Critère              | Vite 6           | Webpack 5        | Parcel 2         | Turbopack        |
|----------------------|------------------|------------------|------------------|------------------|
| Vitesse de démarrage | ★★★★★ (ESM natif)| ★★★☆☆            | ★★★★☆            | ★★★★★ (Rust)     |
| Config nécessaire    | Minimale         | Verbose          | Zéro-config      | Minimale         |
| HMR (hot reload)     | Instantané       | Lent             | Bon              | Très rapide      |
| Maturité             | Mature           | Très mature      | Mature           | Jeune            |
| Intégration React    | Officielle       | Officielle       | Bonne            | Via Next.js surtout |

### Pourquoi Vite ?
- Démarrage quasi instantané grâce aux modules ES natifs
- Configuration minimale pour React
- Template officiel `react` ou `react-ts` disponible
- Standard de facto dans l'écosystème React hors Next.js

---

## CSS / Styling

| Solution             | Avantages                              | Inconvénients                        |
|----------------------|----------------------------------------|--------------------------------------|
| **Tailwind CSS v4**  | Rapide, utilitaire, pas de nommage     | Verbosité dans le JSX                |
| CSS Modules          | Scoped, natif Vite, pas de dépendance  | Plus de fichiers, verbeux            |
| Styled-components    | CSS-in-JS, co-localisé                 | Runtime overhead, bundle plus lourd  |
| Sass/SCSS            | Familier, puissant                     | Préprocesseur, config extra          |
| Vanilla CSS          | Zéro dépendance                        | Pas de scoping, organisation manuelle|

> Recommandation : **Tailwind CSS v4** pour un site vitrine (rapidité de développement) ou **CSS Modules** si on préfère rester proche du CSS standard.

---

## Routing (si besoin de plusieurs pages)

| Solution             | Usage recommandé                        |
|----------------------|-----------------------------------------|
| **React Router v7**  | SPA multi-pages, docs riches            |
| TanStack Router      | Typesafe, moderne, bonne alternative    |
| Wouter               | Ultra léger, pour SPA simple            |

> Pour un site vitrine one-page avec scroll : **aucun router nécessaire**. Si multi-pages : React Router v7.

---

## État global (si nécessaire)

Pour un site vitrine, l'état global est rarement nécessaire. Si besoin :
- **Zustand** — léger, simple, sans boilerplate
- **React Context** — natif, suffisant pour thème / langue

---

## Décision finale

```
React 19 + Vite 6 + Tailwind CSS v4 + React Router v7 (si multi-pages)
```
