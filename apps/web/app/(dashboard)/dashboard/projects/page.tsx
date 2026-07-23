import type { Metadata } from 'next';

import { CustomerProjectsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'My Projects' };

export default function ProjectsPage() {
  return <CustomerProjectsPage />;
}
