import * as React from "react";
import styled from "styled-components";

import { colors } from "styles/colors";

export interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

const Label = styled.span`
  font-size: 1.6rem;
  font-weight: 200;
  text-transform: uppercase;
`;

const Value = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

export const SummaryCard = styled(
  ({ label, value, ...props }: SummaryCardProps) => {
    return (
      <div {...props}>
        <Label>{label}</Label>

        <Value>{value}</Value>
      </div>
    );
  }
)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${colors.tertiary.alpha(80).toString()};
  padding: 1rem 4rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px ${colors.bgPrimary.alpha(20).toString()};

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${colors.green.alpha(50).toString()};
    transform: scaleY(1.1);
    border-radius: inherit;
  }

  &::after {
    right: 0;
  }

  &::before {
    left: 0;
  }
`;

export default SummaryCard;
