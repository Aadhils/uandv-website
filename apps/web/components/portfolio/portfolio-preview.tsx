import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { getFeaturedCaseStudies } from '@/lib/portfolio';

import { PortfolioCard } from './portfolio-card';

export function PortfolioPreview() {
  const featured = getFeaturedCaseStudies(4);

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio & Demo Center"
            title="Product demos across industries."
            description="Explore software solutions, business systems, and AI-powered products. Clearly marked placeholders — not live client claims."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((study, index) => (
            <Reveal key={study.slug} delayMs={index * 50}>
              <PortfolioCard study={study} />
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-12">
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
            >
              View Demo Center
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
