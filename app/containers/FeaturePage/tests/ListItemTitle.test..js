import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import ListItemTitle from '../ListItemTitle';

describe('<ListItemTitle />', () => {
  it('should render an <p> tag', () => {
    const renderedComponent = shallow(<ListItemTitle />);
    expect(renderedComponent.type()).toEqual('p');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<ListItemTitle />);
    expect(renderedComponent.prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ListItemTitle id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<ListItemTitle attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toNotExist();
  });
});
