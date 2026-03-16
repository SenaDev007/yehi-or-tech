/**
 * Centralise tous les chemins d'images du site.
 * Modifier ici si un fichier est renommé ou déplacé.
 * Intégration images v1.2 — Next/Image uniquement.
 */

export const IMAGES = {
  // ── LOGOS CLIENTS (Ils nous font confiance) ───────────
  clientLogos: {
    academiaHelm: "/images/logo-Academia Helm.png",
    ffa: "/images/logo FFA.png",
    sermaHub: "/images/logo sermahub1.png",
  },

  // ── ACCUEIL ──────────────────────────────────────────
  accueil: {
    heroBg: "/images/hero-background.jpg",
    foundersPhoto: "/images/hero-founders-photo.jpg",
    iconExpertiseLocale: "/images/icon-expertise-locale.png",
    iconQualiteInternationale: "/images/icon-qualite-internationale.png",
    iconTransparencePrix: "/images/icon-transparence-prix.png",
    statsBg: "/images/stats-background.jpg",
    testimonialMoussa: "/images/testimonial-moussa.jpg",
    testimonialAicha: "/images/testimonial-aicha.jpg",
    testimonialKofi: "/images/testimonial-kofi.jpg",
    ctaFinalBg: "/images/cta-final-background.jpg",
  },

  // ── À PROPOS ──────────────────────────────────────────
  about: {
    heroBg: "/images/about-hero-background.jpg",
    foundingSpark: "/images/about-founding-spark.jpg",
    iconMission: "/images/icon-mission.png",
    iconVision: "/images/icon-vision.png",
    iconValeurs: "/images/icon-valeurs.png",
    founderSenakpon: "/images/founder-senakpon.jpg",
    founderStevens: "/images/founder-stevens.jpg",
    timelineBg: "/images/timeline-background.jpg",
  },

  // ── SERVICES ──────────────────────────────────────────
  services: {
    heroBg: "/images/services-hero-background.jpg",
    iconBranding: "/images/icon-pole-branding.png",
    iconWeb: "/images/icon-pole-web.png",
    iconImpression: "/images/icon-pole-impression.png",
    iconPacks: "/images/icon-pole-packs.png",
    iconCredibilite: "/images/icon-pole-credibilite.png",
  },

  // ── PORTFOLIO ─────────────────────────────────────────
  portfolio: {
    heroBg: "/images/portfolio-hero-background.jpg",
    mockupFFA: "/images/portfolio-mockup-ffa.jpg",
    mockupSerma: "/images/portfolio-mockup-serma.jpg",
    mockupAcademia: "/images/portfolio-mockup-academia.jpg",
    placeholder: "/images/portfolio-placeholder.jpg",
  },

  // ── BLOG ──────────────────────────────────────────────
  blog: {
    coverBrandingBenin: "/images/blog-cover-branding-benin.jpg",
    coverSiteVsFacebook: "/images/blog-cover-site-vs-facebook.jpg",
    coverDnsAntispam: "/images/blog-cover-dns-antispam.jpg",
  },

  // ── CARRIÈRE ──────────────────────────────────────────
  carriere: {
    teamAmbiance: "/images/carriere-team-ambiance.jpg",
    jobsIllustration: "/images/carriere-jobs-illustration.jpg",
  },

  // ── CONTACT ───────────────────────────────────────────
  contact: {
    heroBg: "/images/contact-hero-background.jpg",
  },

  // ── DEVIS ─────────────────────────────────────────────
  devis: {
    formBg: "/images/devis-form-background.jpg",
    successIllustration: "/images/devis-success-illustration.jpg",
  },

  // ── ELIOR IA ──────────────────────────────────────────
  elior: {
    avatar: "/images/elior-avatar.jpg",
    chatBg: "/images/elior-chat-background.jpg",
  },

  // ── OPEN GRAPH ────────────────────────────────────────
  og: {
    default: "/images/og-default.jpg",
    carriere: "/images/og-carriere.jpg",
  },

  // ── UI ────────────────────────────────────────────────
  ui: {
    logo: "/images/YEHI OR logo.PNG",
    textureLightSections: "/images/texture-light-sections.jpg",
    sectionDividerWave: "/images/section-divider-wave.png",
    headerBg: "/images/header-background.jpg",
    footerBg: "/images/footer-background.jpg",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
