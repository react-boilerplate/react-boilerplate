import React from 'react';
import { render } from 'react-testing-library';
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
