import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import styled from "styled-components";

import GlobalStyle from "ui_components/GlobalStyle";
import Logo from "ui_components/Logo";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const StyledLogo = styled(Logo)`
  margin-top: 1rem;
  display: block;
  width: 8rem;
  height: auto;
  z-index: 1000;
`;

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
