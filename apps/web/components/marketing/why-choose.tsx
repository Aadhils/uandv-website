import { whyChoose } from '@/lib/content';
import { siteConfig } from '@/lib/site';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function WhyChoose() {
  return (
    <section
      id="why"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why choose U&V"
              title="Follow dreams globally — with a partner that stays practical."
              description={siteConfig.mission}
            />
          </Reveal>

          <div className="space-y-0 divide-y divide-uv-border border-y border-uv-border">
            {whyChoose.map((reason, index) => (
              <Reveal key={reason.title} delayMs={index * 70}>
                <div className="grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <span className="font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
