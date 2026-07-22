import type { MetadataRoute } from 'next';

import { getAllCaseStudies } from '@/lib/portfolio';
import { getAllServices } from '@/lib/services';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const services = getAllServices().map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const portfolio = getAllCaseStudies().map((study) => ({
    url: `${siteConfig.url}/portfolio/${study.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...services,
    {
      url: `${siteConfig.url}/portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...portfolio,
    {
      url: `${siteConfig.url}/business-consulting`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/why-uandv`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/solutions/mlm-software`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/legal/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/legal/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
