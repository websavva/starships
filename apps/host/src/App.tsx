import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import GlobalStyle from "ui_components/GlobalStyle";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";


const App = () => (
  <Layout>
    <GlobalStyle />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </Layout>
);

export default App;
