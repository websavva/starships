import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router';

import GlobalStyle from 'ui_components/GlobalStyle';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Ship from '@/pages/Ship';

const App = () => (
  <Layout>
    <GlobalStyle />

    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/starships/:id" element={<Ship />} />
      </Routes>
    </HashRouter>
  </Layout>
);

export default App;
