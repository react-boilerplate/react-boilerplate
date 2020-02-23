/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { defaultMessages, fetchMessages } from '../../i18n';

import { CHANGE_LOCALE } from './constants';
import { loadMessages, loadingMessages } from './actions';
import { DEFAULT_LOCALE } from '../../locales';

/**
 * Github repos request/response handler
 */
export function* getMessages(action) {
  const newLocale = action.locale;
  try {
    // notify that loading is occurring
    yield put(loadingMessages());
    // get the messages for the new locale and update
    const messages = yield call(fetchMessages, newLocale);
    yield put(
      loadMessages({
        locale: newLocale,
        messages,
      }),
    );
  } catch (err) {
    // set the messages to the default if loading fails
    yield put(
      loadMessages({ locale: DEFAULT_LOCALE, messages: defaultMessages }),
    );
  }
}

/**
 * Saga for handling messages
 *
 */
export default function* getTranslationMessages() {
  // Watches for CHANGE_LOCALE actions and calls getMessages when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CHANGE_LOCALE, getMessages);
}
