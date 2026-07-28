'use client';

import Link from 'next/link';

import {
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroTitle,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { WuvClosingGlow } from './wuv-polish';
import {
  wuvAccountability,
  wuvCommonExperience,
  wuvJourneyTransition,
  wuvPageEnding,
} from '@/lib/why-uandv-content';

import { WuvJourneyStorySection } from './wuv-journey-story';
import { WuvPrinciplesGrid } from './wuv-principles-grid';
import { WuvIndustryShowcase } from './wuv-industry-showcase';
import { WuvAccountabilityBanner } from './scenes/wuv-banner-visuals';
import { WuvStoryExperienceVisual } from './scenes/wuv-story-experience-visual';
import { WuvSplitSection } from './wuv-split-section';

function CommonExperienceSection() {
  return (
    <WuvSplitSection
      id="common-experience"
      ariaLabel="The common experience"
      eyebrow={wuvCommonExperience.eyebrow}
      title={wuvCommonExperience.title}
      visual={<WuvStoryExperienceVisual />}
      visualPosition="right"
      tone="lavender"
      className="wuv-story-experience"
    >
      <div className="wuv-story-experience__prose">
        <p className="wuv-story-experience__intro">{wuvCommonExperience.intro}</p>
        <blockquote className="wuv-story-experience__quote">
          <p>{wuvCommonExperience.closing}</p>
        </blockquote>
      </div>
    </WuvSplitSection>
  );
}

function AccountabilitySection() {
  return (
    <WuvSplitSection
      id="accountability"
      ariaLabel="Proof through accountability"
      eyebrow={wuvAccountability.eyebrow}
      title={wuvAccountability.title}
      visual={<WuvAccountabilityBanner />}
      visualPosition="left"
      tone="subtle"
    >
      <p>{wuvAccountability.intro}</p>
      <ul className="space-y-2 pl-0">
        {wuvAccountability.commitments.slice(0, 4).map((item) => (
          <li key={item.title} className="flex gap-2 text-uv-foreground-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-uv-brand" aria-hidden />
            <span>
              <span className="font-semibold text-uv-foreground">{item.title}.</span> {item.description}
            </span>
          </li>
        ))}
      </ul>
    </WuvSplitSection>
  );
}

function ClosingSection() {
  return (
    <section id="page-ending" aria-label="Closing statement" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Reveal variant="up-blur">
          <WuvClosingGlow>
            <MarketingCtaPanel className="text-center">
            <MarketingEyebrow>{wuvJourneyTransition.eyebrow}</MarketingEyebrow>
            <MarketingHeroTitle className="mx-auto mt-3 max-w-3xl text-2xl sm:text-3xl lg:text-4xl">
              {wuvPageEnding.line1}
              <span className="block text-uv-brand">{wuvPageEnding.line2}</span>
            </MarketingHeroTitle>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
              {wuvPageEnding.support}
            </p>
            <p className="mt-6 text-sm text-uv-foreground-muted">
              <Link href="/contact" className="font-medium text-uv-brand hover:underline">
                Talk to our team
              </Link>
              {' · '}
              Trusted by businesses across healthcare, finance, education, and more.
            </p>
            </MarketingCtaPanel>
          </WuvClosingGlow>
        </Reveal>
      </div>
    </section>
  );
}

export function WuvCinemaActs() {
  return (
    <div className="wuv-v2-flow relative overflow-x-hidden">
      <CommonExperienceSection />
      <WuvJourneyStorySection />
      <WuvPrinciplesGrid />
      <AccountabilitySection />
      <WuvIndustryShowcase />
      <ClosingSection />
    </div>
  );
}
