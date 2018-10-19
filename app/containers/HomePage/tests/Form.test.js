import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Form from '../Form';

describe('<Form />', () => {
  it('should render an <form> tag', () => {
    const wrapper = mount(<Form />);
    const renderedComponent = enzymeFind(wrapper, Form);
    expect(renderedComponent.type()).toEqual('form');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Form />);
    const renderedComponent = enzymeFind(wrapper, Form);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Form id={id} />);
    const renderedComponent = enzymeFind(wrapper, Form);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Form attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, Form);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
