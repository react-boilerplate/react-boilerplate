/**
 * Asynchronously loads the component for NotFoundPage
 */

import React, { lazy, Suspense } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
const Component = lazy(() => import('./index'));

export default () => (
  <Suspense fallback={<LoadingIndicator />}>
    <Component />
  </Suspense>
);
