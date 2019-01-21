import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import CenteredSection from '../CenteredSection';

describe('<CenteredSection />', () => {
  it('should render a <section> tag', () => {
    const wrapper = mount(<CenteredSection />);
    const renderedComponent = enzymeFind(wrapper, CenteredSection);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<CenteredSection />);
    const renderedComponent = enzymeFind(wrapper, CenteredSection);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'testId';
    const wrapper = mount(<CenteredSection id={id} />);
    const renderedComponent = enzymeFind(wrapper, CenteredSection);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<CenteredSection attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, CenteredSection);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
