import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EnquiryDetailPage } from '@/components/admin/crm/enquiry-detail-page';
import { requireAdminUser } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import {
  ensureEnquiryTimelineSeed,
  mapEnquiryDetail,
} from '@/lib/enquiries/admin';

type PageProps = {
  params: Promise<{ enquiryId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { enquiryId } = await params;
  const enquiry = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
    select: { reference: true },
  });

  return {
    title: enquiry ? `Lead · ${enquiry.reference}` : 'Lead Detail',
  };
}

export const dynamic = 'force-dynamic';

export default async function AdminLeadDetailRoute({ params }: PageProps) {
  const { enquiryId } = await params;
  await requireAdminUser({ redirectPath: `/admin/leads/${enquiryId}` });

  const enquiry = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
  });

  if (!enquiry) {
    notFound();
  }

  await ensureEnquiryTimelineSeed(prisma, enquiry);

  const detail = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
    include: {
      timelineEvents: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!detail) {
    notFound();
  }

  return <EnquiryDetailPage enquiry={mapEnquiryDetail(detail)} />;
}
