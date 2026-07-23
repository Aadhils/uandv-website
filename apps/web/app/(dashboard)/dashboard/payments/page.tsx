import type { Metadata } from 'next';

import { CustomerPaymentsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Payments' };

export default function PaymentsPage() {
  return <CustomerPaymentsPage />;
}
