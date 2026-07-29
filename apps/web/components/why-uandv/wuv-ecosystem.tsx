'use client';

import { Icon, cn, type IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvEcosystem } from '@/lib/why-uandv-content';

import { WuvMicroFloatG, WuvMicroPulse, WuvMicroSceneShell, useWuvGradId } from './wuv-micro-scene';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

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
  const centerGrad = useWuvGradId('wuv-eco-center');

  return (
    <WuvMicroSceneShell
      label="Central client connected to technology, operations, brand, legal, launch, and growth support"
      className="wuv-ecosystem__visual relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-uv-2xl border border-uv-brand/15 bg-gradient-to-br from-[#f8f6ff] via-white to-[#eef4ff] shadow-[0_16px_44px_rgb(30_58_138_/_0.1)] sm:max-w-[400px]"
      activeClassName="is-active"
      threshold={0.12}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={centerGrad} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* Animated connection lines */}
        {nodePositions.map((pos, i) => (
          <line
            key={wuvEcosystem.nodes[i].id}
            x1="100"
            y1="100"
            x2={pos.x * 2}
            y2={pos.y * 2}
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="4 3"
            className="wuv-ecosystem__line wuv-micro-connector"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}

        {/* Center hub pulse */}
        <circle cx="100" cy="100" r="32" fill={`url(#${centerGrad})`} stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.35" className="wuv-ecosystem__hub" />
        <WuvMicroPulse cx={100} cy={100} r={5} />

        {/* Floating micro UI cards at nodes */}
        {wuvEcosystem.nodes.map((node, i) => {
          const pos = nodePositions[i];
          const cx = pos.x * 2;
          const cy = pos.y * 2;
          return (
            <WuvMicroFloatG key={node.id} delay={i * 150} duration={`${5 + (i % 3)}s`}>
              <g className="wuv-ecosystem__node" style={{ animationDelay: `${i * 100}ms` }}>
                <rect
                  x={cx - 22}
                  y={cy - 16}
                  width="44"
                  height="32"
                  rx="8"
                  fill="#fff"
                  stroke="#7C3AED"
                  strokeWidth="1.2"
                  strokeOpacity="0.28"
                />
                <circle cx={cx} cy={cy - 4} r="8" fill="#7C3AED" fillOpacity="0.12" />
                <rect x={cx - 10} y={cy + 4} width="20" height="3" rx="1.5" fill="#E2E8F0" />
                <rect x={cx - 6} y={cy + 10} width="12" height="2" rx="1" fill="#E2E8F0" />
              </g>
            </WuvMicroFloatG>
          );
        })}
      </svg>
    </WuvMicroSceneShell>
  );
}

export function WuvEcosystem() {
  return (
    <section
      id="connected-support"
      aria-label="One partner, connected support"
      className="wuv-ecosystem wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="ecosystem" />
      <div id="solutions" className="scroll-mt-20" aria-hidden="true" />
      <div id="services" className="scroll-mt-20" aria-hidden="true" />
      <div className={cn(uvContainer, 'relative z-[1] py-8 sm:py-10 lg:py-12')}>
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
      </div>
    </section>
  );
}
