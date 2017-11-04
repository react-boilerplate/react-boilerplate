/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withErrorBoundary, ErrorBoundaryFallbackComponent as ErrorFallback } from 'react-error-boundary';

import H1 from 'components/H1';
import messages from './messages';

export function NotFound() {
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

// Use ErrorBoundary
export default withErrorBoundary(NotFound, ErrorFallback);
