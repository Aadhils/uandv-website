import type { EnquiryStatus, Prisma } from '@uandv/database';

import { getServiceBySlug } from '@/lib/services';

import type { AdminEnquiryListQuery } from './admin-schema';
import { ENQUIRY_STATUS_LABELS } from './status';

export type AdminEnquiryListItem = {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string;
  serviceLabel: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type AdminEnquiryTimelineItem = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  actorLabel: string | null;
  createdAt: string;
};

export type AdminEnquiryDetail = AdminEnquiryListItem & {
  message: string;
  source: string;
  internalNotes: string | null;
  followUpDate: string | null;
  updatedAt: string;
  timeline: AdminEnquiryTimelineItem[];
};

function resolveServiceLabel(slug: string): string {
  return getServiceBySlug(slug)?.title ?? slug.replaceAll('-', ' ');
}

function serializeListItem(
  row: Prisma.EnquiryGetPayload<object>,
): AdminEnquiryListItem {
  return {
    id: row.id,
    reference: row.reference,
    name: row.name,
    email: row.email,
    phone: row.mobile,
    company: row.company,
    serviceInterest: row.serviceInterest,
    serviceLabel: resolveServiceLabel(row.serviceInterest),
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

export function buildAdminEnquiryWhere(
  filters: AdminEnquiryListQuery,
): Prisma.EnquiryWhereInput {
  const where: Prisma.EnquiryWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.service) {
    where.serviceInterest = filters.service;
  }

  if (filters.q) {
    const q = filters.q;
    where.OR = [
      { reference: { contains: q, mode: 'insensitive' } },
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { mobile: { contains: q, mode: 'insensitive' } },
      { company: { contains: q, mode: 'insensitive' } },
    ];
  }

  return where;
}

export function mapEnquiryListRows(
  rows: Prisma.EnquiryGetPayload<object>[],
): AdminEnquiryListItem[] {
  return rows.map(serializeListItem);
}

export function mapEnquiryDetail(
  row: Prisma.EnquiryGetPayload<{
    include: { timelineEvents: true };
  }>,
): AdminEnquiryDetail {
  return {
    ...serializeListItem(row),
    message: row.message,
    source: row.source,
    internalNotes: row.internalNotes,
    followUpDate: row.followUpDate?.toISOString() ?? null,
    updatedAt: row.updatedAt.toISOString(),
    timeline: row.timelineEvents.map((event) => ({
      id: event.id,
      type: event.type,
      title: event.title,
      body: event.body,
      actorLabel: event.actorLabel,
      createdAt: event.createdAt.toISOString(),
    })),
  };
}

export async function ensureEnquiryTimelineSeed(
  prisma: {
    enquiryTimelineEvent: {
      count: (args: { where: { enquiryId: string } }) => Promise<number>;
      create: (args: {
        data: {
          enquiryId: string;
          type: string;
          title: string;
          body?: string;
        };
      }) => Promise<unknown>;
    };
  },
  enquiry: { id: string; reference: string; source: string },
) {
  const count = await prisma.enquiryTimelineEvent.count({
    where: { enquiryId: enquiry.id },
  });
  if (count > 0) return;

  await prisma.enquiryTimelineEvent.create({
    data: {
      enquiryId: enquiry.id,
      type: 'created',
      title: 'Enquiry received',
      body: `Reference ${enquiry.reference} submitted via ${enquiry.source}.`,
    },
  });
}

export function buildStatusChangeTimeline(input: {
  from: EnquiryStatus;
  to: EnquiryStatus;
  actorLabel: string;
}) {
  return {
    type: 'status_change',
    title: `Status updated to ${ENQUIRY_STATUS_LABELS[input.to]}`,
    body: `Changed from ${ENQUIRY_STATUS_LABELS[input.from]} to ${ENQUIRY_STATUS_LABELS[input.to]}.`,
    actorLabel: input.actorLabel,
  };
}

export function formatEnquiryDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
