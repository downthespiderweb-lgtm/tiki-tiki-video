import React from "react";
import { AbsoluteFill } from "remotion";
import { C, F } from "./brand";
import { Texture } from "./components/scene";
import { APPETIZERS, DESSERTS, MAINS } from "./data/menu";
import { COCKTAILS } from "./data/beverages";
import { BottleArt, CocktailArt } from "./illustrations/drinks";
import { Dish } from "./illustrations/food";
import { HeroScene, InteriorPanorama } from "./illustrations/venue";

/** Contact sheet of every illustration — handy for checking art changes (composition "PitchLibrary"). */
export const Library: React.FC<{ page: "food" | "drinks" | "hero" | "interior" }> = ({ page }) => {
  const items = [...APPETIZERS, ...MAINS, ...DESSERTS];
  return (
    <AbsoluteFill>
      <Texture kind={page === "food" ? "wood" : "slate"} />
      {page === "food" ? (
        <AbsoluteFill style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 18, padding: 30 }}>
          {items.map((it) => (
            <div key={it.name} style={{ width: 260, textAlign: "center" }}>
              <div style={{ width: 150, height: 150, margin: "0 auto" }}>
                <Dish kind={it.dish} />
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 18, color: C.ivory }}>{it.name}</div>
            </div>
          ))}
        </AbsoluteFill>
      ) : null}
      {page === "hero" ? (
        <AbsoluteFill>
          <HeroScene />
        </AbsoluteFill>
      ) : null}
      {page === "interior" ? (
        <AbsoluteFill style={{ scale: "0.5", transformOrigin: "0 0" }}>
          <InteriorPanorama />
        </AbsoluteFill>
      ) : null}
      {page === "drinks" ? (
        <AbsoluteFill style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 30, padding: 40 }}>
          {COCKTAILS.map((d) => (
            <div key={d.name} style={{ width: 300, textAlign: "center" }}>
              <div style={{ width: 260, height: 380, margin: "0 auto" }}>
                <CocktailArt drink={d} />
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 18, color: C.ivory }}>{d.name}</div>
            </div>
          ))}
          {(["white", "red", "beer", "spritz"] as const).map((k) => (
            <div key={k} style={{ width: 300, textAlign: "center" }}>
              <div style={{ width: 260, height: 380, margin: "0 auto" }}>
                <BottleArt kind={k} />
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 18, color: C.ivory }}>{k}</div>
            </div>
          ))}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
