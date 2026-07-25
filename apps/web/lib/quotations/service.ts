import type {
  Prisma,
  QuotationStatus,
  User,
} from '@uandv/database';

import { calculateQuotationTotals } from '@/lib/quotations/calculate';
import { decimalToPrismaString } from '@/lib/quotations/decimal';
import { normalizeEmail } from '@/lib/quotations/access';
import {
  notifyAdminQuotationResponseEmail,
  sendQuotationToCustomerEmail,
} from '@/lib/quotations/email';
import {
  mapQuotationForAdmin,
  mapQuotationForCustomer,
  mapQuotationListRow,
} from '@/lib/quotations/mapper';
import { generateQuotationNumber } from '@/lib/quotations/number';
import { generateQuotationPdfBuffer } from '@/lib/quotations/pdf';
import type { QuotationUpsertInput } from '@/lib/quotations/schema';
import {
  assertQuotationTransition,
  isQuotationCancellable,
  isQuotationEditable,
  isQuotationExpiredByDate,
  isQuotationRespondable,
  QUOTATION_TIMELINE_ACTIONS,
} from '@/lib/quotations/status';
import { generateQuotationPublicToken } from '@/lib/quotations/token';
import { prisma } from '@/lib/db';

const quotationInclude = {
  items: { orderBy: { sortOrder: 'asc' as const } },
  timelineEvents: { orderBy: { createdAt: 'asc' as const } },
};

function parseValidityDate(value: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid validity date.');
  }
  return date;
}

async function appendTimeline(
  tx: Prisma.TransactionClient,
  input: {
    quotationId: string;
    action: string;
    actorType: 'ADMIN' | 'CUSTOMER' | 'SYSTEM';
    actorId?: string | null;
    actorLabel?: string | null;
    note?: string | null;
  },
) {
  await tx.quotationTimelineEvent.create({
    data: {
      quotationId: input.quotationId,
      action: input.action,
      actorType: input.actorType,
      actorId: input.actorId ?? null,
      actorLabel: input.actorLabel ?? null,
      note: input.note ?? null,
    },
  });
}

function buildItemCreateData(
  calculated: ReturnType<typeof calculateQuotationTotals>,
) {
  return calculated.lines.map((line) => ({
    description: line.description,
    quantity: decimalToPrismaString(line.quantity),
    unit: line.unit,
    unitPrice: decimalToPrismaString(line.unitPrice),
    discount: decimalToPrismaString(line.discount),
    taxRate: decimalToPrismaString(line.taxRate),
    lineTotal: decimalToPrismaString(line.lineTotal),
    sortOrder: line.sortOrder,
  }));
}

export async function resolveCustomerIdByEmail(
  email: string,
): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
    select: { id: true, accountType: true },
  });
  if (!user || user.accountType !== 'CUSTOMER') {
    return null;
  }
  return user.id;
}

export async function getLeadPrefill(leadId: string) {
  const lead = await prisma.enquiry.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      reference: true,
      name: true,
      email: true,
      mobile: true,
      company: true,
      serviceInterest: true,
      userId: true,
    },
  });
  if (!lead) return null;
  return {
    leadId: lead.id,
    leadReference: lead.reference,
    customerId: lead.userId,
    customerEmail: lead.email,
    customerName: lead.name,
    customerPhone: lead.mobile,
    customerCompany: lead.company,
    serviceInterest: lead.serviceInterest,
  };
}

export async function listAdminQuotations(filters: {
  q?: string;
  status?: QuotationStatus;
}) {
  const where: Prisma.QuotationWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.q) {
    const q = filters.q.trim();
    where.OR = [
      { quotationNumber: { contains: q, mode: 'insensitive' } },
      { customerName: { contains: q, mode: 'insensitive' } },
      { customerEmail: { contains: q, mode: 'insensitive' } },
      { leadReference: { contains: q, mode: 'insensitive' } },
      { title: { contains: q, mode: 'insensitive' } },
    ];
  }

  const rows = await prisma.quotation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  return rows.map(mapQuotationListRow);
}

