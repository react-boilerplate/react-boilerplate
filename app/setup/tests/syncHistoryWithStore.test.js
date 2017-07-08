/* eslint-disable import/first */
jest.mock('react-router-redux');

import { syncHistoryWithStore } from 'react-router-redux';

import syncHistory from '../syncHistoryWithStore';

describe('configureStore', () => {
  it('should synchronise the history with the store', () => {
    const history = {};
    const store = {};
    syncHistory(history, store);
    expect(syncHistoryWithStore).toHaveBeenCalled();
  });
});
