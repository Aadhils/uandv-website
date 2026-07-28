/**
 * U&V Premium Design System — single source of truth for public marketing UI.
 * Import tokens in components; prefer Marketing* primitives over raw classes.
 */

/** Layout */
export const uvContainer =
  'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export const uvSectionBase = 'scroll-mt-20 border-b border-uv-border';

export const uvSectionPad = 'py-16 sm:py-24 lg:py-28';

export const uvSectionCompactPad = 'py-8 sm:py-10';

export const uvSectionTightPad = 'py-14 sm:py-20 lg:py-24';

export const uvSection = `${uvSectionBase} ${uvSectionPad}`;

export const uvSectionCompact = `${uvSectionBase} ${uvSectionCompactPad}`;

export const uvSectionTight = `${uvSectionBase} ${uvSectionTightPad}`;

/** Typography */
export const uvEyebrow =
  'text-xs font-semibold uppercase tracking-[0.16em] text-uv-brand sm:text-sm sm:tracking-[0.18em]';

export const uvHeroTitle =
  'break-words font-[family-name:var(--font-uv-display)] text-[1.875rem] font-bold leading-[1.08] tracking-tight text-uv-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]';

export const uvSectionTitle =
  'break-words font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight tracking-tight text-uv-foreground sm:text-3xl lg:text-4xl';

export const uvCardTitle =
  'font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl';

export const uvLead =
  'text-base leading-relaxed text-uv-foreground-muted sm:text-lg lg:text-xl';

export const uvBody =
  'text-sm leading-relaxed text-uv-foreground-muted sm:text-base';

/** Surfaces */
export const uvCard =
  'marketing-card-lift rounded-uv-xl border border-uv-border bg-uv-background p-5 shadow-uv-sm sm:p-6';

export const uvCardPremium =
  'marketing-glass marketing-card-lift marketing-card-premium marketing-gradient-border rounded-uv-2xl border border-uv-border/80 bg-uv-background p-5 shadow-uv-sm sm:p-6';

/** Standard interactive content card — solution pages, services, portfolio */
export const uvCardInteractive =
  'marketing-card-lift rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 shadow-uv-sm transition-colors hover:border-uv-brand/40 sm:p-6';

export const uvCardInteractiveSolid =
  'marketing-card-lift rounded-uv-xl border border-uv-border bg-uv-background p-5 shadow-uv-sm transition-colors hover:border-uv-brand/40 sm:p-6';

export const uvHeroIllustrationFrame =
  'marketing-hero-illustration-frame relative overflow-hidden rounded-uv-2xl shadow-[0_32px_80px_rgb(124_58_237_/_0.12)]';

export const uvBadge =
  'inline-flex items-center rounded-uv-full border border-uv-brand/20 bg-uv-brand-muted/50 px-3 py-1 text-xs font-medium tracking-wide text-uv-brand';

export const uvCtaPanel =
  'overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background-subtle px-6 py-10 sm:px-10 sm:py-12 lg:py-14';

/** Actions */
export const uvBtnPrimary =
  'marketing-btn-glow justify-center';

export const uvBtnOutline = 'justify-center';

export const uvHeroActions =
  'mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap';

export const uvStaggerBase = 40;
