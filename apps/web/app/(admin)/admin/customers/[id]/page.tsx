import type { Metadata } from 'next';

import { AdminCustomerProfilePage } from '@/components/admin';

export const metadata: Metadata = { title: 'Customer Profile' };

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCustomerDetailRoute({ params }: PageProps) {
  const { id } = await params;
  return <AdminCustomerProfilePage customerId={id} />;
}
