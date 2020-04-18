import { i18n, translations } from 'locales/i18n';

describe('i18n', () => {
  it('should initate i18n with translations', async () => {
    const x = await i18n;
    expect(
      x(translations.feedbackFeature.description()).length,
    ).toBeGreaterThan(0);
  });
});
