import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsCard,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  BUSINESS_CATEGORY_LABELS,
  BUSINESS_STAGE_LABELS,
  PHASE_LABELS,
  formatAdvisorBudget,
  type BusinessAnalysis,
} from '@/lib/business-advisor';

function Checklist({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-uv-foreground-muted">{empty}</p>;
  }
  return (
    <ul className="space-y-2" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-uv-foreground"
        >
          <span
            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-uv-brand"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

type AnalysisReportProps = {
  analysis: BusinessAnalysis;
  showInternal?: boolean;
};

/** Shared structured requirement report for customer + admin views. */
export function AnalysisReport({
  analysis,
  showInternal = false,
}: AnalysisReportProps) {
  const phases = ([1, 2, 3, 4, 5, 6] as const).map((phase) => ({
    phase,
    label: PHASE_LABELS[phase],
    tasks: analysis.actionPlan.filter((t) => t.phase === phase),
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Category"
          value={BUSINESS_CATEGORY_LABELS[analysis.businessCategory]}
          icon="Briefcase"
        />
        <StatsCard
          label="Stage"
          value={BUSINESS_STAGE_LABELS[analysis.businessStage]}
          icon="Workflow"
        />
        <StatsCard
          label="Priority"
          value={analysis.priority}
          icon="CircleAlert"
        />
        <StatsCard
          label="Risk"
          value={analysis.riskLevel}
          icon="TrendingUp"
        />
      </div>

      <Card padding="none">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base">Requirement summary</CardTitle>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={analysis.priority} />
            <StatusBadge status={analysis.riskLevel} label={`Risk: ${analysis.riskLevel}`} />
            {showInternal ? <StatusBadge status={analysis.reviewStatus} /> : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-uv-foreground">
            {analysis.summary}
          </p>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-uv-foreground-subtle">Business intent</dt>
              <dd className="mt-1 font-medium text-uv-foreground">
                {analysis.businessIntent}
              </dd>
            </div>
            <div>
              <dt className="text-uv-foreground-subtle">Primary objective</dt>
              <dd className="mt-1 font-medium text-uv-foreground">
                {analysis.primaryObjective}
              </dd>
            </div>
            <div>
              <dt className="text-uv-foreground-subtle">Estimated budget</dt>
              <dd className="mt-1 font-medium text-uv-foreground">
                {formatAdvisorBudget(analysis.estimatedBudgetInr)}
              </dd>
            </div>
            <div>
              <dt className="text-uv-foreground-subtle">Estimated timeline</dt>
              <dd className="mt-1 font-medium text-uv-foreground">
                {analysis.estimatedTimelineWeeks} weeks
              </dd>
            </div>
          </dl>
          <ProgressBar
            value={analysis.goalConfidence}
            label="Goal confidence"
          />
          <div className="rounded-uv-lg border border-uv-border bg-uv-background-muted/40 px-3 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
              Next best action
            </p>
            <p className="mt-1 text-sm text-uv-foreground">
              {analysis.nextBestAction}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Opportunity engine</CardTitle>
        </CardHeader>
        <CardContent>
          {analysis.opportunities.length === 0 ? (
            <p className="text-sm text-uv-foreground-muted">
              No cross-sell opportunities detected for this goal.
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {analysis.opportunities.map((opp) => (
                <li
                  key={opp.id}
                  className="rounded-uv-lg border border-uv-border p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-uv-foreground">{opp.title}</p>
                    <Badge variant="info">{opp.opportunityScore}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-uv-foreground-muted">
                    {opp.reason}
                  </p>
                  <p className="mt-2 text-sm text-uv-foreground">
                    Suggest: {opp.recommendedService}
                  </p>
                  <div className="mt-3">
                    <ProgressBar
                      value={opp.opportunityScore}
                      label="Opportunity score"
                      size="sm"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Required registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.requiredRegistrations}
              empty="No registrations recommended yet."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Required licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.requiredLicenses}
              empty="No licenses flagged for this category."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Recommended services</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.recommendedServices}
              empty="No services recommended."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Suggested software</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.suggestedSoftware}
              empty="No software suggestions."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Partner categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.suggestedPartnerCategories.map((c) =>
                c.replace(/_/g, ' '),
              )}
              empty="No partner categories suggested."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Required documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.requiredDocuments}
              empty="No documents listed."
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.riskIndicators}
              empty="No material risks flagged."
            />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Missing information</CardTitle>
          </CardHeader>
          <CardContent>
            <Checklist
              items={analysis.missingInformation}
              empty="All key fields provided."
            />
          </CardContent>
        </Card>
      </div>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Recommended action plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="relative space-y-0 border-l border-uv-border pl-5">
            {phases.map(({ phase, label, tasks }) => (
              <li key={phase} className="relative pb-4 last:pb-0">
                <span
                  className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background"
                  aria-hidden
                />
                <details className="group rounded-uv-lg border border-uv-border open:bg-uv-background-muted/30">
                  <summary className="cursor-pointer list-none px-3 py-3 marker:content-none">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">Phase {phase}</Badge>
                      <span className="font-medium text-uv-foreground">
                        {label}
                      </span>
                      <span className="text-xs text-uv-foreground-subtle">
                        {tasks.length} tasks
                      </span>
                    </div>
                  </summary>
                  <div className="space-y-3 border-t border-uv-border px-3 py-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-uv-md border border-uv-border/80 p-3"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-uv-foreground">
                            {task.taskName}
                          </p>
                          <StatusBadge status={task.priority} />
                          <StatusBadge status={task.status} />
                        </div>
                        <p className="mt-1 text-sm text-uv-foreground-muted">
                          {task.description}
                        </p>
                        <dl className="mt-2 grid gap-1 text-xs text-uv-foreground-subtle sm:grid-cols-2">
                          <div>
                            Duration: {task.estimatedDurationDays} days
                          </div>
                          <div>Owner: {task.suggestedOwner.replace(/_/g, ' ')}</div>
                          <div>
                            Partner:{' '}
                            {task.suggestedPartnerCategory
                              ? task.suggestedPartnerCategory.replace(/_/g, ' ')
                              : '—'}
                          </div>
                          <div>
                            Depends on:{' '}
                            {task.dependencies.length
                              ? task.dependencies.join(', ')
                              : 'None'}
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {showInternal ? (
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Internal review snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-uv-foreground-subtle">Assigned employee: </span>
              {analysis.assignedEmployeeName ?? 'Unassigned'}
            </p>
            <p>
              <span className="text-uv-foreground-subtle">Assigned partner: </span>
              {analysis.assignedPartnerName ?? 'Unassigned'}
            </p>
            <p>
              <span className="text-uv-foreground-subtle">Notes: </span>
              {analysis.internalNotes.trim() || 'No internal notes yet.'}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
