import type { Metadata } from 'next';

import { PartnersDirectoryPage } from '@/components/partners/directory-page';

export const metadata: Metadata = {
  title: 'Partner Marketplace',
  description:
    'Browse the U&V Partner Marketplace directory with categories, ratings, and search. Demo data only.',
};

export default function PartnersDirectoryRoute() {
  return <PartnersDirectoryPage />;
}
