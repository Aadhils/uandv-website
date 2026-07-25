import {
  MoneyDecimal,
  moneyZero,
  toMoney,
  type DecimalInput,
} from '@/lib/quotations/money';

export type QuotationDiscountTypeInput = 'NONE' | 'PERCENTAGE' | 'FIXED';
export type QuotationTaxTypeInput = 'NONE' | 'GST' | 'CUSTOM';

export type QuotationLineInput = {
  description: string;
  quantity: DecimalInput;
  unit?: string;
  unitPrice: DecimalInput;
  discount?: DecimalInput;
  taxRate?: DecimalInput;
  sortOrder?: number;
};

export type QuotationTotalsInput = {
  items: QuotationLineInput[];
  discountType?: QuotationDiscountTypeInput;
  discountValue?: DecimalInput;
  taxType?: QuotationTaxTypeInput;
  taxRate?: DecimalInput;
};

export type CalculatedQuotationLine = {
  description: string;
  quantity: MoneyDecimal;
  unit: string;
  unitPrice: MoneyDecimal;
  discount: MoneyDecimal;
  taxRate: MoneyDecimal;
  lineSubtotal: MoneyDecimal;
  lineTax: MoneyDecimal;
  lineTotal: MoneyDecimal;
  sortOrder: number;
};

export type CalculatedQuotationTotals = {
  lines: CalculatedQuotationLine[];
  subtotal: MoneyDecimal;
  discountType: QuotationDiscountTypeInput;
  discountValue: MoneyDecimal;
  discountAmount: MoneyDecimal;
  taxableAmount: MoneyDecimal;
  taxType: QuotationTaxTypeInput;
  taxRate: MoneyDecimal;
  taxAmount: MoneyDecimal;
  grandTotal: MoneyDecimal;
};

export class QuotationCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotationCalculationError';
  }
}

function assertNonNegative(value: MoneyDecimal, label: string): void {
  if (value.isNegative()) {
    throw new QuotationCalculationError(`${label} cannot be negative.`);
  }
}

function assertPositiveQuantity(value: MoneyDecimal): void {
  if (value.isZero()) return;
  if (value.isNegative()) {
    throw new QuotationCalculationError('Quantity cannot be negative.');
  }
}

function assertRate(value: MoneyDecimal, label: string): void {
  if (value.isNegative() || value.greaterThan(toMoney(100))) {
    throw new QuotationCalculationError(`${label} must be between 0 and 100.`);
  }
}

function calculateLine(line: QuotationLineInput, index: number): CalculatedQuotationLine {
  const quantity = toMoney(line.quantity);
  const unitPrice = toMoney(line.unitPrice);
  const discount = toMoney(line.discount ?? 0);
  const taxRate = toMoney(line.taxRate ?? 0);

  assertPositiveQuantity(quantity);
  assertNonNegative(unitPrice, 'Unit price');
  assertNonNegative(discount, 'Line discount');
  assertRate(taxRate, 'Line tax rate');

  const lineSubtotal = quantity.mul(unitPrice);
  const discountedSubtotal = MoneyDecimal.max(lineSubtotal.sub(discount), moneyZero());
  const lineTax = discountedSubtotal.mul(taxRate).div(100);
  const lineTotal = discountedSubtotal.add(lineTax);

  return {
    description: line.description.trim(),
    quantity,
    unit: line.unit?.trim() || 'unit',
    unitPrice,
    discount,
    taxRate,
    lineSubtotal: discountedSubtotal,
    lineTax,
    lineTotal,
    sortOrder: line.sortOrder ?? index,
  };
}

function resolveDiscountAmount(
  subtotal: MoneyDecimal,
  discountType: QuotationDiscountTypeInput,
  discountValue: MoneyDecimal,
): MoneyDecimal {
  if (discountType === 'NONE' || discountValue.isZero()) {
    return moneyZero();
  }

  assertNonNegative(discountValue, 'Discount value');

  if (discountType === 'PERCENTAGE') {
    assertRate(discountValue, 'Discount percentage');
    return subtotal.mul(discountValue).div(100);
  }

  return MoneyDecimal.min(discountValue, subtotal);
}

function resolveTaxAmount(
  taxableAmount: MoneyDecimal,
  taxType: QuotationTaxTypeInput,
  taxRate: MoneyDecimal,
): { taxRate: MoneyDecimal; taxAmount: MoneyDecimal } {
  if (taxType === 'NONE' || taxRate.isZero()) {
    return { taxRate: moneyZero(), taxAmount: moneyZero() };
  }

  assertRate(taxRate, 'Tax rate');
  return {
    taxRate,
    taxAmount: taxableAmount.mul(taxRate).div(100),
  };
}

export function calculateQuotationTotals(
  input: QuotationTotalsInput,
): CalculatedQuotationTotals {
  if (!input.items.length) {
    throw new QuotationCalculationError('At least one line item is required.');
  }

  const lines = input.items.map((item, index) => calculateLine(item, index));
  const subtotal = lines.reduce(
    (sum, line) => sum.add(line.lineTotal),
    moneyZero(),
  );

  const discountType = input.discountType ?? 'NONE';
  const discountValue = toMoney(input.discountValue ?? 0);
  const discountAmount = resolveDiscountAmount(subtotal, discountType, discountValue);
  const taxableAmount = MoneyDecimal.max(subtotal.sub(discountAmount), moneyZero());

  const taxType = input.taxType ?? 'GST';
  const taxRate = toMoney(input.taxRate ?? (taxType === 'GST' ? 18 : 0));
  const { taxRate: resolvedTaxRate, taxAmount } = resolveTaxAmount(
    taxableAmount,
    taxType,
    taxRate,
  );

  const grandTotal = taxableAmount.add(taxAmount);

  return {
    lines,
    subtotal,
    discountType,
    discountValue,
    discountAmount,
    taxableAmount,
    taxType,
    taxRate: resolvedTaxRate,
    taxAmount,
    grandTotal,
  };
}
