import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { EASE_IN_OUT, mix } from "../../../utils/animation";
import { C, F, M } from "../brand";
import { Icon, IconName } from "../components/icons";
import { ArcPanel, DishFrame, DrinkFrame, Visual } from "../components/layout";
import { FilmFinish, ImageFrame, Reveal, Texture, useCues, useKenBurns, useReveal, useSceneTime, WipeReveal } from "../components/scene";
import { Chapter, Eyebrow, GoldRule, Heading, TaglineBand } from "../components/type";
import { COCKTAILS } from "../data/beverages";
import { CocktailArt } from "../illustrations/drinks";
import { Dish } from "../illustrations/food";
import { HeroScene, INTERIOR_SPOTS, INTERIOR_WIDTH, InteriorPanorama } from "../illustrations/venue";

/* ================================================================ S01 — Opening identity */

export const S01Opening: React.FC = () => {
  const cue = useCues();
  const kb = useKenBurns(1.12, 1.0);
  const { t } = useSceneTime();
  const titleP = useReveal(cue("title", 0.75) + 0.2, 1.4);
  const agenda = ["Concept", "Guests", "Food", "Beverages", "Financials", "Team"];
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <AbsoluteFill style={{ scale: String(kb), opacity: interpolate(t, [0, 1.2], [0, 1], { extrapolateRight: "clamp" }) }}>
        <Visual slot="hero">
          <HeroScene />
        </Visual>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(14,18,16,0.88) 0%, rgba(14,18,16,0.55) 38%, rgba(14,18,16,0) 62%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(14,18,16,0.85) 0%, rgba(14,18,16,0) 26%)" }} />
      <AbsoluteFill style={{ left: M.x, top: 250, width: 900 }}>
        <div style={{ fontFamily: F.script, fontSize: 110, color: C.goldSoft, opacity: titleP, translate: `${mix(titleP, -30, 0)}px 0px`, lineHeight: 1 }}>
          Welcome to
        </div>
        <WipeReveal at={cue("title", 0.75) + 0.5} duration={1.4}>
          <div style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 172, color: C.ivory, lineHeight: 0.95, letterSpacing: "0.01em" }}>Tiki Tiki</div>
        </WipeReveal>
        <Reveal at={cue("title", 0.75) + 1.1}>
          <div style={{ fontFamily: F.serif, fontSize: 54, letterSpacing: "0.32em", color: C.ivory, marginTop: 18 }}>LOUNGE &amp; BAR</div>
        </Reveal>
        <div style={{ height: 34 }} />
        <GoldRule width={360} at={cue("location", 3) - 0.2} />
        <div style={{ height: 30 }} />
        <Eyebrow at={cue("location", 3)} color={C.goldSoft} size={24}>
          Pacific Beach · San Diego, California
        </Eyebrow>
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 960, left: M.x, right: M.x, height: 60, display: "flex", flexDirection: "row", alignItems: "center", gap: 0 }}>
        {agenda.map((a, i) => (
          <Reveal key={a} at={cue("agenda", 12) + i * 0.25} y={10}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {i > 0 ? <span style={{ width: 6, height: 6, borderRadius: 3, background: C.gold, margin: "0 26px" }} /> : null}
              <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 21, letterSpacing: "0.26em", textTransform: "uppercase", color: C.ivory }}>{a}</span>
            </div>
          </Reveal>
        ))}
      </AbsoluteFill>
      <FilmFinish vignette={0.35} />
    </AbsoluteFill>
  );
};

/* ================================================================ S02 — Concept statement */

const Pillar: React.FC<{ icon: IconName; label: string; at: number }> = ({ icon, label, at }) => {
  const p = useReveal(at, 0.8);
  return (
    <div style={{ width: 170, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: p, translate: `0px ${mix(p, 20, 0)}px` }}>
      <div style={{ width: 92, height: 92, borderRadius: 46, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.ivory }}>
        <Icon name={icon} size={46} color={C.forest} />
      </div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 21, letterSpacing: "0.06em", textAlign: "center", color: C.ink, lineHeight: 1.25 }}>{label}</div>
    </div>
  );
};

