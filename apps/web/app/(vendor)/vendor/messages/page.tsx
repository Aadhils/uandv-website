import type { Metadata } from 'next';

import { VendorMessagesPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Messages' };

export default function VendorMessagesRoute() {
  return <VendorMessagesPage />;
}
