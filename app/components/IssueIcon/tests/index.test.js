import React from 'react';
import { cleanup, render } from 'react-testing-library';

import IssueIcon from '../index';

describe('<IssueIcon />', () => {
  afterEach(cleanup);

  it('should render a SVG', () => {
    const { container } = render(<IssueIcon />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
