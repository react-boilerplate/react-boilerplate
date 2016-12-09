import React from 'react';
import { shallow } from 'enzyme';

import CenteredSection from '../CenteredSection';

describe('<CenteredSection />', () => {
  it('should render an <section> tag', () => {
    const renderedComponent = shallow(<CenteredSection />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<CenteredSection />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<CenteredSection id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<CenteredSection attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
