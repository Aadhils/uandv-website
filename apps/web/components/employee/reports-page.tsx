'use client';

import * as React from 'react';

import { FormField, StatsCard, Textarea } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import {
  demoDailyWorkReport,
  demoEmployeePerformance,
  formatDisplayDate,
} from '@/lib/employee';

export function EmployeeReportsPage() {
  const [notes, setNotes] = React.useState(demoDailyWorkReport.notes);
  const [submitted, setSubmitted] = React.useState(false);
  const perf = demoEmployeePerformance;
  const report = demoDailyWorkReport;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <EmployeePageHeader
        title="Daily Report & Performance"
        description="Submit a demo daily work report and review performance targets. No payroll or incentive calculations."
      />

      <section aria-label="Daily work report" className="space-y-4">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Daily work report · {formatDisplayDate(report.reportDate)}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            label="Calls completed"
            value={String(report.callsCompleted)}
            icon="Phone"
          />
          <StatsCard
            label="Follow-ups completed"
            value={String(report.followUpsCompleted)}
            icon="Calendar"
          />
          <StatsCard
            label="Meetings completed"
            value={String(report.meetingsCompleted)}
            icon="Users"
          />
          <StatsCard
            label="Leads progressed"
            value={String(report.leadsProgressed)}
            icon="Workflow"
          />
          <StatsCard
            label="Proposals requested"
            value={String(report.proposalsRequested)}
            icon="FileText"
          />
          <StatsCard
            label="Customers converted"
            value={String(report.customersConverted)}
            icon="TrendingUp"
          />
        </div>

        <FormField
          label="Notes / summary"
          htmlFor="daily-report-notes"
          hint="Demo notes field — not saved to a server."
        >
          <Textarea
            id="daily-report-notes"
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
              setSubmitted(false);
            }}
            rows={4}
          />
        </FormField>

        <div className="flex flex-wrap items-center gap-3">
          <LocalDemoButton
            variant="primary"
            onClick={() => setSubmitted(true)}
          >
            Submit report
          </LocalDemoButton>
          {submitted ? (
            <p className="text-sm text-uv-success" role="status">
              Demo: report marked submitted locally.
            </p>
          ) : null}
        </div>
      </section>

      <section aria-label="Employee performance" className="space-y-4">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Employee performance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            label="Daily target"
            value={String(perf.dailyTarget)}
            hint="Follow-ups / actions"
            icon="Check"
          />
          <StatsCard
            label="Weekly target"
            value={String(perf.weeklyTarget)}
            hint="Demo target"
            icon="TrendingUp"
          />
          <StatsCard
            label="Follow-up completion"
            value={`${perf.followUpCompletionRatePercent}%`}
            hint="Demo rate"
            icon="Calendar"
          />
          <StatsCard
            label="Conversion count"
            value={String(perf.conversionCount)}
            hint="Demo count"
            icon="Sparkles"
          />
          <StatsCard
            label="Overdue count"
            value={String(perf.overdueCount)}
            hint="Needs attention"
            icon="CircleAlert"
          />
          <StatsCard
            label="Customer response rate"
            value={`${perf.customerResponseRatePercent}%`}
            hint="Demo rate"
            icon="MessageCircle"
          />
        </div>
        <p className="text-xs text-uv-foreground-subtle">
          Demo values only. Payroll and incentive calculations are out of scope.
        </p>
      </section>
    </div>
  );
}
