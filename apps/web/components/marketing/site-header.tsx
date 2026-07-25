'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, ThemeToggle, buttonVariants, cn } from '@uandv/ui';

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
      actions={
        <>
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'hidden lg:inline-flex',
            )}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden lg:inline-flex')}
          >
            Start Your Project
          </Link>
        </>
      }
      mobileActions={
        <>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: 'md' }), 'w-full justify-center')}
          >
            Start Your Project
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: 'md', variant: 'outline' }),
              'w-full justify-center',
            )}
          >
            Contact
          </Link>
        </>
      }
    />
  );
}
