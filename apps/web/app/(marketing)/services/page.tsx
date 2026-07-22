import type { Metadata } from 'next';

import { ServicesIndexPage } from '@/components/services/services-index-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Services — Software, AI, Branding & Growth | U&V',
  description:
    'Explore U&V services: website and mobile app development, custom software, AI automation, ERP, CRM, e-commerce, digital marketing, branding, and startup support.',
  keywords: [
    'U&V services',
    'software development Tamil Nadu',
    'AI automation',
    'website development',
    'digital marketing',
    'business consulting India',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Our Services | U&V',
    description:
      'Technology and growth services under one roof — from websites and custom software to AI, branding, and startup setup.',
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'U&V Services',
    description:
      'Full catalog of U&V technology and growth services for startups, SMEs, and enterprises.',
    url: `${siteConfig.url}/services`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesIndexPage />
    </>
  );
}
