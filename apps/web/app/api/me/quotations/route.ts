import { NextResponse } from 'next/server';

import { ensureDbUser } from '@/lib/auth/server-user';
import { listCustomerQuotations } from '@/lib/quotations/service';

export const runtime = 'nodejs';

export async function GET() {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const quotations = await listCustomerQuotations(user);
  return NextResponse.json({ ok: true, quotations });
}
