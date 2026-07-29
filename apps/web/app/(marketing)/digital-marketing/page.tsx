import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { DigitalMarketingSolutionsPage } from '@/components/solutions/digital-marketing-solutions-page';
import { organizationId } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Digital Marketing & Business Growth Solutions | U&V',
  description:
    'U&V helps businesses build visibility, generate qualified leads, improve conversions, and create sustainable digital growth systems — strategy, social, ads, SEO, content, and CRM-connected follow-up.',
  keywords: [
    'digital marketing solutions',
    'business growth marketing',
    'lead generation',
    'SEO and content marketing',
    'paid advertising strategy',
    'marketing automation India',
  ],
  alternates: {
    canonical: '/digital-marketing',
  },
  openGraph: {
    title: 'Digital Marketing & Business Growth Solutions | U&V',
    description:
      'Strategy-led digital marketing connected to website, CRM, and sustainable growth systems.',
    url: `${siteConfig.url}/digital-marketing`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Solutions | U&V',
    description:
      'Visibility, qualified leads, and growth systems — without guaranteed-results hype.',
  },
};

export default function DigitalMarketingRoutePage() {
  const url = `${siteConfig.url}/digital-marketing`;

  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Digital Marketing & Business Growth Solutions | U&V',
          description:
            'U&V helps businesses build visibility, generate qualified leads, improve conversions, and create sustainable digital growth systems.',
          path: '/digital-marketing',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Digital Marketing', path: '/digital-marketing' },
          ],
        }}
        extra={[
          {
            '@type': 'Service',
            '@id': `${url}#digital-marketing-service`,
            name: 'Digital Marketing & Business Growth Solutions',
            serviceType: 'Digital marketing and growth consulting',
            description:
              'Strategy-led digital marketing connected to website, CRM, and sustainable growth systems.',
            url,
            provider: { '@id': organizationId() },
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
          },
        ]}
      />
      <DigitalMarketingSolutionsPage />
    </>
  );
}
