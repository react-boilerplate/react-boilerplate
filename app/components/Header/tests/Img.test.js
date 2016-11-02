import React from 'react';
import expect from 'expect';
import { mount, render } from 'enzyme';

import Img from '../Img';

describe('<Img />', () => {
  it('should render an <img> tag', () => {
    const renderedComponent = render(<Img />);
    expect(renderedComponent.find('img').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = mount(<Img />);
    expect(renderedComponent.find('img').prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const alt = 'test';
    const renderedComponent = mount(<Img alt={alt} />);
    expect(renderedComponent.find('img').prop('alt')).toEqual(alt);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = mount(<Img attribute={'test'} />);
    expect(renderedComponent.find('img').prop('attribute')).toNotExist();
  });
});
