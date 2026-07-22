import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/cn';

export const cardVariants = cva(
  'rounded-uv-xl text-uv-card-foreground transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'border border-uv-border bg-uv-card shadow-uv-sm',
        elevated: 'border border-transparent bg-uv-card shadow-uv-lg',
        outlined: 'border border-uv-border-strong bg-transparent shadow-none',
        ghost: 'border border-transparent bg-transparent shadow-none',
        muted: 'border border-transparent bg-uv-background-muted shadow-none',
      },
      interactive: {
        true: 'cursor-pointer hover:border-uv-brand/40 hover:shadow-uv-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uv-ring',
        false: '',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
      padding: 'none',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  variant,
  interactive,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, interactive, padding, className }))}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 p-6 pb-0', className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('uv-h5 text-uv-card-foreground', className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('uv-body-sm text-uv-foreground-muted', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-t border-uv-border p-6 pt-4',
        className,
      )}
      {...props}
    />
  );
}

export function CardMedia({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-t-uv-xl border-b border-uv-border bg-uv-background-muted',
        className,
      )}
      {...props}
    />
  );
}
