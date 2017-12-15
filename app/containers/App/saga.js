/**
 * Process error actions from ErrorBoundary
 */

import { takeLatest } from 'redux-saga/effects';
import { APP_ERROR } from './constants';

// import myTracker from "utils/tracker";

export function* errorTracker(errorAction) {
  // eslint-disable-line func-names
  // create side effects with enriched data based on environment...
  // eg. network io ie ga.send, just console.log and let agent intercept, etc...
  if (process.env.NODE_ENV !== 'production') {
    console.log(JSON.stringify({ // eslint-disable-line no-console
      error: errorAction.payload.error.message,
      componentStack: errorAction.payload.componentStack,
    }, null, 2));
  }
  // const metadata = yield select(makeEnrichmentDataSelector());
  // yield call(myTracker.track, { ...errorObject, metadata });
}

export default function* errorHandler() {
  yield takeLatest(APP_ERROR, errorTracker);
}
