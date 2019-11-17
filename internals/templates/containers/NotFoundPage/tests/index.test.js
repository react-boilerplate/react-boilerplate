import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <NotFoundPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
