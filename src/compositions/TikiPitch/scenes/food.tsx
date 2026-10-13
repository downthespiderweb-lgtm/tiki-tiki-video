import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { EASE_IN_OUT, mix } from "../../../utils/animation";
import { C, CH, F, M } from "../brand";
import { Icon, IconName } from "../components/icons";
import { ArcPanel, Caption, DishFrame, Visual } from "../components/layout";
import { FilmFinish, ImageFrame, Reveal, Texture, useCues, useKenBurns, useReveal, useSceneTime } from "../components/scene";
import { Chapter, Eyebrow, Footnote, Heading, MenuRow, PricePill, TaglineBand } from "../components/type";
import { APPETIZERS, DESSERTS, LAND_MAINS, MAINS, MenuItem, priceRange, SEAFOOD_MAINS } from "../data/menu";
import { Dish } from "../illustrations/food";

const usd = (n: number) => `$${n}`;

/* ================================================================ S06 — Appetizers */

export const S06Appetizers: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const times = APPETIZERS.map((_, i) => cue(`i${i}`, 2 + i * 2));
  let active = -1;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  if (t >= cue("outro", 17)) active = -1;
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <AbsoluteFill style={{ left: M.x, top: 110, width: 1680, height: 130, display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
        <Heading script="Shareable" serif="Appetizers" at={0.2} />
        <TaglineBand words={["SHARE", "SAVOR", "START THE NIGHT"]} at={cue("intro", 0.75) + 0.4} width={620} />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: M.x, top: 300, width: 1680, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "flex-start", columnGap: 60, rowGap: 40 }}>
        {APPETIZERS.map((item, i) => (
          <div key={item.name} style={{ width: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div>
              <DishFrame width={520} height={270} at={times[i] - 0.15} slot={`dish-${item.dish}`} radius={36} dishScale={1.05}>
                <Dish kind={item.dish} />
              </DishFrame>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <Caption name={item.name} at={times[i]} size={32} />
              <Reveal at={times[i] + 0.2} y={8}>
                <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: active === i ? C.sunset : C.gold }}>{usd(item.price)}</span>
              </Reveal>
            </div>
          </div>
        ))}
      </AbsoluteFill>
      <Chapter topic="Food Menu · Appetizers" index={6} />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

/* ================================================================ S07 / S08 — mains split screens */

