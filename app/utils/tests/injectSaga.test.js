/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';
import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../configureStore';
import injectSaga from '../injectSaga';
import * as sagaInjectors from '../sagaInjectors';

// Fixtures
const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let injectors;
  let ComponentWithSaga;

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = injectSaga({
      key: 'test',
      saga: testSaga,
      mode: 'testMode',
    })(Component);
    sagaInjectors.default.mockClear();
  });

  it('should inject given saga, mode, and props', () => {
    const props = { test: 'test' };
    renderer.create(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith(
      'test',
      { saga: testSaga, mode: 'testMode' },
      props,
    );
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const renderedComponent = renderer.create(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    renderedComponent.unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });

  it('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(
      injectSaga({ key: 'test', saga: testSaga })(() => null).displayName,
    ).toBe('withSaga(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = renderer.create(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    const {
      props: { children },
    } = renderedComponent.getInstance();
    expect(children.props).toEqual(props);
  });
});
