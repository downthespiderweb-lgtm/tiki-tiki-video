import React from "react";
import { AbsoluteFill } from "remotion";
import { mix } from "../../../utils/animation";
import { C, CH, F, M } from "../brand";
import { AnimatedNumber, HBarChart, SplitBar, StatTile } from "../components/charts";
import { Icon, IconName } from "../components/icons";
import { ArcPanel } from "../components/layout";
import { FilmFinish, Reveal, Texture, useCues, useReveal } from "../components/scene";
import { Chapter, Eyebrow, Footnote, GoldRule, Heading } from "../components/type";
import {
  COSTS,
  EST,
  FOOD_COST_OF_FOOD_SALES,
  FOOD_SALES,
  PRIME_COST,
  REMAINDER,
  REMAINDER_IF_MANAGER_IN_LABOR,
  TOTAL_LISTED,
  usd,
} from "../data/financials";

const PRELIM = "Preliminary estimates — not verified financial statements, quotes, or proof of profit.";

/* ================================================================ S15 — Financial overview */

export const S15Overview: React.FC = () => {
  const cue = useCues();
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <ArcPanel side="right" width={0.34} color={C.forest} at={0}>
        <Texture kind="slate" tint="rgba(29,59,48,0.55)" />
      </ArcPanel>
      <AbsoluteFill style={{ left: M.x, top: 150, width: 1100 }}>
        <Heading script="The" serif="Numbers" at={0.2} />
        <div style={{ height: 70 }} />
        <div style={{ display: "flex", gap: 120 }}>
          <StatTile value={EST.squareFeet} format={(n) => `${Math.round(n).toLocaleString("en-US")}`} label="Square feet" at={cue("size", 0.75) + 0.5} size={110} />
          <StatTile value={EST.sales} format={usd} label="Annual sales target" at={cue("sales", 4)} size={110} />
        </div>
        <div style={{ height: 80 }} />
        <Eyebrow at={cue("bev", 7) - 0.3} color={C.gold}>
          Inside the $1.5M sales target
        </Eyebrow>
        <div style={{ height: 22 }} />
        <SplitBar
          at={cue("bev", 7)}
          width={1000}
          parts={[
            { label: "Food sales", value: FOOD_SALES, color: CH.food, detail: `${usd(FOOD_SALES)} · total minus beverage` },
            { label: "Beverage sales", value: EST.beverageSales, color: CH.beverage, detail: `${usd(EST.beverageSales)} · assumption` },
          ]}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: 1380, top: 300, width: 430 }}>
        <Reveal at={cue("bev", 7) + 1.6}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Icon name="alert" size={56} color={C.goldSoft} />
            <div style={{ fontFamily: F.serif, fontSize: 44, lineHeight: 1.2, color: C.ivory }}>Beverages are part of the $1.5M —</div>
            <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 40, lineHeight: 1.2, color: C.goldSoft }}>not additional revenue.</div>
          </div>
        </Reveal>
        <div style={{ height: 70 }} />
        <Reveal at={cue("food", 12)}>
          <div style={{ fontFamily: F.sans, fontSize: 24, lineHeight: 1.5, color: C.ivory, opacity: 0.85 }}>
            $500 sales per sq ft
            <br />
            ≈ $4,110 per day if open 365 days
          </div>
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: M.x, top: 1000 }}>
        <Footnote at={1.2}>{PRELIM}</Footnote>
      </AbsoluteFill>
      <Chapter topic="Financials · Overview" index={15} counterLight />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

/* ================================================================ S16 — Operating costs */

