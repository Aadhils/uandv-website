import type { ReactNode } from 'react';

import {
  AdminPartnerDetailNav,
  requirePartner,
} from '@/components/admin/partners';
import { demoPartners } from '@/lib/partners';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ partnerId: string }>;
};

export function generateStaticParams() {
  return demoPartners.map((partner) => ({ partnerId: partner.id }));
}

export default async function AdminPartnerDetailLayout({
  children,
  params,
}: LayoutProps) {
  const { partnerId } = await params;
  const partner = requirePartner(partnerId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <AdminPartnerDetailNav partnerId={partnerId} partner={partner} />
      {children}
    </div>
  );
}
