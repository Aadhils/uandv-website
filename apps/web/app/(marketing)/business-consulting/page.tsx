import type { Metadata } from 'next';

import { BusinessConsultingPage } from '@/components/consulting/business-consulting-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Business Solutions Framework | U&V',
  description:
    'U&V is a long-term technology and business growth partner — from discovery and architecture to launch, growth support, and continuous improvement.',
  keywords: [
    'business solutions',
    'technology consulting Tamil Nadu',
    'startup consulting',
    'AI transformation consulting',
    'ERP CRM consulting',
    'U&V business solutions framework',
  ],
  alternates: {
    canonical: '/business-consulting',
  },
  openGraph: {
    title: 'We Don’t Just Build Software. We Build Businesses. | U&V',
    description:
      'From idea to global growth, U&V partners with you in technology, strategy, automation, and continuous innovation.',
    url: `${siteConfig.url}/business-consulting`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Solutions Framework | U&V',
    description:
      'A premium business solutions framework for strategy, software, AI, and long-term growth partnership.',
  },
};

export default function BusinessConsultingRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'U&V Business Solutions Framework',
    description:
      'U&V business solutions framework covering discovery, architecture, development, launch, and continuous growth partnership.',
    url: `${siteConfig.url}/business-consulting`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessConsultingPage />
    </>
  );
}
