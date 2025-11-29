import * as React from 'react';
import styled from 'styled-components';

import OuterSpaceBackground from 'ui_components/OuterSpaceBackground';

const LayoutOuterSpaceBackground = styled(OuterSpaceBackground)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Layout = styled(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div {...props}>
        <LayoutOuterSpaceBackground />
        {children}
      </div>
    );
  },
)`
  position: relative;
  min-height: 100dvh;
`;

export default Layout;
