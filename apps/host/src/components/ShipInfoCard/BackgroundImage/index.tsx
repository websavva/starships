import * as React from "react";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";

import { sleep } from "utils/sleep";

// @ts-expect-error - Missing webpack types
const shipImagesCtx = require.context("./images", false, /\.jpg$/);

const shipImages = shipImagesCtx.keys().map((key: string) => {
  return shipImagesCtx(key);
});

const getShipImageUrl = (number: number) => {
  return shipImages[number % shipImages.length];
};

const StyledImage = styled.img<{ isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity .5s ease-in-out;
  opacity: ${({ isLoaded }) => (isLoaded ? .2 : 0)};
`;

export const BackgroundImage = ({
  id,
  ...props
}: { id: number } & React.HTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imgUrl = getShipImageUrl(id);

  useEffect(() => {
    setIsLoaded(false);
  }, [imgUrl]);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <StyledImage
      {...props}
      src={imgUrl}
      alt=""
      isLoaded={isLoaded}
      onLoad={onLoad}
    />
  );
};

export default BackgroundImage;
