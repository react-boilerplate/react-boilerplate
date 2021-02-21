/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../configureStore';
import sagaInjectors from '../sagaInjectors';

jest.mock("../sagaInjectors", () => {
  const injectSaga = jest.fn();
  const ejectSaga = jest.fn();
  const getInjectors = () => ({
    injectSaga,
    ejectSaga
  });
  return getInjectors;
});

const injectors = sagaInjectors();

import injectSaga, { useInjectSaga } from '../injectSaga'; // eslint-disable-line

// Fixtures
const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let ComponentWithSaga;


  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    ComponentWithSaga = injectSaga({
      key: 'test',
      saga: testSaga,
      mode: 'testMode',
    })(Component);
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
    const child = renderedComponent.root.findByType(Component);
    expect(child.props).toEqual(props);
  });
});

describe('useInjectSaga hook', () => {
  let store;
  let ComponentWithSaga;

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    ComponentWithSaga = () => {
      useInjectSaga({
        key: 'test',
        saga: testSaga,
        mode: 'testMode',
      });
      return null;
    };
    injectors.injectSaga.mockClear();
    injectors.ejectSaga.mockClear();
  });

  it('should inject given saga and mode', () => {
    const props = { test: 'test' };
    const { unmount } = render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    unmount();

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', {
      saga: testSaga,
      mode: 'testMode',
    });
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const { unmount } = render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });
});
