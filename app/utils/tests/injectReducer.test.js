/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureStore from '../../configureStore';
import reducerInjectors from '../reducerInjectors';
jest.mock("../reducerInjectors", () => {
  const injectReducer = jest.fn();
  const ejectReducer = jest.fn();
  const getInjectors = () => ({
    injectReducer,
    ejectReducer
  });
  return getInjectors;
});

import injectReducer, { useInjectReducer } from '../injectReducer'; // eslint-disable-line


// Fixtures
const injectors = reducerInjectors();
const Component = () => null;

const reducer = s => s;

describe('injectReducer decorator', () => {
  let store;
  let ComponentWithReducer;


  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
  });

  it('should inject a given reducer', () => {
    renderer.create(
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(
      injectReducer({ key: 'test', reducer })(() => null).displayName,
    ).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = renderer.create(
      <Provider store={store}>
        <ComponentWithReducer {props} />
      </Provider>,
    );

    const child = renderedComponent.root.findByType(Component);

    expect(child.props).toEqual(props);
  });
});

describe('useInjectReducer hook', () => {
  let store;
  let ComponentWithHook;

  beforeAll(() => {
    store = configureStore({}, memoryHistory);
    ComponentWithHook = () => {
      useInjectReducer({ key: 'test', reducer });
      return <div/>
    };
    injectors.injectReducer.mockClear();
    injectors.ejectReducer.mockClear();
  });

  it('should inject a given reducer', async () => {

    renderer.act(() => renderer.create(
      <Provider store={store}>
        <ComponentWithHook />
      </Provider>,
    ));

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
