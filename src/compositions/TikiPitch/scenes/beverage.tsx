import React from "react";
import { AbsoluteFill } from "remotion";
import { mix } from "../../../utils/animation";
import { C, F, M } from "../brand";
import { Icon } from "../components/icons";
import { ArcPanel, Bokeh, DrinkFrame, Visual } from "../components/layout";
import { FilmFinish, Reveal, Texture, useCues, useReveal, useSceneTime } from "../components/scene";
import { Chapter, Eyebrow, Footnote, GoldRule, Heading, TaglineBand } from "../components/type";
import { BEER, COCKTAILS, Cocktail, PAIRINGS, WINES, ZERO_PROOF } from "../data/beverages";
import { BottleArt, CocktailArt } from "../illustrations/drinks";

/* ================================================================ S11 — Signature cocktail program */

export const S11CocktailIntro: React.FC = () => {
  const cue = useCues();
  const g = Math.min(cue("gallery", 2), 1.2);
  const { t } = useSceneTime();
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <Texture kind="slate" />
      <Bokeh seed="s11" n={18} opacity={0.38} />
      <AbsoluteFill style={{ top: 120 }}>
        <Heading script="Signature" serif="Cocktails" at={0.2} align="center" color={C.ivory} scriptColor={C.goldSoft} size={110} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 270, display: "flex", alignItems: "center" }}>
        <Eyebrow at={cue("intro", 0.75) + 0.4} color={C.goldSoft}>
          Seven tropical originals
        </Eyebrow>
      </AbsoluteFill>
      {/* bar ledge */}
      <AbsoluteFill style={{ top: 830, height: 250, background: "linear-gradient(#7A4E30, #3A2416)" }} />
      <AbsoluteFill style={{ top: 822, height: 14, background: C.gold, opacity: 0.85 }} />
      <AbsoluteFill style={{ top: 380, height: 460, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-end", gap: 14 }}>
        {COCKTAILS.map((d, i) => {
          const at = g + i * 0.45;
          const p = Math.min(1, Math.max(0, (t - at) / 0.8));
          const e = 1 - Math.pow(1 - p, 3);
          return (
            <div key={d.name} style={{ width: 230, height: 440, opacity: e, translate: `0px ${mix(e, 60, 0)}px` }}>
              <Visual slot={`drink-${i}`}>
                <CocktailArt drink={d} />
              </Visual>
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 880, display: "flex", flexDirection: "row", justifyContent: "center", gap: 18 }}>
        {["Rum", "Tequila", "Mezcal", "Bourbon"].map((s, i) => (
          <Reveal key={s} at={g + 0.4 + i * 0.3} y={10}>
            <div style={{ padding: "10px 26px", borderRadius: 999, border: `1.5px solid ${C.goldSoft}`, fontFamily: F.sans, fontWeight: 600, fontSize: 21, letterSpacing: "0.18em", color: C.ivory }}>
              {s.toUpperCase()}
            </div>
          </Reveal>
        ))}
      </AbsoluteFill>
      <Reveal at={cue("responsible", 13)} style={{ position: "absolute", right: M.x, bottom: 56 }} y={12}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 24px", borderRadius: 14, background: "rgba(14,18,16,0.75)", border: `1px solid ${C.gold}` }}>
          <Icon name="shield" size={34} color={C.goldSoft} />
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 21, color: C.ivory, letterSpacing: "0.04em" }}>21+ · ID checked · Responsible, licensed service</div>
        </div>
      </Reveal>
      <Chapter topic="Beverage Menu" index={11} light />
      <FilmFinish vignette={0.4} />
    </AbsoluteFill>
  );
};

/* ================================================================ S12 / S13 — cocktail groups */

const CocktailColumn: React.FC<{
  d: Cocktail;
  index: number;
  imageAt: number;
  at: number;
  width: number;
  height: number;
  light: boolean;
  active: boolean;
}> = ({
  d,
  index,
  imageAt,
  at,
  width,
  height,
  light,
  active,
}) => {
  const p = useReveal(at + 0.3, 0.8);
  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <DrinkFrame width={width} height={height} at={imageAt} slot={`drink-${index}`} seed={`d${index}`} radius={40} style={{ outline: active ? `3px solid ${C.gold}` : "none", outlineOffset: 6 }}>
        <CocktailArt drink={d} />
      </DrinkFrame>
      <div style={{ opacity: p, translate: `0px ${mix(p, 16, 0)}px`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: F.serif, fontSize: 36, color: light ? C.ivory : C.ink, lineHeight: 1.1 }}>{d.name}</div>
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 24, color: light ? C.goldSoft : C.muted }}>{d.notes}</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 34, color: C.gold, marginTop: 4 }}>${d.price}</div>
      </div>
    </div>
  );
};

export const S12CocktailsA: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const group = COCKTAILS.slice(0, 3);
  const times = group.map((_, i) => cue(`i${i}`, 1 + i * 6));
  let active = 0;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <AbsoluteFill style={{ top: 0, height: 250, background: C.charcoal }} />
      <AbsoluteFill style={{ top: 92 }}>
        <Heading script="Island" serif="Classics" at={0.2} align="center" color={C.ivory} scriptColor={C.goldSoft} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 250, height: 60 }}>
        <TaglineBand words={["RUM", "TEQUILA", "MEZCAL"]} at={0.6} align="center" height={60} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 360, display: "flex", flexDirection: "row", justifyContent: "center", gap: 70 }}>
        {group.map((d, i) => (
          <CocktailColumn key={d.name} d={d} index={i} imageAt={0.4 + i * 0.25} at={times[i] - 0.2} width={440} height={430} light={false} active={active === i} />
        ))}
      </AbsoluteFill>
      <Chapter topic="Beverage Menu · Cocktails" index={12} light />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

