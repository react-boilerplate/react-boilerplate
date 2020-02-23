import { fetchMessages, formatTranslationMessages } from '../i18n';
import { DEFAULT_LOCALE } from '../locales';

jest.mock('translations/en.json', () => ({
  message1: 'default message',
  message2: 'default message 2',
}));

jest.mock('translations/de.json', () => ({
  message1: 'mensaje predeterminado',
  message2: '',
}));

const esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: '',
};

describe('fetchMessages', () => {
  it('should fetchMessages when DEFAULT_LOCALE', async () => {
    const result = await fetchMessages(DEFAULT_LOCALE);
    expect(result).toEqual({
      message1: 'default message',
      message2: 'default message 2',
    });
  });

  it('should fetchMessages when not DEFAULT_LOCALE', async () => {
    const result = await fetchMessages('de');
    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2',
    });
  });

  it('should throw error when locale doesnt exist', async () => {
    expect(() => fetchMessages('potato')).toThrowError();
  });
});

describe('formatTranslationMessages', () => {
  it('should build only defaults when DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('en', { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale when not DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('', esTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2',
    });
  });
});
