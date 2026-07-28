'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

import { uvCardInteractive } from '@/components/marketing/marketing-design-tokens';
import { Reveal } from '@/components/marketing/reveal';
import { contactInquiryHref } from '@/lib/site';
import { wuvServiceGroups } from '@/lib/wuv-services-groups';

import { WuvCenteredSection } from './wuv-split-section';

function ServiceCardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-xs">
      {children}
    </p>
  );
}

export function WuvServicesDiscovery() {
  return (
    <WuvCenteredSection
      id="services"
      ariaLabel="Services — choose your starting point"
      eyebrow="Choose your starting point"
      title="Every service solves a real business problem."
      intro="Select the area closest to your challenge. Open a service to see how we deliver it — or book a consultation and we will point you to the right starting point."
      tone="subtle"
      className="wuv-services-discovery"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:gap-4">
        {wuvServiceGroups.map((group, groupIndex) => (
          <Reveal key={group.id} delayMs={groupIndex * 60} variant="up">
            <details
              className="group wuv-service-group overflow-hidden rounded-uv-2xl border border-uv-border/80 bg-white shadow-uv-sm open:shadow-uv-md"
              open={groupIndex < 2}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0 text-left">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-xs">
                    Group {String.fromCharCode(65 + groupIndex)}
                  </p>
                  <h3 className="mt-0.5 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                    {group.title}
                  </h3>
                </div>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-border/80 bg-uv-background-subtle text-uv-foreground-muted transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  <Icon name="ChevronDown" size="sm" />
                </span>
              </summary>

              <div className="border-t border-uv-border/60 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.services.map((service, index) => (
                    <article
                      key={service.id}
                      className={cn(
                        uvCardInteractive,
                        'flex min-h-0 flex-col p-3.5 sm:p-4',
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                          <Icon name={service.icon} size="sm" />
                        </div>
                        <h4 className="pt-1 font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-uv-foreground sm:text-base">
                          {service.title}
                        </h4>
                      </div>

                      <div className="mt-3 flex flex-1 flex-col gap-2.5">
                        <div>
                          <ServiceCardLabel>The challenge</ServiceCardLabel>
                          <p className="mt-1 text-xs leading-relaxed text-uv-foreground-muted sm:text-sm">
                            {service.problem}
                          </p>
                        </div>
                        <div>
                          <ServiceCardLabel>What U&V provides</ServiceCardLabel>
                          <p className="mt-1 text-xs leading-relaxed text-uv-foreground sm:text-sm">
                            {service.outcome}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-1.5 border-t border-uv-border/70 pt-3">
                        <Link
                          href={service.detailHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-uv-brand transition-colors hover:text-uv-brand/80 uv-focus-ring sm:text-sm"
                        >
                          See how this helps
                          <Icon name="ArrowRight" size="sm" />
                        </Link>
                        <Link
                          href={contactInquiryHref}
                          className="text-xs font-medium text-uv-foreground-muted transition-colors hover:text-uv-brand uv-focus-ring sm:text-sm"
                        >
                          Book a free consultation
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </WuvCenteredSection>
  );
}
