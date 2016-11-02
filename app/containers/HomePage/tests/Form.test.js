import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Form from '../Form';

describe('<Form />', () => {
  it('should render an <form> tag', () => {
    const renderedComponent = shallow(<Form />);
    expect(renderedComponent.type()).toEqual('form');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Form />);
    expect(renderedComponent.prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Form id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Form attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toNotExist();
  });
});
