import React from 'react';
import warning from 'warning';
import { shallow } from 'enzyme';

import DefaultLoadingComponentProvider from '../index';

jest.mock('warning', () => jest.fn());

describe('DefaultLoadingComponentProvider', () => {
  let Child;
  let loadingComponent;
  beforeEach(() => {
    Child = () => null;
    loadingComponent = () => null;
    warning.mockClear();
  });

  it('should return a child component', () => {
    const renderedComponent = shallow(
      <DefaultLoadingComponentProvider component={loadingComponent}>
        <Child />
      </DefaultLoadingComponentProvider>
    );

    expect(renderedComponent.contains(<Child />)).toBe(true);
  });

  it('should assign `this.props.component` to `context.defaultLoadingComponent`', () => {
    const renderedComponent = shallow(
      <DefaultLoadingComponentProvider component={loadingComponent}>
        <Child />
      </DefaultLoadingComponentProvider>
    );

    expect(renderedComponent.instance().getChildContext().defaultLoadingComponent).toBe(loadingComponent);
  });

  it('should warn against using dynamic <LoadingComponent>', () => {
    const loadingComponent2 = () => null;

    const renderedComponent = shallow(
      <DefaultLoadingComponentProvider component={loadingComponent}>
        <Child />
      </DefaultLoadingComponentProvider>
    );

    renderedComponent.setProps({ component: loadingComponent2 });

    expect(warning).toHaveBeenCalledWith(false, '<DefaultLoadingComponentProvider> does not support dynamic <LoadingComponent>');
  });
});
