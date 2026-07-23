import type { Metadata } from 'next';

import { AdminTemplatesPage } from '@/components/admin/templates-page';

export const metadata: Metadata = { title: 'Business Templates' };

export default function AdminTemplatesRoute() {
  return <AdminTemplatesPage />;
}
