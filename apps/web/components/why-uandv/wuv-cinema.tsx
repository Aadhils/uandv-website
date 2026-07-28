'use client';

import { WuvClientsStay } from './wuv-clients-stay';
import { WuvConsultationClose } from './wuv-consultation-close';
import { WuvIndustryShowcase } from './wuv-industry-showcase';
import { WuvJourneyStorySection } from './wuv-journey-story';
import { WuvOurStory } from './wuv-our-story';
import { WuvSolutionsStory } from './wuv-solutions-story';
import { WuvWhyChoose } from './wuv-why-choose';

export function WuvCinemaActs() {
  return (
    <div className="wuv-v2-flow relative overflow-x-hidden">
      <WuvOurStory />
      <WuvWhyChoose />
      <WuvJourneyStorySection />
      <WuvIndustryShowcase />
      <WuvSolutionsStory />
      <WuvClientsStay />
      <WuvConsultationClose />
    </div>
  );
}
