import { reducer, changeLocale } from '../slice';

describe('slice actions and reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      reducer(undefined, {
        type: changeLocale.type,
        payload: { locale: 'de' },
      }),
    ).toEqual({
      locale: 'de',
    });
  });
});
