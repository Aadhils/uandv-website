import type { Metadata } from 'next';

import { LeadListPage } from '@/components/admin/crm/lead-list-page';
import { requireAdminUser } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { mapEnquiryListRows } from '@/lib/enquiries/admin';
import { getAllServices } from '@/lib/services';

export const metadata: Metadata = { title: 'Lead Management' };
export const dynamic = 'force-dynamic';

export default async function AdminLeadListRoute() {
  await requireAdminUser();

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  const serviceOptions = getAllServices().map((service) => ({
    slug: service.slug,
    title: service.title,
  }));

  return (
    <LeadListPage
      enquiries={mapEnquiryListRows(enquiries)}
      serviceOptions={serviceOptions}
    />
  );
}
