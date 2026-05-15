import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yehiortech.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/services',
    '/packs',
    '/portfolio',
    '/blog',
    '/presence-digitale',
    '/contact',
    '/devis',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