export const S16Costs: React.FC = () => {
  const cue = useCues();
  const start = cue("labor", 0.75);
  const rows = COSTS.map((c) => ({ label: c.label, value: c.amount, note: c.basis, highlight: c.key === "labor" || c.key === "food" }));
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <AbsoluteFill style={{ left: M.x, top: 130, width: 1680, height: 120, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Heading script="Operating" serif="Costs" at={0.2} />
        <Eyebrow at={0.6} color={C.muted}>
          Listed annual estimates
        </Eyebrow>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: M.x - 40, top: 290 }}>
        <HBarChart rows={rows} max={EST.labor} at={start} stagger={0.85} width={1180} labelWidth={330} format={usd} rowHeight={64} />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: 1330, top: 330, width: 480 }}>
        <div style={{ background: C.forest, borderRadius: 32, padding: "40px 40px 44px", display: "flex", flexDirection: "column", gap: 30 }}>
          <Reveal at={cue("food", 6) + 0.5}>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 19, letterSpacing: "0.22em", color: C.goldSoft }}>PRIME COST</div>
            <div style={{ fontFamily: F.serif, fontSize: 64, color: C.ivory, marginTop: 8 }}>
              <AnimatedNumber value={PRIME_COST} at={cue("food", 6) + 0.5} format={usd} />
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 21, color: C.mutedLight, marginTop: 6 }}>Food + alcohol + labor · 76% of sales</div>
          </Reveal>
          <GoldRule width={400} at={cue("alcohol", 9)} color={C.gold} />
          <Reveal at={cue("alcohol", 9) + 0.4}>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 19, letterSpacing: "0.22em", color: C.goldSoft }}>RENT</div>
            <div style={{ fontFamily: F.serif, fontSize: 52, color: C.ivory, marginTop: 8 }}>13.3% of sales</div>
            <div style={{ fontFamily: F.sans, fontSize: 21, color: C.mutedLight, marginTop: 6 }}>≈ $66.67 per sq ft per year · fixed</div>
          </Reveal>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: M.x, top: 1000 }}>
        <Footnote at={1.2}>{PRELIM}</Footnote>
      </AbsoluteFill>
      <Chapter topic="Financials · Operating Costs" index={16} />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

/* ================================================================ S17 — Viability */

const Chip: React.FC<{ icon: IconName; label: string; at: number; tone?: "warn" | "neutral" }> = ({ icon, label, at, tone = "neutral" }) => {
  const p = useReveal(at, 0.6);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderRadius: 14,
        background: tone === "warn" ? "rgba(196,85,46,0.16)" : "rgba(251,246,236,0.08)",
        border: `1px solid ${tone === "warn" ? "rgba(229,155,120,0.6)" : "rgba(220,194,142,0.45)"}`,
        opacity: p,
        translate: `0px ${mix(p, 14, 0)}px`,
      }}
    >
      <Icon name={icon} size={28} color={tone === "warn" ? C.coral : C.goldSoft} />
      <span style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 22, color: C.ivory, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
};

const EqTerm: React.FC<{ value: number; label: string; at: number; color?: string; signed?: boolean }> = ({ value, label, at, color = C.ivory, signed }) => {
  const p = useReveal(at, 0.7);
  return (
    <div style={{ opacity: p, translate: `0px ${mix(p, 18, 0)}px` }}>
      <div style={{ fontFamily: F.serif, fontSize: 64, color, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        <AnimatedNumber value={value} at={at} format={(n) => (signed && n > 0 ? "+" : "") + usd(n)} duration={1.2} />
      </div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mutedLight, marginTop: 12 }}>{label}</div>
    </div>
  );
};

const Op: React.FC<{ children: React.ReactNode; at: number }> = ({ children, at }) => {
  const p = useReveal(at, 0.5);
  return <div style={{ fontFamily: F.serif, fontSize: 60, color: C.gold, opacity: p, padding: "0 6px", lineHeight: 1 }}>{children}</div>;
};

