'use client';

import * as React from 'react';

import { cn, Input } from '@uandv/ui';

export type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
};

/**
 * Six-digit verification code UI with keyboard-friendly navigation.
 */
export function OtpInput({
  length = 6,
  value,
  onChange,
  error,
  disabled,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: OtpInputProps) {
  const digits = React.useMemo(() => {
    const cleaned = value.replace(/\D/g, '').slice(0, length);
    return Array.from({ length }, (_, index) => cleaned[index] ?? '');
  }, [value, length]);

  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const emit = (nextDigits: string[]) => {
    onChange(nextDigits.join(''));
  };

  const focusAt = (index: number) => {
    const el = inputsRef.current[index];
    el?.focus();
    el?.select();
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    emit(next);
    if (char && index < length - 1) focusAt(index + 1);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = '';
        emit(next);
      } else if (index > 0) {
        next[index - 1] = '';
        emit(next);
        focusAt(index - 1);
      }
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusAt(index - 1);
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);
    if (!pasted) return;
    const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
    emit(next);
    focusAt(Math.min(pasted.length, length - 1));
  };

  return (
    <div
      role="group"
      aria-label="Verification code"
      className="flex justify-between gap-2 sm:gap-3"
    >
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node;
          }}
          id={index === 0 ? id : undefined}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          error={error}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className={cn(
            'h-12 w-10 px-0 text-center text-lg font-semibold tabular-nums sm:h-12 sm:w-12',
          )}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
