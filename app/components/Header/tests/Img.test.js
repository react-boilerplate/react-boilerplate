import React from 'react';
import { shallow } from 'enzyme';

import Img from '../Img';

const wrapper = shallow(<Img />);

describe('Image', () => {
  it('renders a styled component', () => {
    expect(wrapper).toHaveLength(1);
  });
});
