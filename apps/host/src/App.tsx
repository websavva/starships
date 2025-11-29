import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router';

import GlobalStyle from 'ui_components/GlobalStyle';

import Layout from '@/components/Layout';
import { lazyPage } from '@/utils/lazy-page';

const HomePage = lazyPage(() => import('home_page/index'));
const ShipPage = lazyPage(() => import('ship_page/index'));

const App = () => (
  <Layout>
    <GlobalStyle />

    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/starships/:id" element={<ShipPage />} />
      </Routes>
    </HashRouter>
  </Layout>
);

export default App;
