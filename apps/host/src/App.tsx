import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import GlobalStyle from "ui_components/GlobalStyle";

const App = () => (
  <div>
    <GlobalStyle />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
