import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { adminEnquiryListQuerySchema } from '@/lib/enquiries/admin-schema';
import {
  buildAdminEnquiryWhere,
  mapEnquiryListRows,
} from '@/lib/enquiries/admin';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { searchParams } = new URL(request.url);
  const parsed = adminEnquiryListQuerySchema.safeParse({
    q: searchParams.get('q') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    service: searchParams.get('service') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid query parameters.' },
      { status: 400 },
    );
  }

  const filters = parsed.data;
  const enquiries = await prisma.enquiry.findMany({
    where: buildAdminEnquiryWhere(filters),
    orderBy: { createdAt: filters.sort },
    take: 500,
  });

  return NextResponse.json({
    ok: true,
    enquiries: mapEnquiryListRows(enquiries),
  });
}
