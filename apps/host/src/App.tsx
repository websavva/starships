import * as React from "react";
import { HashRouter, Routes, Route } from "react-router";

import GlobalStyle from "ui_components/GlobalStyle";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Ship from "@/pages/Ship";

const basename = process.env.APP_BASE_URL
  ? new URL(process.env.APP_BASE_URL).pathname
  : "/";

const App = () => (
  <Layout>
    <GlobalStyle />

    <HashRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/starships/:id" element={<Ship />} />
      </Routes>
    </HashRouter>
  </Layout>
);

export default App;
