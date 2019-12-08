/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

const { addLocaleData } = require('react-intl');
const enLocaleData = require('react-intl/locale-data/en');
const deLocaleData = require('react-intl/locale-data/de');
const frLocaleData = require('react-intl/locale-data/fr');
const { DEFAULT_LOCALE } = require('./locales');

const enTranslationMessages = require('./translations/en.json');
const deTranslationMessages = require('./translations/de.json');
const frTranslationMessages = require('./translations/fr.json');

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(frLocaleData);

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
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

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
};

exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
