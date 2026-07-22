import type { Metadata } from 'next';

import { ContactPage } from '@/components/contact/contact-page';
import { formatLocation, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact U&V | Business Technology Partner',
  description:
    'Contact U&V Technologies in Tamil Nadu, India. Email info@uandv.com, WhatsApp, or send a message — we help with software, AI, and digital transformation.',
  keywords: [
    'contact U&V',
    'U&V Technologies contact',
    'software company Tamil Nadu',
    'info@uandv.com',
    'business technology partner India',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact U&V',
    description:
      'Reach U&V by email, WhatsApp, or the contact form. Based in Tamil Nadu, India.',
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact U&V | Business Technology Partner',
    description:
      'Email info@uandv.com or WhatsApp us. Tamil Nadu, India.',
  },
};

export default function ContactRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact U&V',
    description:
      'Contact U&V Technologies for software, AI, and digital transformation.',
    url: `${siteConfig.url}/contact`,
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
      address: {
        '@type': 'PostalAddress',
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
      areaServed: formatLocation(),
      openingHours: siteConfig.hours,
      sameAs: [
        siteConfig.social.facebook,
        siteConfig.social.youtube,
        siteConfig.social.linkedin,
        siteConfig.social.x,
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </>
  );
}
