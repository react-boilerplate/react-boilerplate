/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

const enTranslationMessages = require('./translations/en.json');
const deTranslationMessages = require('./translations/de.json');

const {shouldPolyfill: shouldPolyfillRules } = require('@formatjs/intl-pluralrules/should-polyfill');
const {shouldPolyfill: shouldPolyfillRelativeTime } = require('@formatjs/intl-relativetimeformat/should-polyfill');
const {shouldPolyfill: shouldPolyfillLocale } = require('@formatjs/intl-locale/should-polyfill');
const {shouldPolyfill: shouldPolyfillCannonical } = require('@formatjs/intl-getcanonicallocales/should-polyfill');


function polyfill(locale) {
  if (shouldPolyfillCannonical()) {
    require('@formatjs/intl-getcanonicallocales/polyfill');
  }
  if (shouldPolyfillLocale()) {
    require('@formatjs/intl-locale/polyfill');
  }
  if (shouldPolyfillRules()) {
    // Load the polyfill 1st BEFORE loading data
    require('@formatjs/intl-pluralrules/polyfill');
  }

  if (Intl.PluralRules.polyfilled) {
    switch (locale) {
      default:
        require('@formatjs/intl-pluralrules/locale-data/en');
        break;
      case 'de':
        require('@formatjs/intl-pluralrules/locale-data/de');
        break;
    }
  }
  if (shouldPolyfillRelativeTime()) {
    // Load the polyfill 1st BEFORE loading data
    require('@formatjs/intl-relativetimeformat/polyfill');
  }

  if (Intl.RelativeTimeFormat.polyfilled) {
    switch (locale) {
      default:
        require('@formatjs/intl-relativetimeformat/locale-data/en');
        break;
      case 'de':
        require('@formatjs/intl-relativetimeformat/locale-data/de');
        break;
    }
  }
}

const DEFAULT_LOCALE = 'en';

const appLocales = [
  DEFAULT_LOCALE,
  'de',
];

const formatTranslationMessages = (locale, messages) => {
  polyfill(locale);
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
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
