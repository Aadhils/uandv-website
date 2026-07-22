import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export const alertVariants = cva(
  'flex gap-3 rounded-uv-xl border p-4 text-sm',
  {
    variants: {
      variant: {
        info: 'border-uv-info/30 bg-uv-info-muted text-uv-foreground',
        success: 'border-uv-success/30 bg-uv-success-muted text-uv-foreground',
        warning: 'border-uv-warning/30 bg-uv-warning-muted text-uv-foreground',
        error: 'border-uv-error/30 bg-uv-error-muted text-uv-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const alertIcons: Record<NonNullable<AlertProps['variant']>, IconName> = {
  info: 'Info',
  success: 'Check',
  warning: 'CircleAlert',
  error: 'CircleAlert',
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

export function Alert({
  className,
  variant = 'info',
  title,
  children,
  ...props
}: AlertProps) {
  const resolved = variant ?? 'info';

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant: resolved, className }))}
      {...props}
    >
      <Icon name={alertIcons[resolved]} size="md" className="mt-0.5" />
      <div className="min-w-0 flex-1 space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        {children ? (
          <div className="text-uv-foreground-muted">{children}</div>
        ) : null}
      </div>
    </div>
  );
}
