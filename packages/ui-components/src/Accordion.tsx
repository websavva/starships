import * as React from "react";
import { useState, useRef, useEffect } from "react";

import styled from "styled-components";

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "onToggle"> {
  defaultOpened?: boolean;
  onToggle?: (isOpened: boolean) => void;
  head: React.ReactNode;
  children: React.ReactNode;
}

const AccordionContainer = styled.div<{ $isOpened: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const AccordionHeader = styled.header`
  position: relative;
`;

const AccordionHeading = styled.span<{ $isOpened: boolean }>`
  position: relative;
  text-transform: capitalize;

  &::after {
    content: "\\276F";
    margin-left: 1rem;
    display: inline-block;
    font-weight: 500;
    transition: all 0.3s ease-in;
    transform: ${({ $isOpened }) =>
      $isOpened ? "rotate(90deg)" : "rotate(0deg)"};
    opacity: ${({ $isOpened }) => ($isOpened ? 0.7 : 1)};
  }
`;

const AccordionBody = styled.section<{ $height: string }>`
  transition: height 0.2s ease-in-out;
  height: ${({ $height }) => $height};
  overflow: hidden;
`;

export const Accordion: React.FC<AccordionProps> = ({
  defaultOpened = false,
  onToggle,
  head,
  children,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(defaultOpened);
  const bodyRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (bodyRef.current) {
      if (isOpened) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          if (bodyRef.current) {
            setHeight(`${bodyRef.current.scrollHeight}px`);
          }
        });
      } else {
        setHeight("0px");
      }
    }
  }, [isOpened]);

  // Update height when content changes (for dynamic content)
  useEffect(() => {
    if (isOpened && bodyRef.current) {
      setHeight(`${bodyRef.current.scrollHeight}px`);
    }
  }, [children, isOpened]);

  const handleToggle = () => {
    const newState = !isOpened;
    setIsOpened(newState);
    onToggle?.(newState);
  };

  return (
    <AccordionContainer $isOpened={isOpened} {...props}>
      <AccordionHeader onClick={handleToggle}>
        <AccordionHeading $isOpened={isOpened}>{head}</AccordionHeading>
      </AccordionHeader>
      <AccordionBody ref={bodyRef} $height={height}>
        {children}
      </AccordionBody>
    </AccordionContainer>
  );
};

export default Accordion;
