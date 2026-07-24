import { NextResponse } from 'next/server';

import { ensureDbUser } from '@/lib/auth/server-user';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const user = await ensureDbUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = await prisma.enquiry.findMany({
      where: {
        OR: [{ userId: user.id }, { email: user.email }],
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        reference: true,
        serviceInterest: true,
        status: true,
        source: true,
        createdAt: true,
        message: true,
        company: true,
      },
    });

    return NextResponse.json({ enquiries });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
