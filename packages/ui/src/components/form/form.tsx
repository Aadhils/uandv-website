'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('uv-label text-uv-foreground', className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-uv-error" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  ),
);

Label.displayName = 'Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-uv-lg border bg-uv-input px-4 py-2 text-sm text-uv-foreground placeholder:text-uv-foreground-subtle uv-focus-ring disabled:cursor-not-allowed disabled:bg-uv-disabled disabled:text-uv-disabled-foreground',
        error ? 'border-uv-error' : 'border-uv-input-border',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-24 w-full rounded-uv-lg border bg-uv-input px-4 py-3 text-sm text-uv-foreground placeholder:text-uv-foreground-subtle uv-focus-ring disabled:cursor-not-allowed disabled:bg-uv-disabled disabled:text-uv-disabled-foreground',
        error ? 'border-uv-error' : 'border-uv-input-border',
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-11 w-full appearance-none rounded-uv-lg border bg-uv-input px-4 py-2 text-sm text-uv-foreground uv-focus-ring disabled:cursor-not-allowed disabled:bg-uv-disabled disabled:text-uv-disabled-foreground',
        error ? 'border-uv-error' : 'border-uv-input-border',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-uv-input-border text-uv-brand uv-focus-ring',
            className,
          )}
          {...props}
        />
        {label ? (
          <Label htmlFor={inputId} className="font-normal">
            {label}
          </Label>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={cn(
            'h-4 w-4 border-uv-input-border text-uv-brand uv-focus-ring',
            className,
          )}
          {...props}
        />
        {label ? (
          <Label htmlFor={inputId} className="font-normal">
            {label}
          </Label>
        ) : null}
      </div>
    );
  },
);

Radio.displayName = 'Radio';

export interface RadioGroupProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
  legend,
  orientation = 'vertical',
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <fieldset className={cn('min-w-0 border-0 p-0', className)} {...props}>
      {legend ? <legend className="uv-label mb-3">{legend}</legend> : null}
      <div
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  className,
  disabled,
  id,
  ...props
}: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;
  const [uncontrolled, setUncontrolled] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : uncontrolled;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 uv-focus-ring disabled:cursor-not-allowed disabled:opacity-50',
          isOn ? 'bg-uv-brand' : 'bg-uv-border-strong',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-uv-sm transition-transform duration-200',
            isOn ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
      {label ? (
        <Label htmlFor={switchId} className="font-normal">
          {label}
        </Label>
      ) : null}
    </div>
  );
}

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function InputGroup({
  className,
  startAdornment,
  endAdornment,
  children,
  ...props
}: InputGroupProps) {
  return (
    <div className={cn('relative flex w-full items-center', className)} {...props}>
      {startAdornment ? (
        <span className="pointer-events-none absolute left-3 inline-flex text-uv-foreground-subtle">
          {startAdornment}
        </span>
      ) : null}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ className?: string }>, {
            className: cn(
              (children as React.ReactElement<{ className?: string }>).props
                .className,
              startAdornment && 'pl-10',
              endAdornment && 'pr-10',
            ),
          })
        : children}
      {endAdornment ? (
        <span className="absolute right-3 inline-flex text-uv-foreground-subtle">
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  description?: string;
}

export function Fieldset({
  legend,
  description,
  className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        'rounded-uv-xl border border-uv-border p-6 disabled:opacity-60',
        className,
      )}
      {...props}
    >
      {legend ? (
        <legend className="uv-h6 px-1 text-uv-foreground">{legend}</legend>
      ) : null}
      {description ? (
        <p className="mb-4 uv-body-sm text-uv-foreground-muted">{description}</p>
      ) : null}
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  const generatedId = React.useId();
  const fieldId = htmlFor ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      ) : null}
      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<Record<string, unknown>>,
            {
              id: fieldId,
              'aria-describedby':
                [hintId, errorId].filter(Boolean).join(' ') || undefined,
              'aria-invalid': error ? true : undefined,
              error: Boolean(error),
            },
          )
        : children}
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

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

export function Form({
  className,
  spacing = 'md',
  children,
  ...props
}: FormProps) {
  const spacingClass = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }[spacing];

  return (
    <form className={cn('flex flex-col', spacingClass, className)} {...props}>
      {children}
    </form>
  );
}
