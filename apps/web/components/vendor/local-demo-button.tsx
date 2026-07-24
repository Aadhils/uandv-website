'use client';

import type { ReactNode } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

type LocalDemoButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'outline' | 'secondary' | 'ghost' | 'primary';
  'aria-label'?: string;
};

/** Enabled button for local-state demo actions (not a real API). */
export function LocalDemoButton({
  children,
  onClick,
  className,
  disabled,
  variant = 'outline',
  'aria-label': ariaLabel,
}: LocalDemoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title="Demo local state only — not saved to a server"
      className={cn(
        buttonVariants({ variant, size: 'sm' }),
        'disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}
