'use client';

import { useId } from 'react';

import { Icon, cn, type IconName } from '@uandv/ui';

import { MarketingButtonLink } from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvEcosystem } from '@/lib/why-uandv-content';

import { useInView, useReducedMotion } from './wuv-motion';

const nodeIcons: Record<(typeof wuvEcosystem.nodes)[number]['id'], IconName> = {
  technology: 'Code2',
  operations: 'Workflow',
  brand: 'Palette',
  legal: 'FileText',
  launch: 'Rocket',
  growth: 'TrendingUp',
};

const nodePositions = [
  { x: 50, y: 12 },
  { x: 88, y: 28 },
  { x: 88, y: 72 },
  { x: 50, y: 88 },
  { x: 12, y: 72 },
  { x: 12, y: 28 },
] as const;

function WuvEcosystemVisual() {
  const uid = useId().replace(/:/g, '');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-ecosystem__visual relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-uv-2xl border border-uv-brand/15 bg-gradient-to-br from-[#f8f6ff] via-white to-[#eef4ff] shadow-[0_16px_44px_rgb(30_58_138_/_0.1)] sm:max-w-[400px]',
        inView && !reduced && 'is-active',
      )}
      role="img"
      aria-label="Central client connected to technology, operations, brand, legal, launch, and growth support"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`wuv-eco-center-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {nodePositions.map((pos, i) => (
          <line
            key={wuvEcosystem.nodes[i].id}
            x1="100"
            y1="100"
            x2={pos.x * 2}
            y2={pos.y * 2}
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            strokeDasharray="4 3"
            className="wuv-ecosystem__line"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}

        {/* Center hub */}
        <circle cx="100" cy="100" r="32" fill={`url(#wuv-eco-center-${uid})`} stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.35" className="wuv-ecosystem__hub" />
        <text x="100" y="96" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Your</text>
        <text x="100" y="108" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Business</text>

        {/* Nodes */}
        {wuvEcosystem.nodes.map((node, i) => {
          const pos = nodePositions[i];
          return (
            <g key={node.id} className="wuv-ecosystem__node" style={{ animationDelay: `${i * 100}ms` }}>
              <circle cx={pos.x * 2} cy={pos.y * 2} r="18" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.3" />
              <circle cx={pos.x * 2} cy={pos.y * 2} r="6" fill="#7C3AED" fillOpacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function WuvEcosystem() {
  return (
    <section
      id="connected-support"
      aria-label="One partner, connected support"
      className="wuv-ecosystem scroll-mt-20 border-b border-uv-border/60 bg-uv-background-subtle"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvEcosystem.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvEcosystem.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvEcosystem.intro}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <Reveal variant="scale" delayMs={60} className="min-w-0">
            <WuvEcosystemVisual />
          </Reveal>

          <div className="wuv-ecosystem__nodes grid gap-3 sm:grid-cols-2 sm:gap-4">
            {wuvEcosystem.nodes.map((node, index) => (
              <Reveal key={node.id} variant="up" delayMs={80 + index * 40}>
                <div className="wuv-ecosystem__node-card flex gap-3 rounded-uv-xl border border-uv-border/70 bg-white p-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-uv-brand/10 text-uv-brand">
                    <Icon name={nodeIcons[node.id]} size="sm" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-uv-foreground sm:text-base">{node.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted">{node.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="fade" delayMs={200} className="mt-8 text-center sm:mt-10">
          <MarketingButtonLink href={wuvEcosystem.ctaHref} variant="outline" size="md">
            {wuvEcosystem.ctaLabel}
          </MarketingButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
