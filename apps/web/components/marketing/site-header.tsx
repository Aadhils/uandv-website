'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, ThemeToggle } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { marketingNav, siteConfig } from '@/lib/site';

function isNavActive(pathname: string, href: string) {
  if (href.startsWith('/#')) {
    return false;
  }
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <Navbar
      centeredLinks
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
