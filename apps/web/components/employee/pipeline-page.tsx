'use client';

import * as React from 'react';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  EMPLOYEE_PIPELINE_LABELS,
  EMPLOYEE_PIPELINE_ORDER,
  getEmployeePipelineCards,
  type EmployeePipelineCard,
  type EmployeePipelineStage,
} from '@/lib/employee';

export function EmployeePipelinePage() {
  const [cards, setCards] = React.useState<EmployeePipelineCard[]>(() =>
    getEmployeePipelineCards(),
  );
  const [message, setMessage] = React.useState<string | null>(null);

  const moveCard = (leadId: string, toStage: EmployeePipelineStage) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.leadId !== leadId || card.stage === toStage) return card;
        const historyItem = {
          id: `hist-${leadId}-${Date.now()}`,
          fromStage: card.stage,
          toStage,
          changedAt: new Date().toISOString().slice(0, 10),
          changedBy: 'Divya P.',
          note: 'Local demo stage move',
        };
        return {
          ...card,
          stage: toStage,
          lostReason:
            toStage === 'lost'
              ? (card.lostReason ?? 'Not specified (demo)')
              : null,
          stageHistory: [...card.stageHistory, historyItem],
        };
      }),
    );
    setMessage(
      `Demo: moved lead to ${EMPLOYEE_PIPELINE_LABELS[toStage]} (local state only).`,
    );
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Lead Pipeline"
        description="Kanban board for your assigned leads only. Stage moves update local state and placeholder history — not persisted."
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground-muted"
          role="status"
        >
          {message}
        </p>
      ) : null}

      <div className="flex gap-4 overflow-x-auto pb-2">
        {EMPLOYEE_PIPELINE_ORDER.map((stage) => {
          const column = cards.filter((card) => card.stage === stage);
          return (
            <section
              key={stage}
              aria-label={EMPLOYEE_PIPELINE_LABELS[stage]}
              className="w-[16.5rem] shrink-0"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-uv-foreground">
                  {EMPLOYEE_PIPELINE_LABELS[stage]}
                </h2>
                <Badge variant="secondary">{column.length}</Badge>
              </div>
              <div className="space-y-3">
                {column.length === 0 ? (
                  <p className="rounded-uv-lg border border-dashed border-uv-border px-3 py-6 text-center text-xs text-uv-foreground-muted">
                    No leads
                  </p>
                ) : (
                  column.map((card) => (
                    <Card key={card.leadId} padding="none">
                      <CardHeader className="space-y-1 p-3 pb-0">
                        <CardTitle className="text-sm">{card.name}</CardTitle>
                        <p className="text-xs text-uv-foreground-muted">
                          {card.company}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-2 p-3 pt-2">
                        <p className="text-xs text-uv-foreground-muted">
                          {card.interestedService}
                        </p>
                        <StatusBadge status={card.priority} />
                        {stage === 'lost' && card.lostReason ? (
                          <p className="text-xs text-uv-error">
                            Lost reason: {card.lostReason}
                          </p>
                        ) : null}
                        <label className="block text-xs text-uv-foreground-subtle">
                          Move stage
                          <select
                            className="mt-1 w-full rounded-uv-md border border-uv-border bg-uv-background px-2 py-1.5 text-xs text-uv-foreground uv-focus-ring"
                            value={card.stage}
                            aria-label={`Move ${card.name} to stage`}
                            onChange={(event) =>
                              moveCard(
                                card.leadId,
                                event.target.value as EmployeePipelineStage,
                              )
                            }
                          >
                            {EMPLOYEE_PIPELINE_ORDER.map((option) => (
                              <option key={option} value={option}>
                                {EMPLOYEE_PIPELINE_LABELS[option]}
                              </option>
                            ))}
                          </select>
                        </label>
                        <details className="text-xs text-uv-foreground-muted">
                          <summary className="cursor-pointer uv-focus-ring rounded-uv-md">
                            Stage history
                          </summary>
                          <ul className="mt-2 space-y-1 pl-3">
                            {card.stageHistory.map((item) => (
                              <li key={item.id}>
                                {item.fromStage
                                  ? EMPLOYEE_PIPELINE_LABELS[item.fromStage]
                                  : '—'}{' '}
                                → {EMPLOYEE_PIPELINE_LABELS[item.toStage]} ·{' '}
                                {item.changedBy} · {item.changedAt}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>

      <LocalDemoButton
        onClick={() => {
          setCards(getEmployeePipelineCards());
          setMessage('Demo: pipeline reset to initial assigned leads.');
        }}
      >
        Reset board
      </LocalDemoButton>
    </div>
  );
}
