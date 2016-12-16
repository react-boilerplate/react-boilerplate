import React from 'react';
import { shallow } from 'enzyme';

import A from '../A';

describe('<A />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = shallow(<A />);
    expect(renderedComponent.type()).toEqual('a');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<A />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<A id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<A attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
