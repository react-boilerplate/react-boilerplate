import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import ListItemTitle from '../ListItemTitle';

describe('<ListItemTitle />', () => {
  it('should render an <p> tag', () => {
    const wrapper = mount(<ListItemTitle />);
    const renderedComponent = enzymeFind(wrapper, ListItemTitle);
    expect(renderedComponent.type()).toEqual('p');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<ListItemTitle />);
    const renderedComponent = enzymeFind(wrapper, ListItemTitle);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<ListItemTitle id={id} />);
    const renderedComponent = enzymeFind(wrapper, ListItemTitle);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<ListItemTitle attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, ListItemTitle);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
