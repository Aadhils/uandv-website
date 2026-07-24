import type { Metadata } from 'next';

import { CustomerWorkUpdatesPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Work Updates' };

export default function WorkUpdatesRoutePage() {
  return <CustomerWorkUpdatesPage />;
}
