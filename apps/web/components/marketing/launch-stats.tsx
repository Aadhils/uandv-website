import { launchPlatformStats } from '@/lib/launch-content';

import { AnimatedStat } from './animated-stat';
import { Reveal } from './reveal';

export function LaunchStats() {
  return (
    <section
      aria-label="Platform highlights"
      className="relative border-b border-uv-border bg-uv-background py-12 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(124_58_237_/_0.06),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="marketing-glass marketing-gradient-border rounded-uv-2xl p-6 sm:p-10">
          <Reveal>
            <p className="text-center text-sm font-medium uppercase tracking-[0.16em] text-uv-brand">
              U&V at a glance
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
            {launchPlatformStats.map((stat, index) => (
              <Reveal key={stat.label} delayMs={index * 80}>
                <AnimatedStat
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  staticDisplay={
                    'staticDisplay' in stat ? stat.staticDisplay : undefined
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
