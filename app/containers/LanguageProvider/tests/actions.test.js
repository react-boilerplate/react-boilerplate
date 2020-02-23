import { changeLocale, loadingMessages, loadMessages } from '../actions';

import { CHANGE_LOCALE, LOAD_MESSAGES, LOADING_MESSAGES } from '../constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });

  describe('Loading messages action', () => {
    it('has a type of LOADING_MESSAGES', () => {
      const expected = {
        type: LOADING_MESSAGES,
      };
      expect(loadingMessages()).toEqual(expected);
    });
  });

  describe('Load Messages action', () => {
    it('has a type of LOAD_MESSAGES', () => {
      const expected = {
        type: LOAD_MESSAGES,
        locale: 'de',
        messages: { a: 'a' },
      };
      expect(loadMessages({ locale: 'de', messages: { a: 'a' } })).toEqual(
        expected,
      );
    });
  });
});
