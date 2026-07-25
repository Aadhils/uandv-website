import Image from 'next/image';

import { Icon } from '@uandv/ui';

import { launchTrustReasons } from '@/lib/launch-content';
import { launchImages } from '@/lib/launch-images';

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

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <Reveal className="relative min-w-0 overflow-hidden rounded-uv-2xl shadow-uv-lg lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] min-h-[240px]">
              <Image
                src={launchImages.businessStrategy}
                alt="Business professionals reviewing a technology strategy"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#08152F]/70 via-transparent to-transparent" />
              <div className="marketing-glass absolute bottom-4 left-4 right-4 rounded-uv-xl p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-sm font-semibold text-uv-foreground">
                  Trusted technology partner
                </p>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  End-to-end delivery for businesses that need clarity, quality,
                  and long-term support.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <SectionHeading
                eyebrow="Why businesses choose U&V"
                title="A partner for the full journey — not just a project handoff."
                description="U&V combines business understanding with modern technology, so you get practical delivery and long-term support from one team."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {launchTrustReasons.map((reason, index) => (
                <Reveal key={reason.title} delayMs={index * 60} className="h-full">
                  <article className="marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                      <Icon name="Check" size="sm" />
                    </span>
                    <h3 className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                      {reason.title}
                    </h3>
                    <p className="mt-2 break-words text-sm leading-relaxed text-uv-foreground-muted">
                      {reason.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
