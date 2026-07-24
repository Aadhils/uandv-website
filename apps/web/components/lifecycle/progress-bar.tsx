import { cn } from '@uandv/ui';

export type ProgressBarProps = {
  value: number;
  label: string;
  className?: string;
  size?: 'sm' | 'md';
};

/** Accessible progress indicator for project lifecycle views. */
export function ProgressBar({
  value,
  label,
  className,
  size = 'md',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
        <span className="text-uv-foreground-muted">{label}</span>
        <span className="font-medium tabular-nums text-uv-foreground">
          {clamped}%
        </span>
      </div>
      <div
        className={cn(
          'overflow-hidden rounded-full bg-uv-background-muted',
          size === 'sm' ? 'h-1.5' : 'h-2',
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-uv-brand transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
