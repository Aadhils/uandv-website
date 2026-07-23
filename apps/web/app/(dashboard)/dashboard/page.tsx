import type { Metadata } from 'next';

import { CustomerOverviewPage } from '@/components/customer';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return <CustomerOverviewPage />;
}
