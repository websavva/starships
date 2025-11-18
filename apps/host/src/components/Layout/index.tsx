import * as React from "react";
import styled from "styled-components";

import OuterSpaceBackground from "ui_components/OuterSpaceBackground";

export const Layout = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <OuterSpaceBackground />
      {children}
    </div>
  );
};

export default Layout;
