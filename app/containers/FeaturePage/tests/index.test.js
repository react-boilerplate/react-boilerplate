import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import FeaturePage from '../index';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <FeaturePage />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
