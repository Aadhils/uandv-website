import { Badge, Card, CardContent, CardHeader, CardTitle } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  LEAD_PIPELINE_LABELS,
  LEAD_PIPELINE_ORDER,
  getLeadsByStage,
} from '@/lib/crm';

export function LeadPipelinePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Lead Pipeline"
        description="New → Contacted → Interested → Meeting → Proposal → Negotiation → Won → Customer. Demo board only."
      />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {LEAD_PIPELINE_ORDER.map((stage) => {
          const leads = getLeadsByStage(stage);
          return (
            <section
              key={stage}
              aria-label={LEAD_PIPELINE_LABELS[stage]}
              className="w-[16.5rem] shrink-0"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-uv-foreground">
                  {LEAD_PIPELINE_LABELS[stage]}
                </h2>
                <Badge variant="secondary">{leads.length}</Badge>
              </div>
              <div className="space-y-3">
                {leads.length === 0 ? (
                  <p className="rounded-uv-lg border border-dashed border-uv-border px-3 py-6 text-center text-xs text-uv-foreground-muted">
                    No leads
                  </p>
                ) : (
                  leads.map((lead) => (
                    <Card key={lead.id} padding="none">
                      <CardHeader className="space-y-1 p-3 pb-0">
                        <CardTitle className="text-sm">{lead.name}</CardTitle>
                        <p className="text-xs text-uv-foreground-muted">
                          {lead.company}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-2 p-3 pt-2">
                        <p className="text-xs text-uv-foreground-muted">
                          {lead.interestedService}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {lead.isHot ? (
                            <Badge variant="warning">Hot</Badge>
                          ) : null}
                          <Badge variant="outline">{lead.assignedEmployee}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-xs text-uv-foreground-subtle">
        Lost leads are tracked separately and not shown on the active pipeline
        board.
      </p>
    </div>
  );
}
