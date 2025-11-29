import * as React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default PageWrapper;
