import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { LandingPage } from '@/components/marketing/landing-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.headline}`,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.headline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function MarketingHomePage() {
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: `${siteConfig.name} — ${siteConfig.headline}`,
          description: siteConfig.description,
          path: '/',
          breadcrumbs: [{ name: 'Home', path: '/' }],
        }}
      />
      <LandingPage />
    </>
  );
}
