/**
 * Use this where required in React 16
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { handleError } from 'containers/App/actions';
import messages from './messages';

export function ErrorFallback({ error, componentStack, dispatch }) {
  // Dispatch error
  dispatch(handleError({ error, componentStack }));

  // Display error message
  return (
    <FormattedMessage {...messages.info} />
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  componentStack: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(ErrorFallback);
