import React from 'react';
import ReactLoadable from 'react-loadable';
import createMemoryHistory from 'history/createMemoryHistory';
import { shallow } from 'enzyme';

import configureStore from 'store';
import * as asyncInjectors from 'utils/asyncInjectors';
import Loadable from '../index';

jest.mock('react-loadable', () => jest.fn().mockImplementation(() => () => null));

describe('Loadable', () => {
  let store;
  let defaultLoadingComponent;
  let loader;
  const injectors = {};

  beforeAll(() => {
    asyncInjectors.getAsyncInjectors = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, createMemoryHistory());
    defaultLoadingComponent = () => null;
    loader = () => Promise.resolve({});
    asyncInjectors.getAsyncInjectors.mockClear();
    ReactLoadable.mockClear();
  });

  it('should call async injectors with a store from context', () => {
    const LoadableComponent = Loadable({ loader });
    const renderedComponent = shallow(<LoadableComponent />, { context: { store, defaultLoadingComponent } });
    renderedComponent.instance().loaderWithAsyncInjectors();

    expect(asyncInjectors.getAsyncInjectors).toHaveBeenCalledWith(store);
  });

  it('should call loader with async injectors', () => {
    const loaderMock = jest.fn().mockImplementation(loader);

    const LoadableComponent = Loadable({ loader: loaderMock });
    const renderedComponent = shallow(<LoadableComponent />, { context: { defaultLoadingComponent } });
    renderedComponent.instance().loaderWithAsyncInjectors();

    expect(loaderMock).toHaveBeenCalledWith(injectors);
  });

  it('should call ReactLoadable with a default loading component if it\'s provided', () => {
    const LoadableComponent = Loadable({ loader });
    shallow(<LoadableComponent />, { context: { defaultLoadingComponent } });

    expect(ReactLoadable.mock.calls[0][0].LoadingComponent).toBe(defaultLoadingComponent);
  });

  it('should favor custom LoadingComponent over a default loading component', () => {
    const LoadingComponent = () => null;
    const LoadableComponent = Loadable({ loader, LoadingComponent });
    shallow(<LoadableComponent />, { context: { defaultLoadingComponent } });

    expect(ReactLoadable.mock.calls[0][0].LoadingComponent).toBe(LoadingComponent);
  });

  it('should return empty component if default and custom loading components are not passed', () => {
    const LoadableComponent = Loadable({ loader });
    const renderedComponent = shallow(<LoadableComponent />);

    expect(ReactLoadable.mock.calls[0][0].LoadingComponent).toBe(renderedComponent.instance().emptyLoadingComponent);
    expect(renderedComponent.instance().emptyLoadingComponent()).toBe(null);
  });

  it('should know how to handle ES6 module', () => {
    const component = () => null;
    const LoadableComponent = Loadable({ loader: () => Promise.resolve({ default: component }) });
    const renderedComponent = shallow(<LoadableComponent />);
    const loaderWithAsyncInjectors = renderedComponent.instance().loaderWithAsyncInjectors();

    expect.assertions(1);
    expect(loaderWithAsyncInjectors).resolves.toBe(component);
  });

  it('should resolve to null if loader is empty', () => {
    const LoadableComponent = Loadable({});
    const renderedComponent = shallow(<LoadableComponent />);
    const loaderWithAsyncInjectors = renderedComponent.instance().loaderWithAsyncInjectors();

    expect.assertions(1);
    expect(loaderWithAsyncInjectors).resolves.toBe(null);
  });
});
