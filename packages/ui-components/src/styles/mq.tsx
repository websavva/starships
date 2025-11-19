import { css, type RuleSet } from "styled-components";

import { breakpoints } from "styles/breakpoints";

export const maxWidth = (min: keyof typeof breakpoints, content: string | RuleSet) =>
  css`
    @media (max-width: ${breakpoints[min]}) {
      ${content}
    }
  `;

export const minWidth = (min: keyof typeof breakpoints, content: string | RuleSet) =>
  `@media (min-width: ${breakpoints[min]}) {
    ${content}
  }`;
