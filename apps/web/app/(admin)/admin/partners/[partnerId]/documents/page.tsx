import type { Metadata } from 'next';

import { AdminPartnerDocumentsPage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Documents' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerDocumentsPage partnerId={partnerId} />;
}
