import { getLocaleMessages } from '../messages';

describe('getLocaleMessages', () => {
  it('should create i18n messages for all locales', () => {
    const expected = {
      en: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: 'en',
      },
      fr: {
        id: 'boilerplate.containers.LocaleToggle.fr',
        defaultMessage: 'fr',
      },
    };

    const actual = getLocaleMessages(['en', 'fr']);

    expect(actual).toEqual(expected);
  });
});
