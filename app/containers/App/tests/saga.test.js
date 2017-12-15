/**
 * Tests for App sagas
 */

import { takeLatest } from 'redux-saga/effects';

import { APP_ERROR } from 'containers/App/constants';

import errorHandler, { errorTracker } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('errorHandler Saga', () => {
  const errorHandlerSaga = errorHandler();

  it('should start task to watch for APP_ERROR action', () => {
    const takeLatestDescriptor = errorHandlerSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(APP_ERROR, errorTracker));
  });
});

describe('errorTracker Saga', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const errorAction = { type: APP_ERROR, payload: { error: new Error('Something wrong'), componentStack: 'ComponentStack description string' } };
  let errorTrackerSaga;

  beforeEach(() => {
    errorTrackerSaga = errorTracker(errorAction);
  });

  it('errorTracker should call console.log in dev env', () => {
    // Use jest to test console.log.
    // see https://stackoverflow.com/questions/44344801/how-to-use-jest-with-jsdom-to-test-console-log
    global.console = {
      log: jest.fn(),
    };
    process.env.NODE_ENV = 'dev';
    errorTrackerSaga.next();

    expect(global.console.log).toHaveBeenCalledWith(JSON.stringify({
      error: errorAction.payload.error.message,
      componentStack: errorAction.payload.componentStack,
    }, null, 2));
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('errorTracker should not call console.log in production env', () => {
    global.console = {
      log: jest.fn(),
    };
    process.env.NODE_ENV = 'production';
    errorTrackerSaga.next();

    expect(global.console.log).toHaveBeenCalledTimes(0);
    process.env.NODE_ENV = originalNodeEnv;
  });
});
