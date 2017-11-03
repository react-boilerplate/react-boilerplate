/**
 *
 * ErrorPage
 *
 */

import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallback from 'containers/ErrorFallback';

export function ErrorPage() {
  throw new Error('Something wrong!');
}

// Use ErrorBoundary
export default withErrorBoundary(ErrorPage, ErrorFallback);
