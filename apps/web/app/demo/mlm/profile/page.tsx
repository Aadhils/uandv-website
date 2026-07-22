'use client';

import { Input } from '@uandv/ui';

import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/mlm/ui';
import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import { demoAdminUser, demoCurrentUser } from '@/lib/demo/mlm/mock-data';

export default function MlmProfilePage() {
  const { session } = useMlmDemoAuth();
  const isAdmin = session?.role === 'admin';
  const profile = isAdmin
    ? {
        id: demoAdminUser.id,
        name: demoAdminUser.name,
        email: demoAdminUser.email,
        phone: '—',
        rank: demoAdminUser.rank,
        status: 'active' as const,
        joinDate: '2025-01-01',
        avatarInitials: demoAdminUser.avatarInitials,
      }
    : demoCurrentUser;

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Member Profile"
        description={
          isAdmin
            ? 'Admin profile details for this demo session.'
            : 'Member profile details for the signed-in demo account.'
        }
      />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <DemoCard>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-uv-brand-muted text-2xl font-bold text-uv-brand">
              {profile.avatarInitials}
            </div>
            <p className="mt-4 text-lg font-semibold text-uv-foreground">{profile.name}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{profile.rank}</p>
            <div className="mt-3">
              <StatusBadge status={isAdmin ? 'admin' : profile.status} />
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Profile details" description="Editable fields are local-only in this demo.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-uv-foreground">
              Full name
              <Input className="mt-2" defaultValue={profile.name} />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              {isAdmin ? 'Admin ID' : 'Member ID'}
              <Input className="mt-2" defaultValue={profile.id} readOnly />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              Email
              <Input className="mt-2" defaultValue={profile.email} />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              Phone
              <Input className="mt-2" defaultValue={profile.phone} />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              Join date
              <Input className="mt-2" defaultValue={profile.joinDate} readOnly />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              Rank / role
              <Input className="mt-2" defaultValue={profile.rank} readOnly />
            </label>
          </div>
          <p className="mt-4 text-sm text-uv-foreground-muted">
            Saving is simulated. No backend profile API is connected yet.
          </p>
        </DemoCard>
      </div>
    </div>
  );
}
