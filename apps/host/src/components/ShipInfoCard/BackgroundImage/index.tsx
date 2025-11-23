import * as React from "react";
import styled from "styled-components";

// @ts-expect-error - Missing webpack types
const shipImagesCtx = require.context("./images", false, /\.jpg$/);

const shipImages = shipImagesCtx.keys().map((key: string) => {
  return shipImagesCtx(key);
});

const getShipImageUrl = (number: number) => {
  return shipImages[number % shipImages.length];
};

const BackgroundImage = styled(
  ({
    id,
    ...props
  }: { id: number } & React.HTMLAttributes<HTMLImageElement>) => {
    return <img src={getShipImageUrl(id)} alt={`Ship ${id}`} {...props} />;
  }
)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
`;

export default BackgroundImage;
