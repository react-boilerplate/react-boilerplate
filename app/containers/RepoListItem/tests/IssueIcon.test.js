import React from 'react';
import { shallow } from 'enzyme';

import IssueIcon from '../IssueIcon';

const wrapper = shallow(<IssueIcon />);

describe('Issue Icon', () => {
  it('renders a styled component', () => {
    expect(wrapper).toHaveLength(1);
  });
});