const HeroDish: React.FC<{ items: MenuItem[]; times: number[]; size: number; cx: number }> = ({ items, times, size, cx }) => {
  const { t } = useSceneTime();
  const kb = useKenBurns(1.0, 1.05);
  return (
    <AbsoluteFill>
      <Texture kind="wood" style={{ scale: String(kb) }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,214,150,0.22), rgba(0,0,0,0.35) 85%)" }} />
      {items.map((item, i) => {
        const start = i === 0 ? -2 : times[i] - 0.2;
        const end = i < items.length - 1 ? times[i + 1] - 0.2 : 30;
        const o = interpolate(t, [start, start + 0.6, end, end + 0.6], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const local = Math.max(0, t - start);
        return (
          <AbsoluteFill key={item.name} style={{ opacity: o }}>
            <div style={{ position: "absolute", left: cx - size / 2, top: (1080 - size) / 2, width: size, height: size, rotate: `${mix(Math.min(1, local / 1.2), -14, 0)}deg`, scale: String(mix(Math.min(1, local / 1.2), 0.9, 1) + local * 0.004) }}>
              <Visual slot={`dish-${item.dish}`}>
                <Dish kind={item.dish} />
              </Visual>
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

export const S07Seafood: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const times = SEAFOOD_MAINS.map((_, i) => cue(`i${i}`, 2 + i * 2.5));
  let active = 0;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <HeroDish items={SEAFOOD_MAINS} times={times} size={680} cx={1420} />
      <ArcPanel side="left" width={0.5} texture="paper" at={0}>
        <AbsoluteFill style={{ left: M.x, top: 170, width: 760 }}>
          <Heading script="From the" serif="Pacific" at={0.2} stacked size={104} />
          <div style={{ height: 22 }} />
          <TaglineBand words={["SEAFOOD", "BAJA-INSPIRED", "FRESH"]} at={cue("intro", 0.75) + 0.3} width={700} />
          <div style={{ height: 46 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 700 }}>
            {SEAFOOD_MAINS.map((item, i) => (
              <MenuRow key={item.name} name={item.name} price={usd(item.price)} at={times[i] - 0.1} active={active === i} size={40} />
            ))}
          </div>
          <div style={{ height: 40 }} />
          <Reveal at={cue("outro", 15)}>
            <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 28, color: C.muted }}>
              Plus shrimp, tuna, crab &amp; calamari among the starters.
            </div>
          </Reveal>
        </AbsoluteFill>
      </ArcPanel>
      <Chapter topic="Food Menu · Seafood Mains" index={7} counterLight />
      <FilmFinish />
    </AbsoluteFill>
  );
};

export const S08Mains: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  // narration: i0 burger, i1 chicken pair (mango + jerk), i3 steak, i4 surf & turf
  const t0 = cue("i0", 0.75);
  const t1 = cue("i1", 4.5);
  const t3 = cue("i3", 9);
  const t4 = cue("i4", 12);
  const times = [t0, t1, t1 + 1.6, t3, t4];
  let active = 0;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <HeroDish items={LAND_MAINS} times={times} size={680} cx={500} />
      <ArcPanel side="right" width={0.5} color={C.charcoal} at={0}>
        <Texture kind="slate" />
        <AbsoluteFill style={{ left: 1040, top: 170, width: 760 }}>
          <Heading script="From the" serif="Grill" at={0.2} stacked size={104} color={C.ivory} scriptColor={C.goldSoft} />
          <div style={{ height: 22 }} />
          <TaglineBand words={["CHICKEN", "STEAK", "BURGERS"]} at={0.8} width={700} />
          <div style={{ height: 46 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 700 }}>
            {LAND_MAINS.map((item, i) => (
              <MenuRow key={item.name} name={item.name} price={usd(item.price)} at={times[i] - 0.1} active={active === i} size={40} color={C.ivory} />
            ))}
          </div>
          <div style={{ height: 40 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <PricePill at={t4 + 0.3} dark={false} size={24}>
              Signature
            </PricePill>
            <Reveal at={cue("outro", 16)}>
              <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 28, color: C.goldSoft }}>A favorite for every guest in the group.</div>
            </Reveal>
          </div>
        </AbsoluteFill>
      </ArcPanel>
      <Chapter topic="Food Menu · Main Plates" index={8} light />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ================================================================ S09 — Desserts */

const DessertCard: React.FC<{ item: MenuItem; at: number; active: boolean }> = ({ item, at, active }) => {
  const p = useReveal(at, 0.9);
  return (
    <div
      style={{
        width: 380,
        borderRadius: "190px 190px 32px 32px",
        background: C.ivory,
        boxShadow: active ? "0 26px 60px rgba(20,24,22,0.35)" : "0 16px 40px rgba(20,24,22,0.2)",
        padding: 14,
        opacity: p,
        translate: `0px ${mix(p, 60, 0) - (active ? 12 : 0)}px`,
        border: `2px solid ${active ? C.gold : "transparent"}`,
      }}
    >
      <div style={{ height: 360, borderRadius: "176px 176px 20px 20px", overflow: "hidden", position: "relative" }}>
        <Visual slot={`dish-${item.dish}`}>
          <Texture kind="wood" />
          <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,214,150,0.2), rgba(0,0,0,0.3) 85%)" }} />
          <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, height: 320 }}>
              <Dish kind={item.dish} />
            </div>
          </AbsoluteFill>
        </Visual>
      </div>
      <div style={{ padding: "26px 10px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ fontFamily: F.serif, fontSize: 31, color: C.ink, textAlign: "center", lineHeight: 1.15, height: 72, display: "flex", alignItems: "center" }}>
          {item.name}
        </div>
        <PricePill at={at + 0.3} size={28}>
          ${item.price}
        </PricePill>
      </div>
    </div>
  );
};

export const S09Desserts: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const times = DESSERTS.map((_, i) => cue(`i${i}`, 3 + i * 2.5));
  let active = -1;
  times.forEach((x, i) => {
    if (t >= x) active = i;
  });
  if (t >= cue("outro", 15)) active = -1;
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <AbsoluteFill style={{ top: 0, height: 330, background: C.forest }} />
      <AbsoluteFill style={{ top: 96 }}>
        <Heading script="Sweet" serif="Endings" at={0.2} align="center" color={C.ivory} scriptColor={C.goldSoft} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 236, height: 64, display: "flex", alignItems: "center" }}>
        <TaglineBand words={["COCONUT", "MANGO", "PINEAPPLE", "PASSION FRUIT"]} at={cue("intro", 0.75) + 0.3} align="center" />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 380, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: 40 }}>
        {DESSERTS.map((d, i) => (
          <DessertCard key={d.name} item={d} at={times[i] - 0.2} active={active === i} />
        ))}
      </AbsoluteFill>
      <Chapter topic="Food Menu · Desserts" index={9} light />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

/* ================================================================ S10 — Food strategy */

