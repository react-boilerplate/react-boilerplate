/**
 * Test routes addons
 */

import sinon from 'sinon';
import createRoutes, { memoizeComponent } from '../routes';

describe('routes', () => {
  describe('createRoutes', () => {
    let mockStore;
    beforeEach(() => {
      mockStore = {
        dispatch: sinon.spy(),
        subscribe: sinon.spy(),
        getState: sinon.spy(),
        replaceReducer: sinon.spy(),
        runSaga: sinon.spy(),
        asyncReducers: {},
      };
    });
    it('should return an array', () => {
      expect(createRoutes(mockStore)).toBeInstanceOf(Array);
    });
  });

  describe('memoizeComponent', () => {
    let mockState;
    let mockComponent;
    let loadComponent;
    let memoizedLoadComponent;
    beforeEach(() => {
      mockState = {};
      mockComponent = { default: sinon.spy() };
      loadComponent = sinon.stub().callsArgWith(0, mockComponent);
      memoizedLoadComponent = memoizeComponent(loadComponent);
    });
    it('should return a function', () => {
      expect(typeof memoizedLoadComponent).toBe('function');
    });
    it('should load the component', () => {
      const done = sinon.spy();
      memoizedLoadComponent(mockState, done);
      expect(done.calledWithExactly(null, mockComponent.default)).toBe(true);
    });
    it('should load the component only once', () => {
      const done = sinon.spy();
      memoizedLoadComponent(mockState, done);
      memoizedLoadComponent(mockState, done);
      expect(loadComponent.calledOnce).toBe(true);
    });
  });
});
