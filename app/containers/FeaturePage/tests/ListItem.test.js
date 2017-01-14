import React from 'react';
import { shallow } from 'enzyme';

import ListItem from '../ListItem';

describe('<ListItem />', () => {
  it('should render an <li> tag', () => {
    const renderedComponent = shallow(<ListItem />);
    expect(renderedComponent.type()).toEqual('li');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<ListItem />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ListItem id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<ListItem attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
