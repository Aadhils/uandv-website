import type {
  Quotation,
  QuotationItem,
  QuotationTimelineEvent,
} from '@uandv/database';

import { toMoney } from '@/lib/quotations/money';
import { buildPublicQuotationUrl } from '@/lib/quotations/token';

export type QuotationItemDto = {
  id: string;
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  discount: string;
  taxRate: string;
  lineTotal: string;
  sortOrder: number;
};

export type QuotationTimelineDto = {
  id: string;
  action: string;
  actorType: string;
  actorLabel: string | null;
  note: string | null;
  createdAt: string;
};

export type QuotationDto = {
  id: string;
  quotationNumber: string;
  leadId: string | null;
  customerId: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  customerCompany: string | null;
  serviceInterest: string | null;
  leadReference: string | null;
  title: string;
  introduction: string | null;
  currency: string;
  subtotal: string;
  discountType: string;
  discountValue: string;
  discountAmount: string;
  taxType: string;
  taxRate: string;
  taxAmount: string;
  grandTotal: string;
  validityDate: string;
  status: string;
  customerNotes: string | null;
  termsAndConditions: string | null;
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  viewedAt: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  items: QuotationItemDto[];
  timeline?: QuotationTimelineDto[];
};

export type AdminQuotationDto = QuotationDto & {
  internalNotes: string | null;
  publicToken: string;
  publicUrl: string;
};

function formatDbAmount(value: unknown): string {
  if (
    value &&
    typeof value === 'object' &&
    'toFixed' in value &&
    typeof (value as { toFixed: unknown }).toFixed === 'function'
  ) {
    return (value as { toFixed: (digits: number) => string }).toFixed(2);
  }
  return toMoney(value as string | number).toFixed(2);
}

function mapItem(item: QuotationItem): QuotationItemDto {
  return {
    id: item.id,
    description: item.description,
    quantity: item.quantity.toFixed(4),
    unit: item.unit,
    unitPrice: formatDbAmount(item.unitPrice),
    discount: formatDbAmount(item.discount),
    taxRate: formatDbAmount(item.taxRate),
    lineTotal: formatDbAmount(item.lineTotal),
    sortOrder: item.sortOrder,
  };
}

function mapTimeline(event: QuotationTimelineEvent): QuotationTimelineDto {
  return {
    id: event.id,
    action: event.action,
    actorType: event.actorType,
    actorLabel: event.actorLabel,
    note: event.note,
    createdAt: event.createdAt.toISOString(),
  };
}

export function mapQuotationForCustomer(
  quotation: Quotation & {
    items: QuotationItem[];
    timelineEvents?: QuotationTimelineEvent[];
  },
): QuotationDto {
  return {
    id: quotation.id,
    quotationNumber: quotation.quotationNumber,
    leadId: quotation.leadId,
    customerId: quotation.customerId,
    customerEmail: quotation.customerEmail,
    customerName: quotation.customerName,
    customerPhone: quotation.customerPhone,
    customerCompany: quotation.customerCompany,
    serviceInterest: quotation.serviceInterest,
    leadReference: quotation.leadReference,
    title: quotation.title,
    introduction: quotation.introduction,
    currency: quotation.currency,
    subtotal: formatDbAmount(quotation.subtotal),
    discountType: quotation.discountType,
    discountValue: formatDbAmount(quotation.discountValue),
    discountAmount: formatDbAmount(quotation.discountAmount),
    taxType: quotation.taxType,
    taxRate: formatDbAmount(quotation.taxRate),
    taxAmount: formatDbAmount(quotation.taxAmount),
    grandTotal: formatDbAmount(quotation.grandTotal),
    validityDate: quotation.validityDate.toISOString(),
    status: quotation.status,
    customerNotes: quotation.customerNotes,
    termsAndConditions: quotation.termsAndConditions,
    createdAt: quotation.createdAt.toISOString(),
    updatedAt: quotation.updatedAt.toISOString(),
    sentAt: quotation.sentAt?.toISOString() ?? null,
    viewedAt: quotation.viewedAt?.toISOString() ?? null,
    acceptedAt: quotation.acceptedAt?.toISOString() ?? null,
    rejectedAt: quotation.rejectedAt?.toISOString() ?? null,
    rejectionReason: quotation.rejectionReason,
    items: quotation.items.map(mapItem),
    timeline: quotation.timelineEvents?.map(mapTimeline),
  };
}

export function mapQuotationForAdmin(
  quotation: Quotation & {
    items: QuotationItem[];
    timelineEvents?: QuotationTimelineEvent[];
  },
): AdminQuotationDto {
  return {
    ...mapQuotationForCustomer(quotation),
    internalNotes: quotation.internalNotes,
    publicToken: quotation.publicToken,
    publicUrl: buildPublicQuotationUrl(quotation.publicToken),
  };
}

export function mapQuotationListRow(
  quotation: Quotation,
): Pick<
  QuotationDto,
  | 'id'
  | 'quotationNumber'
  | 'customerName'
  | 'customerEmail'
  | 'customerCompany'
  | 'leadReference'
  | 'title'
  | 'grandTotal'
  | 'status'
  | 'validityDate'
  | 'createdAt'
  | 'sentAt'
> {
  return {
    id: quotation.id,
    quotationNumber: quotation.quotationNumber,
    customerName: quotation.customerName,
    customerEmail: quotation.customerEmail,
    customerCompany: quotation.customerCompany,
    leadReference: quotation.leadReference,
    title: quotation.title,
    grandTotal: formatDbAmount(quotation.grandTotal),
    status: quotation.status,
    validityDate: quotation.validityDate.toISOString(),
    createdAt: quotation.createdAt.toISOString(),
    sentAt: quotation.sentAt?.toISOString() ?? null,
  };
}
