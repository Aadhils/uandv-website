import { launchProcessSteps } from '@/lib/launch-content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchProcess() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How U&V works"
            title="A clear path from idea to launch — and beyond."
            description="We keep the process simple for business owners. U&V stays involved after delivery with support and growth guidance."
          />
        </Reveal>

        <ol className="mt-14 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {launchProcessSteps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 50} className="h-full">
              <li className="marketing-glass marketing-card-lift marketing-gradient-border relative flex h-full min-w-0 flex-col rounded-uv-xl p-4 sm:p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-uv-lg border border-uv-brand/30 bg-gradient-to-br from-uv-brand-muted to-white font-[family-name:var(--font-uv-display)] text-xs font-semibold text-uv-brand">
                  {index + 1}
                </span>
                <h3 className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-uv-foreground-muted">
                  {step.description}
                </p>
                {index < launchProcessSteps.length - 1 ? (
                  <span
                    className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-uv-brand/50 xl:inline"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
