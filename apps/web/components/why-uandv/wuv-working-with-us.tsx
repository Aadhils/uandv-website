'use client';

import { Icon, cn, type IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvWorkingWithUs } from '@/lib/why-uandv-content';

import { useInView } from './wuv-motion';

const principleIcons: Record<(typeof wuvWorkingWithUs.principles)[number]['id'], IconName> = {
  communication: 'MessageCircle',
  honesty: 'Check',
  progress: 'LayoutDashboard',
  documentation: 'FileText',
  timelines: 'Calendar',
  support: 'MessageCircle',
  responsibility: 'Handshake',
};

function PrincipleRow({
  index,
  title,
  description,
  id,
}: {
  index: number;
  title: string;
  description: string;
  id: string;
}) {
  const reversed = index % 2 === 1;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-working-with-us__row grid items-center gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-10',
        reversed && 'lg:[&>*:first-child]:order-2',
      )}
    >
      <div
        className={cn(
          'wuv-working-with-us__visual flex items-center justify-center rounded-uv-xl border border-uv-border/60 bg-gradient-to-br from-white to-[#faf9ff] p-6 sm:p-8',
          inView && 'is-visible',
        )}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-uv-brand/10 text-uv-brand sm:h-20 sm:w-20">
          <Icon name={principleIcons[id as keyof typeof principleIcons]} size="lg" />
        </span>
      </div>

      <div className={cn('min-w-0', reversed ? 'lg:text-right' : '')}>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-uv-brand/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-bold text-uv-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-uv-foreground-muted sm:mt-3">{description}</p>
      </div>
    </div>
  );
}

export function WuvWorkingWithUs() {
  return (
    <section
      id="working-with-us"
      aria-label="What working with U&V feels like"
      className="wuv-working-with-us scroll-mt-20 border-b border-uv-border/60 bg-white"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvWorkingWithUs.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvWorkingWithUs.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvWorkingWithUs.intro}
          </p>
        </Reveal>

        <div className="wuv-working-with-us__manifesto relative mt-10 space-y-10 sm:mt-12 sm:space-y-14">
          <div className="wuv-working-with-us__guide hidden sm:block" aria-hidden>
            <div className="wuv-working-with-us__guide-fill" />
          </div>

          {wuvWorkingWithUs.principles.map((principle, index) => (
            <Reveal key={principle.id} variant="up" delayMs={index * 30}>
              <PrincipleRow
                index={index}
                id={principle.id}
                title={principle.title}
                description={principle.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
