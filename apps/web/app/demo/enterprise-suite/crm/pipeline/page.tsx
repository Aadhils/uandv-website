'use client';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoDeals, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
const stages = ['qualification','proposal','negotiation','won','lost'] as const;
export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Sales Pipeline" description="Kanban stages with mock deal cards." />
      <div className="grid gap-4 xl:grid-cols-5">
        {stages.map((stage) => {
          const cards = demoDeals.filter((d) => d.stage === stage);
          return (
            <DemoCard key={stage} title={stage} description={`${cards.length} deals`}>
              <div className="space-y-3">
                {cards.map((deal) => (
                  <article key={deal.id} className="rounded-uv-xl border border-uv-border bg-uv-background-subtle p-3">
                    <p className="font-medium">{deal.name}</p>
                    <p className="mt-1 text-xs text-uv-foreground-muted">{deal.customer}</p>
                    <div className="mt-3 flex items-center justify-between"><p className="text-sm font-semibold text-uv-brand">{formatInr(deal.value)}</p><StatusBadge status={`${deal.probability}%`} /></div>
                  </article>
                ))}
              </div>
            </DemoCard>
          );
        })}
      </div>
    </div>
  );
}
