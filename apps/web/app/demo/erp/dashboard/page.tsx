'use client';

import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import {
  BarChart,
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  HorizontalBars,
  StatusBadge,
} from '@/components/demo/erp/ui';
import { useErpDemoAuth } from '@/lib/demo/erp/auth-context';
import {
  demoDashboardStats,
  demoDeals,
  demoPipelineChart,
  demoSalesChart,
  demoTasks,
  formatInr,
} from '@/lib/demo/erp/mock-data';

export default function ErpDashboardPage() {
  const { session } = useErpDemoAuth();
  const role = session?.role ?? 'admin';
  const stats = demoDashboardStats[role];
  const openDeals = demoDeals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const openTasks = demoTasks.filter((t) => t.status !== 'done').slice(0, 4);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Dashboard"
        description={`Welcome, ${session?.name}. Role-aware enterprise overview with mock charts and operational queues.`}
        actions={
          <>
            <Link href="/demo/erp/pipeline" className={cn(buttonVariants({ size: 'sm' }), 'justify-center')}>
              Open pipeline
            </Link>
            <Link
              href="/demo/erp/tasks"
              className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'justify-center')}
            >
              View tasks
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DemoStatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DemoCard title="Sales trend" description="Monthly booked revenue in lakhs (mock).">
          <BarChart data={demoSalesChart} />
        </DemoCard>
        <DemoCard title="Pipeline value" description="Open stage totals (mock).">
          <HorizontalBars data={demoPipelineChart} />
        </DemoCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard
          title="Open deals"
          description="Active opportunities in the CRM pipeline."
          action={
            <Link href="/demo/erp/deals" className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline">
              View all
            </Link>
          }
        >
          <ul className="space-y-3">
            {openDeals.map((deal) => (
              <li key={deal.id} className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-3">
                <div>
                  <p className="font-medium text-uv-foreground">{deal.name}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {deal.customer} · {deal.stage}
                  </p>
                </div>
                <p className="font-semibold text-uv-brand">{formatInr(deal.value)}</p>
              </li>
            ))}
          </ul>
        </DemoCard>
        <DemoCard title="Task queue" description="Work items for this demo session.">
          <ul className="space-y-3">
            {openTasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-3">
                <div>
                  <p className="font-medium text-uv-foreground">{task.title}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {task.dueDate} · {task.owner}
                  </p>
                </div>
                <StatusBadge status={task.priority} />
              </li>
            ))}
          </ul>
        </DemoCard>
      </div>
    </div>
  );
}
