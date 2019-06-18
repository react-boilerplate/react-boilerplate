import React from 'react';
import { render } from '@testing-library/react';

import IssueIcon from '../index';

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {
    const { queryByTestId } = render(<IssueIcon data-testid="svg" />);
    const element = queryByTestId('svg');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('svg');
  });
});
