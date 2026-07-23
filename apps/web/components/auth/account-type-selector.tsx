'use client';

import { Radio, RadioGroup, cn } from '@uandv/ui';

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
                  'flex cursor-pointer flex-col gap-2 rounded-uv-xl border p-4 transition-colors',
                  selected
                    ? 'border-uv-brand bg-uv-brand-muted/60'
                    : 'border-uv-border bg-uv-background hover:border-uv-brand/40',
                )}
              >
                <span className="flex items-center gap-2">
                  <Radio
                    name={name}
                    value={type.value}
                    checked={selected}
                    onChange={() => onChange(type.value)}
                    aria-label={type.label}
                  />
                  <span className="text-sm font-medium text-uv-foreground">
                    {type.label}
                  </span>
                </span>
                <span className="pl-6 text-xs leading-relaxed text-uv-foreground-muted">
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
