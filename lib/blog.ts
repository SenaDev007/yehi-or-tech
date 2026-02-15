export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  content: string;
}

const posts: BlogPost[] = [
  {
    slug: "infrastructure-numerique-entreprise",
    title: "Pourquoi une infrastructure numérique solide est essentielle pour votre entreprise",
    excerpt:
      "Une infrastructure informatique fiable n'est plus un luxe : c'est le socle de la productivité et de la croissance. Découvrez les piliers à mettre en place.",
    date: "2025-02-10",
    author: "YEHI OR Tech",
    content: `
Les entreprises qui investissent dans une infrastructure numérique adaptée gagnent en réactivité, en sécurité et en capacité d'évolution. Que vous soyez une PME, une école ou une administration, trois piliers comptent : la **maintenance préventive** de vos équipements, la **sécurisation** de vos données et l'**accompagnement** d'un partenaire technique qui comprend vos enjeux.

Chez YEHI OR Tech, nous concevons des environnements informatiques stables et évolutifs, sans suréquipement. L'objectif : que la technologie serve votre activité au quotidien, sans devenir une source de complexité.
    `.trim(),
  },
  {
    slug: "cloud-hebergement-afrique",
    title: "Hébergement et cloud : des solutions accessibles et fiables",
    excerpt:
      "Hébergement web, emails professionnels, sauvegarde : des services essentiels pour une présence numérique professionnelle.",
    date: "2025-02-05",
    author: "YEHI OR Tech",
    content: `
Un site web, une adresse email professionnelle ou des sauvegardes sécurisées ne doivent pas dépendre de solutions hasardeuses. Le cloud et l'hébergement professionnel permettent de centraliser vos outils, de garantir la disponibilité de vos services et de protéger vos données.

Nous proposons des offres adaptées aux réalités des entreprises et institutions : hébergement web fiable, messagerie professionnelle, stockage et sauvegarde. L'objectif est de vous offrir une base technique solide, sans vous enfermer dans des solutions rigides.
    `.trim(),
  },
  {
    slug: "intelligence-artificielle-productivite",
    title: "IA et automatisation : renforcer la productivité sans tout bouleverser",
    excerpt:
      "Chatbots, assistants et automatisation de tâches : comment intégrer l'IA de manière pragmatique dans votre organisation.",
    date: "2025-01-28",
    author: "YEHI OR Tech",
    content: `
L'intelligence artificielle ne se résume pas aux projets futuristes : elle peut déjà améliorer l'accueil client, la gestion des demandes récurrentes et l'organisation du travail. Les chatbots, les assistants numériques et l'automatisation ciblée permettent de gagner du temps et de garder une qualité de service constante.

Nous accompagnons les structures qui souhaitent intégrer ces outils de façon progressive et maîtrisée, en commençant par des cas d'usage concrets et mesurables.
    `.trim(),
  },
];

export function getPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
