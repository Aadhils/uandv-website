'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon, cn, type IconName } from '@uandv/ui';

import { wuvPartnerPath } from '@/lib/why-uandv-partner-path';
import type { WuvPartnerPathStage } from '@/lib/why-uandv-partner-path';

import { WuvJourneyStoryBanner } from './scenes/wuv-banner-visuals';
import { WuvSplitSection } from './wuv-split-section';
import { useReducedMotion } from './wuv-motion';

const stageIcons: Record<WuvPartnerPathStage['id'], IconName> = {
  listen: 'MessageCircle',
  plan: 'Calendar',
  build: 'Code2',
  launch: 'Rocket',
  grow: 'TrendingUp',
};

function WuvJourneyStageRail({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="wuv-journey-rail" role="tablist" aria-label="Partnership stages">
      {wuvPartnerPath.stages.map((stage, index) => {
        const isActive = activeIndex === index;
        const isReached = index <= activeIndex;

        return (
          <div key={stage.id} className="wuv-journey-rail__item">
            {index > 0 ? (
              <div
                className={cn('wuv-journey-rail__connector', isReached && 'is-reached')}
                aria-hidden
              />
            ) : null}
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`wuv-journey-panel-${stage.id}`}
              id={`wuv-journey-tab-${stage.id}`}
              onClick={() => onSelect(index)}
              className={cn(
                'wuv-journey-rail__step',
                isActive && 'is-active',
                isReached && 'is-reached',
              )}
            >
              <span className="wuv-journey-rail__icon" aria-hidden>
                <Icon name={stageIcons[stage.id]} size="sm" />
              </span>
              <span className="wuv-journey-rail__label">{stage.label}</span>
            </button>
          </div>
        );
      })}
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
    <WuvSplitSection
      ref={sectionRef}
      id="how-we-work"
      ariaLabel="How U&V works with you"
      eyebrow={wuvPartnerPath.eyebrow}
      title={wuvPartnerPath.title}
      visual={<WuvJourneyStoryBanner activeIndex={activeIndex} />}
      visualPosition="left"
      tone="subtle"
      className="wuv-journey-story-section"
    >
      <p className="wuv-journey-story__intro">{wuvPartnerPath.intro}</p>

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

      <WuvJourneyStageRail activeIndex={activeIndex} onSelect={selectStage} />

      <p className="wuv-journey-story__closing">{wuvPartnerPath.closing}</p>
    </WuvSplitSection>
  );
}
