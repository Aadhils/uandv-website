import type { Metadata } from 'next';

import { CustomerSupportPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Support' };

export default function SupportPage() {
  return <CustomerSupportPage />;
}
