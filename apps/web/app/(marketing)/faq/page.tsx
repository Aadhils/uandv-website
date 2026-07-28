import type { Metadata } from 'next';

import { Faq } from '@/components/marketing/faq';
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingLead,
} from '@/components/marketing/marketing-primitives';
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import { contactInquiryHref, siteConfig } from '@/lib/site';

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
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}
          />
          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <MarketingEyebrow>FAQ</MarketingEyebrow>
              <MarketingHeroTitle className="mt-3 sm:mt-4">
                Answers before you reach out.
              </MarketingHeroTitle>
              <MarketingLead className="mt-4 sm:mt-6">
                Clear expectations on how U&V works, what we deliver, and how to
                get started.
              </MarketingLead>
              <MarketingHeroActions className="mt-6 sm:mt-8">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a consultation
                </MarketingButtonLink>
                <MarketingButtonLink href="/services" variant="outline">
                  Browse services
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name="software" className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>
      <Faq />
    </MarketingContentPage>
  );
}
