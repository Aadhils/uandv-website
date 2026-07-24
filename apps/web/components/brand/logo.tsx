import { cn } from '@uandv/ui';

import { siteConfig } from '@/lib/site';

type LogoProps = {
  className?: string;
  /** Kept for call-site compatibility; unused while text logo is temporary */
  markClassName?: string;
  showWordmark?: boolean;
  priority?: boolean;
  invert?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
};

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  hero: 'text-[2rem] leading-none sm:text-5xl md:text-6xl',
} as const;

/** Temporary text logo until an official logo file is provided. */
export function Logo({
  className,
  showWordmark = true,
  invert = false,
  size = 'md',
}: LogoProps) {
  if (!showWordmark) {
    return <span className="sr-only">{siteConfig.name}</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-[family-name:var(--font-uv-display)] font-bold tracking-tight text-uv-brand',
        sizeClasses[size],
        invert && 'text-white',
        className,
      )}
      aria-label={siteConfig.name}
    >
      {siteConfig.name}
    </span>
  );
}
