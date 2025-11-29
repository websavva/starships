import * as React from 'react';
import { lazy, Suspense } from 'react';

import PageLoader from '@/components/PageLoader';

export const lazyPage = (
  loader: () => Promise<{ default: React.ComponentType<any> }>,
) => {
  const PageComponent = lazy(loader);

  const LazyPage = () => (
    <Suspense fallback={<PageLoader />}>
      <PageComponent />
    </Suspense>
  );

  LazyPage.displayName = 'LazyPage';

  return LazyPage;
};
