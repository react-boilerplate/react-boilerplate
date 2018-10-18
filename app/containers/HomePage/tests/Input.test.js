import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Input from '../Input';

describe('<Input />', () => {
  it('should render an <input> tag', () => {
    const wrapper = mount(<Input />);
    const renderedComponent = enzymeFind(wrapper, Input);
    expect(renderedComponent.type()).toEqual('input');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Input />);
    const renderedComponent = enzymeFind(wrapper, Input);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Input id={id} />);
    const renderedComponent = enzymeFind(wrapper, Input);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Input attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, Input);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
