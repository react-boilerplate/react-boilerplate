import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  // Suspense will automatically switch to fallback
  // when children suspends, and back to children when the data is ready

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
