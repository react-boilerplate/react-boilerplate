import { i18n } from '../i18n';

describe('i18n', () => {
  it('should initate i18n', async () => {
    const t = await i18n;
    expect(t).toBeDefined();
  });
});
