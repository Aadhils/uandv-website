import { BusinessEcosystem } from './business-ecosystem';
import { FeaturedIndustries } from './featured-industries';
import { Hero } from './hero';
import { Process } from './process';
import { Technologies } from './technologies';
import { WhyChoose } from './why-choose';

export function LandingPage() {
  return (
    <div className="marketing-grain marketing-page-ambient relative w-full max-w-full overflow-x-clip bg-uv-background text-uv-foreground">
      <Hero />
      <WhyChoose />
      <BusinessEcosystem />
      <FeaturedIndustries />
      <Process />
      <Technologies />
    </div>
  );
}
