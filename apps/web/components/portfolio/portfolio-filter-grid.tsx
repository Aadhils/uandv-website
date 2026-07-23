'use client';

import { useMemo, useState } from 'react';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import {
  getAllCaseStudies,
  portfolioCategories,
  type PortfolioCategory,
} from '@/lib/portfolio';
import { useViewMode } from '@/lib/ui/use-view-mode';

import { FeaturedProjectCard, PortfolioCard } from './portfolio-card';

export function PortfolioFilterGrid() {
  const [category, setCategory] = useState<PortfolioCategory>('All');
  const [view, setView] = useViewMode('portfolio', 'grid');
  const studies = getAllCaseStudies();

  const filtered = useMemo(() => {
    if (category === 'All') return studies;
    return studies.filter((study) => study.category === category);
  }, [category, studies]);

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div
          role="group"
          aria-label="Filter demos by category"
          className="flex min-w-0 flex-wrap gap-2"
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
                  'rounded-uv-full border px-4 py-2 text-sm font-medium transition-colors uv-focus-ring',
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

        <ViewModeToggle
          value={view}
          onChange={setView}
          label="Portfolio layout"
        />
      </div>

      <p className="mt-6 text-sm text-uv-foreground-muted" aria-live="polite">
        {category === 'All'
          ? `Showing ${filtered.length} product demos.`
          : `Showing ${filtered.length} demo${filtered.length === 1 ? '' : 's'} in ${category}.`}{' '}
        <span className="text-uv-foreground-muted/80">
          {view === 'grid' ? 'Grid view' : 'List view'}.
        </span>
      </p>

      {view === 'grid' ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, index) => (
            <Reveal key={study.slug} delayMs={Math.min(index * 35, 280)}>
              <PortfolioCard study={study} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex min-w-0 flex-col gap-6">
          {filtered.map((study, index) => (
            <Reveal key={study.slug} delayMs={Math.min(index * 35, 280)}>
              <FeaturedProjectCard study={study} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
