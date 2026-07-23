import { Contact } from './contact';
import { Faq } from './faq';
import { Hero } from './hero';
import { Industries } from './industries';
import { Outcomes } from './outcomes';
import { Process } from './process';
import { Services } from './services';
import { Technologies } from './technologies';
import { WhyChoose } from './why-choose';

export function LandingPage() {
  return (
    <div className="marketing-grain w-full max-w-full overflow-x-clip bg-uv-background text-uv-foreground">
      <Hero />
      <Services />
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
