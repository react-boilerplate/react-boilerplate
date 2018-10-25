import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import List from '../List';

describe('<List />', () => {
  it('should render an <ul> tag', () => {
    const wrapper = mount(<List />);
    const renderedComponent = enzymeFind(wrapper, List);
    expect(renderedComponent.type()).toEqual('ul');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<List />);
    const renderedComponent = enzymeFind(wrapper, List);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<List id={id} />);
    const renderedComponent = enzymeFind(wrapper, List);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<List attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, List);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
