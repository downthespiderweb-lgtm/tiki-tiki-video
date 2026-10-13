/** Beverage program — exact names, prices and specs from the project brief. */
export type GlassKind = "rocks" | "margarita" | "coupe" | "highball" | "tiki" | "collins" | "oldFashioned";

export type Cocktail = {
  name: string;
  price: number;
  spec: string;
  /** Three-word flavour cue shown on screen. */
  notes: string;
  glass: GlassKind;
  liquid: [string, string];
  garnish: "mint-pineapple" | "tajin-lime" | "passion" | "pineapple-mint" | "lime-mint" | "grapefruit" | "orange-peel";
};

export const COCKTAILS: Cocktail[] = [
  {
    name: "Baja Mai Tai", price: 17,
    spec: "Appleton Estate Signature Rum, Planteray 3 Stars Rum, orange curaçao, orgeat, lime, and pineapple",
    notes: "Rum · Orgeat · Pineapple", glass: "rocks", liquid: ["#E59A3F", "#B8572A"], garnish: "mint-pineapple",
  },
  {
    name: "Mango Margarita", price: 16,
    spec: "Cazadores Blanco Tequila, mango, lime, agave, and Tajín",
    notes: "Tequila · Mango · Tajín", glass: "margarita", liquid: ["#F6C251", "#EE9A2E"], garnish: "tajin-lime",
  },
  {
    name: "Passion Fruit Mezcal Sour", price: 18,
    spec: "Montelobos Mezcal, passion fruit, lime, agave, and chili bitters",
    notes: "Mezcal · Passion Fruit · Chili", glass: "coupe", liquid: ["#F1C75B", "#D99A2B"], garnish: "passion",
  },
  {
    name: "Pineapple Mojito", price: 15,
    spec: "Bacardi Superior Rum, pineapple, mint, lime, sugar, and soda",
    notes: "Rum · Pineapple · Mint", glass: "highball", liquid: ["#F3E7A4", "#D9CB62"], garnish: "pineapple-mint",
  },
  {
    name: "Coconut Rum Cooler", price: 16,
    spec: "Planteray 3 Stars Rum, coconut water, pineapple, lime, mint, and soda",
    notes: "Rum · Coconut · Lime", glass: "tiki", liquid: ["#F5F0E2", "#E1D6BC"], garnish: "lime-mint",
  },
  {
    name: "Guava Paloma", price: 16,
    spec: "Espolòn Blanco Tequila, guava, grapefruit, lime, agave, and soda",
    notes: "Tequila · Guava · Grapefruit", glass: "collins", liquid: ["#F4A3A6", "#DB6A7C"], garnish: "grapefruit",
  },
  {
    name: "Tropical Old Fashioned", price: 17,
    spec: "Four Roses Bourbon, pineapple demerara, Angostura bitters, and orange peel",
    notes: "Bourbon · Demerara · Orange", glass: "oldFashioned", liquid: ["#C9762E", "#7E3B16"], garnish: "orange-peel",
  },
];

export const WINES = [
  { name: "Kim Crawford Sauvignon Blanc", glass: 12, bottle: 44, kind: "white" as const },
  { name: "La Crema Pinot Noir", glass: 13, bottle: 48, kind: "red" as const },
];

export const BEER = { name: "Pacifico Clara", price: 8 };
export const ZERO_PROOF = { name: "Lyre's Classico Spritz", price: 10 };

export const PAIRINGS: [string, string][] = [
  ["Mango Margarita", "Baja Fish Tacos"],
  ["Baja Mai Tai", "Coconut Crab Cakes"],
  ["Passion Fruit Mezcal Sour", "Tropical Calamari"],
  ["Kim Crawford Sauvignon Blanc", "Halibut or Poke"],
  ["Pacifico Clara", "Baja-inspired dishes"],
  ["La Crema Pinot Noir", "Steak or Surf & Turf"],
];
