import type { Metadata } from 'next';

import { VendorPerformancePage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Performance' };

export default function VendorPerformanceRoute() {
  return <VendorPerformancePage />;
}
