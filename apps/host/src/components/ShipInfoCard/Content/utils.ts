import type { Starship } from "api";

export type FormattedStarship = {
  [Key in keyof Starship]: {
    label: string;
    value: Starship[Key] extends string[]
      ? Array<{
          label: string;
          value: string;
        }>
      : string;
  };
};

const STATIC_LABELS = {
  cost_in_credits: "Cost",
  hyperdrive_rating: "Rating",
};

const uppercaseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const NUMBER_SCALES = [
  {
    scale: 1_000_000_000,
    suffix: "B",
  },
  {
    scale: 1_000_000,
    suffix: "M",
  },
  {
    scale: 1_000,
    suffix: "K",
  },
];

export const formatNumber = (
  value: string | number,
  decimals: number = 1
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) {
    return String(value);
  }

  // Use K/M/B format
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  for (const { scale, suffix } of NUMBER_SCALES) {
    if (absNum >= scale) {
      const formatted = (absNum / scale).toFixed(decimals);
      return `${sign}${parseFloat(formatted)}${suffix}`;
    }
  }

  // Less than 1000, return as-is with commas
  return new Intl.NumberFormat("en-US").format(num);
};

const formatLabel = (label: string) => {
  const staticLabel = STATIC_LABELS[label as keyof typeof STATIC_LABELS];

  if (staticLabel) {
    return staticLabel;
  }

  return label
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DATE_PROP_NAMES = ["created", "edited"];

const isValidNumber = (value: string) => {
  return !isNaN(Number(value));
};

const formatValue = (name: string, value: string) => {
  if (DATE_PROP_NAMES.includes(name)) {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (Array.isArray(value)) {
    const singularName = name.replace(/s$/, "");

    return value.map((url, index) => {
      return {
        label: `${uppercaseFirstLetter(singularName)} ${index + 1}`,
        value: url,
      };
    });
  } else if (isValidNumber(value)) {
    return formatNumber(value);
  } else {
    return value;
  }
};

export const formatStarship = (starship: Starship): FormattedStarship => {
  return Object.fromEntries(
    Object.entries(starship).map(([key, value]) => {
      return [
        key,
        {
          label: formatLabel(key),
          value: formatValue(key, value),
        },
      ];
    })
  ) as unknown as FormattedStarship;
};
