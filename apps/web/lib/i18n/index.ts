import {
  defaultLocale,
  localeLabels,
  supportedLocales,
  type JourneyId,
  type Locale,
  type Messages,
  type PartnerTypeId,
} from './types';
import { enMessages } from './messages/en';
import { hiMessages } from './messages/hi';
import { mlMessages } from './messages/ml';
import { taMessages } from './messages/ta';

const catalog: Record<Locale, Messages> = {
  en: enMessages,
  ta: taMessages,
  hi: hiMessages,
  ml: mlMessages,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return (
    typeof value === 'string' &&
    (supportedLocales as readonly string[]).includes(value)
  );
}

export function getMessages(locale: Locale = defaultLocale): Messages {
  return catalog[locale] ?? catalog[defaultLocale];
}

export function getJourneyById(locale: Locale, journeyId: string) {
  return getMessages(locale).smartWelcome.journeys.find(
    (journey) => journey.id === journeyId,
  );
}

export {
  defaultLocale,
  localeLabels,
  supportedLocales,
  type JourneyId,
  type Locale,
  type Messages,
  type PartnerTypeId,
};
