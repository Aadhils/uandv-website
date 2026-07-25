import { LaunchFinalCta } from './launch-final-cta';
import { Hero } from './hero';
import { LaunchIndustrySolutions } from './launch-industry-solutions';
import { LaunchPartnerVoices } from './launch-partner-voices';
import { LaunchPortfolioShowcase } from './launch-portfolio-showcase';
import { LaunchProcess } from './launch-process';
import { LaunchServices } from './launch-services';
import { LaunchStats } from './launch-stats';
import { LaunchTrust } from './launch-trust';

export function LandingPage() {
  return (
    <div className="marketing-grain w-full max-w-full overflow-x-clip bg-uv-background text-uv-foreground">
      <Hero />
      <LaunchStats />
      <LaunchTrust />
      <LaunchServices />
      <LaunchIndustrySolutions />
      <LaunchProcess />
      <LaunchPartnerVoices />
      <LaunchPortfolioShowcase />
      <LaunchFinalCta />
    </div>
  );
}
