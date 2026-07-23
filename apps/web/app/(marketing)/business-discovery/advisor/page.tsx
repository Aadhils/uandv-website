import type { Metadata } from 'next';

import { BusinessAdvisorDashboard } from '@/components/advisor-engine';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI Business Advisor | U&V',
  description:
    'Business readiness score, roadmap, budget, timeline, registrations, services, partners, and AI recommendations from your discovery answers.',
  alternates: {
    canonical: '/business-discovery/advisor',
  },
  openGraph: {
    title: 'AI Business Advisor | U&V',
    url: `${siteConfig.url}/business-discovery/advisor`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function BusinessDiscoveryAdvisorRoute() {
  return <BusinessAdvisorDashboard />;
}
