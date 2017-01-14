import React from 'react';
import { shallow } from 'enzyme';

import Percent from '../Percent';

it('should render an <div> tag', () => {
  const renderedComponent = shallow(<Percent />);
  expect(renderedComponent.type()).toEqual('div');
});
