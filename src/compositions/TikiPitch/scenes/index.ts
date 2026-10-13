import type React from "react";
import { S16Costs, S15Overview, S17Viability } from "./finance";
import { S11CocktailIntro, S12CocktailsA, S13CocktailsB, S14Variety } from "./beverage";
import { S01Opening, S02Concept, S03Atmosphere } from "./concept";
import { S06Appetizers, S07Seafood, S08Mains, S09Desserts, S10Strategy } from "./food";
import { S04Demographics, S05Psychographics } from "./guests";
import { S18Talent, S19Pipeline, S20Closing } from "./talent";

type Reveal = { kind: "curve" | "circle" | "diagonal"; from: "left" | "right" | "center" | "bottom" };

/**
 * The 20 PechaKucha scenes, in order. `reveal` is the mask used when the scene
 * enters (ignored for scene 1). A new assignment topic always enters with the
 * large circular reveal; scenes within a topic use curved sweeps or diagonals.
 */
export const SCENES: { title: string; topic: string; component: React.FC; reveal: Reveal }[] = [
  { title: "Opening identity", topic: "Concept Statement", component: S01Opening, reveal: { kind: "circle", from: "center" } },
  { title: "Concept statement", topic: "Concept Statement", component: S02Concept, reveal: { kind: "curve", from: "right" } },
  { title: "Atmosphere & experience", topic: "Concept Statement", component: S03Atmosphere, reveal: { kind: "curve", from: "left" } },
  { title: "Guest demographics", topic: "Guests", component: S04Demographics, reveal: { kind: "circle", from: "left" } },
  { title: "Guest psychographics", topic: "Guests", component: S05Psychographics, reveal: { kind: "curve", from: "right" } },
  { title: "Appetizers", topic: "Food Menu", component: S06Appetizers, reveal: { kind: "circle", from: "center" } },
  { title: "Seafood & Baja-inspired mains", topic: "Food Menu", component: S07Seafood, reveal: { kind: "curve", from: "right" } },
  { title: "Other main plates", topic: "Food Menu", component: S08Mains, reveal: { kind: "curve", from: "left" } },
  { title: "Desserts", topic: "Food Menu", component: S09Desserts, reveal: { kind: "curve", from: "right" } },
  { title: "Food strategy", topic: "Food Menu", component: S10Strategy, reveal: { kind: "diagonal", from: "bottom" } },
  { title: "Signature cocktail program", topic: "Beverage Menu", component: S11CocktailIntro, reveal: { kind: "circle", from: "center" } },
  { title: "Cocktails I", topic: "Beverage Menu", component: S12CocktailsA, reveal: { kind: "curve", from: "right" } },
  { title: "Cocktails II", topic: "Beverage Menu", component: S13CocktailsB, reveal: { kind: "curve", from: "left" } },
  { title: "Wine, beer, zero-proof & pairings", topic: "Beverage Menu", component: S14Variety, reveal: { kind: "curve", from: "right" } },
  { title: "Financial overview", topic: "Financials", component: S15Overview, reveal: { kind: "circle", from: "center" } },
  { title: "Operating costs", topic: "Financials", component: S16Costs, reveal: { kind: "diagonal", from: "bottom" } },
  { title: "Financial viability", topic: "Financials", component: S17Viability, reveal: { kind: "curve", from: "right" } },
  { title: "Talent acquisition", topic: "Talent Acquisition", component: S18Talent, reveal: { kind: "circle", from: "center" } },
  { title: "Recruiting, training & retention", topic: "Talent Acquisition", component: S19Pipeline, reveal: { kind: "curve", from: "left" } },
  { title: "Closing", topic: "Closing", component: S20Closing, reveal: { kind: "circle", from: "center" } },
];

if (SCENES.length !== 20) {
  throw new Error(`Expected exactly 20 scenes, found ${SCENES.length}`);
}
