import { createGlobalStyle, css } from 'styled-components';
import { fonts } from 'styles/fonts';
import { colors } from 'styles/colors';

import { maxWidth } from './styles/mq';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    background: ${colors.bgPrimary.toString()};

    ${maxWidth(
      '2xl',
      css`
        font-size: 55%;
      `,
    )}

    ${maxWidth(
      'sm',
      css`
        font-size: 50%;
      `,
    )}
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
    min-height: 100dvh;
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
