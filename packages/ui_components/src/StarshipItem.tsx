import * as React from "react";
import styled, { css } from "styled-components";

import { colors } from "styles/colors";

import { maxWidth } from "./styles/mq";

export interface StarshipItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  model: string;
}

const BaseStarshipItem = ({ name, model, ...props }: StarshipItemProps) => {
  return (
    <div {...props}>
      <span>{name}</span>

      <strong className="separator">/</strong>

      <span>{model}</span>
    </div>
  );
};
export const StarshipItem = styled(BaseStarshipItem)`
  font-weight: 200;
  background: ${colors.tertiary.alpha(70).toString()};
  text-align: center;
  border-radius: 10px;
  clip-path: polygon(3% 0, 100% 0, 97% 100%, 0% 100%);
  border: 2px solid ${colors.green.alpha(20).toString()};
  animation: fadeIn 0.5s ease-in;
  transition: all 0.4s;
  padding: 1.5rem .5rem;

  ${maxWidth(
    "xs",
    css`
      clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
    `
  )}

  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .separator {
    display: inline-block;
    margin: 0 0.5rem;
    font-size: 1.1em;
    color: ${colors.green.lightness(30).toString()};
  }

  ${maxWidth("md", css`
    padding: 1rem 1.5rem;
  `)}
`;

export default StarshipItem;
