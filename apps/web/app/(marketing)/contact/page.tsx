import type { Metadata } from 'next';
import { Suspense } from 'react';

import { JsonLd } from '@/components/seo/json-ld';
import { ContactPage } from '@/components/contact/contact-page';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact U&V | Book a Free Consultation',
  description:
    'Contact U&V by enquiry form, email, or WhatsApp. Honest consultation, practical recommendations, and response within 24 business hours — Tamil Nadu, India.',
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
    title: 'Contact U&V | Book a Free Consultation',
    description:
      'Send an enquiry, email, or WhatsApp U&V. We review your requirements and respond within 24 business hours with practical next steps.',
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact U&V | Book a Free Consultation',
    description:
      'Honest consultation and practical recommendations. Response within 24 business hours.',
  },
};

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Contact U&V | Book a Free Consultation',
          description:
            'Contact U&V for honest consultation and practical recommendations. Enquiry form, email, and WhatsApp — response within 24 business hours.',
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
