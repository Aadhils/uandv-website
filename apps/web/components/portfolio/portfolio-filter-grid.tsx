'use client';

import { useMemo, useState } from 'react';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  getAllCaseStudies,
  portfolioCategories,
  type PortfolioCategory,
} from '@/lib/portfolio';

import { PortfolioCard } from './portfolio-card';

export function PortfolioFilterGrid() {
  const [category, setCategory] = useState<PortfolioCategory>('All');
  const studies = getAllCaseStudies();

  const filtered = useMemo(() => {
    if (category === 'All') return studies;
    return studies.filter((study) => study.category === category);
  }, [category, studies]);

  return (
    <div className="min-w-0 max-w-full overflow-x-clip">
      <div
        role="group"
        aria-label="Filter demos by category"
        className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-2.5"
      >
        {portfolioCategories.map((item) => {
          const active = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={active}
              className={cn(
                'min-h-11 max-w-full shrink-0 rounded-uv-full border px-3.5 py-2 text-sm font-medium transition-colors uv-focus-ring sm:px-4',
                active
                  ? 'uv-brand-gradient border-transparent text-white'
                  : 'border-uv-border bg-uv-background text-uv-foreground-muted hover:border-uv-brand/40 hover:text-uv-foreground',
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-uv-foreground-muted" aria-live="polite">
        {category === 'All'
          ? `Showing ${filtered.length} solution concepts — each with business challenge, U&V approach, and expected benefits.`
          : `Showing ${filtered.length} concept${filtered.length === 1 ? '' : 's'} in ${category}.`}
      </p>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
        {filtered.map((study, index) => (
          <Reveal
            key={study.slug}
            delayMs={Math.min(index * 35, 280)}
            className="min-w-0 md:h-full"
          >
            <PortfolioCard study={study} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
