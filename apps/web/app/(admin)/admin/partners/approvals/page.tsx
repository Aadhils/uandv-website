import type { Metadata } from 'next';

import { AdminPartnerApprovalsPage } from '@/components/admin/partners';

export const metadata: Metadata = {
  title: 'Partner Approvals',
};

export default function AdminPartnerApprovalsRoute() {
  return <AdminPartnerApprovalsPage />;
}
