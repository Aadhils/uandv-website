import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSocialItem {
  label: string;
  href: string;
  icon: IconName;
}

export interface FooterProps {
  brand: React.ReactNode;
  description?: React.ReactNode;
  columns?: FooterColumn[];
  social?: FooterSocialItem[];
  bottom?: React.ReactNode;
  className?: string;
}

export function Footer({
  brand,
  description,
  columns = [],
  social = [],
  bottom,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn('bg-uv-footer text-uv-footer-foreground', className)}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid gap-12',
            columns.length > 0
              ? 'lg:grid-cols-[1.5fr_repeat(3,1fr)]'
              : 'lg:grid-cols-1',
          )}
        >
          <div className="space-y-4">
            <div className="text-xl font-bold text-white">{brand}</div>
            {description ? (
              <p className="max-w-sm text-sm leading-relaxed text-uv-soft-violet/85">
                {description}
              </p>
            ) : null}
            {social.length > 0 ? (
              <ul className="flex flex-wrap gap-2 pt-2">
                {social.map((item) => {
                  const isMailto = item.href.startsWith('mailto:');
                  return (
                    <li key={`${item.label}-${item.href}`}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        title={item.label}
                        {...(isMailto
                          ? {}
                          : {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            })}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg text-uv-soft-violet/85 transition-colors duration-200 hover:bg-uv-navy-blue hover:text-white uv-focus-ring"
                      >
                        <Icon name={item.icon} size="md" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {columns.map((column) => (
            <FooterColumnBlock key={column.title} title={column.title}>
              {column.links.map((link) => (
                <FooterLink key={`${link.label}-${link.href}`} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumnBlock>
          ))}
        </div>

        {bottom ? (
          <div className="mt-12 border-t border-uv-navy-blue pt-8 text-sm text-uv-soft-violet/80">
            {bottom}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export function FooterColumnBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="uv-overline text-uv-soft-violet/80">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

export function FooterLink({
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <li>
      <a
        className={cn(
          'rounded-sm text-sm text-uv-soft-violet/85 transition-colors duration-200 hover:text-white uv-focus-ring',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

/** @deprecated Use FooterColumnBlock — kept for compatibility */
export const FooterColumn = FooterColumnBlock;