export const S02Concept: React.FC = () => {
  const cue = useCues();
  return (
    <AbsoluteFill style={{ background: C.forestDeep }}>
      {/* imagery on the right */}
      <AbsoluteFill>
        <Texture kind="slate" />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 1010, top: 120 }}>
        <DrinkFrame width={430} height={560} at={0.3} slot="drink-0" seed="s2a" radius={60}>
          <CocktailArt drink={COCKTAILS[0]} />
        </DrinkFrame>
      </div>
      <div style={{ position: "absolute", left: 1400, top: 300 }}>
        <DishFrame width={420} height={420} at={cue("food", 0.8) + 0.3} slot="dish-fishTacos" radius={60}>
          <Dish kind="fishTacos" />
        </DishFrame>
      </div>
      <div style={{ position: "absolute", left: 1110, top: 720 }}>
        <ImageFrame width={360} height={240} at={cue("music", 4) + 0.2} radius={40}>
          <Visual slot="hero">
            <div style={{ width: 1920, height: 1080, scale: "0.42", transformOrigin: "-120px -260px" }}>
              <HeroScene />
            </div>
          </Visual>
        </ImageFrame>
      </div>
      <ArcPanel side="left" width={0.56} texture="paper" at={0}>
        <AbsoluteFill style={{ left: M.x, top: 190, width: 820 }}>
          <Heading script="Our" serif="Concept" at={0.3} />
          <div style={{ height: 36 }} />
          <Reveal at={cue("food", 0.8)}>
            <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 46, lineHeight: 1.3, color: C.ink, maxWidth: 760 }}>
              Baja-coastal food, tropical cocktails &amp; live island nights.
            </div>
          </Reveal>
          <div style={{ height: 50 }} />
          <div style={{ display: "flex", gap: 22 }}>
            <Pillar icon="fork" label="Baja-coastal food" at={cue("food", 0.8) + 0.4} />
            <Pillar icon="cocktail" label="Tropical cocktails" at={cue("drinks", 3)} />
            <Pillar icon="music" label="Live entertainment" at={cue("music", 4.5)} />
            <Pillar icon="users" label="Relaxed & social" at={cue("music", 4.5) + 0.8} />
          </div>
          <div style={{ height: 54 }} />
          <TaglineBand words={["ONE PLACE", "THE WHOLE EXPERIENCE"]} at={cue("distinct", 8)} width={720} />
          <div style={{ height: 34 }} />
          <Reveal at={cue("location", 12)}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon name="pin" size={40} color={C.sunset} />
              <div style={{ fontFamily: F.sans, fontSize: 26, color: C.ink }}>
                <b>Why Pacific Beach?</b> Beach lifestyle · social energy
              </div>
            </div>
          </Reveal>
        </AbsoluteFill>
      </ArcPanel>
      <Chapter topic="Concept Statement" index={2} counterLight />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ================================================================ S03 — Atmosphere */

const SPOT_LABELS: { cue: string; spot: keyof typeof INTERIOR_SPOTS; title: string; sub: string }[] = [
  { cue: "bar", spot: "bar", title: "Central Tiki Bar", sub: "Island-style, open on every side" },
  { cue: "wood", spot: "wood", title: "Warm Wood & Greenery", sub: "Tropical decor, lush plants" },
  { cue: "booths", spot: "booths", title: "Comfortable Booths", sub: "Room for groups" },
  { cue: "stage", spot: "stage", title: "Live Music Stage", sub: "Small stage, big atmosphere" },
  { cue: "patio", spot: "patio", title: "Outdoor Patio", sub: "Open to the coastal air" },
];

export const S03Atmosphere: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const times = SPOT_LABELS.map((s) => cue(s.cue, 1));
  // camera centre follows the narration
  const centres = SPOT_LABELS.map((s) => INTERIOR_SPOTS[s.spot]);
  const keyT = [0, ...times.map((x) => x + 0.2), 20];
  const keyX = [centres[0], ...centres, centres[centres.length - 1]];
  const cx = interpolate(t, keyT, keyX, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_IN_OUT });
  const scale = 1.1;
  const offset = Math.min(0, Math.max(1920 - INTERIOR_WIDTH * scale, 960 - cx * scale));
  let active = 0;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  return (
    <AbsoluteFill style={{ background: C.charcoal, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: offset, top: -60, scale: String(scale), transformOrigin: "0 0" }}>
        <Visual slot="interior">
          <InteriorPanorama />
        </Visual>
      </div>
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(14,18,16,0.92) 0%, rgba(14,18,16,0.2) 32%, rgba(14,18,16,0) 50%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(14,18,16,0.7) 0%, rgba(14,18,16,0) 22%)" }} />
      <AbsoluteFill style={{ left: M.x, top: 110 }}>
        <Heading script="The" serif="Atmosphere" at={0.2} color={C.ivory} scriptColor={C.goldSoft} size={84} />
      </AbsoluteFill>
      {SPOT_LABELS.map((s, i) => {
        const start = times[i];
        const end = i < times.length - 1 ? times[i + 1] : 21;
        const o = interpolate(t, [start, start + 0.5, end - 0.1, end + 0.3], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={s.title} style={{ position: "absolute", left: M.x, bottom: 110, opacity: o, translate: `0px ${(1 - Math.min(1, o * 2)) * 20}px` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 22, color: C.gold, letterSpacing: "0.2em" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ width: 60, height: 2, background: C.gold }} />
              <div style={{ fontFamily: F.serif, fontSize: 64, color: C.ivory }}>{s.title}</div>
            </div>
            <div style={{ marginLeft: 142, marginTop: 8, fontFamily: F.serif, fontStyle: "italic", fontSize: 30, color: C.goldSoft }}>{s.sub}</div>
          </div>
        );
      })}
      {/* progress dots */}
      <div style={{ position: "absolute", right: M.x, bottom: 128, display: "flex", gap: 14 }}>
        {SPOT_LABELS.map((s, i) => (
          <div key={s.title} style={{ width: i === active ? 40 : 12, height: 12, borderRadius: 6, background: i <= active ? C.gold : "rgba(251,246,236,0.35)" }} />
        ))}
      </div>
      <Chapter topic="Concept Statement" index={3} light />
      <FilmFinish vignette={0.4} />
    </AbsoluteFill>
  );
};
