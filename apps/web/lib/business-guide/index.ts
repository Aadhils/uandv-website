import {
  defaultGuideLanguage,
  guideLanguageEnglishLabels,
  guideLanguageNativeLabels,
  guideLanguages,
  type BusinessGuideCopy,
  type GuideLanguage,
  type JourneyId,
  type PartnerTypeId,
} from './types';
import { enGuide } from './guides/en';
import { hiGuide } from './guides/hi';
import { mlGuide } from './guides/ml';
import { taGuide } from './guides/ta';

const catalog: Record<GuideLanguage, BusinessGuideCopy> = {
  en: enGuide,
  ta: taGuide,
  hi: hiGuide,
  ml: mlGuide,
};

export function isGuideLanguage(
  value: string | null | undefined,
): value is GuideLanguage {
  return (
    typeof value === 'string' &&
    (guideLanguages as readonly string[]).includes(value)
  );
}

export function getBusinessGuide(
  language: GuideLanguage = defaultGuideLanguage,
): BusinessGuideCopy {
  return catalog[language] ?? catalog[defaultGuideLanguage];
}

export function getGuideJourney(language: GuideLanguage, journeyId: string) {
  return getBusinessGuide(language).journeys.find(
    (journey) => journey.id === journeyId,
  );
}

export {
  defaultGuideLanguage,
  guideLanguageEnglishLabels,
  guideLanguageNativeLabels,
  guideLanguages,
  type BusinessGuideCopy,
  type GuideLanguage,
  type JourneyId,
  type PartnerTypeId,
};
