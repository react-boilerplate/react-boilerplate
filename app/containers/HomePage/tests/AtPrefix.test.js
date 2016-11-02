import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import AtPrefix from '../AtPrefix';

describe('<AtPrefix />', () => {
  it('should render an <span> tag', () => {
    const renderedComponent = shallow(<AtPrefix />);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<AtPrefix />);
    expect(renderedComponent.prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<AtPrefix id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<AtPrefix attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toNotExist();
  });
});
