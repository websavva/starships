import { createColor } from "./utils/create-color";

export const colors = {
  primary: createColor({ h: 0, s: 0, l: 79 }),
  secondary: createColor({ h: 0, s: 1, l: 15 }),
  tertiary: createColor({ h: 0, s: 2, l: 10 }),
  green: createColor({ h: 128, s: 96, l: 55 }),
  danger: createColor({ h: 0, s: 83, l: 53 }),
  bgPrimary: createColor({ h: 0, s: 0, l: 0 }),
};

export default colors;
