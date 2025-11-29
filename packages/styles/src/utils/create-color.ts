export interface HSlAColorProps {
  h?: number;
  s?: number;
  l?: number;
  a?: number;
}

export class HSlAColor {
  public h: number;
  public s: number;
  public l: number;
  public a: number;

  constructor(props: HSlAColorProps) {
    ({
      h: this.h = 0,
      s: this.s = 100,
      l: this.l = 100,
      a: this.a = 100,
    } = props);
  }

  public setHue(h: number) {
    this.h = h;

    return this;
  }

  public setSaturation(s: number) {
    this.s = s;

    return this;
  }

  public setLightness(l: number) {
    this.l = l;

    return this;
  }

  public setAlpha(a: number) {
    this.a = a;

    return this;
  }

  public copy() {
    return new HSlAColor({
      h: this.h,
      s: this.s,
      l: this.l,
      a: this.a,
    });
  }

  public hue(h: number) {
    return this.copy().setHue(h);
  }

  public saturation(s: number) {
    return this.copy().setSaturation(s);
  }

  public lightness(l: number) {
    return this.copy().setLightness(l);
  }

  public alpha(a: number) {
    return this.copy().setAlpha(a);
  }

  public toString() {
    const { h, s, l, a } = this;
    return `hsla(${h}, ${s}%, ${l}%, ${a}%)`;
  }
}

export const createColor = (props: HSlAColorProps) => {
  return new HSlAColor(props);
};

export default createColor;
