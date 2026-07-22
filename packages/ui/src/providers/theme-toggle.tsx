'use client';

import * as React from 'react';

import { Button } from '../components/button';
import { Icon } from '../components/icon';
import { cn } from '../lib/cn';
import { type Theme, useTheme } from './theme-provider';

export interface ThemeToggleProps {
  className?: string;
  /** `cycle` = icon button; `segmented` = Light / Dark / System */
  variant?: 'cycle' | 'segmented';
}

export function ThemeToggle({
  className,
  variant = 'cycle',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (variant === 'segmented') {
    const options: {
      value: Theme;
      label: string;
      icon: 'Sun' | 'Moon' | 'Settings';
    }[] = [
      { value: 'light', label: 'Light', icon: 'Sun' },
      { value: 'dark', label: 'Dark', icon: 'Moon' },
      { value: 'system', label: 'System', icon: 'Settings' },
    ];

    return (
      <div
        role="group"
        aria-label="Theme"
        className={cn(
          'inline-flex rounded-uv-lg border border-uv-border bg-uv-background-muted p-1',
          className,
        )}
        suppressHydrationWarning
      >
        {options.map((option) => {
          const active = mounted && theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-uv-md px-3 py-1.5 text-xs font-medium transition-colors uv-focus-ring',
                active
                  ? 'bg-uv-card text-uv-foreground shadow-uv-sm'
                  : 'text-uv-foreground-muted hover:text-uv-foreground',
              )}
              aria-pressed={active}
            >
              <Icon name={option.icon} size="sm" />
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const label = !mounted
    ? 'Theme'
    : theme === 'system'
      ? `System (${resolvedTheme})`
      : theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={mounted ? cycleTheme : undefined}
      className={cn(className)}
      aria-label={
        mounted ? `Current theme: ${label}. Click to change.` : 'Theme'
      }
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {mounted ? (
          <Icon name={resolvedTheme === 'dark' ? 'Moon' : 'Sun'} size="md" />
        ) : (
          <span className="h-5 w-5" aria-hidden />
        )}
      </span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}
