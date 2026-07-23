import type { Metadata } from 'next';

import { PartnersDirectoryPage } from '@/components/partners/directory-page';

export const metadata: Metadata = {
  title: 'Partner Network',
  description:
    'Browse the U&V Business Service Ecosystem partner directory. Demo data only.',
};

export default function PartnersDirectoryRoute() {
  return <PartnersDirectoryPage />;
}
