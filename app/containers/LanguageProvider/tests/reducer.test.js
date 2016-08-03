import expect from 'expect';
import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    const expected = languageProviderReducer(undefined, {});
    const actual = expected.merge({
      locale: 'en',
    });

    expect(expected).toEqual(actual);
  });

  it('updates the locale', () => {
    const initialState = fromJS({
      locale: 'en',
    });
    const expected = languageProviderReducer(initialState, {
      type: CHANGE_LOCALE,
      locale: 'de',
    });
    const actual = initialState.merge({
      locale: 'de',
    });

    expect(expected).toEqual(actual);
  });
});
