import type { Metadata } from 'next';

import { MlmSolutionsPage } from '@/components/solutions/mlm-solutions-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Enterprise MLM Software & Business Growth Solutions | U&V',
  description:
    'U&V is a long-term MLM business growth partner — compensation consulting, custom MLM software, wallets, commission engines, apps, marketing, and continuous optimization.',
  keywords: [
    'enterprise MLM software',
    'MLM business growth partner',
    'custom compensation plan software',
    'binary unilevel matrix MLM',
    'MLM commission engine',
    'network marketing software India',
    'MLM consulting Tamil Nadu',
  ],
  alternates: {
    canonical: '/solutions/mlm-software',
  },
  openGraph: {
    title: 'Enterprise MLM Software & Business Growth Solutions | U&V',
    description:
      'Design, validate, launch, optimize, and scale MLM companies with technology, strategy, automation, and continuous consulting.',
    url: `${siteConfig.url}/solutions/mlm-software`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise MLM Software | U&V',
    description:
      'Flagship MLM solutions from U&V — consulting, custom plans, software modules, and long-term growth partnership.',
  },
};

export default function MlmSoftwareSolutionRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise MLM Software & Business Growth Solutions',
    serviceType: 'MLM software and consulting',
    description:
      'U&V helps businesses design, validate, launch, optimize, and scale MLM companies with technology, strategy, automation, and continuous consulting.',
    url: `${siteConfig.url}/solutions/mlm-software`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
      email: siteConfig.email,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${siteConfig.location.region}, ${siteConfig.location.country}`,
      },
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'MLM compensation plans and modules',
      itemListElement: [
        'Binary',
        'Referral',
        'Unilevel',
        'Matrix',
        'Custom Compensation Plan',
        'Commission Engine',
        'E-Wallet',
        'Member Panel',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MlmSolutionsPage />
    </>
  );
}
