import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { StartupPage } from '@/components/startup/startup-page';
import { organizationId } from '@/lib/schema';
import { startupPositioning } from '@/lib/startup';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Startup Growth Partner | U&V',
  description:
    'U&V helps founders with idea validation, business planning, registration, branding, websites, apps, AI, marketing, launch support, and long-term growth — honest guidance, not guaranteed funding or instant success.',
  alternates: {
    canonical: '/startup',
  },
  openGraph: {
    title: 'Startup Growth Partner | U&V',
    description:
      'From first idea to launch and beyond — planning, technology, branding, and growth support for founders who need clarity and a long-term partner.',
    url: `${siteConfig.url}/startup`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Growth Partner | U&V',
    description:
      'Founder support from idea validation through launch and growth — practical, encouraging, and honest.',
  },
};

export default function StartupRoutePage() {
  const url = `${siteConfig.url}/startup`;

  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Startup Growth Partner | U&V',
          description: startupPositioning.subheadline,
          path: '/startup',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Startup', path: '/startup' },
          ],
        }}
        extra={[
          {
            '@type': 'Service',
            '@id': `${url}#service`,
            name: 'Startup Growth Partner',
            description: startupPositioning.subheadline,
            url,
            provider: { '@id': organizationId() },
          },
        ]}
      />
      <StartupPage />
    </>
  );
}
