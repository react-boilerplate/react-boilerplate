import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import H1 from '../index';

describe('<H1 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const wrapper = mount(<H1 id={id} />);
    const renderedComponent = enzymeFind(wrapper, H1);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const wrapper = mount(<H1>{children}</H1>);
    const renderedComponent = enzymeFind(wrapper, H1);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
