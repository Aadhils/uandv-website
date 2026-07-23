import type { Metadata } from 'next';

import { AdminPartnerProfilePage } from '@/components/admin/partners';
import { demoPartners } from '@/lib/partners';

export const metadata: Metadata = { title: 'Partner Profile' };

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export function generateStaticParams() {
  return demoPartners.map((partner) => ({ partnerId: partner.id }));
}

export default async function AdminPartnerProfileRoute({ params }: PageProps) {
  const { partnerId } = await params;
  return <AdminPartnerProfilePage partnerId={partnerId} />;
}
