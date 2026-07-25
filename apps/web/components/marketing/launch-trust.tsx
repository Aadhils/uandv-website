import { Icon } from '@uandv/ui';

import { launchTrustReasons } from '@/lib/launch-content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchTrust() {
  return (
    <section
      id="why"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-uv-brand/10 blur-3xl"
          aria-hidden
        />
        <Reveal>
          <SectionHeading
            eyebrow="Why businesses choose U&V"
            title="A partner for the full journey — not just a project handoff."
            description="U&V combines business understanding with modern technology, so you get practical delivery and long-term support from one team."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {launchTrustReasons.map((reason, index) => (
            <Reveal key={reason.title} delayMs={index * 60} className="h-full">
              <article className="marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-6 sm:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name="Check" size="sm" />
                </span>
                <h3 className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                  {reason.title}
                </h3>
                <p className="mt-3 break-words text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {reason.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
