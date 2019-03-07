/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  afterEach(cleanup);

  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <NotFound />
      </IntlProvider>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
