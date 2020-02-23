/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { CHANGE_LOCALE } from '../constants';
import { loadingMessages, loadMessages } from '../actions';

import getTranslationMessages, { getMessages } from '../saga';
import { defaultMessages } from '../../../i18n';

/* eslint-disable redux-saga/yield-effects */
describe('getTranslationMessages Saga', () => {
  let getMessagesGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getMessagesGenerator = getMessages({ type: CHANGE_LOCALE, locale: 'de' });

    const isLoading = getMessagesGenerator.next().value;
    expect(isLoading).toEqual(put(loadingMessages()));

    const callDescriptor = getMessagesGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the loadMessages action if it requests the translations successfully', () => {
    const response = {
      'this.is.a.translation': 'with a string',
    };
    const putDescriptor = getMessagesGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put(loadMessages({ locale: 'de', messages: response })),
    );
  });

  it('should call the loadMessages action with the defaultMessages if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMessagesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(
      put(loadMessages({ locale: 'en', messages: defaultMessages })),
    );
  });
});

describe('getTranslationMessagesSaga Saga', () => {
  const getTranslationMessagesSaga = getTranslationMessages();

  it('should start task to watch for CHANGE_LOCALE action', () => {
    const takeLatestDescriptor = getTranslationMessagesSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_LOCALE, getMessages),
    );
  });
});
