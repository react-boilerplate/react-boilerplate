import React from 'react';
import { render } from 'react-testing-library';

import IssueIcon from '../index';

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {
    const { queryByTestId } = render(<IssueIcon data-testid="svg" />);
    const element = queryByTestId('svg');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('svg');
  });
});
