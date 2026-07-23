'use client';

import * as React from 'react';

import { Icon, Input, Label, cn, type InputProps } from '@uandv/ui';

export type PasswordFieldProps = Omit<InputProps, 'type' | 'error'> & {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
};

/**
 * Accessible password input with show/hide control.
 * Never logs or persists the value.
 */
export function PasswordField({
  label,
  required,
  hint,
  error,
  className,
  id,
  autoComplete = 'current-password',
  ...props
}: PasswordFieldProps) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          error={Boolean(error)}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(' ') || undefined
          }
          className={cn('pr-11', className)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-uv-md text-uv-foreground-muted transition-colors hover:bg-uv-background-muted hover:text-uv-foreground uv-focus-ring"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          <Icon name={visible ? 'EyeOff' : 'Eye'} size="sm" />
        </button>
      </div>
      {hint && !error ? (
        <p id={hintId} className="uv-caption">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-uv-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