export async function getAdminQuotationStats() {
  const [draft, sent, viewed, accepted, rejected, expired] = await Promise.all([
    prisma.quotation.count({ where: { status: 'DRAFT' } }),
    prisma.quotation.count({ where: { status: 'SENT' } }),
    prisma.quotation.count({ where: { status: 'VIEWED' } }),
    prisma.quotation.count({ where: { status: 'ACCEPTED' } }),
    prisma.quotation.count({ where: { status: 'REJECTED' } }),
    prisma.quotation.count({ where: { status: 'EXPIRED' } }),
  ]);

  return {
    draft,
    sent,
    awaitingResponse: sent + viewed,
    accepted,
    rejectedOrExpired: rejected + expired,
  };
}

export async function getAdminQuotationById(id: string) {
  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: quotationInclude,
  });
  if (!quotation) return null;
  return mapQuotationForAdmin(quotation);
}

export async function createQuotation(
  input: QuotationUpsertInput,
  actor: Pick<User, 'id' | 'fullName' | 'email'>,
) {
  const calculated = calculateQuotationTotals({
    items: input.items,
    discountType: input.discountType,
    discountValue: input.discountValue,
    taxType: input.taxType,
    taxRate: input.taxRate,
  });

  const customerId =
    input.customerId ??
    (await resolveCustomerIdByEmail(input.customerEmail));

  return prisma.$transaction(async (tx) => {
    const quotationNumber = await generateQuotationNumber(tx);

    const quotation = await tx.quotation.create({
      data: {
        quotationNumber,
        publicToken: generateQuotationPublicToken(),
        leadId: input.leadId ?? null,
        customerId,
        customerEmail: normalizeEmail(input.customerEmail),
        customerName: input.customerName,
        customerPhone: input.customerPhone ?? null,
        customerCompany: input.customerCompany ?? null,
        serviceInterest: input.serviceInterest ?? null,
        leadReference: input.leadReference ?? null,
        title: input.title,
        introduction: input.introduction ?? null,
        currency: input.currency,
        subtotal: decimalToPrismaString(calculated.subtotal),
        discountType: calculated.discountType,
        discountValue: decimalToPrismaString(calculated.discountValue),
        discountAmount: decimalToPrismaString(calculated.discountAmount),
        taxType: calculated.taxType,
        taxRate: decimalToPrismaString(calculated.taxRate),
        taxAmount: decimalToPrismaString(calculated.taxAmount),
        grandTotal: decimalToPrismaString(calculated.grandTotal),
        validityDate: parseValidityDate(input.validityDate),
        status: 'DRAFT',
        internalNotes: input.internalNotes ?? null,
        customerNotes: input.customerNotes ?? null,
        termsAndConditions: input.termsAndConditions ?? null,
        createdById: actor.id,
        items: {
          create: buildItemCreateData(calculated),
        },
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: quotation.id,
      action: QUOTATION_TIMELINE_ACTIONS.CREATED,
      actorType: 'ADMIN',
      actorId: actor.id,
      actorLabel: actor.fullName || actor.email,
    });

    return mapQuotationForAdmin(quotation);
  });
}

export async function updateQuotation(
  id: string,
  input: QuotationUpsertInput,
  actor: Pick<User, 'id' | 'fullName' | 'email'>,
) {
  const existing = await prisma.quotation.findUnique({ where: { id } });
  if (!existing) {
    throw new Error('NOT_FOUND');
  }
  if (!isQuotationEditable(existing.status)) {
    throw new Error('NOT_EDITABLE');
  }

  const calculated = calculateQuotationTotals({
    items: input.items,
    discountType: input.discountType,
    discountValue: input.discountValue,
    taxType: input.taxType,
    taxRate: input.taxRate,
  });

  const customerId =
    input.customerId ??
    (await resolveCustomerIdByEmail(input.customerEmail));

  return prisma.$transaction(async (tx) => {
    await tx.quotationItem.deleteMany({ where: { quotationId: id } });

    const quotation = await tx.quotation.update({
      where: { id },
      data: {
        leadId: input.leadId ?? null,
        customerId,
        customerEmail: normalizeEmail(input.customerEmail),
        customerName: input.customerName,
        customerPhone: input.customerPhone ?? null,
        customerCompany: input.customerCompany ?? null,
        serviceInterest: input.serviceInterest ?? null,
        leadReference: input.leadReference ?? null,
        title: input.title,
        introduction: input.introduction ?? null,
        currency: input.currency,
        subtotal: decimalToPrismaString(calculated.subtotal),
        discountType: calculated.discountType,
        discountValue: decimalToPrismaString(calculated.discountValue),
        discountAmount: decimalToPrismaString(calculated.discountAmount),
        taxType: calculated.taxType,
        taxRate: decimalToPrismaString(calculated.taxRate),
        taxAmount: decimalToPrismaString(calculated.taxAmount),
        grandTotal: decimalToPrismaString(calculated.grandTotal),
        validityDate: parseValidityDate(input.validityDate),
        internalNotes: input.internalNotes ?? null,
        customerNotes: input.customerNotes ?? null,
        termsAndConditions: input.termsAndConditions ?? null,
        items: {
          create: buildItemCreateData(calculated),
        },
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: quotation.id,
      action: QUOTATION_TIMELINE_ACTIONS.UPDATED,
      actorType: 'ADMIN',
      actorId: actor.id,
      actorLabel: actor.fullName || actor.email,
    });

    return mapQuotationForAdmin(quotation);
  });
}

export async function sendQuotation(
  id: string,
  actor: Pick<User, 'id' | 'fullName' | 'email'>,
) {
  const existing = await prisma.quotation.findUnique({ where: { id } });
  if (!existing) throw new Error('NOT_FOUND');
  if (existing.status !== 'DRAFT') throw new Error('INVALID_STATUS');
  assertQuotationTransition(existing.status, 'SENT');

  const quotation = await prisma.$transaction(async (tx) => {
    const updated = await tx.quotation.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: id,
      action: QUOTATION_TIMELINE_ACTIONS.SENT,
      actorType: 'ADMIN',
      actorId: actor.id,
      actorLabel: actor.fullName || actor.email,
    });

    return updated;
  });

  await sendQuotationToCustomerEmail({
    quotationId: quotation.id,
    quotationNumber: quotation.quotationNumber,
    publicToken: quotation.publicToken,
    title: quotation.title,
    customerName: quotation.customerName,
    customerEmail: quotation.customerEmail,
    grandTotal: quotation.grandTotal.toString(),
    validityDate: quotation.validityDate,
    pdfBuffer: await generateQuotationPdfBuffer(mapQuotationForAdmin(quotation)),
  });

  return mapQuotationForAdmin(quotation);
}

