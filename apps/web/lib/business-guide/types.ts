/**
 * Multilingual Business Guide — not site i18n.
 * The marketing website stays English; only this guided consultant experience
 * switches language for a natural, reassuring conversation.
 */

export const guideLanguages = ['en', 'ta', 'hi', 'ml'] as const;

export type GuideLanguage = (typeof guideLanguages)[number];

export const defaultGuideLanguage: GuideLanguage = 'en';

/** Native labels shown on the language picker (always in that language). */
export const guideLanguageNativeLabels: Record<GuideLanguage, string> = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
  ml: 'മലയാളം',
};

export const guideLanguageEnglishLabels: Record<GuideLanguage, string> = {
  en: 'English',
  ta: 'Tamil',
  hi: 'Hindi',
  ml: 'Malayalam',
};

export type JourneyId =
  | 'start-new-business'
  | 'grow-existing-business'
  | 'build-software-or-app'
  | 'automate-with-ai'
  | 'partner-with-uandv';

export type PartnerTypeId =
  | 'technology-partner'
  | 'freelancer-developer'
  | 'marketing-partner'
  | 'vendor-service-provider'
  | 'referral-partner'
  | 'investor-strategic-partner';

export type GuideStep = {
  id: string;
  label: string;
  /** Short consultant note — how we help at this step */
  coachNote: string;
};

export type GuidePartnerOption = {
  id: PartnerTypeId;
  label: string;
  description: string;
};

export type GuideJourney = {
  id: JourneyId;
  title: string;
  description: string;
  icon: string;
  interestSlug: string;
  visitorType: string;
  /** Spoken like a consultant opening the conversation for this path */
  consultantIntro: string;
  reassurance: string;
  steps?: GuideStep[];
  partnerTypes?: GuidePartnerOption[];
};

export type BusinessGuideCopy = {
  language: GuideLanguage;
  /** Small badge above the guide */
  badge: string;
  languagePrompt: string;
  languageHelper: string;
  greeting: string;
  question: string;
  scrollHint: string;
  panelEyebrow: string;
  stepsLabel: string;
  partnerPrompt: string;
  nextStepPrompt: string;
  clearSelection: string;
  changeLanguage: string;
  ctaContinue: string;
  ctaConsultation: string;
  ctaPartner: string;
  journeys: GuideJourney[];
};
