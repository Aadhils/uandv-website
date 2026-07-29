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
} from '@/components/marketing/marketing-standard-hero';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { contactInquiryHref } from '@/lib/site';
import { wuvHero } from '@/lib/why-uandv-content';

import { WuvCinemaActs } from './wuv-cinema';
import { WuvHeroStoryVisual } from './scenes/wuv-hero-story-visual';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

export function WhyUandvPage() {
  return (
    <MarketingContentPage className="wuv-v2-page wuv-cinema-page">
      <MarketingPageHero className="marketing-content-hero-cinematic marketing-content-hero-glow wuv-hero-act min-h-0 border-b border-uv-border/40">
        <WuvSectionAtmosphere tone="hero" className="wuv-atmosphere--hero" />
        <MarketingPageHeroInner className="relative z-[1] wuv-hero-inner wuv-hero-compact-inner pt-4 pb-6 sm:pt-5 sm:pb-8 lg:pt-6 lg:pb-10">
          <Breadcrumbs
            className="wuv-hero-breadcrumbs text-xs sm:text-sm"
            items={[
              { label: 'Home', href: '/' },
              { label: 'About U&V' },
            ]}
          />

          <MarketingStandardHeroGrid className="wuv-hero-grid wuv-hero-compact-grid mt-3 sm:mt-4">
            <MarketingStandardHeroCopy className="wuv-hero-copy wuv-hero-compact-copy">
              <Reveal variant="up-blur" immediate>
                <MarketingEyebrow className="wuv-hero-eyebrow">{wuvHero.eyebrow}</MarketingEyebrow>
              </Reveal>
              <Reveal delayMs={50} variant="up-blur">
                <MarketingHeroTitle className="wuv-hero-title mt-2 sm:mt-2.5">
                  {wuvHero.title}
                </MarketingHeroTitle>
              </Reveal>
              <Reveal delayMs={95} variant="up">
                <MarketingLead className="wuv-hero-lead mt-3 sm:mt-3.5">
                  {wuvHero.lead}
                </MarketingLead>
              </Reveal>
              <Reveal delayMs={135} variant="up">
                <p className="wuv-hero-trust-line mt-2.5 sm:mt-3">
                  {wuvHero.trustLine}
                </p>
              </Reveal>
              <Reveal delayMs={175} variant="up">
                <MarketingHeroActions className="wuv-hero-actions mt-4 sm:mt-5">
                  <MarketingButtonLink href={contactInquiryHref} size="md">
                    {wuvHero.primaryCta}
                  </MarketingButtonLink>
                  <MarketingButtonLink href={wuvHero.secondaryCtaHref} variant="outline" size="md">
                    {wuvHero.secondaryCta}
                  </MarketingButtonLink>
                </MarketingHeroActions>
              </Reveal>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration
              delayMs={70}
              framed={false}
              className="wuv-hero-visual wuv-hero-compact-visual flex self-center"
            >
              <WuvHeroStoryVisual className="wuv-hero-story-visual" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <WuvCinemaActs />
    </MarketingContentPage>
  );
}