export async function cancelQuotation(
  id: string,
  actor: Pick<User, 'id' | 'fullName' | 'email'>,
  note?: string,
) {
  const existing = await prisma.quotation.findUnique({ where: { id } });
  if (!existing) throw new Error('NOT_FOUND');
  if (!isQuotationCancellable(existing.status)) throw new Error('INVALID_STATUS');
  assertQuotationTransition(existing.status, 'CANCELLED');

  const quotation = await prisma.$transaction(async (tx) => {
    const updated = await tx.quotation.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: id,
      action: QUOTATION_TIMELINE_ACTIONS.CANCELLED,
      actorType: 'ADMIN',
      actorId: actor.id,
      actorLabel: actor.fullName || actor.email,
      note: note ?? null,
    });

    return updated;
  });

  return mapQuotationForAdmin(quotation);
}

async function expireQuotationIfNeeded(
  quotation: { id: string; status: QuotationStatus; validityDate: Date },
) {
  if (
    (quotation.status === 'SENT' || quotation.status === 'VIEWED') &&
    isQuotationExpiredByDate(quotation.validityDate)
  ) {
    await prisma.$transaction(async (tx) => {
      await tx.quotation.update({
        where: { id: quotation.id },
        data: { status: 'EXPIRED' },
      });
      await appendTimeline(tx, {
        quotationId: quotation.id,
        action: QUOTATION_TIMELINE_ACTIONS.EXPIRED,
        actorType: 'SYSTEM',
        actorLabel: 'System',
      });
    });
    return 'EXPIRED' as const;
  }
  return quotation.status;
}

