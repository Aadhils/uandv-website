import type { Metadata } from 'next';

import { CustomerTimelinePage } from '@/components/customer';

export const metadata: Metadata = { title: 'Business Timeline' };

export default function TimelinePage() {
  return <CustomerTimelinePage />;
}
