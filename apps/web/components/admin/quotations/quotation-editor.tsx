'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import {
  Button,
  Form,
  FormField,
  Input,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import type { AdminQuotationDto } from '@/lib/quotations/mapper';

export type QuotationLeadPrefill = {
  leadId: string;
  leadReference: string;
  customerId: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  customerCompany: string | null;
  serviceInterest: string;
};

type LineDraft = {
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  discount: string;
  taxRate: string;
};

type QuotationEditorProps = {
  mode: 'create' | 'edit';
  quotationId?: string;
  leadPrefill?: QuotationLeadPrefill | null;
  initial?: AdminQuotationDto | null;
};

const emptyLine = (): LineDraft => ({
  description: '',
  quantity: '1',
  unit: 'unit',
  unitPrice: '0',
  discount: '0',
  taxRate: '18',
});

function defaultValidityDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}

export function QuotationEditor({
  mode,
  quotationId,
  leadPrefill,
  initial,
}: QuotationEditorProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const [customerEmail, setCustomerEmail] = React.useState(
    initial?.customerEmail ?? leadPrefill?.customerEmail ?? '',
  );
  const [customerName, setCustomerName] = React.useState(
    initial?.customerName ?? leadPrefill?.customerName ?? '',
  );
  const [customerPhone, setCustomerPhone] = React.useState(
    initial?.customerPhone ?? leadPrefill?.customerPhone ?? '',
  );
  const [customerCompany, setCustomerCompany] = React.useState(
    initial?.customerCompany ?? leadPrefill?.customerCompany ?? '',
  );
  const [serviceInterest, setServiceInterest] = React.useState(
    initial?.serviceInterest ?? leadPrefill?.serviceInterest ?? '',
  );
  const [title, setTitle] = React.useState(initial?.title ?? '');
  const [introduction, setIntroduction] = React.useState(initial?.introduction ?? '');
  const [validityDate, setValidityDate] = React.useState(
    initial?.validityDate?.slice(0, 10) ?? defaultValidityDate(),
  );
  const [discountType, setDiscountType] = React.useState(
    initial?.discountType ?? 'NONE',
  );
  const [discountValue, setDiscountValue] = React.useState(
    initial?.discountValue ?? '0',
  );
  const [taxType, setTaxType] = React.useState(initial?.taxType ?? 'GST');
  const [taxRate, setTaxRate] = React.useState(initial?.taxRate ?? '18');
  const [customerNotes, setCustomerNotes] = React.useState(initial?.customerNotes ?? '');
  const [termsAndConditions, setTermsAndConditions] = React.useState(
    initial?.termsAndConditions ??
      'Payment terms, delivery timeline, and scope boundaries will be confirmed in writing after acceptance.',
  );
  const [internalNotes, setInternalNotes] = React.useState(initial?.internalNotes ?? '');
  const [lines, setLines] = React.useState<LineDraft[]>(
    initial?.items.length
      ? initial.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          discount: item.discount,
          taxRate: item.taxRate,
        }))
      : [emptyLine()],
  );

  const updateLine = (index: number, patch: Partial<LineDraft>) => {
    setLines((current) =>
      current.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const addLine = () => setLines((current) => [...current, emptyLine()]);
  const removeLine = (index: number) =>
    setLines((current) => current.filter((_, i) => i !== index));

  const buildPayload = () => ({
    leadId: leadPrefill?.leadId ?? initial?.leadId ?? null,
    customerId: leadPrefill?.customerId ?? initial?.customerId ?? null,
    customerEmail,
    customerName,
    customerPhone: customerPhone || null,
    customerCompany: customerCompany || null,
    serviceInterest: serviceInterest || null,
    leadReference: leadPrefill?.leadReference ?? initial?.leadReference ?? null,
    title,
    introduction: introduction || null,
    currency: 'INR',
    discountType,
    discountValue,
    taxType,
    taxRate: taxType === 'NONE' ? '0' : taxRate,
    validityDate: new Date(validityDate).toISOString(),
    internalNotes: internalNotes || null,
    customerNotes: customerNotes || null,
    termsAndConditions: termsAndConditions || null,
    items: lines.map((line, index) => ({
      ...line,
      sortOrder: index,
    })),
  });

  const saveDraft = async () => {
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const url =
        mode === 'create'
          ? '/api/admin/quotations'
          : `/api/admin/quotations/${quotationId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        quotation?: AdminQuotationDto;
      };
      if (!response.ok || !result.ok || !result.quotation) {
        setError(result.error ?? 'Unable to save quotation.');
        return;
      }
      setMessage('Draft saved.');
      router.push(`/admin/quotations/${result.quotation.id}`);
      router.refresh();
    } catch {
      setError('Network error while saving quotation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        badge="live"
        title={mode === 'create' ? 'New quotation' : `Edit ${initial?.quotationNumber ?? 'quotation'}`}
        description="Create a draft quotation linked to CRM lead data. Totals are recalculated on the server when saved."
        actions={
          <Link
            href="/admin/quotations"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Back to list
          </Link>
        }
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-success/30 bg-uv-success/5 px-4 py-3 text-sm" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error" role="alert">
          {error}
        </p>
      ) : null}

      <Form spacing="lg" onSubmit={(e) => e.preventDefault()} noValidate>
        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">Customer / lead</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FormField label="Customer name" htmlFor="q-customer-name" required>
              <Input id="q-customer-name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </FormField>
            <FormField label="Email" htmlFor="q-customer-email" required>
              <Input id="q-customer-email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            </FormField>
            <FormField label="Phone" htmlFor="q-customer-phone">
              <Input id="q-customer-phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            </FormField>
            <FormField label="Company" htmlFor="q-customer-company">
              <Input id="q-customer-company" value={customerCompany} onChange={(e) => setCustomerCompany(e.target.value)} />
            </FormField>
            <FormField label="Service interest" htmlFor="q-service" className="sm:col-span-2">
              <Input id="q-service" value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} />
            </FormField>
          </div>
        </section>

        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">Quotation details</h2>
          <div className="mt-4 grid gap-4">
            <FormField label="Title" htmlFor="q-title" required>
              <Input id="q-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField label="Introduction / summary" htmlFor="q-intro">
              <Textarea id="q-intro" rows={3} value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
            </FormField>
            <FormField label="Valid until" htmlFor="q-validity" required>
              <Input id="q-validity" type="date" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
            </FormField>
          </div>
        </section>

        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">Line items</h2>
            <Button type="button" variant="outline" size="sm" onClick={addLine}>
              Add item
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {lines.map((line, index) => (
              <div key={index} className="grid gap-3 rounded-uv-xl border border-uv-border p-4 sm:grid-cols-6">
                <FormField label="Description" htmlFor={`q-desc-${index}`} className="sm:col-span-6">
                  <Input id={`q-desc-${index}`} value={line.description} onChange={(e) => updateLine(index, { description: e.target.value })} />
                </FormField>
                <FormField label="Qty" htmlFor={`q-qty-${index}`}>
                  <Input id={`q-qty-${index}`} value={line.quantity} onChange={(e) => updateLine(index, { quantity: e.target.value })} />
                </FormField>
                <FormField label="Unit" htmlFor={`q-unit-${index}`}>
                  <Input id={`q-unit-${index}`} value={line.unit} onChange={(e) => updateLine(index, { unit: e.target.value })} />
                </FormField>
                <FormField label="Unit price (₹)" htmlFor={`q-price-${index}`}>
                  <Input id={`q-price-${index}`} value={line.unitPrice} onChange={(e) => updateLine(index, { unitPrice: e.target.value })} />
                </FormField>
                <FormField label="Discount (₹)" htmlFor={`q-disc-${index}`}>
                  <Input id={`q-disc-${index}`} value={line.discount} onChange={(e) => updateLine(index, { discount: e.target.value })} />
                </FormField>
                <FormField label="Tax %" htmlFor={`q-tax-${index}`}>
                  <Input id={`q-tax-${index}`} value={line.taxRate} onChange={(e) => updateLine(index, { taxRate: e.target.value })} />
                </FormField>
                {lines.length > 1 ? (
                  <div className="sm:col-span-6">
                    <Button type="button" variant="outline" size="sm" onClick={() => removeLine(index)}>
                      Remove
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">Tax & discount</h2>
            <div className="mt-4 grid gap-4">
              <FormField label="Discount type" htmlFor="q-discount-type">
                <Select id="q-discount-type" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                  <option value="NONE">None</option>
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed amount</option>
                </Select>
              </FormField>
              <FormField label="Discount value" htmlFor="q-discount-value">
                <Input id="q-discount-value" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
              </FormField>
              <FormField label="Tax type" htmlFor="q-tax-type">
                <Select id="q-tax-type" value={taxType} onChange={(e) => setTaxType(e.target.value)}>
                  <option value="NONE">None</option>
                  <option value="GST">GST</option>
                  <option value="CUSTOM">Custom</option>
                </Select>
              </FormField>
              {taxType !== 'NONE' ? (
                <FormField label="Tax rate %" htmlFor="q-tax-rate">
                  <Input id="q-tax-rate" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                </FormField>
              ) : null}
            </div>
            <p className="mt-4 text-sm text-uv-foreground-muted">
              Final totals are calculated securely on the server when you save.
            </p>
          </div>

          <div className="space-y-6">
            <FormField label="Customer notes" htmlFor="q-customer-notes">
              <Textarea id="q-customer-notes" rows={4} value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} />
            </FormField>
            <FormField label="Terms & conditions" htmlFor="q-terms">
              <Textarea id="q-terms" rows={4} value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} />
            </FormField>
            <FormField label="Internal notes (admin only)" htmlFor="q-internal-notes">
              <Textarea id="q-internal-notes" rows={3} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
            </FormField>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={saveDraft} disabled={submitting}>
            {submitting ? 'Saving…' : 'Save draft'}
          </Button>
          {initial ? (
            <Link href={`/admin/quotations/${initial.id}`} className={cn(buttonVariants({ variant: 'outline' }))}>
              Preview
            </Link>
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export function QuotationNewPageClient({
  leadPrefill,
}: {
  leadPrefill: QuotationLeadPrefill | null;
}) {
  return <QuotationEditor mode="create" leadPrefill={leadPrefill} />;
}
