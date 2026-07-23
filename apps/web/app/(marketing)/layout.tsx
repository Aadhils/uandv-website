import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';
import { BackToTop } from '@/components/shared/back-to-top';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1300] focus:rounded-uv-lg focus:bg-uv-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-uv-brand-foreground focus:shadow-uv-lg"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-clip pb-20">
        {children}
      </main>
      <SiteFooter />
      <BackToTop className="bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] z-40" />
    </>
  );
}