export async function listCustomerQuotations(user: Pick<User, 'id' | 'email'>) {
  const rows = await prisma.quotation.findMany({
    where: {
      OR: [
        { customerId: user.id },
        { customerEmail: normalizeEmail(user.email) },
      ],
      status: { notIn: ['DRAFT', 'CANCELLED'] },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const results = [];
  for (const row of rows) {
    const status = await expireQuotationIfNeeded(row);
    results.push({
      ...mapQuotationListRow({ ...row, status }),
      status,
    });
  }
  return results;
}

export async function getCustomerQuotationById(
  id: string,
  user: Pick<User, 'id' | 'email'>,
) {
  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: quotationInclude,
  });
  if (!quotation) return null;

  const owns =
    (quotation.customerId && quotation.customerId === user.id) ||
    normalizeEmail(quotation.customerEmail) === normalizeEmail(user.email);

  if (!owns || quotation.status === 'DRAFT' || quotation.status === 'CANCELLED') {
    return null;
  }

  const status = await expireQuotationIfNeeded(quotation);
  if (status !== quotation.status) {
    const refreshed = await prisma.quotation.findUnique({
      where: { id },
      include: quotationInclude,
    });
    if (!refreshed) return null;
    return mapQuotationForCustomer(refreshed);
  }

  return mapQuotationForCustomer(quotation);
}

export async function recordCustomerQuotationView(
  id: string,
  user: Pick<User, 'id' | 'email' | 'fullName'>,
) {
  const quotation = await prisma.quotation.findUnique({ where: { id } });
  if (!quotation) throw new Error('NOT_FOUND');

  const owns =
    (quotation.customerId && quotation.customerId === user.id) ||
    normalizeEmail(quotation.customerEmail) === normalizeEmail(user.email);
  if (!owns) throw new Error('FORBIDDEN');

  let status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') return { recorded: false, status };

  if (quotation.status === 'SENT' && !quotation.viewedAt) {
    await prisma.$transaction(async (tx) => {
      await tx.quotation.update({
        where: { id },
        data: {
          status: 'VIEWED',
          viewedAt: new Date(),
        },
      });
      await appendTimeline(tx, {
        quotationId: id,
        action: QUOTATION_TIMELINE_ACTIONS.VIEWED,
        actorType: 'CUSTOMER',
        actorId: user.id,
        actorLabel: user.fullName || user.email,
      });
    });
    status = 'VIEWED';
    return { recorded: true, status };
  }

  return { recorded: false, status: quotation.status };
}

export async function acceptCustomerQuotation(
  id: string,
  user: Pick<User, 'id' | 'email' | 'fullName'>,
) {
  const quotation = await prisma.quotation.findUnique({ where: { id } });
  if (!quotation) throw new Error('NOT_FOUND');

  const owns =
    (quotation.customerId && quotation.customerId === user.id) ||
    normalizeEmail(quotation.customerEmail) === normalizeEmail(user.email);
  if (!owns) throw new Error('FORBIDDEN');

  const status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') throw new Error('EXPIRED');
  if (!isQuotationRespondable(quotation.status)) throw new Error('INVALID_STATUS');
  assertQuotationTransition(quotation.status, 'ACCEPTED');

  const updated = await prisma.$transaction(async (tx) => {
    const current = await tx.quotation.findUnique({ where: { id } });
    if (!current || !isQuotationRespondable(current.status)) {
      throw new Error('INVALID_STATUS');
    }

    const row = await tx.quotation.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: id,
      action: QUOTATION_TIMELINE_ACTIONS.ACCEPTED,
      actorType: 'CUSTOMER',
      actorId: user.id,
      actorLabel: user.fullName || user.email,
    });

    return row;
  });

  await notifyAdminQuotationResponseEmail({
    quotationNumber: updated.quotationNumber,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    action: 'accepted',
  });

  return mapQuotationForCustomer(updated);
}

