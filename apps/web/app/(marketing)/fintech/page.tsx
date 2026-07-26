import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { FintechSolutionsPage } from '@/components/fintech/fintech-solutions-page';
import { organizationId } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FinTech Software Development | U&V',
  description:
    'U&V is a financial technology development company building software, platforms, automation, CRM, client portals, mobile apps, and API integrations for financial businesses — not investment advice, trading, or guaranteed returns.',
  keywords: [
    'financial technology development',
    'FinTech software company',
    'trading journal platform development',
    'broker CRM software',
    'prop firm platform development',
    'financial dashboard development',
    'FinTech mobile app development',
    'market data API integration',
  ],
  alternates: {
    canonical: '/fintech',
  },
  openGraph: {
    title: 'FinTech Software Development | U&V',
    description:
      'Software, platforms, automation, CRM, client portals, and API integrations for financial businesses — U&V is a FinTech development partner, not a broker or advisor.',
    url: `${siteConfig.url}/fintech`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinTech Software Development | U&V',
    description:
      'FinTech software development — secure platforms for brokers, advisors, research firms, and financial startups.',
  },
};

export default function FintechRoutePage() {
  const url = `${siteConfig.url}/fintech`;

  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Financial Technology Solutions | U&V',
          description:
            'U&V is a financial technology development company providing software, AI, CRM, dashboards, portals, mobile apps, and API integrations for financial-market businesses.',
          path: '/fintech',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'FinTech', path: '/fintech' },
          ],
        }}
        extra={[
          {
            '@type': 'Service',
            '@id': `${url}#fintech-service`,
            name: 'Financial Technology Solutions',
            serviceType: 'Financial technology software development',
            description:
              'Custom FinTech software including CRM, dashboards, client portals, mobile apps, AI automation, and API integrations for financial businesses.',
            url,
            provider: { '@id': organizationId() },
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
          },
        ]}
      />
      <FintechSolutionsPage />
    </>
  );
}
