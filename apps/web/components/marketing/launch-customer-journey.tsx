import Image from 'next/image';
import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { launchCustomerJourney } from '@/lib/launch-content';
import { launchImages } from '@/lib/launch-images';
import { contactInquiryHref } from '@/lib/site';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchCustomerJourney() {
  return (
    <section
      id="journey"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionHeading
                eyebrow="Your journey with U&V"
                title="From first conversation to long-term growth."
                description="A straightforward path for business owners — no technical jargon required. U&V stays involved after launch."
              />
            </Reveal>

            <ol className="mt-10 space-y-4">
              {launchCustomerJourney.map((item, index) => (
                <Reveal key={item.step} delayMs={index * 60}>
                  <li className="marketing-glass marketing-gradient-border flex gap-4 rounded-uv-xl p-4 sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-gradient-to-br from-uv-brand-muted to-white font-[family-name:var(--font-uv-display)] text-xs font-bold text-uv-brand">
                      {item.step}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon
                          name={item.icon}
                          size="sm"
                          className="text-uv-brand"
                          aria-hidden
                        />
                        <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                        {item.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delayMs={120}>
              <div className="mt-8">
                <Link href={contactInquiryHref} className={cn(buttonVariants({ size: 'lg' }))}>
                  Start your journey
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={80} className="relative min-w-0">
            <div className="marketing-gradient-border relative overflow-hidden rounded-uv-2xl shadow-uv-lg">
              <div className="relative aspect-[4/5] min-h-[320px] sm:aspect-[5/6] lg:min-h-[520px]">
                <Image
                  src={launchImages.teamCollaboration}
                  alt="Business team collaborating on a technology project"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/80 via-[#08152F]/20 to-transparent" />
                <div className="marketing-glass-dark absolute bottom-0 left-0 right-0 m-4 rounded-uv-xl p-5 sm:m-6">
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#C4B5FD]">
                    Partnership model
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">
                    One accountable team for strategy, design, engineering, and
                    growth — built for startups, SMEs, and enterprises.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
