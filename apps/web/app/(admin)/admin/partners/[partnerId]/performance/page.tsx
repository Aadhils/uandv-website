import type { Metadata } from 'next';

import { AdminPartnerPerformancePage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Performance' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerPerformancePage partnerId={partnerId} />;
}
