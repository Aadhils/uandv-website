export const supportedLocales = ['en', 'ta', 'hi', 'ml'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
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

export type JourneyStep = {
  id: string;
  label: string;
};

export type JourneyCardCopy = {
  id: JourneyId;
  title: string;
  description: string;
  /** Lucide icon name registered in @uandv/ui */
  icon: string;
  /** Maps to contact form interest slug */
  interestSlug: string;
  visitorType: string;
  steps?: JourneyStep[];
  partnerTypes?: Array<{ id: PartnerTypeId; label: string; description: string }>;
};

export type SmartWelcomeMessages = {
  brandEyebrow: string;
  heading: string;
  supportingText: string;
  question: string;
  panelTitle: string;
  partnerPrompt: string;
  stepsLabel: string;
  ctaContinue: string;
  ctaConsultation: string;
  ctaPartner: string;
  scrollHint: string;
  languageHint: string;
  journeys: JourneyCardCopy[];
};

export type Messages = {
  locale: Locale;
  smartWelcome: SmartWelcomeMessages;
};
