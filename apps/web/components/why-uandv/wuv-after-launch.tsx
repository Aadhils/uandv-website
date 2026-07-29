'use client';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvAfterLaunch } from '@/lib/why-uandv-content';

import { WuvMicroPath, WuvMicroPulse, WuvMicroSceneShell } from './wuv-micro-scene';
import { WuvDrawLine, useInView } from './wuv-motion';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

function WuvAfterLaunchRibbon() {
  const phases = wuvAfterLaunch.phases;

  return (
    <WuvMicroSceneShell
      label="Partnership continues through launch, adoption, improvement, and growth"
      className="wuv-after-launch__ribbon mb-3 h-10 overflow-hidden rounded-lg border border-uv-border/50 bg-gradient-to-r from-[#f8f6ff] via-white to-[#eef4ff] sm:h-11"
      activeClassName="is-active"
      threshold={0.15}
    >
      <svg viewBox="0 0 360 44" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <WuvMicroPath
          d="M24 22 C80 22, 100 16, 120 22 C140 28, 160 22, 180 22 C200 22, 220 16, 240 22 C260 28, 280 22, 336 22"
          className="wuv-after-launch__path"
          stroke="#7C3AED"
          strokeWidth={2}
          dashArray={360}
        />
        {phases.map((phase, i) => {
          const x = 24 + (i / (phases.length - 1)) * 312;
          return (
            <circle
              key={phase.id}
              cx={x}
              cy={22}
              r={i === 0 ? 7 : 5}
              fill="#fff"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeOpacity={0.4}
              className={i === 0 ? 'wuv-micro-pulse' : undefined}
            />
          );
        })}
        <WuvMicroPulse cx={336} cy={22} r={3.5} delay={600} />
      </svg>
    </WuvMicroSceneShell>
  );
}

function TimelinePhase({
  index,
  label,
  description,
  isLast,
}: {
  index: number;
  label: string;
  description: string;
  isLast: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div ref={ref} className="wuv-after-launch__phase relative flex gap-4 sm:gap-5">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-500',
            inView
              ? 'border-uv-brand bg-uv-brand text-white'
              : 'border-uv-border bg-white text-uv-foreground-muted',
          )}
        >
          {index + 1}
        </span>
        {!isLast ? (
          <WuvDrawLine inView={inView} direction="vertical" className="wuv-after-launch__connector mt-2 flex-1 min-h-[2rem]" />
        ) : null}
      </div>

      <div className={cn('min-w-0 pb-8 sm:pb-10', isLast && 'pb-0')}>
        <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-foreground sm:text-xl">
          {label}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">{description}</p>
      </div>
    </div>
  );
}

export function WuvAfterLaunch() {
  return (
    <section
      id="after-launch"
      aria-label="After launch"
      className="wuv-after-launch wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="after-launch" />
      <div className={cn(uvContainer, 'relative z-[1] py-8 sm:py-10 lg:py-12')}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-start">
          <div>
            <Reveal variant="up-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
                {wuvAfterLaunch.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
                {wuvAfterLaunch.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
                {wuvAfterLaunch.intro}
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={80} className="mt-6 sm:mt-8">
              <ul className="wuv-after-launch__supports grid gap-2 sm:grid-cols-2 sm:gap-3">
                {wuvAfterLaunch.supports.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-uv-foreground-muted sm:text-base">
                    <Icon name="Check" size="sm" className="mt-0.5 shrink-0 text-uv-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="scale" delayMs={100}>
            <div className="wuv-after-launch__timeline rounded-uv-2xl border border-uv-border/70 bg-white p-5 sm:p-6">
              <WuvAfterLaunchRibbon />
              {wuvAfterLaunch.phases.map((phase, index) => (
                <TimelinePhase
                  key={phase.id}
                  index={index}
                  label={phase.label}
                  description={phase.description}
                  isLast={index === wuvAfterLaunch.phases.length - 1}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
