'use client';

import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

export function WuvSceneShell({
  label,
  children,
  className,
  aspectClassName,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  aspectClassName?: string;
}) {
  return (
    <div
      className={cn(
        'wuv-scene-shell relative overflow-hidden rounded-2xl border border-uv-brand/10 bg-gradient-to-br from-white via-[#f8f7ff] to-[#eef4ff] shadow-[0_12px_40px_rgb(30_58_138_/_0.07)]',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div className={cn('wuv-scene-shell__canvas relative w-full', aspectClassName ?? 'aspect-[16/10] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]')}>
        {children}
      </div>
    </div>
  );
}
