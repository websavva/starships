export const paramsToSearchParams = <P extends Record<string, any>>(
  params: Partial<P>,
  defaultParams: P
): Record<string, string> => {
  const filteredParams: Record<string, string> = {};

  Object.keys(params).forEach((key) => {
    if (
      typeof params[key] !== "undefined" &&
      params[key] !== defaultParams[key]
    )
      filteredParams[key] = params[key];
  });

  return filteredParams;
};

export const notStringParams = {
  true: true,
  false: false,
  null: null,
};

export const decodeSearchParam = (val: any): any => {
  if (Array.isArray(val)) return val.map(decodeSearchParam);

  if (typeof val !== "string") return val;

  const lowerCased = val.toLowerCase();

  // eslint-disable-next-line no-prototype-builtins
  if (notStringParams.hasOwnProperty(lowerCased))
    return notStringParams[lowerCased as keyof typeof notStringParams];

  const asNumber = Number(val);

  if (val && asNumber.toString() === val) {
    return asNumber;
  }

  return val;
};

export const parseSearchParams = (
  searchParams: URLSearchParams
): Record<string, any> => {
  return Object.fromEntries(
    Array.from(searchParams.entries()).map(([key, value]) => [
      key,
      decodeSearchParam(value),
    ])
  );
};

export const searchParamsToParams = <P extends Record<string, any>>(
  defaultParams: P,
  searchParams: URLSearchParams
): P => {
  const params = parseSearchParams(searchParams);

  const filtered: P = { ...defaultParams };

  Object.keys(filtered).forEach((key: keyof P) => {
    // @ts-expect-error - key is a key of P
    if (key in params) filtered[key] = params[key];
  });

  return filtered;
};
