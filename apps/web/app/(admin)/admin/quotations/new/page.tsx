import type { Metadata } from 'next';

import { QuotationNewPageClient } from '@/components/admin/quotations/quotation-editor';
import { requireAdminUser } from '@/lib/auth/require-admin';
import { getLeadPrefill } from '@/lib/quotations/service';

export const metadata: Metadata = { title: 'New quotation' };
export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ leadId?: string }>;
};

export default async function AdminNewQuotationRoute({ searchParams }: PageProps) {
  await requireAdminUser({ redirectPath: '/admin/quotations/new' });
  const params = await searchParams;
  const leadPrefill = params.leadId ? await getLeadPrefill(params.leadId) : null;

  return <QuotationNewPageClient leadPrefill={leadPrefill} />;
}
