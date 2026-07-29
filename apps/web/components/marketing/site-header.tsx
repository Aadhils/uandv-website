'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, ThemeToggle } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { marketingNav, siteConfig } from '@/lib/site';

function isNavActive(pathname: string, href: string) {
  const path = href.split('#')[0] ?? href;
  if (!path || path === '/') {
    return pathname === '/';
  }
  if (path.startsWith('/#')) {
    return false;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <Navbar
      centeredLinks
      className="[&_nav_a]:px-2 [&_nav_a]:text-[0.8125rem] xl:[&_nav_a]:px-2.5 xl:[&_nav_a]:text-sm"
      linkComponent={Link}
      brand={
        <Link
          href="/"
          className="uv-focus-ring block max-w-full truncate rounded-uv-md"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
        </Link>
      }
      links={marketingNav.map((item) => ({
        label: item.label,
        href: item.href,
        active: isNavActive(pathname, item.href),
      }))}
      actions={<ThemeToggle />}
      mobileActions={null}
    />
  );
}
