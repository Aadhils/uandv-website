'use client';

import { useCallback, useState, type ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  uvBody,
  uvCardTitle,
  uvContainer,
  uvEyebrow,
  uvSectionTitle,
} from '@/components/marketing/marketing-design-tokens';
import {
  MarketingButtonLink,
  MarketingHeroActions,
} from '@/components/marketing/marketing-primitives';
import { consultingProcess, growthServices, partnershipModel, whyChooseConsulting } from '@/lib/consulting';
import { contactInquiryHref } from '@/lib/site';

import {
  AfterScene,
  BeforeScene,
  GrowthBeatScene,
  PartnershipRoadmapVisual,
  ProcessStepScene,
  SignatureJourneyVisual,
  WhyHeroScene,
} from './bs-cinema-art';
import {
  CompareGuide,
  TransformationRibbon,
  VisualActBridge,
} from './bs-enhancements';

/** Shared Business Solutions surface + rhythm tokens */
const bsSectionPad = 'py-10 sm:py-12 lg:py-14';
const bsActBridge = 'mb-6 sm:mb-8';
const bsSurfaceCard =
  'overflow-hidden rounded-uv-2xl border border-uv-border/60 bg-uv-background shadow-uv-sm';
const bsStepMeta = 'text-xs font-bold uppercase tracking-[0.18em] text-uv-brand sm:text-sm';

function Section({
  id,
  tone = 'light',
  className,
  children,
  'aria-label': ariaLabel,
}: {
  id?: string;
  tone?: 'light' | 'mist' | 'sky';
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'relative overflow-hidden scroll-mt-20',
        tone === 'light' && 'bg-uv-background',
        tone === 'mist' && 'bg-uv-background-subtle',
        tone === 'sky' && 'bg-gradient-to-b from-white via-[#f4f9ff] to-[#f8f5ff]',
        className,
      )}
    >
      <div className="bs-section-crest pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-uv-brand/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(124_58_237_/_0.04),transparent_55%)]" />
      <div className={cn(uvContainer, 'relative')}>{children}</div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
  immediate = false,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  align?: 'center' | 'left';
  immediate?: boolean;
}) {
  return (
    <Reveal
      variant="up-blur"
      immediate={immediate}
      className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}
    >
      <p className={uvEyebrow}>{eyebrow}</p>
      <h2 className={cn(uvSectionTitle, 'mt-3 sm:mt-4')}>{title}</h2>
      <p className={cn(uvBody, 'mt-4 sm:mt-5')}>{description}</p>
    </Reveal>
  );
}

function ProcessJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const step = consultingProcess[activeStep]!;
  const total = consultingProcess.length;

  const goPrev = useCallback(() => setActiveStep((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setActiveStep((i) => Math.min(total - 1, i + 1)), [total]);

  return (
    <Section id="process" tone="mist" className={bsSectionPad} aria-label="Business challenges and consulting framework">
      <SectionIntro
        align="left"
        immediate
        eyebrow="Sound familiar?"
        title="Spreadsheets, scattered enquiries, and tools that never quite fit how you work."
        description="Most owners do not need another software pitch — they need clarity on what to fix first. We start with your reality, then guide you from manual workarounds to systems that support real growth."
        className="lg:max-w-2xl"
      />

      <Reveal variant="scale" immediate className="mt-10 sm:mt-12">
        <SignatureJourneyVisual />
      </Reveal>

      {/* Desktop: sticky narrative + step story */}
      <div className="mt-12 hidden gap-12 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-1">
          <ol className="space-y-1.5" aria-label="Consulting process steps">
            {consultingProcess.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-uv-xl px-3 py-3 text-left transition-all duration-200 uv-focus-ring',
                    i === activeStep
                      ? 'bg-uv-background shadow-uv-sm ring-1 ring-uv-brand/20'
                      : 'hover:bg-uv-background/70',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                      i === activeStep ? 'bg-uv-brand text-white' : 'bg-uv-brand-muted text-uv-brand',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className={cn('block text-sm font-semibold leading-snug sm:text-[0.9375rem]', i === activeStep ? 'text-uv-foreground' : 'text-uv-foreground-muted')}>
                      {s.title}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0">
          <div className={bsSurfaceCard}>
            <div className="h-[220px] border-b border-uv-border/40 sm:h-[248px]">
              <ProcessStepScene index={activeStep} />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name={step.icon} size="md" />
                </span>
                <p className={bsStepMeta}>
                  Step {String(activeStep + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
                </p>
              </div>
              <h3 key={step.title} className={cn(uvCardTitle, 'bs-film-fade mt-4')}>
                {step.title}
              </h3>
              <p key={step.description} className={cn(uvBody, 'bs-film-fade mt-3')}>
                {step.description}
              </p>
            </div>
          </div>
          <div className="mt-5 flex gap-1" role="presentation" aria-hidden>
            {consultingProcess.map((_, i) => (
              <span
                key={i}
                className={cn('h-1 flex-1 rounded-full transition-colors duration-300', i <= activeStep ? 'bg-uv-brand' : 'bg-uv-border')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet: single-step carousel */}
      <div className="mt-8 md:mt-10 lg:hidden">
        <div className={bsSurfaceCard}>
          <div className="h-[200px] border-b border-uv-border/40 sm:h-[228px]">
            <ProcessStepScene index={activeStep} />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name={step.icon} size="sm" />
                </span>
                <p className={bsStepMeta}>
                  Step {String(activeStep + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeStep === 0}
                  aria-label="Previous step"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-uv-border bg-uv-background text-uv-foreground transition-opacity disabled:opacity-40 uv-focus-ring"
                >
                  <Icon name="ChevronLeft" size="sm" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeStep === total - 1}
                  aria-label="Next step"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-uv-border bg-uv-background text-uv-foreground transition-opacity disabled:opacity-40 uv-focus-ring"
                >
                  <Icon name="ChevronRight" size="sm" />
                </button>
              </div>
            </div>
            <h3 className={cn(uvCardTitle, 'mt-4')}>{step.title}</h3>
            <p className={cn(uvBody, 'mt-3')}>{step.description}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          {consultingProcess.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              aria-current={i === activeStep ? 'step' : undefined}
              onClick={() => setActiveStep(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-200',
                i === activeStep ? 'w-6 bg-uv-brand' : 'w-2 bg-uv-border',
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function GrowthBlocks() {
  return (
    <>
      <Section id="growth-services" tone="light" className="border-t border-uv-border/40 pb-2 pt-10 sm:pb-4 sm:pt-12" aria-label="Business growth consulting areas">
        <VisualActBridge className={bsActBridge} />
        <SectionIntro
          eyebrow="Real results for real businesses"
          title="From daily frustration to measurable growth."
          description="Each area below starts with a conversation about where you are stuck today — then we help you move toward outcomes you can see in your operations, revenue, and peace of mind."
        />
      </Section>

      {growthServices.map((service, index) => {
        const visualLeft = index % 2 === 0;
        return (
          <Section
            key={service.title}
            tone={index % 2 === 0 ? 'light' : 'mist'}
            className={cn('border-t border-uv-border/30', index === growthServices.length - 1 ? 'pb-10 sm:pb-12' : 'pb-8 sm:pb-10', 'pt-8 sm:pt-10')}
          >
            <div className={cn('grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16', !visualLeft && 'lg:[direction:rtl]')}>
              <Reveal variant="scale" className="min-w-0 lg:[direction:ltr]">
                <GrowthBeatScene index={index} className="bs-float-panel mx-auto w-full max-w-md lg:max-w-lg" />
              </Reveal>
              <Reveal delayMs={60} variant="up" className={cn('min-w-0 lg:[direction:ltr]', index % 2 === 0 ? 'bs-growth-accent' : 'bs-growth-accent-alt')}>
                <p className="font-[family-name:var(--font-uv-display)] text-4xl font-bold leading-none text-uv-brand/12 sm:text-5xl" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className={cn(uvCardTitle, 'mt-3')}>{service.title}</h3>
                <p className={cn(uvBody, 'mt-4 max-w-prose')}>{service.description}</p>
              </Reveal>
            </div>
          </Section>
        );
      })}
    </>
  );
}

function BeforeAfterSection() {
  const [compare, setCompare] = useState(50);
  const [mobileTab, setMobileTab] = useState<'before' | 'after'>('before');

  return (
    <Section tone="sky" className={cn(bsSectionPad, 'bs-section-emphasis')} aria-label="Before and after business transformation">
      <VisualActBridge className={bsActBridge} />
      <div className="mx-auto mb-8 flex max-w-5xl flex-col items-center gap-3 sm:mb-10">
        <TransformationRibbon />
      </div>
      <Reveal variant="scale" className="mx-auto hidden max-w-5xl md:block">
        <CompareGuide className="mb-4" />
        <div className={cn(bsSurfaceCard, 'relative aspect-[16/10] w-full')}>
          <div className="absolute left-4 top-4 z-10 rounded-uv-full border border-uv-border/50 bg-uv-background/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-uv-navy-blue shadow-uv-sm">
            Before
          </div>
          <div className="absolute right-4 top-4 z-10 rounded-uv-full bg-uv-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-uv-sm">
            After — U&amp;V
          </div>
          <BeforeScene />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>
            <AfterScene className="h-full" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 z-[5] w-0.5 bg-uv-brand shadow-[0_0_16px_rgb(124_58_237_/_0.35)]" style={{ left: `${compare}%` }} />
          <label className="sr-only" htmlFor="bs-compare">Before and after comparison</label>
          <input
            id="bs-compare"
            type="range"
            min={8}
            max={92}
            value={compare}
            onChange={(e) => setCompare(Number(e.target.value))}
            className="bs-compare-range-light absolute inset-x-6 bottom-5 z-10"
          />
        </div>
      </Reveal>

      <Reveal variant="scale" className="md:hidden">
        <div className="mb-4 flex rounded-uv-xl border border-uv-border/60 bg-uv-background p-1 shadow-uv-sm">
          <button
            type="button"
            onClick={() => setMobileTab('before')}
            className={cn(
              'flex-1 rounded-uv-lg py-2.5 text-sm font-semibold transition-colors uv-focus-ring',
              mobileTab === 'before' ? 'bg-uv-background-subtle text-uv-navy-blue' : 'text-uv-foreground-muted',
            )}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('after')}
            className={cn(
              'flex-1 rounded-uv-lg py-2.5 text-sm font-semibold transition-colors uv-focus-ring',
              mobileTab === 'after' ? 'bg-uv-brand text-white' : 'text-uv-foreground-muted',
            )}
          >
            After — U&amp;V
          </button>
        </div>
        <div className={cn(bsSurfaceCard, 'aspect-[4/3]')}>
          {mobileTab === 'before' ? <BeforeScene className="relative h-full" /> : <AfterScene />}
        </div>
      </Reveal>
    </Section>
  );
}

function WhySection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="why-uandv" tone="light" className={bsSectionPad} aria-label="Why clients choose U and V">
      <VisualActBridge className={bsActBridge} />
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:gap-14">
        <Reveal variant="up-blur">
          <p className={uvEyebrow}>Why clients choose U&amp;V</p>
          <h2 className={cn(uvSectionTitle, 'mt-3 sm:mt-4')}>
            Someone in your corner — not another vendor who vanishes after launch.
          </h2>
          <p className={cn(uvBody, 'mt-4 max-w-xl sm:mt-5')}>
            You deserve advice rooted in your business, not a catalogue of features. We stay accountable after go-live, think commercially before we build, and keep strategy and delivery under one roof.
          </p>
        </Reveal>
        <Reveal delayMs={80} variant="scale">
          <WhyHeroScene className="bs-float-panel mx-auto w-full max-w-sm lg:max-w-md" />
        </Reveal>
      </div>

      <div className="relative mt-10 sm:mt-12">
        <div className="absolute bottom-6 left-3 top-6 hidden w-px bg-gradient-to-b from-uv-brand/35 via-uv-brand/12 to-transparent sm:block" aria-hidden />
        <ol className="divide-y divide-uv-border/50">
          {whyChooseConsulting.map((item, index) => {
            const active = hovered === index;
            return (
              <Reveal key={item.title} delayMs={index * 40} variant="up">
                <li
                  className={cn(
                    'group relative py-6 transition-colors duration-200 sm:py-8 sm:pl-12',
                    active && 'bg-uv-brand-muted/25',
                  )}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className={cn(
                      'absolute left-0 top-9 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-200 sm:block',
                      active ? 'scale-125 border-uv-brand bg-uv-brand shadow-[0_0_0_6px_rgb(124_58_237_/_0.12)]' : 'border-uv-brand/25 bg-uv-background',
                    )}
                    aria-hidden
                  />
                  <p className={bsStepMeta}>{String(index + 1).padStart(2, '0')}</p>
                  <h3 className={cn(uvCardTitle, 'mt-2 transition-colors duration-200 group-hover:text-uv-brand')}>
                    {item.title}
                  </h3>
                  <p className={cn(uvBody, 'mt-3 max-w-2xl')}>{item.description}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function PartnershipSection() {
  return (
    <Section id="partnership" tone="mist" className={cn(bsSectionPad, 'border-b-0')} aria-label="Long-term partnership model">
      <VisualActBridge className={bsActBridge} />
      <SectionIntro
        eyebrow="After launch"
        title="Growth does not stop when the project goes live."
        description="The businesses that win are the ones that keep improving — turning early wins into habits, then into scalable systems. That is where our long-term partnership begins."
      />

      <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(180px,200px)_minmax(0,1fr)] lg:items-start lg:gap-14">
        <PartnershipRoadmapVisual className="mx-auto hidden lg:block" />
        <ol className="grid gap-5 sm:gap-6">
          {partnershipModel.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 50} variant="up">
              <li className="relative flex gap-4 sm:gap-5">
                <div className="flex flex-col items-center lg:hidden">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-uv-brand text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  {index < partnershipModel.length - 1 ? (
                    <span className="mt-2 w-px flex-1 bg-uv-brand/20" aria-hidden />
                  ) : null}
                </div>
                <div className={cn(bsSurfaceCard, 'min-w-0 flex-1 p-5 sm:p-6')}>
                  <p className={cn(bsStepMeta, 'hidden lg:block')}>
                    Stage {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className={cn(uvCardTitle, 'lg:mt-2')}>{item.title}</h3>
                  <p className={cn(uvBody, 'mt-3')}>{item.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function JourneyTransition() {
  return (
    <Section id="next-step" tone="mist" className="border-b-0 py-10 sm:py-12" aria-label="Continue your journey">
      <div className="mx-auto max-w-2xl text-center">
        <p className={cn(uvBody, 'text-uv-foreground-muted sm:text-base')}>
          Ready to continue your journey?
        </p>
        <MarketingHeroActions className="mt-6 justify-center">
          <MarketingButtonLink href={contactInquiryHref} size="lg">
            Book a Free Consultation
          </MarketingButtonLink>
        </MarketingHeroActions>
      </div>
    </Section>
  );
}

export function BsCinemaActs() {
  return (
    <div className="overflow-x-hidden">
      <ProcessJourney />
      <GrowthBlocks />
      <BeforeAfterSection />
      <WhySection />
      <PartnershipSection />
      <JourneyTransition />
    </div>
  );
}
