import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Ul from '../Ul';

describe('<Ul />', () => {
  it('should render an <ul> tag', () => {
    const wrapper = mount(<Ul />);
    const renderedComponent = enzymeFind(wrapper, Ul);
    expect(renderedComponent.type()).toEqual('ul');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Ul />);
    const renderedComponent = enzymeFind(wrapper, Ul);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Ul id={id} />);
    const renderedComponent = enzymeFind(wrapper, Ul);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Ul attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, Ul);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
