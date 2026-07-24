import { NextResponse } from 'next/server';

import { displayName, ensureDbUser } from '@/lib/auth/server-user';
import { prisma } from '@/lib/db';
import { profileUpdateSchema } from '@/lib/enquiries/schema';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const user = await ensureDbUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.customerProfile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: displayName(user),
        mobile: user.mobile,
        accountType: user.accountType,
      },
      profile: {
        companyName: profile?.companyName ?? '',
        city: profile?.city ?? '',
        state: profile?.state ?? '',
        businessType: profile?.businessType ?? '',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await ensureDbUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.accountType !== 'CUSTOMER') {
      return NextResponse.json(
        { error: 'Profile editing is available for customer accounts.' },
        { status: 403 },
      );
    }

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = profileUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please check your profile fields and try again.' },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: data.fullName,
        mobile: data.mobile || null,
      },
    });

    const profile = await prisma.customerProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        companyName: data.companyName || null,
        city: data.city || null,
        state: data.state || null,
        businessType: data.businessType || null,
      },
      update: {
        companyName: data.companyName || null,
        city: data.city || null,
        state: data.state || null,
        businessType: data.businessType || null,
      },
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: data.fullName,
        mobile: data.mobile || '',
        accountType: user.accountType,
      },
      profile: {
        companyName: profile.companyName ?? '',
        city: profile.city ?? '',
        state: profile.state ?? '',
        businessType: profile.businessType ?? '',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
