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

const HERO_PARAGRAPH_COUNT = 2;

export function WhyUandvPage() {
  const heroParagraphs = wuvHero.paragraphs.slice(0, HERO_PARAGRAPH_COUNT);

  return (
    <MarketingContentPage className="wuv-v2-page bg-white">
      <MarketingPageHero className="marketing-content-hero-cinematic wuv-hero-act border-b border-uv-border/60 bg-white">
        <MarketingPageHeroInner className={cn(marketingStandardHeroInnerClass, 'lg:pb-12')}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Why U&V' },
            ]}
          />

          <MarketingStandardHeroGrid className="mt-4 items-stretch sm:mt-5">
            <MarketingStandardHeroCopy>
              <Reveal variant="up-blur" immediate>
                <MarketingEyebrow>{wuvHero.eyebrow}</MarketingEyebrow>
              </Reveal>
              <Reveal delayMs={60} variant="up-blur">
                <MarketingHeroTitle className="mt-3 text-[2rem] leading-[1.08] sm:mt-4 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06]">
                  {wuvHero.title}
                </MarketingHeroTitle>
              </Reveal>
              <div className="mt-4 space-y-3 sm:mt-5">
                {heroParagraphs.map((paragraph, index) => (
                  <Reveal key={index} delayMs={100 + index * 50} variant="up">
                    <MarketingLead className="text-base leading-relaxed sm:text-lg">
                      {paragraph}
                    </MarketingLead>
                  </Reveal>
                ))}
              </div>
              <Reveal delayMs={220} variant="fade">
                <MarketingHeroActions className="mt-6 sm:mt-8">
                  <MarketingButtonLink href="/why-uandv#services">
                    Explore our solutions
                  </MarketingButtonLink>
                  <MarketingButtonLink href="/why-uandv#partner-path" variant="outline" size="md">
                    How we partner
                  </MarketingButtonLink>
                </MarketingHeroActions>
              </Reveal>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration delayMs={80} className="flex h-full self-stretch">
              <WuvPremiumHeroBanner className="h-full min-h-[220px] w-full sm:min-h-[260px] lg:min-h-[280px]" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <WuvCinemaActs />
    </MarketingContentPage>
  );
}
