import type { Metadata } from 'next';

import { AdminPartnerCommunicationsPage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Communication' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerCommunicationsPage partnerId={partnerId} />;
}
