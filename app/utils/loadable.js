import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null }) => {
  const LazyComponent = lazy(importFunc);

  return () => (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};

export default loadable;
