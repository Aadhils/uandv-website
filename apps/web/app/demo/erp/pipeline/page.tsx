'use client';

import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/erp/ui';
import { demoDeals, formatInr } from '@/lib/demo/erp/mock-data';

const stages = ['qualification', 'proposal', 'negotiation', 'won', 'lost'] as const;

export default function ErpPipelinePage() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Pipeline" description="Kanban-style CRM stages with mock deal cards." />
      <div className="grid gap-4 xl:grid-cols-5">
        {stages.map((stage) => {
          const cards = demoDeals.filter((d) => d.stage === stage);
          return (
            <DemoCard key={stage} title={stage} description={`${cards.length} deals`}>
              <div className="space-y-3">
                {cards.map((deal) => (
                  <article key={deal.id} className="rounded-uv-xl border border-uv-border bg-uv-background-subtle p-3">
                    <p className="font-medium text-uv-foreground">{deal.name}</p>
                    <p className="mt-1 text-xs text-uv-foreground-muted">{deal.customer}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-uv-brand">{formatInr(deal.value)}</p>
                      <StatusBadge status={`${deal.probability}%`} />
                    </div>
                  </article>
                ))}
                {!cards.length ? <p className="text-sm text-uv-foreground-muted">No deals</p> : null}
              </div>
            </DemoCard>
          );
        })}
      </div>
    </div>
  );
}
