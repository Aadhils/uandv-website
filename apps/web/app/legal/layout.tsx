import Link from 'next/link';

import { Logo } from '@/components/brand/logo';
import { SiteFooter } from '@/components/marketing/site-footer';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-uv-background text-uv-foreground">
      <header className="border-b border-uv-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" className="uv-focus-ring rounded-uv-md">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
