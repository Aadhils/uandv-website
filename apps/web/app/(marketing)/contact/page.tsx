import type { Metadata } from 'next';
import { Suspense } from 'react';

import { JsonLd } from '@/components/seo/json-ld';
import { ContactPage } from '@/components/contact/contact-page';
import { siteConfig } from '@/lib/site';

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
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Contact U&V | Business Technology Partner',
          description:
            'Contact U&V Technologies for software, AI, and digital transformation.',
          path: '/contact',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ],
        }}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 text-uv-foreground-muted sm:px-6 lg:px-8">
            Loading contact form…
          </div>
        }
      >
        <ContactPage />
      </Suspense>
    </>
  );
}
