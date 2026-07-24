'use client';

import { buttonVariants, cn, Icon, Input, Textarea, type IconName } from '@uandv/ui';

import type {
  WizardAnswerValue,
  WizardOption,
  WizardQuestion,
} from '@/lib/discovery-wizard';

type WizardQuestionFieldProps = {
  question: WizardQuestion;
  value: WizardAnswerValue | undefined;
  onChange: (value: WizardAnswerValue) => void;
  error?: string | null;
};

function ChoiceButton({
  option,
  selected,
  multi,
  onToggle,
  index,
}: {
  option: WizardOption;
  selected: boolean;
  multi?: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onToggle}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      className={cn(
        'wizard-option-card group flex min-w-0 w-full items-start gap-3 rounded-uv-xl border px-4 py-3.5 text-left uv-focus-ring',
        selected
          ? 'border-uv-brand bg-uv-brand/25 text-white shadow-[0_0_0_1px_rgb(124_58_237_/_0.35)]'
          : 'border-white/15 bg-white/5 text-[#EDE9FE] hover:border-uv-brand/45 hover:bg-white/10',
      )}
    >
      {option.icon ? (
        <span
          className={cn(
            'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg transition-colors',
            selected
              ? 'bg-uv-brand text-white'
              : 'bg-white/10 text-[#C4B5FD] group-hover:bg-uv-brand/30 group-hover:text-white',
          )}
        >
          <Icon name={option.icon as IconName} size="sm" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block break-words text-sm font-medium sm:text-base">
          {option.label}
        </span>
        {option.description ? (
          <span className="mt-1 block break-words text-xs leading-relaxed text-[#C4B5FD]">
            {option.description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function WizardQuestionField({
  question,
  value,
  onChange,
  error,
}: WizardQuestionFieldProps) {
  const options = question.options ?? [];
  const selectedIds = Array.isArray(value)
    ? value
    : typeof value === 'string' && value
      ? [value]
      : [];

  const errorId = error ? `${question.id}-error` : undefined;

  if (
    question.type === 'single_select' ||
    question.type === 'yes_no' ||
    question.type === 'budget_range' ||
    question.type === 'timeline' ||
    question.type === 'location'
  ) {
    return (
      <div
        role="radiogroup"
        aria-labelledby={`${question.id}-label`}
        aria-describedby={errorId}
        className="grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {options.map((option, index) => (
          <ChoiceButton
            key={option.id}
            option={option}
            selected={value === option.id}
            onToggle={() => onChange(option.id)}
            index={index}
          />
        ))}
      </div>
    );
  }

  if (question.type === 'multi_select' || question.type === 'tag_select') {
    return (
      <div
        role="group"
        aria-labelledby={`${question.id}-label`}
        aria-describedby={errorId}
        className="grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {options.map((option, index) => {
          const selected = selectedIds.includes(option.id);
          return (
            <ChoiceButton
              key={option.id}
              option={option}
              selected={selected}
              multi
              index={index}
              onToggle={() => {
                if (selected) {
                  onChange(selectedIds.filter((id) => id !== option.id));
                } else {
                  onChange([...selectedIds, option.id]);
                }
              }}
            />
          );
        })}
      </div>
    );
  }

  if (question.type === 'long_text') {
    return (
      <Textarea
        id={question.id}
        aria-labelledby={`${question.id}-label`}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={question.placeholder}
        rows={4}
        className="min-h-28 w-full max-w-full border-white/20 bg-black/20 text-white placeholder:text-white/40"
      />
    );
  }

  if (question.type === 'numeric') {
    return (
      <Input
        id={question.id}
        type="number"
        aria-labelledby={`${question.id}-label`}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        value={
          typeof value === 'number'
            ? value
            : value === null
              ? ''
              : String(value ?? '')
        }
        onChange={(event) => {
          const next = event.target.value;
          onChange(next === '' ? null : Number(next));
        }}
        min={question.min}
        max={question.max}
        placeholder={question.placeholder}
        className="w-full max-w-full border-white/20 bg-black/20 text-white placeholder:text-white/40"
      />
    );
  }

  return (
    <Input
      id={question.id}
      aria-labelledby={`${question.id}-label`}
      aria-describedby={errorId}
      aria-invalid={Boolean(error)}
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder={question.placeholder}
      maxLength={question.maxLength}
      className="w-full max-w-full border-white/20 bg-black/20 text-white placeholder:text-white/40"
    />
  );
}

export function WizardNavButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        buttonVariants({
          size: 'lg',
          variant:
            variant === 'primary'
              ? 'primary'
              : variant === 'outline'
                ? 'outline'
                : 'ghost',
        }),
        'w-full max-w-full justify-center sm:w-auto',
        variant === 'outline' &&
          'border-white/40 bg-transparent text-white hover:bg-white/10',
        variant === 'ghost' &&
          'text-[#C4B5FD] hover:bg-white/10 hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}
