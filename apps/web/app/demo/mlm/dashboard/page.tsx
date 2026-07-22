'use client';

import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { DemoCard, DemoPageHeader, DemoStatCard, StatusBadge } from '@/components/demo/mlm/ui';
import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import {
  demoAdminStats,
  demoCommissions,
  demoCurrentUser,
  demoDashboardStats,
  demoNotifications,
  demoWallet,
  demoWithdrawRequests,
  formatInr,
} from '@/lib/demo/mlm/mock-data';

export default function MlmDashboardPage() {
  const { session } = useMlmDemoAuth();
  const isAdmin = session?.role === 'admin';
  const stats = isAdmin ? demoAdminStats : demoDashboardStats;
  const recent = demoCommissions.slice(0, 4);
  const unread = demoNotifications.filter((item) => !item.read).length;
  const pendingWithdrawals = demoWithdrawRequests.filter(
    (item) => item.status === 'pending',
  ).length;

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Dashboard"
        description={
          isAdmin
            ? `Welcome, ${session?.name}. Review network operations, KYC, withdrawals, and commerce activity.`
            : `Welcome back, ${demoCurrentUser.name}. Explore your team, wallet, and earnings with interactive mock data.`
        }
        actions={
          isAdmin ? (
            <>
              <Link
                href="/demo/mlm/kyc"
                className={cn(buttonVariants({ size: 'sm' }), 'justify-center')}
              >
                Review KYC
              </Link>
              <Link
                href="/demo/mlm/withdraw"
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'justify-center',
                )}
              >
                Withdrawals ({pendingWithdrawals})
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/demo/mlm/referral"
                className={cn(buttonVariants({ size: 'sm' }), 'justify-center')}
              >
                Referral tree
              </Link>
              <Link
                href="/demo/mlm/wallet"
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'justify-center',
                )}
              >
                Open wallet
              </Link>
            </>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DemoStatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard
          title={isAdmin ? 'Operations snapshot' : 'Account snapshot'}
          description={
            isAdmin
              ? 'High-level controls available in this admin demo session.'
              : 'Current member profile used across this demo.'
          }
        >
          {isAdmin ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ['Role', 'Platform Admin'],
                ['Admin ID', session?.memberId ?? 'ADMIN01'],
                ['Unread alerts', String(unread)],
                ['Pending withdrawals', String(pendingWithdrawals)],
                ['Demo network root', demoCurrentUser.id],
                ['Wallet sample', formatInr(demoWallet.availableBalance)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-uv-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ['Member ID', demoCurrentUser.id],
                ['Rank', demoCurrentUser.rank],
                ['Personal volume', String(demoCurrentUser.personalVolume)],
                ['Direct referrals', String(demoCurrentUser.referrals)],
                ['Left volume', demoCurrentUser.leftVolume.toLocaleString('en-IN')],
                ['Right volume', demoCurrentUser.rightVolume.toLocaleString('en-IN')],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-uv-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </DemoCard>

        <DemoCard
          title="Recent commissions"
          description="Latest payout events from mock commission history."
          action={
            <Link
              href="/demo/mlm/commissions"
              className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
            >
              View all
            </Link>
          }
        >
          <ul className="space-y-3">
            {recent.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-3"
              >
                <div>
                  <p className="font-medium text-uv-foreground">{item.type}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {item.date} · {item.fromMember}
                  </p>
                </div>
                <p className="font-semibold text-uv-brand">{formatInr(item.amount)}</p>
              </li>
            ))}
          </ul>
        </DemoCard>
      </div>

      <DemoCard
        title={isAdmin ? 'Quick modules' : 'Wallet overview'}
        description={
          isAdmin
            ? 'Jump into the core MLM modules in this interactive demo.'
            : 'Balances available in the demo e-wallet.'
        }
      >
        {isAdmin ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Downline List', '/demo/mlm/downline'],
              ['E-Pin', '/demo/mlm/epin'],
              ['Products', '/demo/mlm/products'],
              ['Orders', '/demo/mlm/orders'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-uv-xl border border-uv-border bg-uv-background-subtle px-4 py-4 text-sm font-semibold text-uv-foreground transition-colors hover:border-uv-brand/40 hover:text-uv-brand"
              >
                {label}
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-uv-xl bg-uv-background-subtle p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
                Available
              </p>
              <p className="mt-2 text-xl font-bold text-uv-foreground">
                {formatInr(demoWallet.availableBalance)}
              </p>
            </div>
            <div className="rounded-uv-xl bg-uv-background-subtle p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
                Pending
              </p>
              <p className="mt-2 text-xl font-bold text-uv-foreground">
                {formatInr(demoWallet.pendingBalance)}
              </p>
            </div>
            <div className="rounded-uv-xl bg-uv-background-subtle p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
                Lifetime
              </p>
              <p className="mt-2 text-xl font-bold text-uv-foreground">
                {formatInr(demoWallet.lifetimeEarnings)}
              </p>
            </div>
          </div>
        )}
      </DemoCard>

      {!isAdmin ? (
        <DemoCard title="Alerts" description="Unread notifications for this member session.">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={unread > 0 ? 'pending' : 'completed'} />
            <p className="text-sm text-uv-foreground-muted">
              {unread} unread notification{unread === 1 ? '' : 's'}
            </p>
            <Link
              href="/demo/mlm/notifications"
              className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
            >
              Open notifications
            </Link>
          </div>
        </DemoCard>
      ) : null}
    </div>
  );
}
