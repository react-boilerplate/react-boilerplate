import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import HomePage from '../index';

describe('<HomePage />', () => {
  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
