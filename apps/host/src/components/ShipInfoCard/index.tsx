import * as React from "react";
import styled, { css } from "styled-components";
import { useEffect } from "react";

import { maxWidth } from "ui_components/styles/mq";
import Card from "ui_components/Card";
import Spinner from "ui_components/Spinner";
import MessageBox from "ui_components/MessageBox";
import { useApi } from "hooks/use-api";

import Info from "./Info";
import BackgroundImage from "./BackgroundImage";

export interface ShipInfoCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  id: number;
}

export const ShipInfoCard = styled(({ id, ...props }: ShipInfoCardProps) => {
  const {
    data: starship,
    isPending,
    isError,
    makeApiCall,
    isInitial,
    cancelApiCall,
  } = useApi("getStarship");

  useEffect(() => {
    makeApiCall(id);

    return () => {
      cancelApiCall();
    };
  }, [id, makeApiCall, cancelApiCall]);

  return (
    <Card $clipHeight="var(--clip-height)" $clipWidth="var(--clip-width)" {...props}>
      {isPending || isInitial ? (
        <Spinner />
      ) : isError ? (
        <MessageBox>Error loading starship</MessageBox>
      ) : starship ? (
        <>
          <BackgroundImage id={starship.id} />

          <Info starship={starship} />
        </>
      ) : (
        <MessageBox>No starship found</MessageBox>
      )}
    </Card>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  --clip-width: 15rem;
  --clip-height: 50%;

  ${maxWidth("lg", css`
    --clip-width: 8rem;
    --clip-height: 30%;
  `)}

  ${maxWidth("sm", css`
    --clip-width: 5rem;
    --clip-height: 20rem;
  `)}

  ${maxWidth("xs", css`
    --clip-width: 0;
    --clip-height: 0;
  `)}

  &::before,
  &::after {
    z-index: 2;
  }

  ${BackgroundImage} {
    z-index: 1;
    border-radius: inherit;
  }

  ${Info} {
    align-self: stretch;
    position: relative;
    z-index: 3;
  }
`;

export default ShipInfoCard;
