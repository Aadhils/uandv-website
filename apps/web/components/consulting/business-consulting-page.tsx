import {

  MarketingContentPage,

  MarketingPageHero,

  MarketingPageHeroInner,

} from '@/components/marketing/marketing-page-hero';

import {

  MarketingButtonLink,

  MarketingEyebrow,

  MarketingHeroActions,

  MarketingHeroTitle,

  MarketingLead,

} from '@/components/marketing/marketing-primitives';

import {

  MarketingStandardHeroCopy,

  MarketingStandardHeroGrid,

  MarketingStandardHeroIllustration,

  marketingStandardHeroInnerClass,

} from '@/components/marketing/marketing-standard-hero';

import { Breadcrumbs } from '@/components/services/breadcrumbs';

import { contactInquiryHref } from '@/lib/site';



import { HeroScene } from './bs-cinema-art';

import { BsCinemaActs } from './bs-cinema';
import { BsSolutionGateway } from './bs-solution-gateway';



export function BusinessConsultingPage() {

  return (

    <MarketingContentPage className="bs-cinema-page">

      <MarketingPageHero className="marketing-content-hero-cinematic bs-hero-act min-h-0 lg:min-h-0">

        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>

          <Breadcrumbs

            items={[

              { label: 'Home', href: '/' },

              { label: 'Business Solutions' },

            ]}

          />



          <MarketingStandardHeroGrid>

            <MarketingStandardHeroCopy>

              <MarketingEyebrow>Your Business Growth Partner</MarketingEyebrow>

              <MarketingHeroTitle className="mt-5 text-[2.5rem] leading-[1.04] sm:text-5xl lg:text-[3.75rem]">

                We Don&apos;t Just Build Software. We Build Businesses.

              </MarketingHeroTitle>

              <MarketingLead className="mt-7 text-lg sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">

                If enquiries live in WhatsApp threads, follow-ups depend on

                memory, and growth feels harder than it should — you are not

                alone. U&amp;V helps business owners move from manual processes

                to organised, scalable growth — with a partner who stays after

                launch.

              </MarketingLead>

              <MarketingHeroActions className="mt-9">

                <MarketingButtonLink href={contactInquiryHref} size="lg">

                  Book a Free Consultation

                </MarketingButtonLink>

              </MarketingHeroActions>

            </MarketingStandardHeroCopy>



            <MarketingStandardHeroIllustration framed={false}>

              <div className="bs-hero-frame relative overflow-hidden rounded-uv-2xl shadow-[0_32px_80px_rgb(124_58_237_/_0.12)]">

                <HeroScene className="bs-float-panel" />

              </div>

            </MarketingStandardHeroIllustration>

          </MarketingStandardHeroGrid>

        </MarketingPageHeroInner>

      </MarketingPageHero>

      <BsSolutionGateway />

      <BsCinemaActs />

    </MarketingContentPage>

  );

}


