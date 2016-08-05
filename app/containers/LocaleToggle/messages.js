/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';
import { appLocales } from '../../i18n';

function getAppLocales() {
  return appLocales.reduce((messages, locale) =>
    Object.assign(messages, {
      [locale]: {
        id: `app.components.LocaleToggle.${locale}`,
        defaultMessage: `${locale}`,
      },
    }), {});
}

export default defineMessages(getAppLocales());
