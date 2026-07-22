import * as React from 'react';

import { cn } from '../../lib/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
};

export function Container({
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: ContainerProps['size'];
}

const sectionSpacing = {
  sm: 'py-10 sm:py-12',
  md: 'py-14 sm:py-16',
  lg: 'py-20 sm:py-24',
  xl: 'py-24 sm:py-32',
};

export function Section({
  spacing = 'lg',
  containerSize = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionSpacing[spacing], className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
}

const stackGaps = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

export function Stack({
  direction = 'vertical',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  className,
  ...props
}: StackProps) {
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }[justify];

  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        stackGaps[gap],
        alignClass,
        justifyClass,
        className,
      )}
      {...props}
    />
  );
}

export function Divider({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('border-0 border-t border-uv-border', className)}
      {...props}
    />
  );
}

export function Spacer({ className }: { className?: string }) {
  return <div className={cn('flex-1', className)} aria-hidden />;
}

export interface PageLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  header,
  footer,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn('uv-root flex min-h-screen flex-col', className)}>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}

export function Heading({
  level = 2,
  variant,
  className,
  children,
  ...props
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const variantKey =
    variant ??
    ({
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    }[level] as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');

  const classes = {
    display: 'uv-display',
    h1: 'uv-h1',
    h2: 'uv-h2',
    h3: 'uv-h3',
    h4: 'uv-h4',
    h5: 'uv-h5',
    h6: 'uv-h6',
  }[variantKey];

  return React.createElement(
    `h${level}`,
    {
      className: cn(classes, 'text-uv-foreground', className),
      ...props,
    },
    children,
  );
}

export function Text({
  variant = 'body',
  muted = false,
  className,
  children,
  ...props
}: {
  variant?: 'body-lg' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline';
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>) {
  const classes = {
    'body-lg': 'uv-body-lg',
    body: 'uv-body',
    'body-sm': 'uv-body-sm',
    caption: 'uv-caption',
    label: 'uv-label',
    overline: 'uv-overline',
  }[variant];

  return (
    <p
      className={cn(
        classes,
        muted && 'text-uv-foreground-muted',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export interface AppShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Responsive app chrome: sidebar + header + content */
export function AppShell({
  sidebar,
  header,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn('uv-root flex min-h-screen', className)}>
      {sidebar ? (
        <div className="hidden shrink-0 md:block">{sidebar}</div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const showFromClasses: Record<Breakpoint, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
};

const hideFromClasses: Record<Breakpoint, string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
};

export function Show({
  from,
  className,
  children,
  ...props
}: {
  from: Breakpoint;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(showFromClasses[from], className)} {...props}>
      {children}
    </div>
  );
}

export function Hide({
  from,
  className,
  children,
  ...props
}: {
  from: Breakpoint;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(hideFromClasses[from], className)} {...props}>
      {children}
    </div>
  );
}

export function VisuallyHidden({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="sr-only" {...props}>
      {children}
    </span>
  );
}
