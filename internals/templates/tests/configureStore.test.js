/**
 * Test store addons
 */

import configureStore from '../configureStore';

describe('configureStore', () => {
  it('should return a redux store', () => {
    const store = configureStore({});
    expect(store).toEqual(
      expect.objectContaining({
        dispatch: expect.any(Function),
        subscribe: expect.any(Function),
        getState: expect.any(Function),
        replaceReducer: expect.any(Function),
      }),
    );
  });

  it('should return a redux store without an initial state', () => {
    const store = configureStore();
    expect(store).toEqual(
      expect.objectContaining({
        dispatch: expect.any(Function),
        subscribe: expect.any(Function),
        getState: expect.any(Function),
        replaceReducer: expect.any(Function),
      }),
    );
  });
});
