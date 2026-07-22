import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
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
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Our Services — Software, AI, Branding & Growth | U&V',
          description:
            'Explore U&V services: website and mobile app development, custom software, AI automation, ERP, CRM, e-commerce, digital marketing, branding, and startup support.',
          path: '/services',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ],
        }}
      />
      <ServicesIndexPage />
    </>
  );
}
