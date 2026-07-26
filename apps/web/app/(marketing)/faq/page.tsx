import type { Metadata } from 'next';

import { Faq } from '@/components/marketing/faq';
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingEyebrow,
  MarketingHeroTitle,
  MarketingLead,
} from '@/components/marketing/marketing-primitives';
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
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}
          />
          <div className="mt-8 max-w-3xl sm:mt-10">
            <MarketingEyebrow>FAQ</MarketingEyebrow>
            <MarketingHeroTitle className="mt-3 sm:mt-4">
              Answers before you reach out.
            </MarketingHeroTitle>
            <MarketingLead className="mt-4 sm:mt-6">
              Clear expectations on how U&V works, what we deliver, and how to
              get started.
            </MarketingLead>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>
      <Faq />
    </MarketingContentPage>
  );
}
