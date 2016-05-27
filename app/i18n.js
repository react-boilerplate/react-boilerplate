/* eslint no-unused-vars: 0 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

import enTranslationMessages from 'translations/en.json';
import deTranslationMessages from 'translations/de.json';

export const appLocales = ['en', 'de'];

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

const formatTranslationMessages = (messages) => {
  const formattedMessages = {};
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage;
  }
  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  de: formatTranslationMessages(deTranslationMessages),
};
