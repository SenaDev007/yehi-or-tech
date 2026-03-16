# Déploiement sur Vercel — YEHI OR Tech

Ce document décrit comment déployer le projet sur [Vercel](https://vercel.com).

## Prérequis

- Un compte [Vercel](https://vercel.com/signup)
- Un dépôt Git (GitHub, GitLab ou Bitbucket) contenant ce projet
- Une base PostgreSQL (Vercel Postgres, [Neon](https://neon.tech), [Supabase](https://supabase.com), ou autre)

## Étapes

### 1. Importer le projet sur Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Importez le dépôt Git du projet
3. Vercel détecte automatiquement **Next.js** ; ne changez pas le framework
4. (Optionnel) Choisissez une région proche de vos utilisateurs (ex. `cdg1` pour l’Europe)

### 2. Variables d’environnement

Dans **Project Settings → Environment Variables**, ajoutez au minimum :

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL (avec `?sslmode=require` en production) | Oui |
| `JWT_SECRET` | Secret pour les JWT (min. 32 caractères), ex. `openssl rand -base64 64` | Oui |
| `JWT_EXPIRES_IN` | Durée de validité du token, ex. `7d` | Recommandé |
| `NEXT_PUBLIC_SITE_URL` | URL du site, ex. `https://yehiortech.com` | Oui |
| `NEXT_PUBLIC_DEVIS_URL` | URL du formulaire devis si externe | Recommandé |
| `RESEND_API_KEY` | Clé API Resend pour l’envoi d’emails | Pour contact/devis |
| `FROM_EMAIL` | Email expéditeur (domaine vérifié sur Resend) | Si emails |
| `ADMIN_EMAIL` | Email de notification admin | Si emails |
| `ANTHROPIC_API_KEY` | Clé Anthropic pour le chat Elior IA | Si module Elior |
| `META_VERIFY_TOKEN` | Token de vérification webhook Meta | Si webhooks Meta |
| `META_APP_SECRET` | Secret app Meta | Si webhooks Meta |

Référence complète : voir `.env.example`.

Cochez **Production**, **Preview** et **Development** selon vos besoins pour chaque variable.

### 3. Base de données

- **Premier déploiement** : exécutez les migrations en local ou depuis un job CI, puis pointez `DATABASE_URL` vers cette base :
  ```bash
  npx prisma migrate deploy
  ```
- Si vous utilisez un fournisseur avec **connection pooling** (Neon, Supabase), renseignez aussi `DIRECT_URL` dans `prisma/schema.prisma` (datasource) et dans les variables Vercel si vous l’utilisez en script.

### 4. Déployer

- **Push** sur la branche connectée (souvent `main`) déclenche un déploiement automatique
- Ou lancez un **Redeploy** depuis le dashboard Vercel après avoir ajouté les variables

### 5. Après le déploiement

- Vérifiez l’URL de production fournie par Vercel
- Si vous utilisez un nom de domaine perso, ajoutez-le dans **Project Settings → Domains** et configurez le DNS selon les indications Vercel
- Pour les **preview** (branches / PR), les déploiements créent des URLs de preview ; vous pouvez y limiter certaines variables (ex. une base de preview) via les env par environnement

## Fichiers utiles

- `vercel.json` : configuration du build (commande avec `prisma generate`)
- `.env.example` : liste des variables à renseigner
- `postinstall` dans `package.json` : exécute déjà `prisma generate` après `npm install`

## Dépannage

- **Erreur Prisma** : vérifiez que `DATABASE_URL` est bien défini et que la base est accessible depuis Internet (IP autorisée, SSL si requis)
- **Build échoue** : consultez les logs du build sur Vercel ; vérifiez que `npm run build` passe en local
- **500 sur certaines pages** : souvent une variable d’environnement manquante côté serveur (JWT_SECRET, RESEND_API_KEY, etc.)
