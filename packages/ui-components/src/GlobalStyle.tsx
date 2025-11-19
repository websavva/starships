import { createGlobalStyle } from "styled-components";
import { fonts } from "styles/fonts";
import { breakpoints } from "styles/breakpoints";
import { colors } from "styles/colors";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;

    @media (max-width: ${breakpoints.sm}) {
      font-size: 58%;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: none;
    color: inherit;
    border: none;
    outline: none;
    font-weight: inherit;
    font-family: inherit;
    list-style: none;
  }

  body {
    font-size: 1.5rem;
    width: 100%;
    min-height: 100vh;
    font-weight: 300;
    font-family: ${fonts.primary.toString()};
    color: ${colors.primary.toString()};
  }

  a,
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
