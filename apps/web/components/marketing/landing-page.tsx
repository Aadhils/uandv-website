import { Contact } from './contact';
import { Faq } from './faq';
import { Hero } from './hero';
import { Industries } from './industries';
import { Outcomes } from './outcomes';
import { Process } from './process';
import { Services } from './services';
import { Technologies } from './technologies';
import { WhyChoose } from './why-choose';
import { PortfolioPreview } from '@/components/portfolio/portfolio-preview';

export function LandingPage() {
  return (
    <div className="marketing-grain bg-uv-background text-uv-foreground">
      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyChoose />
      <Industries />
      <Process />
      <Technologies />
      <Outcomes />
      <Faq />
      <Contact />
    </div>
  );
}
