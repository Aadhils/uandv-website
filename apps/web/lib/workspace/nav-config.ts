import type { IconName, WorkspaceNavItem } from '@uandv/ui';

export type NavItemStatus = 'ready' | 'coming_soon' | 'in_development';

export type NavItemConfig = {
  label: string;
  href: string;
  icon: IconName;
  /** When false, item is visible but not clickable. */
  enabled: boolean;
  /** Shown when disabled — defaults to "Coming soon". */
  status?: Exclude<NavItemStatus, 'ready'>;
};

export function navStatusLabel(
  status: NavItemConfig['status'],
): string | undefined {
  if (!status) return 'Coming Soon';
  if (status === 'in_development') return 'In Development';
  return 'Coming Soon';
}

export function mapNavConfigToItems(
  items: NavItemConfig[],
  pathname: string,
  isActive: (pathname: string, href: string) => boolean,
): WorkspaceNavItem[] {
  return items.map((item) => ({
    label: item.label,
    href: item.href,
    icon: item.icon,
    active: item.enabled && isActive(pathname, item.href),
    disabled: !item.enabled,
    statusLabel: item.enabled ? undefined : navStatusLabel(item.status),
  }));
}
