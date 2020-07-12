import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import HeaderLink from '../HeaderLink';

const renderComponent = (props = {}) => {
  const utils = render(
    <MemoryRouter>
      <HeaderLink to="/test" {...props}>
        HeaderLink
      </HeaderLink>
    </MemoryRouter>,
  );
  const headerLink = utils.queryByText('HeaderLink');
  return { ...utils, headerLink };
};

describe('<HeaderLink />', () => {
  it('should match the snapshot', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { headerLink } = renderComponent();
    expect(headerLink).toHaveAttribute('class');
  });
});
