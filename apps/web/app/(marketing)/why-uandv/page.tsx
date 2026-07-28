import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { WhyUandvPage } from '@/components/why-uandv/why-uandv-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Why U&V | Trust & Partnership',
  description:
    'Why business owners trust U&V as a long-term partner — not another software vendor. Our principles, partnership model, and commitment that lasts beyond launch.',
  keywords: [
    'why trust U&V',
    'why choose U&V',
    'long-term business partner',
    'software partnership India',
    'U&V Technologies',
    'trustworthy software partner Tamil Nadu',
  ],
  alternates: {
    canonical: '/why-uandv',
  },
  openGraph: {
    title: 'Why U&V | Trust & Partnership',
    description:
      'U&V is a long-term business partner — built on trust, honest communication, and commitment that continues after launch.',
    url: `${siteConfig.url}/why-uandv`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why U&V | Trust & Partnership',
    description:
      'Why business owners trust U&V — a partner who stays, not a vendor who disappears.',
  },
};

export default function WhyUandvRoute() {
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Why U&V | Trust & Partnership',
          description:
            'Why business owners trust U&V — principles, partnership behaviour, client retention, and industry understanding.',
          path: '/why-uandv',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Why U&V', path: '/why-uandv' },
          ],
        }}
      />
      <WhyUandvPage />
    </>
  );
}
