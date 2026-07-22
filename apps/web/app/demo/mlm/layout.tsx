import type { Metadata } from 'next';

import { MlmDemoProviders } from '@/components/demo/mlm/providers';

export const metadata: Metadata = {
  title: 'MLM Software Demo',
  description:
    'Interactive U&V MLM software demo with admin/member login, dashboard, trees, wallet, KYC, e-pin, products, and orders — mock data only.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/demo/mlm',
  },
};

export default function MlmDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MlmDemoProviders>{children}</MlmDemoProviders>;
}
