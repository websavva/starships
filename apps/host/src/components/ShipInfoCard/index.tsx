import * as React from "react";
import styled from "styled-components";
import { useEffect, useMemo } from "react";

import Card from "ui_components/Card";
import Spinner from "ui_components/Spinner";
import MessageBox from "ui_components/MessageBox";
import { useApi } from "hooks/use-api";

import ShipInforCardContent from "./Content";
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
    <Card $clipHeight="50%" $clipWidth="15rem" {...props}>
      {isPending || isInitial ? (
        <Spinner />
      ) : isError ? (
        <MessageBox>Error loading starship</MessageBox>
      ) : starship ? (
        <>
          <BackgroundImage id={starship.id} />

          <ShipInforCardContent starship={starship} />
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

  &::before,
  &::after {
    z-index: 2;
  }

  ${BackgroundImage} {
    z-index: 1;
  }

  ${ShipInforCardContent} {
    align-self: stretch;
    position: relative;
    z-index: 3;
  }
`;

export default ShipInfoCard;
