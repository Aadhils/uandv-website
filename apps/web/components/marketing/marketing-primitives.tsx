import Link from 'next/link';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import {
  uvBadge,
  uvBody,
  uvBtnOutline,
  uvBtnPrimary,
  uvCard,
  uvCardPremium,
  uvCardTitle,
  uvContainer,
  uvCtaPanel,
  uvEyebrow,
  uvHeroActions,
  uvHeroTitle,
  uvLead,
  uvSection,
  uvSectionTitle,
} from './marketing-design-tokens';

export const marketingContainerClass = uvContainer;
export const marketingSectionClass = uvSection;
export const marketingEyebrowClass = uvEyebrow;
export const marketingHeroTitleClass = uvHeroTitle;
export const marketingSectionTitleClass = uvSectionTitle;
export const marketingLeadClass = uvLead;
export const marketingBodyClass = uvBody;
export const marketingCardClass = uvCard;
export const marketingCardPremiumClass = uvCardPremium;
export const marketingCtaPanelClass = uvCtaPanel;
export const marketingBadgeClass = uvBadge;
export const marketingHeroActionsClass = uvHeroActions;

export function MarketingPageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(uvContainer, className)}>{children}</div>;
}

export function MarketingSection({
  children,
  className,
  id,
  tone = 'default',
  as: Component = 'section',
  'aria-label': ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'default' | 'subtle' | 'none';
  as?: ElementType;
  'aria-label'?: string;
}) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(
        uvSection,
        tone === 'subtle' && 'bg-uv-background-subtle',
        tone === 'default' && 'bg-uv-background',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function MarketingEyebrow({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        uvEyebrow,
        dark && 'text-uv-hero-accent',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function MarketingHeroTitle({
  children,
  className,
  id,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}) {
  return (
    <h1
      id={id}
      className={cn(uvHeroTitle, dark && 'text-white', className)}
    >
      {children}
    </h1>
  );
}

export function MarketingSectionTitle({
  children,
  className,
  as: Component = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Component className={cn(uvSectionTitle, className)}>{children}</Component>
  );
}

export function MarketingCardTitle({
  children,
  className,
  as: Component = 'h3',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Component className={cn(uvCardTitle, className)}>{children}</Component>
  );
}

export function MarketingLead({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(uvLead, dark && 'text-uv-hero-muted', className)}
    >
      {children}
    </p>
  );
}

export function MarketingBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn(uvBadge, className)}>{children}</span>;
}

export function MarketingCard({
  children,
  className,
  premium = false,
  as: Component = 'article',
}: {
  children: ReactNode;
  className?: string;
  premium?: boolean;
  as?: ElementType;
}) {
  return (
    <Component
      className={cn(premium ? uvCardPremium : uvCard, className)}
    >
      {children}
    </Component>
  );
}

export function MarketingIconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'marketing-icon-glow inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MarketingCtaPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(uvCtaPanel, className)}>{children}</div>;
}

export function MarketingHeroActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(uvHeroActions, className)}>{children}</div>;
}

type MarketingButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export function MarketingButtonLink({
  children,
  className,
  variant = 'primary',
  size = 'lg',
  ...props
}: MarketingButtonLinkProps) {
  const buttonVariant =
    variant === 'outline'
      ? 'outline'
      : variant === 'secondary'
        ? 'secondary'
        : 'primary';

  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ size, variant: buttonVariant }),
        variant === 'primary' ? uvBtnPrimary : uvBtnOutline,
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Stagger delay helper for Reveal grids — caps at 280ms for performance */
export function marketingStaggerDelay(index: number, stepMs = 40): number {
  return Math.min(index * stepMs, 280);
}
