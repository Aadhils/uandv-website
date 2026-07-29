'use client';

import {
  MarketingButtonLink,
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroTitle,
  MarketingLead,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { contactInquiryHref } from '@/lib/site';
import { wuvConsultationClose } from '@/lib/why-uandv-content';

import { WuvClosingGlow } from './wuv-polish';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

export function WuvConsultationClose() {
  return (
    <section
      id="consultation"
      aria-label="Book a free consultation"
      className="wuv-consultation-close wuv-cinema-section relative overflow-hidden scroll-mt-20"
    >
      <WuvSectionAtmosphere tone="consultation" />
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Reveal variant="up-blur">
          <WuvClosingGlow>
            <MarketingCtaPanel className="wuv-consultation-cta-panel text-center">
              <MarketingEyebrow>{wuvConsultationClose.eyebrow}</MarketingEyebrow>
              <MarketingHeroTitle className="mx-auto mt-3 max-w-2xl text-2xl sm:text-3xl lg:text-4xl">
                {wuvConsultationClose.title}
              </MarketingHeroTitle>
              <MarketingLead className="mx-auto mt-4 max-w-xl text-base sm:text-lg">
                {wuvConsultationClose.lead}
              </MarketingLead>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Consultation
                </MarketingButtonLink>
                <MarketingButtonLink href={contactInquiryHref} variant="outline" size="md">
                  Start a Conversation
                </MarketingButtonLink>
              </div>
            </MarketingCtaPanel>
          </WuvClosingGlow>
        </Reveal>
      </div>
    </section>
  );
}
