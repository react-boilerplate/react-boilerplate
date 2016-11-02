import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Item from '../Item';

describe('<Item />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<Item />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Item />);
    expect(renderedComponent.prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Item id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Item attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toNotExist();
  });
});
