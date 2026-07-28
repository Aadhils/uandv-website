'use client';

import {
  MarketingButtonLink,
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroTitle,
  MarketingLead,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { contactInquiryHref, siteConfig } from '@/lib/site';

import { WuvClosingGlow } from './wuv-polish';

export function WuvConsultationBlock() {
  return (
    <section
      id="consultation"
      aria-label="Not sure where to begin"
      className="scroll-mt-20 border-b border-uv-border/60 bg-gradient-to-b from-white to-[#faf9ff]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Reveal variant="up-blur">
          <WuvClosingGlow>
            <MarketingCtaPanel className="text-center">
              <MarketingEyebrow>Start with clarity</MarketingEyebrow>
              <MarketingHeroTitle className="mx-auto mt-3 max-w-2xl text-2xl sm:text-3xl">
                Not sure where to begin?
              </MarketingHeroTitle>
              <MarketingLead className="mx-auto mt-4 max-w-xl text-base sm:text-lg">
                Book a free consultation and we will point you to the right starting point — no pressure,
                no jargon, just an honest conversation about your business.
              </MarketingLead>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </div>
            </MarketingCtaPanel>
          </WuvClosingGlow>
        </Reveal>
      </div>
    </section>
  );
}
