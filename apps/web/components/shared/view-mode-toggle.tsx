'use client';

import { Icon, cn } from '@uandv/ui';

import type { ViewMode } from '@/lib/ui/use-view-mode';

type ViewModeToggleProps = {
  value: ViewMode;
  onChange: (next: ViewMode) => void;
  /** Accessible name for the control group */
  label?: string;
  className?: string;
};

/**
 * Reusable Grid / List switcher for collection pages.
 * Persist preference with `useViewMode(pageKey)`.
 */
export function ViewModeToggle({
  value,
  onChange,
  label = 'Layout',
  className,
}: ViewModeToggleProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex shrink-0 gap-2 self-start', className)}
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        aria-pressed={value === 'grid'}
        aria-label="Grid view"
        className={cn(
          'inline-flex items-center gap-2 rounded-uv-lg border px-3 py-2 text-sm font-medium transition-colors uv-focus-ring',
          value === 'grid'
            ? 'border-uv-brand bg-uv-brand/10 text-uv-brand'
            : 'border-uv-border bg-uv-background text-uv-foreground-muted hover:border-uv-brand/40 hover:text-uv-foreground',
        )}
      >
        <Icon name="Layers" size="sm" />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        aria-pressed={value === 'list'}
        aria-label="List view"
        className={cn(
          'inline-flex items-center gap-2 rounded-uv-lg border px-3 py-2 text-sm font-medium transition-colors uv-focus-ring',
          value === 'list'
            ? 'border-uv-brand bg-uv-brand/10 text-uv-brand'
            : 'border-uv-border bg-uv-background text-uv-foreground-muted hover:border-uv-brand/40 hover:text-uv-foreground',
        )}
      >
        <Icon name="ClipboardList" size="sm" />
        List
      </button>
    </div>
  );
}
