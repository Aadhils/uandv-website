import type { Metadata } from 'next';

import { SmartMobilityShell } from '@/components/demo/smart-mobility/shell';
import { SmartMobilityProvider } from '@/lib/demo/smart-mobility/booking-context';

export const metadata: Metadata = {
  title: 'Smart Mobility Platform Demo',
  description:
    'Interactive U&V Smart Mobility demo covering bike, auto, cab, rental, parcel delivery, driver partner app, and admin fleet management — mock data only.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/demo/smart-mobility' },
};

export default function SmartMobilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmartMobilityProvider>
      <SmartMobilityShell>{children}</SmartMobilityShell>
    </SmartMobilityProvider>
  );
}
