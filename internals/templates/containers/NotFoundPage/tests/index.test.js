import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  afterEach(cleanup);

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
