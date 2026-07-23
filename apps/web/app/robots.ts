import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/design-system',
        '/demo',
        '/demo/',
        '/dashboard',
        '/dashboard/',
        '/admin',
        '/admin/',
        '/login',
        '/signup',
        '/forgot-password',
        '/verify-email',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
