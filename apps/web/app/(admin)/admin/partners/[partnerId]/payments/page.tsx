import type { Metadata } from 'next';

import { AdminPartnerPaymentsPage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Payments' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerPaymentsPage partnerId={partnerId} />;
}
