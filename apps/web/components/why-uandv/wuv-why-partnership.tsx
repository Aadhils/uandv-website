'use client';

import { Icon, cn, type IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvWhyPartnership } from '@/lib/why-uandv-content';

import { WuvSceneBackdrop, WuvSceneIconBadge } from './scenes/wuv-business-art';

const pillarIcons: IconName[] = ['Eye', 'ClipboardList', 'Handshake', 'HeartPulse'];

function PartnershipVisual() {
  return (
    <WuvSceneBackdrop tone="lavender" className="flex min-h-[220px] flex-col justify-center gap-4 p-6 sm:min-h-[260px] sm:p-8">
      <div className="flex flex-wrap gap-2">
        <WuvSceneIconBadge name="MessageCircle" label="Listen first" />
        <WuvSceneIconBadge name="FileText" label="Written scope" tone="navy" />
      </div>
      <div className="flex flex-wrap gap-2">
        <WuvSceneIconBadge name="Users" label="Your team involved" tone="success" />
        <WuvSceneIconBadge name="Wrench" label="Long-term care" />
      </div>
      <svg viewBox="0 0 320 80" className="mt-2 w-full max-w-xs opacity-80" aria-hidden>
        <path
          d="M8 40 C80 12, 120 68, 192 40 S 280 20, 312 40"
          fill="none"
          stroke="rgb(124 58 237 / 0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
        <circle cx="8" cy="40" r="5" fill="#7C3AED" />
        <circle cx="104" cy="28" r="4" fill="#1E3A8A" fillOpacity="0.6" />
        <circle cx="192" cy="40" r="4" fill="#7C3AED" fillOpacity="0.7" />
        <circle cx="312" cy="40" r="5" fill="#7C3AED" />
      </svg>
    </WuvSceneBackdrop>
  );
}

export function WuvWhyPartnership() {
  return (
    <section
      id="why-partnership"
      aria-label="Why partnership matters"
      className="wuv-why-partnership scroll-mt-20 border-b border-uv-border/60 bg-white"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvWhyPartnership.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvWhyPartnership.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvWhyPartnership.intro}
          </p>
        </Reveal>

        <div className="mt-8 grid items-stretch gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <Reveal variant="scale" className="order-2 lg:order-1">
            <PartnershipVisual />
          </Reveal>

          <div className="order-1 flex flex-col gap-0 lg:order-2">
            {wuvWhyPartnership.pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delayMs={index * 70} variant="up">
                <div
                  className={cn(
                    'relative flex gap-4 border-l-2 border-uv-brand/25 py-4 pl-5 sm:gap-5 sm:py-5 sm:pl-6',
                    index === 0 && 'pt-0',
                    index === wuvWhyPartnership.pillars.length - 1 && 'pb-0',
                  )}
                >
                  <span
                    className="absolute -left-[9px] top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-uv-brand text-white sm:top-6"
                    aria-hidden
                  >
                    <Icon name={pillarIcons[index] ?? 'Check'} size="xs" className="h-2.5 w-2.5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {pillar.description}
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
