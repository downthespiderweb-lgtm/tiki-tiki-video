/**
 * Tiki Tiki Lounge & Bar design tokens.
 * Editorial menu language (cream, charcoal, forest green, restrained gold) +
 * tropical coastal identity (wood, greenery, ocean blue, sunset accents).
 */
export const C = {
  ivory: "#FBF6EC",
  cream: "#F3EADA",
  creamDeep: "#E7DAC2",
  charcoal: "#151816",
  ink: "#1F2422",
  forest: "#1D3B30",
  forestDeep: "#11261E",
  gold: "#C4A060",
  goldSoft: "#DCC28E",
  amber: "#D2A35A",
  ocean: "#2C6E7F",
  oceanDeep: "#16404B",
  sunset: "#D5734B",
  coral: "#E59B78",
  wood: "#8B5A3A",
  woodDark: "#5A3822",
  leaf: "#4C8A55",
  leafDeep: "#2D5A38",
  mango: "#EBA83A",
  guava: "#D8657A",
  muted: "#6E6A62",
  mutedLight: "#B8B0A0",
} as const;

export const F = {
  serif: "Playfair Display",
  script: "Great Vibes",
  sans: "Inter",
} as const;

/** Consistent margins (px at 1920×1080). */
export const M = {
  x: 120,
  y: 92,
  gutter: 56,
} as const;

/** Type scale. */
export const T = {
  hero: 150,
  h1: 96,
  h2: 68,
  h3: 46,
  script: 92,
  body: 30,
  label: 22,
  price: 34,
} as const;

/**
 * Chart colours — validated with the dataviz palette checker (lightness band,
 * chroma floor, CVD separation, contrast) on both cream and charcoal surfaces.
 */
export const CH = {
  food: "#00809C",
  beverage: "#B9802A",
  bar: "#00809C",
  negative: "#C4552E",
  positive: "#00809C",
  grid: "rgba(31,36,34,0.12)",
} as const;
