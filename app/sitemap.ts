import type { MetadataRoute } from 'next';
import { siteConfig } from '../lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/docs/',
    '/docs/features/',
    '/docs/theming/',
    '/docs/patterns/',
    '/docs/accessibility/',
    '/docs/nextjs/',
  ];

  return routes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route === '/docs/' ? 0.9 : 0.75,
  }));
}
