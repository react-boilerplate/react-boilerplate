import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import AtPrefix from '../AtPrefix';

describe('<AtPrefix />', () => {
  it('should render a <span> tag', () => {
    const wrapper = mount(<AtPrefix />);
    const renderedComponent = enzymeFind(wrapper, AtPrefix);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<AtPrefix />);
    const renderedComponent = enzymeFind(wrapper, AtPrefix);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'testId';
    const wrapper = mount(<AtPrefix id={id} />);
    const renderedComponent = enzymeFind(wrapper, AtPrefix);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<AtPrefix attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, AtPrefix);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
