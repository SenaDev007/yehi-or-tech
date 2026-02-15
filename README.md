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

- **GitHub Pages / export statique** : le formulaire envoie vers l’URL définie par `NEXT_PUBLIC_CONTACT_FORM_ACTION`. Créez un formulaire sur [Formspree](https://formspree.io), récupérez l’URL (ex. `https://formspree.io/f/xxxxx`) et ajoutez-la en **secret** dans le dépôt : `Settings → Secrets and variables → Actions → NEXT_PUBLIC_CONTACT_FORM_ACTION`.
- **En local** : ajoutez la même variable dans `.env.local` pour que le formulaire fonctionne. Voir `.env.example`.

## Blog

- Liste des articles : `/blog`
- Article : `/blog/[slug]`
- Contenu : éditer `lib/blog.ts` (ajout d’articles avec `slug`, `title`, `excerpt`, `date`, `author`, `content`). Évolution possible vers MDX plus tard.

## Build

```bash
npm run build
```

Le build génère un export statique dans `out/` (pour GitHub Pages).

## Déploiement GitHub Pages

Pour que le **site compilé** s’affiche (et non le README) :

1. **Source de la page**  
   Sur le dépôt GitHub : **Settings → Pages**.  
   Dans **Build and deployment**, section **Source** : choisir **« GitHub Actions »** (et non « Deploy from a branch »).  
   Si « Deploy from a branch » est sélectionné, GitHub sert le contenu du dépôt (dont le README), pas le site Next.js.

2. **Lancer un déploiement**  
   Chaque push sur `main` déclenche le workflow **Deploy on GitHub Pages**.  
   Vérifier dans l’onglet **Actions** que le workflow a bien réussi (build + deploy).

3. **Secret pour le formulaire** (optionnel)  
   **Settings → Secrets and variables → Actions** → ajouter le secret **`NEXT_PUBLIC_CONTACT_FORM_ACTION`** (URL Formspree) pour que le formulaire de contact fonctionne en production.

4. **URL du site**  
   Après un déploiement réussi : **https://senadev007.github.io/yehi-or-tech/**
