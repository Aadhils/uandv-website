'use client';

import { Icon, Radio, RadioGroup, cn } from '@uandv/ui';

import {
  SIGNUP_ACCOUNT_TYPES,
  type SignupAccountType,
} from '@/lib/auth';

export type AccountTypeSelectorProps = {
  value: SignupAccountType | '';
  onChange: (value: SignupAccountType) => void;
  error?: string;
  name?: string;
};

export function AccountTypeSelector({
  value,
  onChange,
  error,
  name = 'accountType',
}: AccountTypeSelectorProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="space-y-2">
      <RadioGroup
        legend="Account type"
        aria-required
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {SIGNUP_ACCOUNT_TYPES.map((type) => {
            const selected = value === type.value;
            return (
              <label
                key={type.value}
                className={cn(
                  'relative flex min-h-[8.5rem] cursor-pointer flex-col gap-2 rounded-uv-xl border-2 p-4 transition-colors',
                  'focus-within:ring-2 focus-within:ring-uv-brand/45 focus-within:ring-offset-2 focus-within:ring-offset-uv-background',
                  selected
                    ? 'border-uv-brand bg-uv-brand/15 shadow-[0_0_0_1px_rgb(124_58_237_/_0.35)]'
                    : 'border-uv-border bg-uv-background hover:border-uv-brand/45 hover:bg-uv-brand-muted/30',
                  error && !selected ? 'border-uv-error/50' : null,
                )}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Radio
                      name={name}
                      value={type.value}
                      checked={selected}
                      onChange={() => onChange(type.value)}
                      aria-label={type.label}
                    />
                    <span
                      className={cn(
                        'font-[family-name:var(--font-uv-display)] text-base font-semibold',
                        selected ? 'text-uv-brand' : 'text-uv-foreground',
                      )}
                    >
                      {type.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                      selected
                        ? 'border-uv-brand bg-uv-brand text-white'
                        : 'border-uv-border bg-uv-background text-transparent',
                    )}
                    aria-hidden
                  >
                    <Icon name="Check" size="sm" />
                  </span>
                </span>
                <span
                  className={cn(
                    'pl-7 text-sm leading-relaxed',
                    selected
                      ? 'text-uv-foreground'
                      : 'text-uv-foreground-muted',
                  )}
                >
                  {type.description}
                </span>
              </label>
            );
          })}
        </div>
      </RadioGroup>
      <p className="text-xs text-uv-foreground-subtle">
        One identity can hold multiple workspace roles later. Employee and Admin
        access will be added separately.
      </p>
      {error ? (
        <p id={errorId} className="text-xs text-uv-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
