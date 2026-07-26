import { technologies } from '@/lib/content';

import { MarketingPageContainer, MarketingSection } from './marketing-primitives';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Technologies() {
  return (
    <MarketingSection id="technologies" tone="default" className="marketing-section-ambient">
      <MarketingPageContainer className="relative">
        <Reveal variant="up-blur">
          <SectionHeading
            eyebrow="Technology foundation"
            title="Modern tools. Built for your business — not for show."
            description="We use proven, maintainable technology to deliver software, platforms, and automation you can rely on as you grow."
          />
        </Reveal>

        <div className="marketing-tech-cloud relative mt-12 sm:mt-16">
          <ul className="relative flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <li key={tech}>
                <Reveal delayMs={index * 40} variant="scale">
                  <span className="marketing-glass marketing-tech-chip inline-block rounded-uv-lg border border-uv-border/80 px-4 py-2.5 text-sm font-medium text-uv-foreground">
                    {tech}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