export const S13CocktailsB: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const group = COCKTAILS.slice(3);
  const times = group.map((_, i) => cue(`i${i}`, 1 + i * 4.5));
  let active = 0;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <Texture kind="slate" />
      <AbsoluteFill style={{ top: 96 }}>
        <Heading script="Tropical" serif="Coolers & a Classic" at={0.2} align="center" color={C.ivory} scriptColor={C.goldSoft} size={88} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 230, display: "flex", alignItems: "center" }}>
        <GoldRule width={420} at={0.6} align="center" />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 300, display: "flex", flexDirection: "row", justifyContent: "center", gap: 46 }}>
        {group.map((d, i) => (
          <CocktailColumn key={d.name} d={d} index={i + 3} imageAt={0.4 + i * 0.25} at={times[i] - 0.2} width={370} height={460} light active={active === i} />
        ))}
      </AbsoluteFill>
      <Chapter topic="Beverage Menu · Cocktails" index={13} light />
      <FilmFinish vignette={0.36} />
    </AbsoluteFill>
  );
};

/* ================================================================ S14 — Wine, beer, zero-proof & pairings */

const BevTile: React.FC<{
  kind: "white" | "red" | "beer" | "spritz";
  name: string;
  price: string;
  tag?: string;
  at: number;
  slot: string;
  activeFrom: number;
  activeTo: number;
}> = ({ kind, name, price, tag, at, slot, activeFrom, activeTo }) => {
  const p = useReveal(at, 0.8);
  const { t } = useSceneTime();
  const active = t >= activeFrom && t < activeTo;
  return (
    <div style={{ width: 330, display: "flex", gap: 18, alignItems: "center", opacity: p, translate: `0px ${mix(p, 30, 0)}px` }}>
      <div style={{ width: 130, height: 190, flexShrink: 0, borderRadius: 26, overflow: "hidden", position: "relative", background: C.forestDeep, border: `4px solid ${active ? C.gold : C.ivory}` }}>
        <Visual slot={slot}>
          <Texture kind="slate" />
          <AbsoluteFill style={{ padding: 10 }}>
            <BottleArt kind={kind} />
          </AbsoluteFill>
        </Visual>
      </div>
      <div>
        {tag ? <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 16, letterSpacing: "0.2em", color: C.gold, marginBottom: 6 }}>{tag}</div> : null}
        <div style={{ fontFamily: F.serif, fontSize: 28, color: C.ivory, lineHeight: 1.15 }}>{name}</div>
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 25, color: C.goldSoft, marginTop: 8 }}>{price}</div>
      </div>
    </div>
  );
};

export const S14Variety: React.FC = () => {
  const cue = useCues();
  const pair = 3.2;
  const tt = [cue("i0", 3), cue("i1", 6), cue("i2", 8.5), cue("i3", 10), cue("pairings", 14)];
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <Texture kind="slate" />
      <AbsoluteFill style={{ left: M.x, top: 160, width: 760 }}>
        <Heading script="Beyond" serif="Cocktails" at={0.2} color={C.ivory} scriptColor={C.goldSoft} />
        <div style={{ height: 56 }} />
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 50, rowGap: 46 }}>
          <BevTile kind="white" name={WINES[0].name} price={`$${WINES[0].glass} glass · $${WINES[0].bottle} bottle`} tag="WHITE WINE" at={Math.min(cue("i0", 3), 0.6)} slot="wine-white" activeFrom={tt[0]} activeTo={tt[1]} />
          <BevTile kind="red" name={WINES[1].name} price={`$${WINES[1].glass} glass · $${WINES[1].bottle} bottle`} tag="RED WINE" at={Math.min(cue("i1", 6), 0.9)} slot="wine-red" activeFrom={tt[1]} activeTo={tt[2]} />
          <BevTile kind="beer" name={BEER.name} price={`$${BEER.price}`} tag="BEER" at={Math.min(cue("i2", 8.5), 1.2)} slot="beer" activeFrom={tt[2]} activeTo={tt[3]} />
          <BevTile kind="spritz" name={ZERO_PROOF.name} price={`$${ZERO_PROOF.price}`} tag="ZERO-PROOF" at={Math.min(cue("i3", 10), 1.5)} slot="zero-proof" activeFrom={tt[3]} activeTo={tt[4]} />
        </div>
      </AbsoluteFill>
      <ArcPanel side="right" width={0.43} texture="paper" at={0.2}>
        <AbsoluteFill style={{ left: 1250, top: 170, width: 600 }}>
          <Eyebrow at={pair - 0.6} color={C.gold}>
            Suggested pairings
          </Eyebrow>
          <div style={{ height: 30 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {PAIRINGS.map(([drink, food], i) => (
              <Reveal key={drink} at={pair - 0.4 + i * 0.6} x={24} y={0}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontFamily: F.serif, fontSize: 30, color: C.ink }}>{drink}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: F.serif, fontStyle: "italic", fontSize: 25, color: C.muted }}>
                    <span style={{ width: 34, height: 2, background: C.gold }} />
                    with {food}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 26 }} />
          <Footnote at={cue("pairings", 14)}>Zero-proof spritz: an option for guests who skip alcohol.</Footnote>
        </AbsoluteFill>
      </ArcPanel>
      <Chapter topic="Beverage Menu · Wine, Beer & Zero-Proof" index={14} light counterLight={false} />
      <FilmFinish vignette={0.3} />
    </AbsoluteFill>
  );
};
