import {
  defaultGuideLanguage,
  type GuideLanguage,
  type JourneyId,
  type PartnerTypeId,
} from '@/lib/business-guide';

export type JourneyLeadContext = {
  journey: JourneyId;
  visitorType: string;
  partnerType?: PartnerTypeId;
  /** Guide conversation language (not website locale). */
  guideLanguage?: GuideLanguage;
  sourcePage?: string;
  cta?: 'continue' | 'consultation' | 'partner';
  interestSlug?: string;
  /** Optional discovery snapshot keys for contact prefill */
  discovery?: Record<string, string | undefined>;
};

export function buildContactHref(context: JourneyLeadContext) {
  const params = new URLSearchParams();
  params.set('journey', context.journey);
  params.set('visitorType', context.visitorType);
  if (context.partnerType) {
    params.set('partnerType', context.partnerType);
  }
  params.set('lang', context.guideLanguage ?? defaultGuideLanguage);
  params.set('source', context.sourcePage ?? '/');
  if (context.cta) {
    params.set('cta', context.cta);
  }
  if (context.interestSlug) {
    params.set('interest', context.interestSlug);
  }
  if (context.discovery) {
    for (const [key, value] of Object.entries(context.discovery)) {
      if (value) {
        params.set(key, value);
      }
    }
  }
  return `/contact?${params.toString()}`;
}
