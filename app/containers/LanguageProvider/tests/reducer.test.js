import expect from 'expect';
import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(fromJS({
      locale: 'en',
    }));
  });

  it('updates the locale', () => {
    const action = {
      type: CHANGE_LOCALE,
      locale: 'de',
    };
    expect(languageProviderReducer(undefined, action)).toEqual(fromJS({
      locale: 'de',
    }));
  });
});
