import styled from "styled-components";

import { colors } from "styles/colors";

export const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
`;

export const DetailsColumnHeading = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

export const DetailsColumn = styled.ul`
  padding: 0.5rem 0;
`;

export const DetailsColumnItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  *:first-child {
    text-aling: left;
  }

  *:last-child {
    text-align: right;
  }
`;

export const DetailsColumnList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${DetailsColumnItem} {
    padding: 0.5rem 0;
    border-bottom: 1px solid ${colors.green.toString()};
  }
`;

export const DetailsColumnListLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;


