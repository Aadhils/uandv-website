import { industries } from '@/lib/content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Who we serve"
            title="Built for founders and teams ready to move."
            description="Whether you are launching your first company or modernizing an established operation, we meet you at your stage."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.name} delayMs={index * 50}>
              <article className="h-full bg-uv-background p-7 transition-colors duration-300 hover:bg-uv-background-subtle sm:p-8">
                <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                  {industry.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
