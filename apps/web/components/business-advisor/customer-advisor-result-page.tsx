'use client';

import * as React from 'react';
import Link from 'next/link';

import { EmptyState, buttonVariants, cn } from '@uandv/ui';

import { AnalysisReport } from '@/components/business-advisor/analysis-report';
import { CustomerPageHeader } from '@/components/customer/page-header';
import {
  loadLatestAnalysis,
  subscribeLatestAnalysis,
} from '@/lib/business-advisor';

export function CustomerBusinessAdvisorResultPage() {
  const analysis = React.useSyncExternalStore(
    subscribeLatestAnalysis,
    loadLatestAnalysis,
    () => null,
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Requirement Analysis Report"
        description="Structured output from the rule-based Business Advisor engine."
        actions={
          <Link
            href="/dashboard/business-advisor"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            New analysis
          </Link>
        }
      />

      {!analysis ? (
        <EmptyState
          icon="ClipboardList"
          title="No analysis yet"
          description="Submit a business goal to generate a structured requirement report."
          action={
            <Link
              href="/dashboard/business-advisor"
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
            >
              Enter a business goal
            </Link>
          }
        />
      ) : (
        <AnalysisReport analysis={analysis} />
      )}
    </div>
  );
}
