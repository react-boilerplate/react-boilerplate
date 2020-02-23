import languageProviderReducer from '../reducer';
import { LOAD_MESSAGES, LOADING_MESSAGES } from '../constants';
import { defaultMessages } from '../../../i18n';

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      locale: 'en',
      messages: defaultMessages,
      updatingInProgress: false,
    });
  });

  it('is loading the messages', () => {
    expect(
      languageProviderReducer(undefined, {
        type: LOADING_MESSAGES,
      }),
    ).toEqual({
      locale: 'en',
      messages: defaultMessages,
      updatingInProgress: true,
    });
  });

  it('loads the messages', () => {
    const messagesToLoad = {
      'message.id': 'Some String',
    };
    expect(
      languageProviderReducer(undefined, {
        type: LOAD_MESSAGES,
        messages: messagesToLoad,
        locale: 'de',
      }),
    ).toEqual({
      locale: 'de',
      messages: messagesToLoad,
      updatingInProgress: false,
    });
  });
});
