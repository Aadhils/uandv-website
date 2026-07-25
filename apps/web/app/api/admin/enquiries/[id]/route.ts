import { NextResponse } from 'next/server';

import {
  getAdminActorLabel,
  requireAdminUserApi,
} from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { adminEnquiryUpdateSchema } from '@/lib/enquiries/admin-schema';
import {
  buildStatusChangeTimeline,
  ensureEnquiryTimelineSeed,
  mapEnquiryDetail,
} from '@/lib/enquiries/admin';
import { ENQUIRY_STATUS_LABELS } from '@/lib/enquiries/status';

export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { id } = await context.params;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });

  if (!enquiry) {
    return NextResponse.json({ ok: false, error: 'Lead not found.' }, { status: 404 });
  }

  await ensureEnquiryTimelineSeed(prisma, enquiry);

  const detail = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      timelineEvents: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!detail) {
    return NextResponse.json({ ok: false, error: 'Lead not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, enquiry: mapEnquiryDetail(detail) });
}

export async function PATCH(request: Request, context: RouteContext) {
  let admin;
  try {
    admin = await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { id } = await context.params;
  const existing = await prisma.enquiry.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ ok: false, error: 'Lead not found.' }, { status: 404 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = adminEnquiryUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid update payload.' },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const actorLabel = getAdminActorLabel(admin);
  const timelineCreates: Array<{
    type: string;
    title: string;
    body?: string;
    actorLabel?: string;
  }> = [];

  if (data.status && data.status !== existing.status) {
    timelineCreates.push(
      buildStatusChangeTimeline({
        from: existing.status,
        to: data.status,
        actorLabel,
      }),
    );
  }

  const nextNotes =
    data.internalNotes === undefined
      ? existing.internalNotes
      : data.internalNotes?.trim() || null;

  if (
    data.internalNotes !== undefined &&
    (nextNotes ?? '') !== (existing.internalNotes ?? '')
  ) {
    timelineCreates.push({
      type: 'note',
      title: 'Internal notes updated',
      body: nextNotes ?? 'Notes cleared.',
      actorLabel,
    });
  }

  const nextFollowUp =
    data.followUpDate === undefined
      ? existing.followUpDate
      : data.followUpDate
        ? new Date(data.followUpDate)
        : null;

  if (
    data.followUpDate !== undefined &&
    (nextFollowUp?.toISOString() ?? null) !==
      (existing.followUpDate?.toISOString() ?? null)
  ) {
    timelineCreates.push({
      type: 'follow_up',
      title: nextFollowUp ? 'Follow-up date set' : 'Follow-up date cleared',
      body: nextFollowUp
        ? new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(nextFollowUp)
        : undefined,
      actorLabel,
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.enquiry.update({
      where: { id },
      data: {
        ...(data.status ? { status: data.status } : {}),
        ...(data.internalNotes !== undefined
          ? { internalNotes: nextNotes }
          : {}),
        ...(data.followUpDate !== undefined
          ? { followUpDate: nextFollowUp }
          : {}),
      },
    });

    for (const event of timelineCreates) {
      await tx.enquiryTimelineEvent.create({
        data: {
          enquiryId: id,
          type: event.type,
          title: event.title,
          body: event.body,
          actorLabel: event.actorLabel,
        },
      });
    }
  });

  const detail = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      timelineEvents: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!detail) {
    return NextResponse.json({ ok: false, error: 'Lead not found.' }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    enquiry: mapEnquiryDetail(detail),
    message:
      data.status && data.status !== existing.status
        ? `Status set to ${ENQUIRY_STATUS_LABELS[data.status]}.`
        : 'Lead updated.',
  });
}
