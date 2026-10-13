/** Food menu — exact names and prices from the project brief. */
export type MenuItem = { name: string; price: number; dish: DishKind };

export type DishKind =
  | "shrimp" | "poke" | "skewers" | "crabcakes" | "cornDip" | "calamari"
  | "fishTacos" | "burger" | "currySalmon" | "mangoChicken" | "steak" | "pokeBowl"
  | "shrimpPasta" | "jerkChicken" | "halibut" | "surfTurf"
  | "cremeBrulee" | "cheesecake" | "upsideDown" | "tart";

export const APPETIZERS: MenuItem[] = [
  { name: "Crispy Baja Shrimp", price: 16, dish: "shrimp" },
  { name: "Tiki Tuna Poke", price: 17, dish: "poke" },
  { name: "Pineapple Chicken Skewers", price: 15, dish: "skewers" },
  { name: "Coconut Crab Cakes", price: 18, dish: "crabcakes" },
  { name: "Street Corn Dip", price: 13, dish: "cornDip" },
  { name: "Tropical Calamari", price: 16, dish: "calamari" },
];

export const MAINS: MenuItem[] = [
  { name: "Baja Fish Tacos", price: 22, dish: "fishTacos" },
  { name: "Island Burger", price: 21, dish: "burger" },
  { name: "Coconut Curry Salmon", price: 27, dish: "currySalmon" },
  { name: "Mango Glazed Chicken", price: 24, dish: "mangoChicken" },
  { name: "Pacific Rim Steak", price: 29, dish: "steak" },
  { name: "Poke Rice Bowl", price: 23, dish: "pokeBowl" },
  { name: "Baja Shrimp Pasta", price: 25, dish: "shrimpPasta" },
  { name: "Jerk Chicken Plate", price: 24, dish: "jerkChicken" },
  { name: "Seared Halibut", price: 30, dish: "halibut" },
  { name: "Tiki Tiki Surf & Turf", price: 34, dish: "surfTurf" },
];

export const DESSERTS: MenuItem[] = [
  { name: "Coconut Crème Brûlée", price: 10, dish: "cremeBrulee" },
  { name: "Mango-Lime Cheesecake", price: 11, dish: "cheesecake" },
  { name: "Pineapple Upside-Down Cake", price: 10, dish: "upsideDown" },
  { name: "Passion Fruit Tart", price: 11, dish: "tart" },
];

const byName = (name: string) => {
  const item = MAINS.find((m) => m.name === name);
  if (!item) throw new Error(`Unknown main: ${name}`);
  return item;
};

/** Scene 7 — seafood & Baja-inspired mains. */
export const SEAFOOD_MAINS = [
  "Baja Fish Tacos", "Coconut Curry Salmon", "Poke Rice Bowl", "Baja Shrimp Pasta", "Seared Halibut",
].map(byName);

/** Scene 8 — other mains (land + the signature surf & turf). */
export const LAND_MAINS = [
  "Island Burger", "Mango Glazed Chicken", "Jerk Chicken Plate", "Pacific Rim Steak", "Tiki Tiki Surf & Turf",
].map(byName);

export const priceRange = (items: MenuItem[]) => {
  const prices = items.map((i) => i.price);
  return [Math.min(...prices), Math.max(...prices)] as const;
};
