'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon, cn, type IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvPartnerPath } from '@/lib/why-uandv-partner-path';
import type { WuvPartnerPathStage } from '@/lib/why-uandv-partner-path';

import { WuvJourneyStoryBanner } from './scenes/wuv-banner-visuals';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';
import { useReducedMotion } from './wuv-motion';

const stageIcons: Record<WuvPartnerPathStage['id'], IconName> = {
  listen: 'MessageCircle',
  understand: 'Search',
  plan: 'Calendar',
  build: 'Code2',
  launch: 'Rocket',
  improve: 'Sparkles',
  grow: 'TrendingUp',
};

function WuvJourneyPath({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const total = wuvPartnerPath.stages.length;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  return (
    <div className="wuv-journey-path" role="tablist" aria-label="Partnership journey steps">
      <div className="wuv-journey-path__track" aria-hidden>
        <div className="wuv-journey-path__track-line" />
        <div className="wuv-journey-path__track-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <ol className="wuv-journey-path__steps">
        {wuvPartnerPath.stages.map((stage, index) => {
          const isActive = activeIndex === index;
          const isReached = index <= activeIndex;

          return (
            <li key={stage.id} className="wuv-journey-path__step">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`wuv-journey-panel-${stage.id}`}
                id={`wuv-journey-tab-${stage.id}`}
                onClick={() => onSelect(index)}
                className={cn(
                  'wuv-journey-path__node',
                  isActive && 'is-active',
                  isReached && 'is-reached',
                )}
              >
                <span className="wuv-journey-path__icon" aria-hidden>
                  <Icon name={stageIcons[stage.id]} size="sm" />
                </span>
                <span className="wuv-journey-path__label">{stage.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WuvJourneyStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const userSelectedRef = useRef(false);
  const reduced = useReducedMotion();
  const activeStage = wuvPartnerPath.stages[activeIndex] ?? wuvPartnerPath.stages[0];

  const selectStage = useCallback((index: number) => {
    userSelectedRef.current = true;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const inView = rect.bottom > 0 && rect.top < viewport;

      if (!inView) {
        userSelectedRef.current = false;
        return;
      }

      if (userSelectedRef.current) return;

      const progress = 1 - rect.bottom / (rect.height + viewport * 0.35);
      const clamped = Math.min(1, Math.max(0, progress));
      const index = Math.min(
        wuvPartnerPath.stages.length - 1,
        Math.floor(clamped * wuvPartnerPath.stages.length),
      );
      setActiveIndex(index);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How the relationship begins"
      className="wuv-journey-story wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="journey" />
      <div className={cn(uvContainer, 'relative z-[1] py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvPartnerPath.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvPartnerPath.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvPartnerPath.intro}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
          <Reveal variant="scale" delayMs={60} className="min-w-0 order-2 lg:order-1">
            <WuvJourneyStoryBanner activeIndex={activeIndex} className="min-h-[200px] sm:min-h-[240px]" />
          </Reveal>

          <div className="order-1 min-w-0 lg:order-2">
            <div
              id={`wuv-journey-panel-${activeStage.id}`}
              role="tabpanel"
              aria-labelledby={`wuv-journey-tab-${activeStage.id}`}
              className="wuv-journey-story__detail"
              key={activeStage.id}
            >
              <p className="wuv-journey-story__stage-eyebrow">{activeStage.label}</p>
              <p className="wuv-journey-story__stage-title">{activeStage.title}</p>
              <p className="wuv-journey-story__stage-body">{activeStage.description}</p>
            </div>

            <WuvJourneyPath activeIndex={activeIndex} onSelect={selectStage} />

            <p className="wuv-journey-story__closing">{wuvPartnerPath.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