export async function rejectCustomerQuotation(
  id: string,
  user: Pick<User, 'id' | 'email' | 'fullName'>,
  reason: string,
) {
  const quotation = await prisma.quotation.findUnique({ where: { id } });
  if (!quotation) throw new Error('NOT_FOUND');

  const owns =
    (quotation.customerId && quotation.customerId === user.id) ||
    normalizeEmail(quotation.customerEmail) === normalizeEmail(user.email);
  if (!owns) throw new Error('FORBIDDEN');

  const status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') throw new Error('EXPIRED');
  if (!isQuotationRespondable(quotation.status)) throw new Error('INVALID_STATUS');
  assertQuotationTransition(quotation.status, 'REJECTED');

  const updated = await prisma.$transaction(async (tx) => {
    const current = await tx.quotation.findUnique({ where: { id } });
    if (!current || !isQuotationRespondable(current.status)) {
      throw new Error('INVALID_STATUS');
    }

    const row = await tx.quotation.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason: reason,
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: id,
      action: QUOTATION_TIMELINE_ACTIONS.REJECTED,
      actorType: 'CUSTOMER',
      actorId: user.id,
      actorLabel: user.fullName || user.email,
      note: reason,
    });

    return row;
  });

  await notifyAdminQuotationResponseEmail({
    quotationNumber: updated.quotationNumber,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    action: 'rejected',
    reason,
  });

  return mapQuotationForCustomer(updated);
}

export async function getLatestCustomerQuotationSummary(
  user: Pick<User, 'id' | 'email'>,
) {
  const rows = await listCustomerQuotations(user);
  const pending = rows.find(
    (row) => row.status === 'SENT' || row.status === 'VIEWED',
  );
  return {
    latest: rows[0] ?? null,
    pending,
    total: rows.length,
  };
}

export async function getAdminQuotationPdfBuffer(id: string): Promise<Buffer> {
  const quotation = await getAdminQuotationById(id);
  if (!quotation) {
    throw new Error('NOT_FOUND');
  }
  return generateQuotationPdfBuffer(quotation);
}

export async function recordAdminQuotationPreview(
  id: string,
  actor: Pick<User, 'id' | 'fullName' | 'email'>,
) {
  const existing = await prisma.quotation.findUnique({ where: { id } });
  if (!existing) throw new Error('NOT_FOUND');

  await prisma.quotationTimelineEvent.create({
    data: {
      quotationId: id,
      action: QUOTATION_TIMELINE_ACTIONS.PREVIEWED,
      actorType: 'ADMIN',
      actorId: actor.id,
      actorLabel: actor.fullName || actor.email,
    },
  });

  return { ok: true };
}

export async function getPublicQuotationByToken(publicToken: string) {
  const quotation = await prisma.quotation.findUnique({
    where: { publicToken },
    include: quotationInclude,
  });
  if (!quotation) return null;
  if (quotation.status === 'DRAFT' || quotation.status === 'CANCELLED') {
    return null;
  }

  const status = await expireQuotationIfNeeded(quotation);
  if (status !== quotation.status) {
    const refreshed = await prisma.quotation.findUnique({
      where: { publicToken },
      include: quotationInclude,
    });
    if (!refreshed) return null;
    return mapQuotationForCustomer(refreshed);
  }

  return mapQuotationForCustomer(quotation);
}

