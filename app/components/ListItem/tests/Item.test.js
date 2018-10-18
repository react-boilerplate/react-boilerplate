import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Item from '../Item';

describe('<Item />', () => {
  it('should render an <div> tag', () => {
    const wrapper = mount(<Item />);
    const renderedComponent = enzymeFind(wrapper, Item);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Item />);
    const renderedComponent = enzymeFind(wrapper, Item);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Item id={id} />);
    const renderedComponent = enzymeFind(wrapper, Item);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Item attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, Item);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
