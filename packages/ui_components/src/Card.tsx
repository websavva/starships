import * as React from "react";

import styled from "styled-components";

import { colors } from "styles/colors";

export const Card = styled.div<{ $clipHeight: string; $clipWidth: string }>`
  position: relative;
  background-color: ${colors.secondary.toString()};
  border-radius: 10px;
  padding: 2rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    clip-path: polygon(20% 23%, 20% 69%, 0 100%, 0 0);
    background-color: ${colors.bgPrimary.toString()};
    top: 50%;
    height: ${({ $clipHeight }) => $clipHeight};
    width: ${({ $clipWidth }) => $clipWidth};
  }

  &::before {
    left: 0;
    transform: translateY(-50%) scaleY(1.1);
  }

  &::after {
    right: 0;
    transform: translateY(-50%) scaleY(1.1) rotate(180deg);
  }
`;

export default Card;
