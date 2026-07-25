/**
 * Lightweight decimal arithmetic for quotation totals.
 * Avoids floating-point math; converts to Prisma.Decimal at persistence boundaries.
 */

export type DecimalInput = string | number;

export class MoneyDecimal {
  private cents: bigint;

  constructor(value: DecimalInput = '0', cents?: bigint) {
    this.cents = cents ?? MoneyDecimal.toCents(value);
  }

  static zero(): MoneyDecimal {
    return new MoneyDecimal('0');
  }

  private static toCents(value: DecimalInput): bigint {
    const normalized = String(value).trim();
    if (!normalized || normalized === '-') {
      throw new Error('Invalid decimal value.');
    }
    const negative = normalized.startsWith('-');
    const raw = negative ? normalized.slice(1) : normalized;
    const [whole, fraction = ''] = raw.split('.');
    const frac = `${fraction}0000`.slice(0, 4);
    const cents =
      BigInt(whole || '0') * 10000n + BigInt(frac.padEnd(4, '0').slice(0, 4));
    return negative ? -cents : cents;
  }

  add(other: MoneyDecimal): MoneyDecimal {
    return MoneyDecimal.fromCents(this.cents + other.cents);
  }

  sub(other: MoneyDecimal): MoneyDecimal {
    return MoneyDecimal.fromCents(this.cents - other.cents);
  }

  mul(other: MoneyDecimal | DecimalInput): MoneyDecimal {
    const rhs = other instanceof MoneyDecimal ? other : new MoneyDecimal(other);
    return MoneyDecimal.fromCents((this.cents * rhs.cents) / 10000n);
  }

  div(other: MoneyDecimal | DecimalInput): MoneyDecimal {
    const rhs = other instanceof MoneyDecimal ? other : new MoneyDecimal(other);
    if (rhs.cents === 0n) throw new Error('Division by zero.');
    return MoneyDecimal.fromCents((this.cents * 10000n) / rhs.cents);
  }

  isNegative(): boolean {
    return this.cents < 0n;
  }

  isZero(): boolean {
    return this.cents === 0n;
  }

  greaterThan(other: MoneyDecimal): boolean {
    return this.cents > other.cents;
  }

  static max(a: MoneyDecimal, b: MoneyDecimal): MoneyDecimal {
    return a.greaterThan(b) ? a : b;
  }

  static min(a: MoneyDecimal, b: MoneyDecimal): MoneyDecimal {
    return a.greaterThan(b) ? b : a;
  }

  toFixed(fractionDigits = 2): string {
    const negative = this.cents < 0n;
    const abs = negative ? -this.cents : this.cents;
    const whole = abs / 10000n;
    const fraction = abs % 10000n;
    const fracStr = fraction.toString().padStart(4, '0').slice(0, 4);
    const trimmed =
      fractionDigits >= 4
        ? fracStr
        : fracStr.slice(0, fractionDigits).padEnd(fractionDigits, '0');
    return `${negative ? '-' : ''}${whole.toString()}${trimmed ? `.${trimmed}` : ''}`;
  }

  toString(): string {
    return this.toFixed(2);
  }

  private static fromCents(cents: bigint): MoneyDecimal {
    return new MoneyDecimal('0', cents);
  }
}

export function toMoney(value: DecimalInput): MoneyDecimal {
  return new MoneyDecimal(value);
}

export function moneyZero(): MoneyDecimal {
  return MoneyDecimal.zero();
}
