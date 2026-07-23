import type { Metadata } from 'next';

import { Faq } from '@/components/marketing/faq';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ | U&V',
  description:
    'Common questions about U&V — services, who we work with, how to get started, and what to expect.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | U&V',
    description: 'Straight answers before you reach out.',
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function FaqPage() {
  return (
    <div className="marketing-grain flex-1">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'FAQ' },
          ]}
        />
      </div>
      <Faq />
    </div>
  );
}
