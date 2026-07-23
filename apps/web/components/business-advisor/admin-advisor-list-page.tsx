'use client';

import * as React from 'react';
import Link from 'next/link';

import { Input, Select, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  BUSINESS_CATEGORY_LABELS,
  BUSINESS_STAGE_LABELS,
  applyReviewPatch,
  listDemoAnalyses,
  loadReviewPatches,
  subscribeReviewPatches,
  type AnalysisPriority,
  type BusinessCategory,
  type BusinessStage,
  type ReviewPatch,
} from '@/lib/business-advisor';

export function AdminBusinessAdvisorListPage() {
  const [category, setCategory] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [stage, setStage] = React.useState('');
  const [query, setQuery] = React.useState('');

  const patches = React.useSyncExternalStore(
    subscribeReviewPatches,
    loadReviewPatches,
    (): Record<string, ReviewPatch> => ({}),
  );

  const rows = React.useMemo(
    () =>
      listDemoAnalyses().map((row) => applyReviewPatch(row, patches[row.id])),
    [patches],
  );

  const filtered = React.useMemo(() => {
    return rows.filter((row) => {
      if (category && row.businessCategory !== category) return false;
      if (priority && row.priority !== priority) return false;
      if (stage && row.businessStage !== stage) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = [
          row.customerName,
          row.businessIntent,
          row.input.city,
          BUSINESS_CATEGORY_LABELS[row.businessCategory],
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, category, priority, stage, query]);

  const stats = React.useMemo(() => {
    return {
      total: rows.length,
      urgent: rows.filter((r) => r.priority === 'urgent' || r.priority === 'high')
        .length,
      missing: rows.filter((r) => r.missingInformation.length > 0).length,
      newCount: rows.filter((r) => r.reviewStatus === 'new').length,
    };
  }, [rows]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="AI Requirement Analysis"
        description="Review customer business-goal analyses from the deterministic advisor engine. Demo data only."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Analyses" value={String(stats.total)} icon="ClipboardList" />
        <StatsCard label="High / urgent" value={String(stats.urgent)} icon="CircleAlert" />
        <StatsCard label="Missing info" value={String(stats.missing)} icon="FileText" />
        <StatsCard label="New" value={String(stats.newCount)} icon="Sparkles" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer or goal…"
          aria-label="Search analyses"
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {(Object.keys(BUSINESS_CATEGORY_LABELS) as BusinessCategory[]).map(
            (key) => (
              <option key={key} value={key}>
                {BUSINESS_CATEGORY_LABELS[key]}
              </option>
            ),
          )}
        </Select>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {(['low', 'medium', 'high', 'urgent'] as AnalysisPriority[]).map(
            (p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ),
          )}
        </Select>
        <Select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          aria-label="Filter by stage"
        >
          <option value="">All stages</option>
          {(Object.keys(BUSINESS_STAGE_LABELS) as BusinessStage[]).map((s) => (
            <option key={s} value={s}>
              {BUSINESS_STAGE_LABELS[s]}
            </option>
          ))}
        </Select>
      </div>

      <ResponsiveDataList
        rows={filtered}
        getRowId={(row) => row.id}
        emptyMessage="No analyses match these filters."
        mobileTitle={(row) => row.customerName}
        columns={[
          {
            key: 'id',
            header: 'ID',
            render: (row) => (
              <Link
                href={`/admin/business-advisor/${row.id}`}
                className="font-medium text-uv-brand hover:underline"
              >
                {row.id}
              </Link>
            ),
          },
          {
            key: 'customer',
            header: 'Customer',
            render: (row) => row.customerName,
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => BUSINESS_CATEGORY_LABELS[row.businessCategory],
          },
          {
            key: 'stage',
            header: 'Stage',
            render: (row) => <StatusBadge status={row.businessStage} />,
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'missing',
            header: 'Missing',
            render: (row) => String(row.missingInformation.length),
          },
          {
            key: 'review',
            header: 'Review',
            render: (row) => <StatusBadge status={row.reviewStatus} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            hideOnMobile: false,
            render: (row) => (
              <Link
                href={`/admin/business-advisor/${row.id}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                Review
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
