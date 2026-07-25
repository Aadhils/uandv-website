import { describe, expect, it } from 'vitest';

import {
  QuotationCalculationError,
  calculateQuotationTotals,
} from '@/lib/quotations/calculate';

describe('calculateQuotationTotals', () => {
  it('calculates a single line with no tax and no discount', () => {
    const result = calculateQuotationTotals({
      items: [{ description: 'Website', quantity: 1, unitPrice: 50000 }],
      discountType: 'NONE',
      taxType: 'NONE',
      taxRate: 0,
    });

    expect(result.subtotal.toString()).toBe('50000.00');
    expect(result.discountAmount.toString()).toBe('0.00');
    expect(result.taxAmount.toString()).toBe('0.00');
    expect(result.grandTotal.toString()).toBe('50000.00');
  });

  it('applies percentage discount and GST', () => {
    const result = calculateQuotationTotals({
      items: [{ description: 'App build', quantity: 1, unitPrice: 100000 }],
      discountType: 'PERCENTAGE',
      discountValue: 10,
      taxType: 'GST',
      taxRate: 18,
    });

    expect(result.discountAmount.toString()).toBe('10000.00');
    expect(result.taxAmount.toString()).toBe('16200.00');
    expect(result.grandTotal.toString()).toBe('106200.00');
  });

  it('applies fixed discount', () => {
    const result = calculateQuotationTotals({
      items: [{ description: 'Consulting', quantity: 2, unitPrice: 25000 }],
      discountType: 'FIXED',
      discountValue: 5000,
      taxType: 'NONE',
    });

    expect(result.subtotal.toString()).toBe('50000.00');
    expect(result.discountAmount.toString()).toBe('5000.00');
    expect(result.grandTotal.toString()).toBe('45000.00');
  });

  it('handles multiple line items with line tax', () => {
    const result = calculateQuotationTotals({
      items: [
        { description: 'Design', quantity: 1, unitPrice: 20000, taxRate: 18 },
        { description: 'Development', quantity: 1, unitPrice: 80000, taxRate: 18 },
      ],
      discountType: 'NONE',
      taxType: 'NONE',
    });

    expect(result.subtotal.toString()).toBe('118000.00');
    expect(result.grandTotal.toString()).toBe('118000.00');
  });

  it('supports decimal quantities and prices', () => {
    const result = calculateQuotationTotals({
      items: [{ description: 'Support hours', quantity: '2.5', unitPrice: '1200.50' }],
      discountType: 'NONE',
      taxType: 'NONE',
    });

    expect(result.grandTotal.toString()).toBe('3001.25');
  });

  it('allows zero-value optional item', () => {
    const result = calculateQuotationTotals({
      items: [
        { description: 'Core package', quantity: 1, unitPrice: 10000 },
        { description: 'Optional add-on', quantity: 1, unitPrice: 0 },
      ],
      discountType: 'NONE',
      taxType: 'NONE',
    });

    expect(result.grandTotal.toString()).toBe('10000.00');
  });

  it('rejects negative unit price', () => {
    expect(() =>
      calculateQuotationTotals({
        items: [{ description: 'Bad', quantity: 1, unitPrice: -1 }],
      }),
    ).toThrow(QuotationCalculationError);
  });

  it('rejects negative quantity', () => {
    expect(() =>
      calculateQuotationTotals({
        items: [{ description: 'Bad', quantity: -2, unitPrice: 100 }],
      }),
    ).toThrow(QuotationCalculationError);
  });

  it('rejects invalid tax rate', () => {
    expect(() =>
      calculateQuotationTotals({
        items: [{ description: 'Item', quantity: 1, unitPrice: 1000 }],
        taxType: 'GST',
        taxRate: 150,
      }),
    ).toThrow(QuotationCalculationError);
  });
});