export async function recordPublicQuotationView(publicToken: string) {
  const quotation = await prisma.quotation.findUnique({ where: { publicToken } });
  if (!quotation) throw new Error('NOT_FOUND');
  if (quotation.status === 'DRAFT' || quotation.status === 'CANCELLED') {
    throw new Error('FORBIDDEN');
  }

  let status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') return { recorded: false, status };

  if (quotation.status === 'SENT' && !quotation.viewedAt) {
    await prisma.$transaction(async (tx) => {
      await tx.quotation.update({
        where: { id: quotation.id },
        data: {
          status: 'VIEWED',
          viewedAt: new Date(),
        },
      });
      await appendTimeline(tx, {
        quotationId: quotation.id,
        action: QUOTATION_TIMELINE_ACTIONS.VIEWED,
        actorType: 'CUSTOMER',
        actorLabel: quotation.customerName,
      });
    });
    return { recorded: true, status: 'VIEWED' as const };
  }

  return { recorded: false, status: quotation.status };
}

export async function acceptPublicQuotation(publicToken: string) {
  const quotation = await prisma.quotation.findUnique({ where: { publicToken } });
  if (!quotation) throw new Error('NOT_FOUND');
  if (quotation.status === 'DRAFT' || quotation.status === 'CANCELLED') {
    throw new Error('FORBIDDEN');
  }

  const status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') throw new Error('EXPIRED');
  if (!isQuotationRespondable(quotation.status)) throw new Error('INVALID_STATUS');
  assertQuotationTransition(quotation.status, 'ACCEPTED');

  const updated = await prisma.$transaction(async (tx) => {
    const current = await tx.quotation.findUnique({ where: { publicToken } });
    if (!current || !isQuotationRespondable(current.status)) {
      throw new Error('INVALID_STATUS');
    }

    const row = await tx.quotation.update({
      where: { id: current.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: current.id,
      action: QUOTATION_TIMELINE_ACTIONS.ACCEPTED,
      actorType: 'CUSTOMER',
      actorLabel: quotation.customerName,
    });

    return row;
  });

  await notifyAdminQuotationResponseEmail({
    quotationNumber: updated.quotationNumber,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    action: 'accepted',
  });

  return mapQuotationForCustomer(updated);
}

export async function rejectPublicQuotation(publicToken: string, reason: string) {
  const quotation = await prisma.quotation.findUnique({ where: { publicToken } });
  if (!quotation) throw new Error('NOT_FOUND');
  if (quotation.status === 'DRAFT' || quotation.status === 'CANCELLED') {
    throw new Error('FORBIDDEN');
  }

  const status = await expireQuotationIfNeeded(quotation);
  if (status === 'EXPIRED') throw new Error('EXPIRED');
  if (!isQuotationRespondable(quotation.status)) throw new Error('INVALID_STATUS');
  assertQuotationTransition(quotation.status, 'REJECTED');

  const updated = await prisma.$transaction(async (tx) => {
    const current = await tx.quotation.findUnique({ where: { publicToken } });
    if (!current || !isQuotationRespondable(current.status)) {
      throw new Error('INVALID_STATUS');
    }

    const row = await tx.quotation.update({
      where: { id: current.id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason: reason,
      },
      include: quotationInclude,
    });

    await appendTimeline(tx, {
      quotationId: current.id,
      action: QUOTATION_TIMELINE_ACTIONS.REJECTED,
      actorType: 'CUSTOMER',
      actorLabel: quotation.customerName,
      note: reason,
    });

    return row;
  });

  await notifyAdminQuotationResponseEmail({
    quotationNumber: updated.quotationNumber,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    action: 'rejected',
    reason,
  });

  return mapQuotationForCustomer(updated);
}
