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
  /** Shown only inside the mobile drawer (use when desktop actions hide CTAs) */
  mobileActions?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function Navbar({
  brand,
  links = [],
  actions,
  mobileActions,
  className,
  sticky = true,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const menuId = 'uv-mobile-nav';
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const closeMobile = React.useCallback(() => {
    setMobileOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobile();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href], button');
    firstLink?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMobile, mobileOpen]);

  const drawerActions = mobileActions ?? actions;

  return (
    <header
      className={cn(
        'z-[1200] w-full border-b border-uv-nav-border bg-uv-nav/95 backdrop-blur-md transition-shadow duration-200',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <div className="shrink-0">{brand}</div>
          {links.length > 0 ? (
            <ul className="hidden items-center gap-0.5 lg:flex">
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

        <div className="hidden items-center gap-2 lg:flex lg:gap-3">
          {actions}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg text-uv-foreground transition-colors hover:bg-uv-background-muted lg:hidden uv-focus-ring"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Icon name={mobileOpen ? 'X' : 'Menu'} size="md" />
        </button>
      </nav>

      {mobileOpen ? (
        <div
          ref={panelRef}
          id={menuId}
          className="border-t border-uv-border px-4 py-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  active={link.active}
                  className="min-h-11 w-full justify-start px-3 py-3 text-base"
                  onClick={closeMobile}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {drawerActions ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-uv-border pt-4 [&_a]:w-full [&_a]:justify-center [&_button]:w-full">
              {drawerActions}
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
        'inline-flex items-center rounded-uv-md px-3 py-2 text-sm font-medium transition-colors duration-200 uv-focus-ring',
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
              'flex min-h-11 items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 uv-focus-ring',
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
