import type { Metadata } from 'next';

import { BusinessDiscoverySummaryPage } from '@/components/discovery-wizard/business-discovery-summary-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Business Discovery Summary | U&V',
  description:
    'Review your discovery consultation summary — recommended services, budget, timeline, partners, and demo CRM lead.',
  alternates: {
    canonical: '/business-discovery/summary',
  },
  openGraph: {
    title: 'Business Discovery Summary | U&V',
    url: `${siteConfig.url}/business-discovery/summary`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function BusinessDiscoverySummaryRoute() {
  return <BusinessDiscoverySummaryPage />;
}
