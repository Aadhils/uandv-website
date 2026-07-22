import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/cn';

export const badgeVariants = cva(
  'inline-flex items-center rounded-uv-md px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-uv-brand-muted text-uv-brand',
        secondary: 'bg-uv-background-muted text-uv-foreground',
        outline: 'border border-uv-border text-uv-foreground',
        success: 'bg-uv-success-muted text-uv-success',
        warning: 'bg-uv-warning-muted text-uv-warning',
        error: 'bg-uv-error-muted text-uv-error',
        info: 'bg-uv-info-muted text-uv-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
