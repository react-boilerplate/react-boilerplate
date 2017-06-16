import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from '../Wrapper';

it('should render an <div> tag', () => {
  const renderedComponent = shallow(<Wrapper />);
  expect(renderedComponent.type()).toEqual('div');
});
