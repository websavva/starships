import * as React from "react";

import styled from "styled-components";

import { colors } from "styles/colors";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  hasNext?: boolean;
  hasPrevious?: boolean;
  page?: number;
  disabled?: boolean;

  onNext?: () => void;
  onPrevious?: () => void;
}

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaginationNav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const PaginationButton = styled.button`
  color: ${colors.green.toString()};
  border-radius: 5px;
  font-size: 1.7rem;
  padding: 0.5rem 2rem;
  border: 1px solid ${colors.green.toString()};
  font-weight: 200;
  transition: all 0.3s;
  background: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${colors.green.alpha(40).toString()};
    color: ${colors.primary.toString()};
  }
`;

const PageDisplay = styled.small`
  padding: 1rem 0;
  display: block;
  font-size: 1.5rem;
  text-align: center;
  color: ${colors.primary.alpha(70).toString()};
`;

export const Pagination: React.FC<PaginationProps> = ({
  hasNext = false,
  hasPrevious = false,
  page = 1,
  disabled = false,

  onNext,
  onPrevious,
  ...props
}) => {
  return (
    <PaginationContainer {...props}>
      {(hasNext || hasPrevious) && (
        <PaginationNav>
          <PaginationButton
            disabled={!hasPrevious || disabled}
            onClick={onPrevious}
          >
            Prev
          </PaginationButton>

          <PaginationButton disabled={!hasNext || disabled} onClick={onNext}>
            Next
          </PaginationButton>
        </PaginationNav>
      )}

      <PageDisplay>Page: {page}</PageDisplay>
    </PaginationContainer>
  );
};

export default Pagination;
