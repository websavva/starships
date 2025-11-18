import * as React from "react";

import RemoteButton from "ui_components/Button";

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>
    <RemoteButton $size="large">Remote Large Button</RemoteButton>
    <br />
    <RemoteButton $size="small">Remote Small Button</RemoteButton>
    <RemoteButton $size="small" $isMobile>
      Remote Small Button
    </RemoteButton>
  </div>
);

export default App;
