/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { DEFAULT_LOCALE } from '../app/containers/App/constants';


import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';

export { appLocales } from '../app/containers/App/constants';

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
};
