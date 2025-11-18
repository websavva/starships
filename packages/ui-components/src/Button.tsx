import styled from "styled-components";
import * as React from "react";

type ButtonProps = {
  $size: "small" | "large";
  $isMobile: boolean;
};

const Button = styled.button<ButtonProps>`
  background-color: red;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  border: none;
  padding: ${({ $size }) => ($size === "small" ? "5px 10px" : "15px 30px")};
  font-size: ${({ $size }) => ($size === "small" ? "12px" : "16px")};
  font-weight: 600;
  text-transform: uppercase;
  ${({ $size }) => $size === "small" ? "border-top: 2px solid black;" : "border-bottom: 4px solid black;"}
  letter-spacing: 0.05em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
  ${({ $isMobile }) => $isMobile && "width: 100%;"}
`;

export default Button;
