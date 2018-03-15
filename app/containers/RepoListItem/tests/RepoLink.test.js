import React from 'react';
import { shallow } from 'enzyme';

import RepoLink from '../RepoLink';

const wrapper = shallow(<RepoLink />);

describe('Repo Link', () => {
  it('renders a styled component', () => {
    expect(wrapper).toHaveLength(1);
  });
});
