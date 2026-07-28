'use client';

import {
  MarketingButtonLink,
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroTitle,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import {
  wuvCommonExperience,
  wuvJourneyTransition,
  wuvPageEnding,
} from '@/lib/why-uandv-content';

import { WuvStoryExperienceVisual } from './scenes/wuv-story-experience-visual';
import { WuvConsultationBlock } from './wuv-consultation-block';
import { WuvIndustryShowcase } from './wuv-industry-showcase';
import { WuvJourneyStorySection } from './wuv-journey-story';
import { WuvOurStory } from './wuv-our-story';
import { WuvPrinciplesGrid } from './wuv-principles-grid';
import { WuvSolutionChapters } from './wuv-solution-chapters';
import { WuvWhyPartnership } from './wuv-why-partnership';
import { WuvClosingGlow } from './wuv-polish';
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

function ClosingSection() {
  return (
    <section id="start" aria-label="Long-term partnership" className="scroll-mt-20 bg-white">
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
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {wuvPageEnding.partnership}
              </p>
              <ul className="mx-auto mt-5 grid max-w-xl gap-2 text-left text-sm text-uv-foreground-muted sm:grid-cols-2 sm:text-base">
                {wuvPageEnding.commitments.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-uv-brand" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center">
                <MarketingButtonLink href={wuvJourneyTransition.servicesHref}>
                  Explore what we can build together
                </MarketingButtonLink>
              </div>
              <p className="mt-6 text-sm text-uv-foreground-muted">
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
      <WuvWhyPartnership />
      <WuvOurStory />
      <WuvJourneyStorySection />
      <WuvPrinciplesGrid />
      <WuvIndustryShowcase />
      <WuvSolutionChapters />
      <WuvConsultationBlock />
      <ClosingSection />
    </div>
  );
}
