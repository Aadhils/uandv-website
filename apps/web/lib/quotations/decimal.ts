import {
  MoneyDecimal,
  moneyZero,
  toMoney,
  type DecimalInput,
} from '@/lib/quotations/money';

export type { DecimalInput };

export function toDecimal(value: DecimalInput): MoneyDecimal {
  return toMoney(value);
}

export function decimalZero(): MoneyDecimal {
  return moneyZero();
}

export function formatDecimal(value: MoneyDecimal, fractionDigits = 2): string {
  return value.toFixed(fractionDigits);
}

export function decimalToPrismaString(value: MoneyDecimal): string {
  return value.toFixed(2);
}
