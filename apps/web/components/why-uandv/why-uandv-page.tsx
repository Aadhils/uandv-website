import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
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
import { wuvHero } from '@/lib/why-uandv-content';

import { WuvCinemaActs } from './wuv-cinema';
import { WuvPremiumHeroBanner } from './scenes/wuv-premium-banners';

export function WhyUandvPage() {
  return (
    <MarketingContentPage className="wuv-v2-page bg-white">
      <MarketingPageHero className="marketing-content-hero-cinematic marketing-content-hero-glow wuv-hero-act border-b border-uv-border/60">
        <MarketingPageHeroInner className={cn(marketingStandardHeroInnerClass, 'wuv-hero-inner lg:pb-12')}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About U&V' },
            ]}
          />

          <MarketingStandardHeroGrid className="wuv-hero-grid mt-4 items-stretch sm:mt-5">
            <MarketingStandardHeroCopy className="wuv-hero-copy">
              <Reveal variant="up-blur" immediate>
                <MarketingEyebrow className="wuv-hero-eyebrow">{wuvHero.eyebrow}</MarketingEyebrow>
              </Reveal>
              <Reveal delayMs={50} variant="up-blur">
                <MarketingHeroTitle className="wuv-hero-title mt-2.5 sm:mt-3">
                  {wuvHero.title}
                </MarketingHeroTitle>
              </Reveal>
              <Reveal delayMs={95} variant="up">
                <MarketingLead className="wuv-hero-lead mt-3.5 sm:mt-4">
                  {wuvHero.lead}
                </MarketingLead>
              </Reveal>
              <Reveal delayMs={135} variant="up">
                <MarketingLead className="wuv-hero-lead-secondary mt-2.5 sm:mt-3">
                  {wuvHero.secondaryLead}
                </MarketingLead>
              </Reveal>
              <Reveal delayMs={175} variant="fade">
                <MarketingHeroActions className="wuv-hero-actions mt-5 sm:mt-6">
                  <MarketingButtonLink href="#consultation">Start a Conversation</MarketingButtonLink>
                  <MarketingButtonLink href="#how-we-work" variant="outline" size="md">
                    See How We Work
                  </MarketingButtonLink>
                </MarketingHeroActions>
              </Reveal>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration delayMs={70} className="wuv-hero-visual flex h-full self-stretch">
              <WuvPremiumHeroBanner className="h-full min-h-[220px] w-full sm:min-h-[260px] lg:min-h-[280px]" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <WuvCinemaActs />
    </MarketingContentPage>
  );
}
