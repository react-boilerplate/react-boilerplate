/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { identity } from 'lodash';

import configureStore from '../../configureStore';
import injectReducer from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

// Fixtures
const Component = () => null;

const reducer = identity;

describe('injectReducer decorator', () => {
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
    reducerInjectors.default.mockClear();
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
        <ComponentWithReducer {...props} />
      </Provider>,
    );
    const {
      props: { children },
    } = renderedComponent.getInstance();

    expect(children.props).toEqual(props);
  });
});
