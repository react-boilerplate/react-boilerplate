/**
 *
 * ErrorPage
 *
 */

import { withErrorBoundary, ErrorBoundaryFallbackComponent as ErrorFallback } from 'react-error-boundary';

export function ErrorPage() {
  throw new Error('Something went wrong!');
}

// Use ErrorBoundary
export default withErrorBoundary(ErrorPage, ErrorFallback);
