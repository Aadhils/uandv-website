import { processSteps } from '@/lib/content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our process"
            title="From business idea to measurable growth."
            description="A clear engagement model so you always know what happens next — and what success looks like."
          />
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 80}>
              <li className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-uv-lg border border-uv-brand/30 bg-uv-brand-muted font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-brand">
                    {index + 1}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <span
                      className="hidden h-px flex-1 bg-uv-border xl:block"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
