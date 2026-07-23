import type { Metadata } from 'next';

import { AdminPartnerProjectsPage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Projects' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerProjectsPage partnerId={partnerId} />;
}
