import type { Metadata } from 'next';

import { ErpDemoProviders } from '@/components/demo/erp/providers';

export const metadata: Metadata = {
  title: 'Enterprise ERP & CRM Demo',
  description:
    'Interactive U&V ERP & CRM demo with customers, pipeline, HR, inventory, accounting, and reports — mock data only.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/demo/erp' },
};

export default function ErpDemoLayout({ children }: { children: React.ReactNode }) {
  return <ErpDemoProviders>{children}</ErpDemoProviders>;
}
