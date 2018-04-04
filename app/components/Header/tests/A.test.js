import React from 'react';
import { shallow } from 'enzyme';

import A from '../A';

const wrapper = shallow(<A />);

describe('A', () => {
  it('renders a styled component', () => {
    expect(wrapper).toHaveLength(1);
  });
});
