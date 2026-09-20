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
                  'relative flex min-h-[7.5rem] cursor-pointer flex-col gap-2 rounded-uv-xl border-2 p-3.5 transition-colors sm:min-h-[9rem] sm:p-4',
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
                        'break-words font-[family-name:var(--font-uv-display)] text-sm font-semibold sm:text-base',
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
                    'text-xs leading-relaxed sm:pl-7 sm:text-sm',
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
      <div className="rounded-uv-lg border border-uv-brand/15 bg-uv-brand-muted/25 px-3 py-2.5 text-xs leading-relaxed text-uv-foreground-muted">
        Start with the role that best matches what you want to do today. More
        workspace roles can be added to the same U&amp;V identity later.
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-uv-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
