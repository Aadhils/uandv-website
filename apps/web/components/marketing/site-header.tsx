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
        <Link href="/" className="uv-focus-ring rounded-uv-md" aria-label={siteConfig.name}>
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
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'hidden lg:inline-flex',
            )}
          >
            WhatsApp
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
          >
            Get started
          </Link>
        </>
      }
    />
  );
}
