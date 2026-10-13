/**
 * PHOTO SLOTS
 * Every food, drink and venue visual in the pitch is an original illustration.
 * To use real photography instead, put a LICENSED image (one you own, or one
 * with a license that allows this use) in public/images/ and map the slot to it:
 *
 *   export const PHOTOS: PhotoMap = { "dish-fishTacos": "fish-tacos.jpg" };
 *
 * Slots: "hero", "interior", "dish-<DishKind>", "drink-<cocktail index 0-6>",
 * "wine-white", "wine-red", "beer", "zero-proof", "team".
 */
export type PhotoMap = Partial<Record<string, string>>;

export const PHOTOS: PhotoMap = {};
