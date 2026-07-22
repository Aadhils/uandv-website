'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export interface NavLinkItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: IconName;
}

export interface NavbarProps {
  brand: React.ReactNode;
  links?: NavLinkItem[];
  actions?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function Navbar({
  brand,
  links = [],
  actions,
  className,
  sticky = true,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /** Stable id avoids rare SSR/client useId drift under nested providers */
  const menuId = 'uv-mobile-nav';

  return (
    <header
      className={cn(
        'z-[1200] w-full border-b border-uv-nav-border bg-uv-nav backdrop-blur-md',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          <div className="shrink-0">{brand}</div>
          {links.length > 0 ? (
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} active={link.active}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="hidden items-center gap-3 md:flex">{actions}</div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg text-uv-foreground hover:bg-uv-background-muted md:hidden uv-focus-ring"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Toggle menu</span>
          <Icon name={mobileOpen ? 'X' : 'Menu'} size="md" />
        </button>
      </nav>

      {mobileOpen ? (
        <div
          id={menuId}
          className="border-t border-uv-border px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  active={link.active}
                  className="block w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {actions ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-uv-border pt-4">
              {actions}
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function NavLink({
  className,
  active = false,
  children,
  ...props
}: NavLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center rounded-uv-md px-3 py-2 text-sm font-medium transition-colors uv-focus-ring',
        active
          ? 'bg-uv-brand-muted text-uv-brand'
          : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export function NavBrand({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'text-lg font-bold tracking-tight text-uv-brand',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SidebarProps {
  brand?: React.ReactNode;
  items?: NavLinkItem[];
  footer?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

export function Sidebar({
  brand,
  items = [],
  footer,
  className,
  collapsed = false,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-uv-border bg-uv-background-subtle',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      aria-label="Sidebar"
    >
      {brand ? (
        <div
          className={cn(
            'flex h-16 items-center border-b border-uv-border px-4',
            collapsed && 'justify-center px-2',
          )}
        >
          {brand}
        </div>
      ) : null}

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={item.active ? 'page' : undefined}
            title={collapsed ? item.label : undefined}
            className={cn(
              'flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors uv-focus-ring',
              item.active
                ? 'bg-uv-brand-muted text-uv-brand'
                : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground',
              collapsed && 'justify-center px-2',
            )}
          >
            {item.icon ? <Icon name={item.icon} size="md" /> : null}
            {!collapsed ? <span>{item.label}</span> : null}
          </a>
        ))}
      </nav>

      {footer ? (
        <div className="border-t border-uv-border p-3">{footer}</div>
      ) : null}
    </aside>
  );
}
