import Link from 'next/link';

import { Icon } from '@uandv/ui';

import { businessEcosystemCards } from '@/lib/homepage-featured';

import { MarketingPageContainer, MarketingSection } from './marketing-primitives';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function BusinessEcosystem() {
  return (
    <MarketingSection
      id="ecosystem"
      tone="subtle"
      className="marketing-section-ambient relative overflow-hidden"
      aria-label="Business ecosystem"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(124_58_237_/_0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#EDE9FE]/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#C4B5FD]/30 blur-3xl"
        aria-hidden
      />

      <MarketingPageContainer className="relative">
        <Reveal variant="up-blur">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="One roof. Many specialists."
              title="Everything Your Business Needs Under One Roof"
              description="U&V coordinates technology, branding, compliance, marketing, startup support, and long-term growth — one partner, one clear path forward."
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businessEcosystemCards.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 50} variant="up" className="h-full">
              <Link
                href={item.href}
                className="group marketing-glass marketing-card-lift marketing-card-premium marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-5 uv-focus-ring"
              >
                <span className="marketing-icon-glow inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name={item.icon} size="sm" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-uv-foreground sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-uv-foreground-muted sm:text-sm">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-uv-brand transition-colors group-hover:text-uv-brand-hover">
                  Learn more
                  <Icon
                    name="ArrowRight"
                    size="xs"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
