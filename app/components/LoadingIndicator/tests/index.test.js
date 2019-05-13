import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