export const S17Viability: React.FC = () => {
  const cue = useCues();
  const t0 = cue("total", 0.75);
  const t1 = cue("double", 8);
  const t2 = cue("missing", 13);
  return (
    <AbsoluteFill style={{ background: C.forestDeep }}>
      <Texture kind="slate" tint="rgba(17,38,30,0.55)" />
      <AbsoluteFill style={{ left: M.x, top: 130 }}>
        <Heading script="Honest" serif="Viability Check" at={0.2} color={C.ivory} scriptColor={C.goldSoft} size={86} />
      </AbsoluteFill>
      {/* equation */}
      <AbsoluteFill style={{ left: M.x, top: 300, display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 30, height: 140 }}>
        <EqTerm value={EST.sales} label="Sales target" at={t0} />
        <Op at={t0 + 0.6}>−</Op>
        <EqTerm value={TOTAL_LISTED} label="Total listed costs" at={t0 + 0.8} />
        <Op at={t0 + 1.6}>=</Op>
        <EqTerm value={REMAINDER} label="Preliminary remainder" at={t0 + 1.8} color={C.coral} signed />
      </AbsoluteFill>
      {/* scenario */}
      <Reveal at={t1} style={{ position: "absolute", left: M.x, top: 490 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px", borderRadius: 22, background: "rgba(0,128,156,0.14)", border: "1px solid rgba(120,200,215,0.45)", width: 1050 }}>
          <Icon name="search" size={44} color="#8FD3E0" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 25, color: C.ivory }}>If the $52,000 manager salary is already inside labor</div>
            <div style={{ fontFamily: F.sans, fontSize: 21, color: C.mutedLight, marginTop: 4 }}>possible double count removed · still before missing costs</div>
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 58, color: "#8FD3E0" }}>
            <AnimatedNumber value={REMAINDER_IF_MANAGER_IN_LABOR} at={t1 + 0.4} format={(n) => `+${usd(n)}`} duration={1.2} />
          </div>
        </div>
      </Reveal>
      <Reveal at={t2} style={{ position: "absolute", left: 1290, top: 300, width: 520 }}>
        <div style={{ border: `3px solid ${C.coral}`, borderRadius: 18, padding: "18px 26px", rotate: "-3deg", textAlign: "center" }}>
          <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: "0.16em", color: C.coral }}>NOT VERIFIED PROFIT</div>
        </div>
      </Reveal>
      {/* missing costs & risks */}
      <AbsoluteFill style={{ left: M.x, top: 640, width: 1680, display: "flex", flexDirection: "row", gap: 60 }}>
        <div style={{ width: 800 }}>
          <Eyebrow at={t2} color={C.goldSoft}>
            Not yet estimated
          </Eyebrow>
          <div style={{ height: 18 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {(
              [
                ["tool", "Repairs & maintenance"],
                ["megaphone", "Marketing"],
                ["box", "Supplies"],
                ["trash", "Waste"],
                ["receipt", "Taxes"],
                ["music", "Entertainment & other"],
              ] as [IconName, string][]
            ).map(([icon, label], i) => (
              <Chip key={label} icon={icon} label={label} at={t2 + 0.2 + i * 0.25} />
            ))}
          </div>
        </div>
        <div style={{ width: 820 }}>
          <Eyebrow at={t2 + 1.4} color={C.coral}>
            Key risks
          </Eyebrow>
          <div style={{ height: 18 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {(
              [
                ["trending", "$1.5M sales target"],
                ["users", "Labor at 36.5%"],
                ["fork", `Food = ${(FOOD_COST_OF_FOOD_SALES * 100).toFixed(1)}% of food sales`],
                ["cocktail", "Beverage mix"],
                ["home", "$200K fixed rent"],
              ] as [IconName, string][]
            ).map(([icon, label], i) => (
              <Chip key={label} icon={icon} label={label} at={t2 + 1.6 + i * 0.25} tone="warn" />
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <Reveal at={t2 + 3.6} style={{ position: "absolute", left: M.x, top: 935 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 60, height: 2, background: C.gold }} />
          <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 34, color: C.ivory }}>
            Verdict: promising concept, thin margins — validate before investing.
          </div>
        </div>
      </Reveal>
      <Chapter topic="Financials · Viability" index={17} light />
      <FilmFinish vignette={0.3} />
    </AbsoluteFill>
  );
};
