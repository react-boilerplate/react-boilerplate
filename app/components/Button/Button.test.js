import Button from './Button.react';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('should render its children', () => {
    const wrapper = shallow(<Button href="http://mxstbr.com"><h1>Test</h1></Button>);
    expect(wrapper.contains(<h1>Test</h1>)).toEqual(true);
  });

  it('should adopt the className', () => {
    const wrapper = shallow(<Button className="test" />);
    expect(wrapper.hasClass('test')).toEqual(true);
  });

  it('should render an <a> tag if no route is specified', () => {
    const wrapper = shallow(<Button href="http://mxstbr.com" />);
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('should render a Link if the route prop is specified', () => {
    const wrapper = shallow(<Button route="/" />);
    expect(wrapper.find('Link').length).toEqual(1);
  });
});