const STRATEGY: { icon: IconName; title: string; sub: string; cue: string }[] = [
  { icon: "wave", title: "Coastal & Baja", sub: "Seafood-forward, fresh flavors", cue: "k0" },
  { icon: "fork", title: "Variety", sub: "Chicken · steak · burgers · rice bowls", cue: "k1" },
  { icon: "leaf", title: "Tropical touch", sub: "Mango · pineapple · coconut · passion fruit", cue: "k2" },
];

const RangeBars: React.FC<{ at: number }> = ({ at }) => {
  const rows = [
    { label: "Appetizers", range: priceRange(APPETIZERS), n: APPETIZERS.length },
    { label: "Main plates", range: priceRange(MAINS), n: MAINS.length },
    { label: "Desserts", range: priceRange(DESSERTS), n: DESSERTS.length },
  ];
  const max = 35;
  const W = 640;
  const x = (v: number) => (v / max) * W;
  return (
    <div style={{ position: "relative", width: W + 240 }}>
      {[0, 10, 20, 30].map((v) => (
        <div key={v} style={{ position: "absolute", left: 220 + x(v), top: 0, bottom: 40, width: 1, background: CH.grid }}>
          <div style={{ position: "absolute", bottom: -36, left: -20, width: 40, textAlign: "center", fontFamily: F.sans, fontSize: 19, color: C.muted }}>${v}</div>
        </div>
      ))}
      {rows.map((r, i) => (
        <RangeRow key={r.label} label={r.label} n={r.n} lo={r.range[0]} hi={r.range[1]} at={at + i * 0.35} x={x} />
      ))}
      <div style={{ height: 40 }} />
    </div>
  );
};

const RangeRow: React.FC<{ label: string; n: number; lo: number; hi: number; at: number; x: (v: number) => number }> = ({ label, n, lo, hi, at, x }) => {
  const p = useReveal(at, 1.0, EASE_IN_OUT);
  const o = useReveal(at, 0.5);
  return (
    <div style={{ height: 110, display: "flex", alignItems: "center", opacity: o, position: "relative" }}>
      <div style={{ width: 200, textAlign: "right", paddingRight: 20 }}>
        <div style={{ fontFamily: F.serif, fontSize: 32, color: C.ink }}>{label}</div>
        <div style={{ fontFamily: F.sans, fontSize: 18, color: C.muted }}>{n} items</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 220 + x(lo),
          width: Math.max(10, (x(hi) - x(lo)) * p),
          height: 24,
          borderRadius: 4,
          background: CH.bar,
        }}
      />
      <div style={{ position: "absolute", left: 220 + x(hi) + 22, fontFamily: F.sans, fontWeight: 700, fontSize: 28, color: C.ink, opacity: p, whiteSpace: "nowrap" }}>
        ${lo}–${hi}
      </div>
    </div>
  );
};

export const S10Strategy: React.FC = () => {
  const cue = useCues();
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <ArcPanel side="left" width={0.42} color={C.forest} shape="diagonal" at={0}>
        <Texture kind="slate" tint="rgba(29,59,48,0.6)" />
      </ArcPanel>
      <AbsoluteFill style={{ left: M.x, top: 190, width: 660 }}>
        <Heading script="Food" serif="Strategy" at={0.2} color={C.ivory} scriptColor={C.goldSoft} size={80} />
        <div style={{ height: 60 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          {STRATEGY.map((s) => (
            <Reveal key={s.title} at={cue(s.cue, 1)} x={-30} y={0}>
              <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <div style={{ width: 84, height: 84, flexShrink: 0, borderRadius: 42, background: C.ivory, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={s.icon} size={44} color={C.forest} />
                </div>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 40, color: C.ivory }}>{s.title}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 22, color: C.goldSoft, marginTop: 4, maxWidth: 440 }}>{s.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: 930, top: 190, width: 900 }}>
        <Eyebrow at={cue("prices", 12) - 0.3} color={C.gold}>
          Menu price range
        </Eyebrow>
        <div style={{ height: 30 }} />
        <RangeBars at={cue("prices", 12)} />
        <div style={{ height: 40 }} />
        <div style={{ display: "flex", gap: 26 }}>
          {(["shrimp", "fishTacos", "cremeBrulee"] as const).map((d, i) => (
            <ImageFrame key={d} width={250} height={190} radius={30} at={0.6 + i * 0.4}>
              <Visual slot={`dish-${d}`}>
                <Texture kind="wood" />
                <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 200, height: 200 }}>
                    <Dish kind={d} />
                  </div>
                </AbsoluteFill>
              </Visual>
            </ImageFrame>
          ))}
        </div>
        <div style={{ height: 26 }} />
        <Footnote at={cue("prices", 12) + 1.4}>20 dishes · 6 appetizers · 10 mains · 4 desserts</Footnote>
      </AbsoluteFill>
      <Chapter topic="Food Menu · Strategy" index={10} light counterLight={false} />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};
