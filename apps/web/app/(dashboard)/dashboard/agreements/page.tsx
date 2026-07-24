import type { Metadata } from 'next';

import { CustomerAgreementsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Agreements' };

export default function AgreementsPage() {
  return <CustomerAgreementsPage />;
}
