'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  uvBody,
  uvCardTitle,
  uvContainer,
  uvEyebrow,
  uvSectionTitle,
} from '@/components/marketing/marketing-design-tokens';
import { wuvPartnerPath } from '@/lib/why-uandv-partner-path';

import { WuvJourneyStageIllustration } from './wuv-illustrations';
import { useScrollActiveIndex } from './wuv-motion';

export function WuvPartnerPathSection() {
  const { containerRef, activeIndex } = useScrollActiveIndex(wuvPartnerPath.stages.length, 0.5);

  return (
    <section
      id="partner-path"
      aria-label="How U&V works with you"
      className="wuv-section relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-white to-[#faf9ff] py-12 sm:py-16 lg:py-20"
    >
      <div className={cn(uvContainer, 'relative')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className={uvEyebrow}>{wuvPartnerPath.eyebrow}</p>
          <h2 className={cn(uvSectionTitle, 'mt-3 sm:mt-4')}>{wuvPartnerPath.title}</h2>
          <p className={cn(uvBody, 'mt-4 sm:mt-5')}>{wuvPartnerPath.intro}</p>
        </Reveal>

        <div ref={containerRef} className="wuv-journey-roadmap mt-10 lg:mt-14">
          {/* Curved desktop connector */}
          <svg
            className="wuv-journey-curve pointer-events-none absolute left-0 right-0 top-8 hidden h-16 w-full lg:block"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M80 40 Q250 8 500 30 T920 40"
              fill="none"
              stroke="url(#wuv-journey-gradient)"
              strokeWidth="2"
              className="wuv-journey-curve__path"
              style={{ strokeDashoffset: activeIndex >= 0 ? 0 : undefined }}
            />
            <defs>
              <linearGradient id="wuv-journey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {wuvPartnerPath.stages.map((stage, index) => (
            <Reveal key={stage.id} delayMs={index * 60} variant="up">
              <article
                data-wuv-active-index={index}
                className={cn(
                  'wuv-journey-step group relative',
                  index === wuvPartnerPath.stages.length - 1 && 'wuv-journey-step--final',
                  activeIndex >= index && 'is-reached',
                  activeIndex === index && 'is-active',
                )}
              >
                <div className="wuv-journey-step__connector" aria-hidden />
                <div className="wuv-journey-step__card rounded-2xl border border-uv-border/50 bg-white/90 p-5 shadow-[0_8px_30px_rgb(30_58_138_/_0.04)] backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_12px_36px_rgb(30_58_138_/_0.07)] sm:p-6">
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500',
                        activeIndex >= index
                          ? 'bg-uv-brand text-white shadow-[0_0_0_6px_rgb(124_58_237_/_0.15)]'
                          : 'bg-uv-brand/10 text-uv-brand',
                      )}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-uv-brand/80">
                        {stage.label}
                      </p>
                      <h3 className={cn(uvCardTitle, 'mt-1')}>{stage.title}</h3>
                      <p className={cn(uvBody, 'mt-2')}>{stage.description}</p>
                    </div>
                  </div>
                  <WuvJourneyStageIllustration
                    stage={index as 0 | 1 | 2 | 3 | 4}
                    active={activeIndex >= index}
                    className="mt-4"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">
          <p className="wuv-partner-path__closing">{wuvPartnerPath.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
