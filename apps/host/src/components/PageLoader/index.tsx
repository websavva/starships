import * as React from 'react';

import Spinner from 'ui_components/Spinner';

import PageWrapper from '@/components/PageWrapper';

const PageLoader = () => (
  <PageWrapper>
    <Spinner />
  </PageWrapper>
);

export default PageLoader;
