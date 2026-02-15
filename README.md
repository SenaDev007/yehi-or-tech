# YEHI OR Tech — Site corporate

Site vitrine professionnel pour **YEHI OR Tech**, entreprise d'ingénierie technologique.  
Architecture préparée pour évoluer vers un portail client et SaaS.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations légères)
- **Lucide React** (icônes)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du site

| Route | Description |
|-------|-------------|
| `/` | Accueil — hero, présentation, domaines, pourquoi nous, méthode, CTA |
| `/entreprise` | Vision, mission, valeurs |
| `/services` | Liste des services + 5 sous-pages (IT, Développement, Cloud, Design, IA) |
| `/solutions` | Cas concrets par secteur |
| `/innovation` | Vision & R&D (feuille de route, pas produits disponibles) |
| `/realisations` | Exemples de projets |
| `/contact` | Formulaire (nom, entreprise, email, téléphone, service, message) |

## Palette (identité visuelle)

- **Fond principal** : bleu profond `#0a1628`
- **Éléments actifs** : bleu électrique `#3b82f6`
- **CTA / boutons** : jaune lumineux `#eab308`, hover orange doré `#f59e0b`
- **Texte** : blanc / gris clair

## Évolution prévue

- **Phase 1** : site vitrine (actuel)
- **Phase 2** : génération de devis
- **Phase 3** : espace client
- **Phase 4** : portail cloud & SaaS

Dossiers préparés (non implémentés) : `app/(future)/auth`, `app/(future)/dashboard`, `app/(future)/portail`.

## Formulaire de contact

- En **développement** : sans `RESEND_API_KEY`, les envois sont simulés (données loguées en console).
- En **production** : créer un compte [Resend](https://resend.com), ajouter `RESEND_API_KEY` et `CONTACT_EMAIL` dans `.env.local`. Optionnel : `RESEND_FROM` pour l’adresse d’envoi.

Voir `.env.example`.

## Blog

- Liste des articles : `/blog`
- Article : `/blog/[slug]`
- Contenu : éditer `lib/blog.ts` (ajout d’articles avec `slug`, `title`, `excerpt`, `date`, `author`, `content`). Évolution possible vers MDX plus tard.

## Build

```bash
npm run build
npm start
```
