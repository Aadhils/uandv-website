'use client';

import type { ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

/** Visual rhythm divider between page acts — no copy */
export function VisualActBridge({ className }: { className?: string }) {
  return (
    <div className={cn('bs-act-bridge', className)} aria-hidden>
      <span className="bs-act-bridge__line" />
      <span className="bs-act-bridge__gem">
        <span className="bs-act-bridge__gem-inner" />
      </span>
      <span className="bs-act-bridge__line" />
    </div>
  );
}

/** Pull quote using exact approved copy excerpt only */
export function ApprovedPullQuote({
  quote,
  className,
}: {
  quote: string;
  className?: string;
}) {
  return (
    <blockquote className={cn('bs-pull-quote', className)}>
      <span className="bs-pull-quote__mark" aria-hidden>
        &ldquo;
      </span>
      <p className="bs-pull-quote__text">{quote}</p>
    </blockquote>
  );
}

/** Core memory ribbon — visual category label */
export function TransformationRibbon({ className }: { className?: string }) {
  return (
    <div className={cn('bs-transform-ribbon', className)}>
      <Icon name="TrendingUp" size="sm" className="text-uv-brand" />
      <span>Business Transformation</span>
    </div>
  );
}

/** Desktop compare affordance — UX micro-label only */
export function CompareGuide({ className }: { className?: string }) {
  return (
    <p className={cn('bs-compare-guide', className)}>
      <Icon name="Workflow" size="sm" className="inline-block opacity-70" />
      Drag to compare your before and after
    </p>
  );
}

/** Verbatim trust reinforcement from hero supporting line */
export function TrustReinforcement({ className }: { className?: string }) {
  const items = [
    { icon: 'Building2' as const, text: 'Trusted by startups, SMEs, and enterprises across India.' },
    { icon: 'Check' as const, text: 'Honest advice.' },
    { icon: 'Clock' as const, text: 'Response within 24 business hours.' },
  ];

  return (
    <ul className={cn('bs-trust-strip', className)} aria-label="Trust indicators">
      {items.map((item) => (
        <li key={item.text} className="bs-trust-strip__item">
          <Icon name={item.icon} size="sm" className="shrink-0 text-uv-brand" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Journey progress caption — visual only */
export function JourneyCaption({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('bs-journey-caption', className)}>{children}</p>;
}

/** Premium callout frame for supporting emphasis */
export function PremiumCallout({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('bs-premium-callout', className)}>{children}</div>;
}
