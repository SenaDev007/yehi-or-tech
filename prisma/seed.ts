/**
 * Seed initial — admin, 5 services, 3 projets.
 * Exécution : npx prisma db seed
 * CDC v1.4
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Utilisateur admin (mot de passe à changer en prod)
  const hashedPassword = await bcrypt.hash("AdminYehi2026!", 12);
  await prisma.user.upsert({
    where: { email: "admin@yehiortech.com" },
    update: {},
    create: {
      email: "admin@yehiortech.com",
      password: hashedPassword,
      name: "Administrateur YEHI OR Tech",
      role: "SUPER_ADMIN",
    },
  });

  // 5 services initiaux
  const servicesData = [
    {
      slug: "creation-logo",
      nom: "Création de Logo",
      categorie: "BRANDING" as const,
      icone: "PenTool",
      descCourte: "Logo professionnel et mémorable.",
      descLongue: "Création de logo sur-mesure avec livrables PNG, SVG, PDF.",
      processus: ["Brief", "Esquisses", "Révisions", "Livraison"],
      livrables: ["Fichiers sources", "Guide d'utilisation"],
      nonInclus: ["Charte graphique complète"],
      delai: "5 à 10 jours",
      badge: "Le plus demandé",
      ordre: 1,
      tarifs: [
        { niveau: "Essentiel", formule: "2 propositions, 2 révisions", prixMin: 25000, prixMax: 25000, ordre: 1 },
        { niveau: "Standard", formule: "3 propositions, révisions illimitées", prixMin: 45000, prixMax: 45000, ordre: 2 },
        { niveau: "Premium", formule: "Recherche sémantique, toutes variantes", prixMin: 80000, prixMax: 150000, ordre: 3 },
      ],
    },
    {
      slug: "site-vitrine",
      nom: "Site Vitrine",
      categorie: "WEB" as const,
      icone: "Globe",
      descCourte: "Site web professionnel et responsive.",
      descLongue: "Sites vitrines 3 à 8 pages, design adapté, formulaire de contact.",
      processus: ["Brief", "Maquettes", "Développement", "Mise en ligne"],
      livrables: ["Site en ligne", "Formation", "Code source"],
      nonInclus: ["E-commerce", "Espace membre"],
      delai: "2 à 4 semaines",
      badge: null,
      ordre: 2,
      tarifs: [
        { niveau: "Essentiel", formule: "3–5 pages, template adapté", prixMin: 80000, prixMax: 80000, ordre: 1 },
        { niveau: "Standard", formule: "6–8 pages, design sur-mesure", prixMin: 150000, prixMax: 150000, ordre: 2 },
        { niveau: "Premium", formule: "Pages illimitées, 100% custom", prixMin: 250000, prixMax: 500000, ordre: 3 },
      ],
    },
    {
      slug: "cartes-visite",
      nom: "Cartes de Visite",
      categorie: "IMPRESSION" as const,
      icone: "CreditCard",
      descCourte: "Cartes de visite professionnelles.",
      descLongue: "Conception et impression de cartes de visite recto/verso.",
      processus: ["Brief", "Maquette", "Validation", "Impression"],
      livrables: ["Fichier print-ready", "Cartes imprimées"],
      nonInclus: ["Livraison express"],
      delai: "3 à 5 jours",
      badge: null,
      ordre: 3,
      tarifs: [
        { niveau: "Essentiel", formule: "50 ex., recto simple", prixMin: 8000, prixMax: 8000, ordre: 1 },
        { niveau: "Standard", formule: "100 ex., recto-verso", prixMin: 18000, prixMax: 18000, ordre: 2 },
        { niveau: "Premium", formule: "250+ ex., pelliculage", prixMin: 35000, prixMax: 60000, ordre: 3 },
      ],
    },
    {
      slug: "pack-startup",
      nom: "Pack Startup",
      categorie: "PACK" as const,
      icone: "Rocket",
      descCourte: "Tout pour démarrer : logo, cartes, site basique.",
      descLongue: "Pack tout-en-un pour entrepreneurs : identité + visibilité web.",
      processus: ["Brief", "Logo", "Cartes", "Site vitrine 3 pages"],
      livrables: ["Logo", "100 cartes", "Site en ligne"],
      nonInclus: ["E-commerce", "Blog avancé"],
      delai: "3 à 4 semaines",
      badge: "Nouveau",
      ordre: 4,
      tarifs: [
        { niveau: "Essentiel", formule: "Logo + 50 cartes + 3 pages", prixMin: 120000, prixMax: 120000, ordre: 1 },
        { niveau: "Standard", formule: "Logo + 100 cartes + 5 pages", prixMin: 200000, prixMax: 200000, ordre: 2 },
        { niveau: "Premium", formule: "Tout inclus + emails pro", prixMin: 350000, prixMax: 500000, ordre: 3 },
      ],
    },
    {
      slug: "credibilite-digitale",
      nom: "Crédibilité Digitale",
      categorie: "CREDIBILITE" as const,
      icone: "ShieldCheck",
      descCourte: "Emails pro, Google Maps, SEO de base.",
      descLongue: "Pack pour être trouvable et crédible en ligne.",
      processus: ["Audit", "Configuration", "Formation"],
      livrables: ["Emails pro", "Fiche Google Maps", "Rapport SEO"],
      nonInclus: ["Création de site"],
      delai: "1 à 2 semaines",
      badge: null,
      ordre: 5,
      tarifs: [
        { niveau: "Essentiel", formule: "Pack Start — bases", prixMin: 35000, prixMax: 35000, ordre: 1 },
        { niveau: "Standard", formule: "Pack Business — complet", prixMin: 50000, prixMax: 50000, ordre: 2 },
        { niveau: "Premium", formule: "Sur devis — avancé", prixMin: 80000, prixMax: 150000, ordre: 3 },
      ],
    },
    { slug: "charte-graphique", nom: "Charte Graphique", categorie: "BRANDING" as const, icone: "Palette", descCourte: "Cohérence visuelle de votre marque.", descLongue: "Palette, typographies, règles d'utilisation du logo et supports.", processus: ["Brief", "Recherche", "Maquettes", "Livraison PDF"], livrables: ["Charte PDF", "Fichiers sources"], nonInclus: ["Création logo"], delai: "1 à 2 semaines", badge: null, ordre: 6, tarifs: [{ niveau: "Essentiel", formule: "Palette + typo, 10 pages", prixMin: 50000, prixMax: 50000, ordre: 1 }, { niveau: "Standard", formule: "Palette + typo + icônes, 25 pages", prixMin: 90000, prixMax: 90000, ordre: 2 }, { niveau: "Premium", formule: "Charte complète + templates", prixMin: 150000, prixMax: 250000, ordre: 3 }] },
    { slug: "pack-identite-complete", nom: "Pack Identité Complète", categorie: "BRANDING" as const, icone: "Layers", descCourte: "Logo, charte et supports de base.", descLongue: "Identité complète : logo, charte graphique, cartes de visite et templates réseaux.", processus: ["Brief", "Logo", "Charte", "Supports"], livrables: ["Logo", "Charte", "Cartes", "Templates"], nonInclus: ["Site web"], delai: "3 à 4 semaines", badge: null, ordre: 7, tarifs: [{ niveau: "Essentiel", formule: "Logo + Charte + 100 cartes", prixMin: 120000, prixMax: 120000, ordre: 1 }, { niveau: "Standard", formule: "Logo + Charte + Cartes + Templates", prixMin: 200000, prixMax: 200000, ordre: 2 }, { niveau: "Premium", formule: "Tout inclus + Site vitrine + Emails pro", prixMin: 350000, prixMax: 500000, ordre: 3 }] },
    { slug: "e-commerce", nom: "Site E-Commerce", categorie: "WEB" as const, icone: "ShoppingCart", descCourte: "Boutique en ligne avec MoMo et Flooz.", descLongue: "Site e-commerce avec gestion des commandes, paiement mobile et tableau de bord vendeur.", processus: ["Brief", "Maquettes", "Développement", "Formation"], livrables: ["Site en ligne", "Formation", "Documentation"], nonInclus: ["Multi-vendeurs"], delai: "4 à 8 semaines", badge: null, ordre: 8, tarifs: [{ niveau: "Essentiel", formule: "Jusqu'à 50 produits, MoMo + Flooz", prixMin: 200000, prixMax: 200000, ordre: 1 }, { niveau: "Standard", formule: "Produits illimités, coupons, SEO", prixMin: 400000, prixMax: 400000, ordre: 2 }, { niveau: "Premium", formule: "Fonctionnalités avancées, multi-vendeurs", prixMin: 700000, prixMax: 1500000, ordre: 3 }] },
    { slug: "app-sur-mesure", nom: "Application Sur-Mesure", categorie: "WEB" as const, icone: "Code", descCourte: "Application web adaptée à vos process.", descLongue: "Développement d'applications web sur-mesure avec interface d'administration et API si besoin.", processus: ["Brief", "Spécifications", "Développement", "Tests", "Livraison"], livrables: ["Application", "Documentation", "Formation"], nonInclus: ["Hébergement"], delai: "Sur devis", badge: null, ordre: 9, tarifs: [{ niveau: "Essentiel", formule: "Module unique, interface admin", prixMin: 300000, prixMax: 300000, ordre: 1 }, { niveau: "Standard", formule: "3–5 modules, API externe", prixMin: 600000, prixMax: 600000, ordre: 2 }, { niveau: "Premium", formule: "Architecture complexe, support 3 mois", prixMin: 1000000, prixMax: 3000000, ordre: 3 }] },
    { slug: "maintenance-web", nom: "Maintenance Web", categorie: "WEB" as const, icone: "Settings", descCourte: "Mises à jour, sauvegardes et support.", descLongue: "Maintenance technique : mises à jour, sauvegardes, rapport mensuel et support.", processus: ["Audit", "Plan de maintenance", "Suivi"], livrables: ["Rapport mensuel", "Sauvegardes"], nonInclus: ["Développement majeur"], delai: "Continu", badge: null, ordre: 10, tarifs: [{ niveau: "Essentiel", formule: "Màj, sauvegardes, rapport", prixMin: 15000, prixMax: 15000, ordre: 1 }, { niveau: "Standard", formule: "Tout Essentiel + 5h support", prixMin: 30000, prixMax: 30000, ordre: 2 }, { niveau: "Premium", formule: "Tout Standard + dev mineur", prixMin: 70000, prixMax: 70000, ordre: 3 }] },
    { slug: "flyers-affiches", nom: "Flyers & Affiches", categorie: "IMPRESSION" as const, icone: "FileImage", descCourte: "Flyers et affiches print-ready.", descLongue: "Conception et impression de flyers et affiches aux formats A5, A4 ou A3.", processus: ["Brief", "Maquette", "Validation", "Impression"], livrables: ["Fichier print-ready", "Impression"], nonInclus: ["Livraison"], delai: "3 à 7 jours", badge: null, ordre: 11, tarifs: [{ niveau: "Essentiel", formule: "Format A5, 1 révision", prixMin: 8000, prixMax: 8000, ordre: 1 }, { niveau: "Standard", formule: "A4 ou A3, 3 révisions", prixMin: 20000, prixMax: 20000, ordre: 2 }, { niveau: "Premium", formule: "Format sur-mesure, déclinaisons", prixMin: 40000, prixMax: 80000, ordre: 3 }] },
    { slug: "pack-pme", nom: "Pack PME", categorie: "PACK" as const, icone: "Building", descCourte: "Identité + site + crédibilité pour PME.", descLongue: "Pack complet pour les PME : identité visuelle, site vitrine 6–8 pages et configuration emails pro + Google Maps.", processus: ["Brief", "Identité", "Site", "Crédibilité"], livrables: ["Logo", "Charte", "Site", "Emails", "Maps"], nonInclus: ["E-commerce"], delai: "4 à 6 semaines", badge: "Recommandé", ordre: 12, tarifs: [{ niveau: "Essentiel", formule: "Logo + Site 5 pages + Emails", prixMin: 250000, prixMax: 250000, ordre: 1 }, { niveau: "Standard", formule: "Logo + Charte + Site 8 pages + Crédibilité", prixMin: 400000, prixMax: 400000, ordre: 2 }, { niveau: "Premium", formule: "Tout + Formation + Support 1 mois", prixMin: 600000, prixMax: 900000, ordre: 3 }] },
    { slug: "emails-pro", nom: "Emails Professionnels", categorie: "CREDIBILITE" as const, icone: "Mail", descCourte: "Adresses email @votredomaine.com.", descLongue: "Configuration d'adresses email professionnelles avec SPF/DKIM et guide utilisateur.", processus: ["Audit", "Configuration", "Test"], livrables: ["Adresses actives", "Guide"], nonInclus: ["Hébergement web"], delai: "1 à 3 jours", badge: null, ordre: 13, tarifs: [{ niveau: "Essentiel", formule: "1–3 adresses, config basique", prixMin: 10000, prixMax: 10000, ordre: 1 }, { niveau: "Standard", formule: "4–10 adresses, SPF + DKIM", prixMin: 15000, prixMax: 15000, ordre: 2 }, { niveau: "Premium", formule: "11–25 adresses, migration", prixMin: 25000, prixMax: 50000, ordre: 3 }] },
    { slug: "google-maps", nom: "Google Maps & Visibilité", categorie: "CREDIBILITE" as const, icone: "MapPin", descCourte: "Fiche entreprise et optimisation SEO local.", descLongue: "Création et optimisation de votre fiche Google Maps pour le référencement local.", processus: ["Création fiche", "Optimisation", "Photos"], livrables: ["Fiche optimisée"], nonInclus: ["Avis payants"], delai: "1 à 2 jours", badge: null, ordre: 14, tarifs: [{ niveau: "Essentiel", formule: "Création fiche, 1 photo", prixMin: 10000, prixMax: 10000, ordre: 1 }, { niveau: "Standard", formule: "Optimisation complète, 5 photos", prixMin: 15000, prixMax: 15000, ordre: 2 }, { niveau: "Premium", formule: "Optimisation avancée, suivi 1 mois", prixMin: 20000, prixMax: 35000, ordre: 3 }] },
    { slug: "formations-digitales", nom: "Formations Digitales", categorie: "FORMATION" as const, icone: "GraduationCap", descCourte: "Montée en compétences numérique.", descLongue: "Formations Crédibilité Digitale, Branding pour non-designers, WordPress et réseaux sociaux. Présentiel ou distanciel.", processus: ["Besoin", "Programme", "Animation"], livrables: ["Support", "Attestation"], nonInclus: ["Certification"], delai: "Sur calendrier", badge: "Nouveau", ordre: 15, tarifs: [{ niveau: "Essentiel", formule: "Crédibilité Digitale, 1 jour", prixMin: 50000, prixMax: 80000, ordre: 1 }, { niveau: "Standard", formule: "Branding ou WordPress, 1 jour", prixMin: 30000, prixMax: 50000, ordre: 2 }, { niveau: "Premium", formule: "Programme sur mesure", prixMin: 80000, prixMax: 200000, ordre: 3 }] },
    { slug: "hebergement-domaine", nom: "Hébergement & Domaine", categorie: "HEBERGEMENT" as const, icone: "Server", descCourte: "Domaine, hébergement et migration.", descLongue: "Enregistrement de domaine, configuration hébergement OVH, migration d'hébergeur et renouvellement annuel.", processus: ["Audit", "Configuration", "Mise en ligne"], livrables: ["Domaine actif", "Hébergement opérationnel"], nonInclus: ["Développement site"], delai: "1 à 5 jours", badge: "Nouveau", ordre: 16, tarifs: [{ niveau: "Essentiel", formule: "Enregistrement domaine", prixMin: 10000, prixMax: 20000, ordre: 1 }, { niveau: "Standard", formule: "Config hébergement OVH, SSL", prixMin: 20000, prixMax: 40000, ordre: 2 }, { niveau: "Premium", formule: "Migration hébergeur", prixMin: 25000, prixMax: 50000, ordre: 3 }] },
  ];

  for (const s of servicesData) {
    const { tarifs, ...service } = s;
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        tarifs: {
          create: tarifs.map((t) => ({
            niveau: t.niveau,
            formule: t.formule,
            prixMin: t.prixMin,
            prixMax: t.prixMax,
            ordre: t.ordre,
          })),
        },
      },
    });
  }

  // 3 projets phares — images depuis /public/images
  const projetsData = [
    {
      slug: "foncier-facile-afrique",
      titre: "Foncier Facile Afrique",
      client: "Foncier Facile Afrique",
      secteur: "Immobilier & Conseil foncier",
      categorie: "SITE_WEB" as const,
      problematique: "Absence de présence web professionnelle pour un cabinet de conseil en investissement foncier opérant entre le Bénin et la France.",
      solution: "Refonte complète du site web en Next.js 15 avec design dark premium (Anthracite & Or), interface publique + backoffice administrateur.",
      resultats: "Site professionnel livré avec design premium cohérent, interface admin autonome, optimisé mobile et SEO.",
      imagePrincipale: "/images/portfolio-mockup-ffa.jpg",
      images: ["/images/portfolio-mockup-ffa.jpg"],
      urlExterne: "https://foncierfacileafrique.fr",
      miseEnAvant: true,
      publie: true,
      ordre: 1,
    },
    {
      slug: "serma-hub",
      titre: "SERMA HUB — Impact Academy",
      client: "CFPEA — Centre de Formation Professionnelle Entrepreneuriale",
      secteur: "Formation professionnelle",
      categorie: "SITE_WEB" as const,
      problematique: "Le CFPEA de Parakou avait besoin d'un site institutionnel complet pour présenter ses 5 filières et permettre les inscriptions en ligne avec paiement mobile.",
      solution: "Site institutionnel complet avec 5 pages filières, intégration FedaPay pour paiement mobile money, design navy & orange lumineux, backoffice admin.",
      resultats: "Site livré avec paiement intégré, design cohérent avec la charte SERMA HUB, optimisé pour les étudiants béninois sur mobile.",
      imagePrincipale: "/images/portfolio-mockup-serma.jpg",
      images: ["/images/portfolio-mockup-serma.jpg"],
      urlExterne: "https://sermahub.com",
      miseEnAvant: true,
      publie: true,
      ordre: 2,
    },
    {
      slug: "academia-helm",
      titre: "Academia Helm — Plateforme SaaS",
      client: "YEHI OR Tech (produit interne)",
      secteur: "EdTech / SaaS",
      categorie: "APP_WEB" as const,
      problematique: "Les établissements scolaires béninois manquent d'outils de gestion numérique accessibles et adaptés à leur réalité.",
      solution: "Plateforme SaaS multi-tenant de gestion scolaire. Chaque école dispose de son sous-domaine propre. Gestion élèves, notes, emplois du temps, paiements.",
      resultats: "Plateforme en beta avec une institution test au Bénin. Architecture multi-tenant fonctionnelle sur Cloudflare + Vercel.",
      imagePrincipale: "/images/portfolio-mockup-academia.jpg",
      images: ["/images/portfolio-mockup-academia.jpg"],
      urlExterne: "https://academiahelm.com",
      miseEnAvant: true,
      publie: true,
      ordre: 3,
    },
  ];

  for (const p of projetsData) {
    await prisma.projet.upsert({
      where: { slug: p.slug },
      update: {
        imagePrincipale: p.imagePrincipale,
        images: p.images,
        titre: p.titre,
        client: p.client,
        secteur: p.secteur,
        problematique: p.problematique,
        solution: p.solution,
        resultats: p.resultats,
        urlExterne: p.urlExterne ?? null,
      },
      create: p,
    });
  }

  // Articles blog initiaux — couvertures depuis /public/images
  const articlesData = [
    { slug: "pourquoi-branding-crucial-pme-beninoise-2025", titre: "Pourquoi le branding est crucial pour les PME béninoises en 2025", extrait: "Dans un marché de plus en plus concurrentiel, une identité visuelle forte n'est plus un luxe.", contenu: "<h2>Le branding, un investissement</h2><p>...</p>", couverture: "/images/blog-cover-branding-benin.jpg", auteur: "YEHI OR Tech", categorie: "BRANDING" as const, tags: ["branding", "PME", "Bénin"], statut: "PUBLIE" as const, publishedAt: new Date() },
    { slug: "site-web-ou-page-facebook-entrepreneur-beninois", titre: "Site web ou page Facebook : ce que tout entrepreneur béninois doit savoir", extrait: "Facebook est un outil de communication. Un site web est votre maison digitale.", contenu: "<h2>Votre page Facebook peut disparaître</h2><p>...</p>", couverture: "/images/blog-cover-site-vs-facebook.jpg", auteur: "YEHI OR Tech", categorie: "WEB" as const, tags: ["site web", "Facebook", "entrepreneur"], statut: "PUBLIE" as const, publishedAt: new Date() },
    { slug: "spf-dkim-dmarc-emails-professionnels-benin", titre: "SPF, DKIM, DMARC : pourquoi vos emails arrivent en spam — et comment y remédier", extrait: "Si vos emails professionnels finissent en spam, ce n'est pas un hasard.", contenu: "<h2>Pourquoi votre email atterrit en spam</h2><p>...</p>", couverture: "/images/blog-cover-dns-antispam.jpg", auteur: "YEHI OR Tech", categorie: "GUIDES" as const, tags: ["DNS", "email", "SPF", "DKIM"], statut: "PUBLIE" as const, publishedAt: new Date() },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { couverture: a.couverture },
      create: a,
    });
  }

  console.log("Seed terminé : 1 admin, 16 services, 3 projets, 3 articles.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
