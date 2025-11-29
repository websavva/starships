import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { colors } from 'styles/colors';

// @ts-expect-error Missing type declaration
import stars from './assets/stars.png';
// @ts-expect-error Missing type declaration
import twinkling from './assets/twinkling.png';

const moveTwinkBack = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}`;

const baseDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const OuterSpaceBackgroundStars = styled(baseDiv)`
  background: ${colors.bgPrimary.toString()} url(${stars}) repeat top center;
`;

const OuterSpaceBackgroundTwinkling = styled(baseDiv)`
  background: transparent url(${twinkling}) repeat top center;
  animation: ${moveTwinkBack} 250s linear infinite;
`;

export const OuterSpaceBackground = (
  props: React.HTMLAttributes<HTMLDivElement>,
) => {
  return (
    <div {...props}>
      <OuterSpaceBackgroundStars />
      <OuterSpaceBackgroundTwinkling />
    </div>
  );
};

export default OuterSpaceBackground;
