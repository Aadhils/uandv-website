import type { Metadata } from 'next';

import { PortfolioIndexPage } from '@/components/portfolio/portfolio-index-page';
import { DEMO_PROJECT_LABEL } from '@/lib/portfolio';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Portfolio & Demo Center | U&V Technologies',
  description:
    'Explore U&V product demos across websites, mobile apps, MLM, ERP, CRM, restaurant POS, taxi, travel, hospital, school ERP, AI automation, and ecommerce. Placeholders only — no fake client claims.',
  keywords: [
    'U&V portfolio',
    'software demo center',
    'MLM software demo',
    'ERP CRM demos',
    'AI product demos',
    'custom software Tamil Nadu',
  ],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Our Work Speaks for Itself | U&V Portfolio',
    description:
      'Explore software solutions, business systems, and AI-powered product demos from U&V.',
    url: `${siteConfig.url}/portfolio`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Demo Center | U&V',
    description:
      'Product demos across web, mobile, enterprise systems, and AI — clearly marked placeholders.',
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'U&V Portfolio & Demo Center',
    description: `U&V ${DEMO_PROJECT_LABEL.toLowerCase()}s across software, business systems, and AI-powered products.`,
    url: `${siteConfig.url}/portfolio`,
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
      <PortfolioIndexPage />
    </>
  );
}
