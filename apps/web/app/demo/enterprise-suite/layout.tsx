import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SuiteDemoProviders } from '@/components/demo/enterprise-suite/providers';

export const metadata: Metadata = {
  title: 'Enterprise ERP, CRM & Travel Suite Demo',
  description: 'Interactive U&V enterprise suite with ERP, CRM, and travel management — mock data only.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/demo/enterprise-suite' },
};

export default function SuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-svh items-center justify-center text-sm text-uv-foreground-muted">Loading…</div>}>
      <SuiteDemoProviders>{children}</SuiteDemoProviders>
    </Suspense>
  );
}
