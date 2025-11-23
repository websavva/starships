import * as React from "react";
import styled, { keyframes, css } from "styled-components";

import { colors } from "styles/colors";

import { maxWidth } from "./styles/mq";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border-radius: 50%;
  border-width: 7px;
  padding: 1px;
  border-style: solid;
  border-color: ${colors.green.lightness(30).toString()} transparent;
  width: 15rem;
  height: 15rem;
  animation: ${spin} 1s linear infinite;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: inherit;
    width: 95%;
    height: 95%;
    border-color: ${colors.primary.alpha(30).toString()};
    border-width: inherit;
    border-style: inherit;
  }
`;

export default Spinner;
