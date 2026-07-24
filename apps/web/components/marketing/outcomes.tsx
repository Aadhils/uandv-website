import { outcomes } from '@/lib/content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Outcomes() {
  return (
    <section
      id="outcomes"
      className="scroll-mt-20 bg-uv-background-subtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Outcomes"
            title="What working with U&V is designed to deliver."
            description="Clear results across the moments that matter most — starting, building, and scaling your business."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {outcomes.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80} className="h-full">
              <article className="flex h-full min-w-0 flex-col border-l-2 border-uv-brand/50 pl-6">
                <h3 className="break-words font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 break-words text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
