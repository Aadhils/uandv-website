'use client';

import { WuvAfterLaunch } from './wuv-after-launch';
import { WuvConsultationClose } from './wuv-consultation-close';
import { WuvEcosystem } from './wuv-ecosystem';
import { WuvJourneyStorySection } from './wuv-journey-story';
import { WuvOriginStory } from './wuv-origin-story';
import { WuvWorkingWithUs } from './wuv-working-with-us';
import { WuvYouWe } from './wuv-you-we';

export function WuvCinemaActs() {
  return (
    <div className="wuv-v2-flow relative overflow-x-hidden">
      <WuvOriginStory />
      <WuvYouWe />
      <WuvJourneyStorySection />
      <WuvEcosystem />
      <WuvWorkingWithUs />
      <WuvAfterLaunch />
      <WuvConsultationClose />
    </div>
  );
}
