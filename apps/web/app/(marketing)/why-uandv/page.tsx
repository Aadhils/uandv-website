import type { Metadata } from 'next';

import { WhyUandvPage } from '@/components/why-uandv/why-uandv-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Why Businesses Choose U&V | Enterprise Technology Partner',
  description:
    'U&V is a long-term technology and business partner — combining strategy, software, AI, branding, and continuous improvement under one roof.',
  keywords: [
    'why choose U&V',
    'enterprise technology partner',
    'long-term software partner',
    'AI business partner India',
    'U&V Technologies',
    'technology consulting Tamil Nadu',
  ],
  alternates: {
    canonical: '/why-uandv',
  },
  openGraph: {
    title: 'Why Businesses Choose U&V',
    description:
      'We combine technology, strategy, automation, branding, and long-term partnership under one roof.',
    url: `${siteConfig.url}/why-uandv`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Businesses Choose U&V | U&V',
    description:
      'A long-term technology and business partner for strategy, software, AI, and growth.',
  },
};

export default function WhyUandvRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Why Businesses Choose U&V',
    description:
      'U&V enterprise authority page covering principles, industries, technology expertise, workflow, and long-term partnership.',
    url: `${siteConfig.url}/why-uandv`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
      email: siteConfig.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhyUandvPage />
    </>
  );
}
