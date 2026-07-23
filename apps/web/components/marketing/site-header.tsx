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
          className="uv-focus-ring rounded-uv-md"
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
            href="/login"
            className={cn(
              buttonVariants({ size: 'sm', variant: 'ghost' }),
              'hidden md:inline-flex',
            )}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'hidden sm:inline-flex',
            )}
          >
            Get Started
          </Link>
        </>
      }
      mobileActions={
        <>
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ size: 'md', variant: 'outline' }))}
          >
            Login
          </Link>
          <Link href="/signup" className={cn(buttonVariants({ size: 'md' }))}>
            Get Started
          </Link>
        </>
      }
    />
  );
}
