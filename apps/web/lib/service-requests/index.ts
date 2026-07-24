export * from './types';
export * from './demo-data';
export * from './matching';
export * from './runtime';

export {
  formatPartnerInr as formatServiceRequestInr,
  formatPartnerDate as formatServiceRequestDate,
} from '@/lib/partners';

import { PARTNER_CATEGORY_LABELS } from '@/lib/partners';
import type { PartnerCategory } from '@/lib/partners';

import type { ServiceRequestStatus } from './types';
import { SERVICE_REQUEST_STATUS_LABELS } from './types';

export function serviceRequestStatusLabel(status: ServiceRequestStatus): string {
  return SERVICE_REQUEST_STATUS_LABELS[status] ?? String(status).replaceAll('_', ' ');
}

export function partnerCategoryLabel(category: PartnerCategory): string {
  return PARTNER_CATEGORY_LABELS[category] ?? String(category);
}

export function formatBudgetRange(min: number, max: number): string {
  const fmt = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 0;
  return `${fmt.format(safeMin)} – ${fmt.format(safeMax)}`;
}
