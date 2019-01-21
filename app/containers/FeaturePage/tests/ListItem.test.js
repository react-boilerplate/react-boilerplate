import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import ListItem from '../ListItem';

describe('<ListItem />', () => {
  it('should render an <li> tag', () => {
    const wrapper = mount(<ListItem />);
    const renderedComponent = enzymeFind(wrapper, ListItem);
    expect(renderedComponent.type()).toEqual('li');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<ListItem />);
    const renderedComponent = enzymeFind(wrapper, ListItem);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<ListItem id={id} />);
    const renderedComponent = enzymeFind(wrapper, ListItem);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<ListItem attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, ListItem);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
