import type { Metadata } from 'next';

import { CustomerQuotationsPage } from '@/components/customer/quotations-page';

export const metadata: Metadata = { title: 'Quotations' };

export default function CustomerQuotationsRoute() {
  return <CustomerQuotationsPage />;
}
