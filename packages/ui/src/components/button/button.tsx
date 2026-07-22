import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-uv-lg text-sm font-medium transition-colors duration-200 uv-focus-ring disabled:pointer-events-none disabled:bg-uv-disabled disabled:text-uv-disabled-foreground disabled:opacity-100',
  {
    variants: {
      variant: {
        primary:
          'uv-brand-gradient border border-transparent shadow-uv-sm hover:brightness-110 disabled:shadow-none disabled:filter-none',
        secondary:
          'bg-uv-background-muted text-uv-foreground hover:bg-uv-border border border-uv-border',
        outline:
          'border border-uv-border-strong bg-transparent text-uv-foreground hover:bg-uv-background-muted',
        ghost:
          'bg-transparent text-uv-foreground hover:bg-uv-background-muted disabled:bg-transparent',
        destructive:
          'bg-uv-error text-white hover:bg-uv-error/90 shadow-uv-sm disabled:shadow-none',
        link: 'bg-transparent text-uv-brand underline-offset-4 hover:underline p-0 h-auto disabled:bg-transparent',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0" aria-hidden>
            {leftIcon}
          </span>
        ) : null}
        {children ? <span>{children}</span> : null}
        {!isLoading && rightIcon ? (
          <span className="inline-flex shrink-0" aria-hidden>
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean;
}

export function ButtonGroup({
  className,
  attached = false,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        'inline-flex',
        attached
          ? '[&>button]:rounded-none [&>button:first-child]:rounded-l-uv-lg [&>button:last-child]:rounded-r-uv-lg [&>button:not(:first-child)]:border-l-0'
          : 'flex-wrap gap-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
