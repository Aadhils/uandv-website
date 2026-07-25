import { NextResponse } from 'next/server';

import { ensureDbUser } from '@/lib/auth/server-user';
import { getCustomerQuotationById } from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const quotation = await getCustomerQuotationById(id, user);
  if (!quotation) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, quotation });
}
