import type { Metadata } from 'next';

import { TravelDemoProviders } from '@/components/demo/travel/providers';

export const metadata: Metadata = {
  title: 'Travel & Tourism Platform Demo',
  description:
    'Interactive U&V Travel & Tourism Platform product demo with customer portal, package explorer, hotels, flights, admin, and agent dashboards — mock data only.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/demo/travel',
  },
};

export default function TravelDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TravelDemoProviders>{children}</TravelDemoProviders>;
}
