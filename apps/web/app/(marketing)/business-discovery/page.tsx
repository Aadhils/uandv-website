import type { Metadata } from 'next';

import { BusinessDiscoveryPage } from '@/components/discovery-wizard/business-discovery-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Business Discovery Wizard | U&V',
  description:
    'A guided, conversational business discovery wizard to clarify your goals, requirements, and next steps with U&V.',
  alternates: {
    canonical: '/business-discovery',
  },
  openGraph: {
    title: 'Business Discovery Wizard | U&V',
    description:
      'Tell us what you want to achieve — start, grow, build, automate, or partner — and get a clear next step.',
    url: `${siteConfig.url}/business-discovery`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function BusinessDiscoveryRoute() {
  return <BusinessDiscoveryPage />;
}
