/* eslint-disable consistent-return */
/**
 * Process error actions from ErrorBoundary
 */

import { takeLatest } from 'redux-saga/effects';
import { APP_ERROR } from './constants';

// import myTracker from "utils/tracker";

export default function* errorHandler() {
  yield takeLatest(APP_ERROR, function* (errorObject) { // eslint-disable-line func-names
    // create side effects with enriched data based on environment...
    // eg. network io ie ga.send, just console.log and let agent intercept, etc...
    if (process.env.NODE_ENV !== 'production') {
      return console.log(JSON.Stringify(errorObject, null, 2)); // eslint-disable-line no-console
    }
    // const metadata = yield select(makeEnrichmentDataSelector());
    // yield call(myTracker.track, { ...errorObject, metadata });
  });
}
