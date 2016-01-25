import Img from './index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Img />', () => {
  it('should render an <img> tag', () => {
    const renderedComponent = shallow(<Img src="test.png" alt="test" />);
    expect(renderedComponent.find('img').length).toEqual(1);
  });

  it('should have an alt attribute', () => {
    const renderedComponent = shallow(<Img src="test.png" alt="test" />);
    expect(renderedComponent.prop('alt')).toEqual('test');
  });
});
