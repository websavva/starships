import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState, useCallback, useRef } from 'react';

// @ts-expect-error - Missing webpack types
const shipImagesCtx = require.context('./images', false, /\.jpg$/);

const shipImages = shipImagesCtx.keys().map((key: string) => {
  return shipImagesCtx(key);
});

const getShipImageUrl = (number: number) => {
  return shipImages[number % shipImages.length];
};

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 0.2 : 0)};
`;

export const BackgroundImage = styled(
  ({
    id,
    ...props
  }: { id: number } & Omit<React.HTMLAttributes<HTMLImageElement>, 'id'>) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const imgUrl = getShipImageUrl(id);

    useEffect(() => {
      // Reset loaded state when image URL changes
      // But if image is already loaded (cached), keep it loaded
      const img = imageRef.current;

      if (img?.complete && img.src === imgUrl) {
        // Image is already loaded (cached), set loaded immediately
        setIsLoaded(true);
      } else {
        // Image needs to load, reset to false
        setIsLoaded(false);
      }
    }, [imgUrl]);

    const onLoad = useCallback(() => {
      setIsLoaded(true);
    }, []);

    return (
      <StyledImage
        ref={imageRef}
        {...props}
        src={imgUrl}
        alt=""
        $isLoaded={isLoaded}
        onLoad={onLoad}
      />
    );
  },
)``;

export default BackgroundImage;
