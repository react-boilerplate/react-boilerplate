/**
 * Use this where required in React 16
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

function ErrorFallback() {
  return <FormattedMessage {...messages.error} />;
}

export default ErrorFallback;
