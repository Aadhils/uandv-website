import type { Metadata } from 'next';

import { HotelDemoProviders } from '@/components/demo/hotel/providers';

export const metadata: Metadata = {
  title: 'Hotel Management Platform Demo',
  description:
    'Interactive U&V hotel management demo with admin, front desk, housekeeping, and guest workspaces — mock data only.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/demo/hotel-management' },
};

export default function HotelDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HotelDemoProviders>{children}</HotelDemoProviders>;
}
