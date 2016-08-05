import assert from 'assert';
import { getLocaleMessages } from '../messages';

describe('getLocaleMessages', () => {
  it('should render the default language messages', () => {
    const expected = {
      en: {
        id: 'app.components.LocaleToggle.en',
        defaultMessage: 'en',
      },
      fr: {
        id: 'app.components.LocaleToggle.fr',
        defaultMessage: 'fr',
      },
    };

    const actual = getLocaleMessages(['en', 'fr']);

    assert.deepEqual(expected, actual);
  });
});
