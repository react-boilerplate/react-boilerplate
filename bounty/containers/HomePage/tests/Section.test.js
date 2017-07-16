import React from 'react';
import { shallow } from 'enzyme';

import Section from '../Section';

describe('<Section />', () => {
  it('should render an <section> tag', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Section id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Section attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
