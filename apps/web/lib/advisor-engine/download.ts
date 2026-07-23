import {
  BUSINESS_CATEGORY_LABELS,
  BUSINESS_STAGE_LABELS,
  formatAdvisorBudget,
} from '@/lib/business-advisor';
import { PARTNER_CATEGORY_LABELS } from '@/lib/partners';

import type { AdvisorEngineReport } from './types';

/** Formatted plain-text report used as the demo PDF download placeholder. */
export function formatAdvisorReportText(report: AdvisorEngineReport): string {
  const lines: string[] = [
    'U&V AI Business Advisor Report',
    '==============================',
    '(Demo PDF placeholder — text export)',
    '',
    `Generated: ${new Date(report.createdAt).toLocaleString('en-IN')}`,
    `Report ID: ${report.id}`,
    `Goal: ${report.goalTitle}`,
    '',
    'BUSINESS READINESS',
    '------------------',
    `Score: ${report.readiness.score}/100 — ${report.readiness.label}`,
    ...report.readiness.drivers.map((d) => `+ ${d}`),
    ...report.readiness.gaps.map((g) => `- ${g}`),
    '',
    'BUSINESS SNAPSHOT',
    '-----------------',
    `Category: ${BUSINESS_CATEGORY_LABELS[report.analysis.businessCategory]}`,
    `Stage: ${BUSINESS_STAGE_LABELS[report.analysis.businessStage]}`,
    `Objective: ${report.analysis.primaryObjective}`,
    `Profile: ${report.wizardSummary.businessProfile}`,
    '',
    'ESTIMATED BUDGET',
    '----------------',
    report.estimatedBudgetLabel,
    '',
    'ESTIMATED TIMELINE',
    '------------------',
    report.estimatedTimelineLabel,
    '',
    'REQUIRED REGISTRATIONS',
    '----------------------',
    ...(report.requiredRegistrations.length
      ? report.requiredRegistrations.map((item) => `• ${item}`)
      : ['• None flagged yet']),
    '',
    'REQUIRED LICENSES',
    '-----------------',
    ...(report.requiredLicenses.length
      ? report.requiredLicenses.map((item) => `• ${item}`)
      : ['• None flagged yet']),
    '',
    'RECOMMENDED U&V SERVICES',
    '------------------------',
    ...report.recommendedServices.map((item) => `• ${item}`),
    '',
    'RECOMMENDED PARTNER CATEGORIES',
    '------------------------------',
    ...report.recommendedPartnerCategories.map(
      (item) => `• ${item.label} (${item.id})`,
    ),
    '',
    'AI RECOMMENDATIONS',
    '------------------',
  ];

  for (const rec of report.aiRecommendations) {
    lines.push(`[${rec.priority.toUpperCase()}] ${rec.title}`);
    lines.push(`  ${rec.detail}`);
    lines.push('');
  }

  lines.push('BUSINESS ROADMAP');
  lines.push('----------------');
  for (const phase of report.roadmap) {
    lines.push(`Phase ${phase.phase}: ${phase.label} (${phase.weeksHint})`);
    for (const task of phase.tasks) {
      lines.push(
        `  - ${task.name} · ${task.owner} · ~${task.durationDays}d`,
      );
    }
    lines.push('');
  }

  lines.push('Disclaimer: Demo-only advisory output. Not legal, financial, or tax advice.');
  lines.push('Prepared by U&V Technologies — https://uandv.com');

  return lines.join('\n');
}

/**
 * Demo PDF placeholder: downloads a formatted text report.
 * No PDF library / backend involved.
 */
export function downloadAdvisorReport(
  report: AdvisorEngineReport,
  options?: { asPdfPlaceholder?: boolean },
): void {
  if (typeof window === 'undefined') return;

  const text = formatAdvisorReportText(report);
  const asPdf = options?.asPdfPlaceholder !== false;
  const blob = new Blob([text], {
    type: asPdf ? 'application/pdf' : 'text/plain;charset=utf-8',
  });
  // Still a text payload — MIME/filename signal a demo PDF placeholder.
  const filename = asPdf
    ? `uv-business-advisor-report-${report.id}.pdf`
    : `uv-business-advisor-report-${report.id}.txt`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function partnerLabel(id: string): string {
  return (
    PARTNER_CATEGORY_LABELS[id as keyof typeof PARTNER_CATEGORY_LABELS] ?? id
  );
}

export { formatAdvisorBudget };
