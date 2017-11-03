import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import { handleError } from 'containers/App/actions';

import messages from '../messages';
import { ErrorFallback } from '../index';

describe('<ErrorFallback />', () => {
  it('should render its error message', () => {
    const dispatch = jest.fn();
    const error = new Error('Something wrong!');
    const componentStack = 'ComponentStack';
    const renderedComponent = shallow(
      <ErrorFallback dispatch={dispatch} error={error} componentStack={componentStack} />
    );

    expect(dispatch).toHaveBeenCalledWith(handleError({ error, componentStack }));

    expect(renderedComponent.contains(
      <FormattedMessage {...messages.info} />
    )).toBe(true);
  });
});
