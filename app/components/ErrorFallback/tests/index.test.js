import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import ErrorFallback from '../index';

describe('<ErrorFallback />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <ErrorFallback />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.error} />
    )).toBe(true);
  });
});
