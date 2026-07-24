import type { Metadata } from 'next';

import { VendorMeetingsPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Meetings' };

export default function VendorMeetingsRoute() {
  return <VendorMeetingsPage />;
}
