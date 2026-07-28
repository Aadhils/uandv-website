'use client';

import { cn } from '@uandv/ui';

import { uvBody } from '@/components/marketing/marketing-design-tokens';
import { wuvIndustryTaglines } from '@/lib/why-uandv-content';

import { useInView, useTilt } from './wuv-motion';
import { WuvIndustryScene } from './wuv-industry-visuals';

type IndustryKey =
  | 'healthcare'
  | 'education'
  | 'finance'
  | 'travel'
  | 'hospitality'
  | 'logistics';

const industries: { title: string; key: IndustryKey }[] = [
  { title: 'Healthcare', key: 'healthcare' },
  { title: 'Education', key: 'education' },
  { title: 'Finance', key: 'finance' },
  { title: 'Travel', key: 'travel' },
  { title: 'Hospitality', key: 'hospitality' },
  { title: 'Logistics', key: 'logistics' },
];

function IndustryTile({
  title,
  industryKey,
  index,
}: {
  title: string;
  industryKey: IndustryKey;
  index: number;
}) {
  const { ref: viewRef, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  const { ref: tiltRef, onMove, onLeave, reduced } = useTilt(4);

  return (
    <article
      ref={viewRef}
      className={cn(
        'wuv-industry-tile group relative',
        inView && 'is-visible',
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        ref={tiltRef}
        className="wuv-industry-tile__inner"
        onMouseMove={reduced ? undefined : onMove}
        onMouseLeave={reduced ? undefined : onLeave}
      >
        <span className="wuv-industry-tile__glow" aria-hidden />
        <span className="wuv-industry-tile__ring" aria-hidden />

        <div className="wuv-industry-tile__visual">
          <div className="wuv-industry-tile__scene">
            <WuvIndustryScene industry={industryKey} active={inView} />
          </div>
          <span className="wuv-industry-tile__status" aria-hidden>
            <span className="wuv-industry-tile__status-dot" />
          </span>
        </div>

        <div className="wuv-industry-tile__copy">
          <h3 className="text-base font-semibold text-uv-foreground sm:text-lg">{title}</h3>
          <p className={cn(uvBody, 'mt-2 text-sm leading-relaxed')}>
            {wuvIndustryTaglines[industryKey]}
          </p>
        </div>
      </div>
    </article>
  );
}

export function WuvIndustriesGallery() {
  return (
    <div className="wuv-industries-premium mx-auto mt-8 grid max-w-6xl gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
      {industries.map((industry, index) => (
        <IndustryTile
          key={industry.key}
          title={industry.title}
          industryKey={industry.key}
          index={index}
        />
      ))}
    </div>
  );
}
