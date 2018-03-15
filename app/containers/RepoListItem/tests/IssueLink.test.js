import React from 'react';
import { shallow } from 'enzyme';

import IssueLink from '../IssueLink';

const wrapper = shallow(<IssueLink />);

describe('Issue Link', () => {
  it('renders a styled component', () => {
    expect(wrapper).toHaveLength(1);
  });
});
