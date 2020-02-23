/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import * as defaultTranslationMessages from 'translations/en.json';
import { DEFAULT_LOCALE } from './locales';

const enTranslationMessages = () => import('translations/en.json');
const deTranslationMessages = () => import('translations/de.json');

export const translationMessages = {
  en: enTranslationMessages,
  de: deTranslationMessages,
};

/**
 * Loads messages for a given locale asynchronously.  This way, the browser
 * only receives the translations that it needs.
 *
 * @param locale
 */
export const fetchMessages = locale =>
  translationMessages[locale]().then(({ default: messages }) =>
    formatTranslationMessages(locale, messages),
  );

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, defaultTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const defaultMessages = defaultTranslationMessages;
