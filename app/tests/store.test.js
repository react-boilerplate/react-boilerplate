/**
 * Test store addons
 */

import { browserHistory } from 'react-router';
import configureStore from '../store';

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  describe('asyncReducers', () => {
    it('should contain an object for async reducers', () => {
      expect(typeof store.asyncReducers).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = jest.fn();
    configureStore(undefined, browserHistory);
    expect(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__).toHaveBeenCalled();
    /* eslint-enable */
  });
});
