import type { Metadata } from 'next';

import { RestaurantDemoProviders } from '@/components/demo/restaurant/providers';

export const metadata: Metadata = {
  title: 'Restaurant, Food Delivery & POS Platform Demo',
  description:
    'Interactive U&V restaurant platform demo with customer ordering, dine-in QR, POS, kitchen display, delivery partner, inventory, and admin — mock data only.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/demo/restaurant-platform' },
};

export default function RestaurantDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RestaurantDemoProviders>{children}</RestaurantDemoProviders>;
}
