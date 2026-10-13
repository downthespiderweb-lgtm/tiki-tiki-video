import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { mix } from "../../../utils/animation";
import { C, F, M } from "../brand";
import { Icon, IconName } from "../components/icons";
import { Visual } from "../components/layout";
import { FilmFinish, Reveal, Texture, useCues, useKenBurns, useReveal, useSceneTime } from "../components/scene";
import { Chapter, Eyebrow, Footnote, GoldRule, Heading, TaglineBand } from "../components/type";
import { Area, PIPELINE, ROLES } from "../data/staffing";
import { HeroScene } from "../illustrations/venue";

/* ================================================================ S18 — Talent acquisition */

const AREA_ICON: Record<Area, IconName> = {
  Management: "star",
  Kitchen: "chef",
  Bar: "cocktail",
  Service: "users",
  Entertainment: "music",
};

const RoleBox: React.FC<{ title: string; headcount: string; at: number }> = ({ title, headcount, at }) => {
  const p = useReveal(at, 0.6);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 14,
        background: C.ivory,
        boxShadow: "0 8px 20px rgba(20,24,22,0.1)",
        opacity: p,
        translate: `0px ${mix(p, 14, 0)}px`,
      }}
    >
      <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 21, color: C.ink, lineHeight: 1.2 }}>{title}</span>
      <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 19, color: C.forest, background: "rgba(29,59,48,0.1)", padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap" }}>
        {headcount}
      </span>
    </div>
  );
};

export const S18Talent: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const areas: { area: Area; at: number }[] = [
    { area: "Kitchen", at: cue("kitchen", 3) },
    { area: "Bar", at: cue("service", 7) },
    { area: "Service", at: cue("service", 7) + 1.2 },
    { area: "Entertainment", at: cue("music", 12) },
  ];
  const gmAt = cue("gm", 0.75);
  const lineP = interpolate(t, [gmAt + 0.6, cue("music", 12) + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const colW = 380;
  const gap = 40;
  const totalW = colW * 4 + gap * 3;
  const left0 = (1920 - totalW) / 2;
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <AbsoluteFill style={{ left: M.x, top: 120 }}>
        <Heading script="Our" serif="Team" at={0.2} />
      </AbsoluteFill>
      {/* GM */}
      <Reveal at={gmAt} style={{ position: "absolute", left: 960 - 230, top: 250, width: 460 }} scaleFrom={0.9}>
        <div style={{ background: C.forest, borderRadius: 22, padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, boxShadow: "0 18px 40px rgba(20,24,22,0.2)" }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="star" size={34} color={C.goldSoft} />
          </div>
          <div>
            <div style={{ fontFamily: F.serif, fontSize: 34, color: C.ivory }}>General Manager</div>
            <div style={{ fontFamily: F.sans, fontSize: 19, color: C.goldSoft, letterSpacing: "0.12em" }}>LEADS OPERATIONS · 1</div>
          </div>
        </div>
      </Reveal>
      {/* connectors */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path
          d={`M 960 362 L 960 400 M ${left0 + colW / 2} 400 L ${left0 + totalW - colW / 2} 400 ${[0, 1, 2, 3].map((i) => `M ${left0 + colW / 2 + i * (colW + gap)} 400 L ${left0 + colW / 2 + i * (colW + gap)} 432`).join(" ")}`}
          stroke={C.gold}
          strokeWidth={2.5}
          fill="none"
          strokeDasharray={2400}
          strokeDashoffset={2400 * (1 - lineP)}
        />
      </svg>
      <AbsoluteFill style={{ left: left0, top: 440, display: "flex", flexDirection: "row", gap }}>
        {areas.map(({ area, at }) => {
          const roles = ROLES.filter((r) => r.area === area);
          return (
            <div key={area} style={{ width: colW, display: "flex", flexDirection: "column", gap: 14 }}>
              <Reveal at={at} y={16}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 28, background: C.charcoal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={AREA_ICON[area]} size={30} color={C.goldSoft} />
                  </div>
                  <div style={{ fontFamily: F.serif, fontSize: 36, color: C.ink }}>{area}</div>
                </div>
              </Reveal>
              {roles.map((r, i) => (
                <RoleBox key={r.title} title={r.title} headcount={r.headcount} at={at + 0.3 + i * 0.3} />
              ))}
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ left: left0, top: 840, width: totalW }}>
        <TaglineBand words={["SERVICE", "FOOD QUALITY", "GUEST SATISFACTION", "PROFITABILITY"]} at={cue("impact", 15)} align="center" />
        <div style={{ height: 24 }} />
        <Footnote at={cue("music", 12) + 0.8}>Proposed headcount ranges are planning assumptions requiring validation · wages not yet established.</Footnote>
      </AbsoluteFill>
      <Chapter topic="Talent Acquisition" index={18} />
      <FilmFinish vignette={0.16} />
    </AbsoluteFill>
  );
};

/* ================================================================ S19 — Recruit, select, train, retain */

export const S19Pipeline: React.FC = () => {
  const cue = useCues();
  const at = [cue("recruit", 0.75), cue("select", 5), cue("train", 10), cue("retain", 15)];
  return (
    <AbsoluteFill style={{ background: C.forestDeep }}>
      <Texture kind="slate" tint="rgba(17,38,30,0.5)" />
      <AbsoluteFill style={{ left: M.x, top: 120 }}>
        <Heading script="People" serif="Strategy" at={0.2} color={C.ivory} scriptColor={C.goldSoft} />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: M.x, top: 320, width: 1680, display: "flex", flexDirection: "row", gap: 36 }}>
        {PIPELINE.map((stage, i) => (
          <Stage key={stage.stage} index={i} title={stage.stage} icon={stage.icon} items={stage.items} at={at[i]} />
        ))}
      </AbsoluteFill>
      <Reveal at={cue("train", 10) + 1.5} style={{ position: "absolute", left: M.x, top: 930 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Icon name="shield" size={32} color={C.goldSoft} />
          <span style={{ fontFamily: F.sans, fontSize: 22, color: C.ivory }}>
            Responsible alcohol service training for every bartender and server, per applicable requirements.
          </span>
        </div>
      </Reveal>
      <Chapter topic="Talent Acquisition" index={19} light />
      <FilmFinish vignette={0.3} />
    </AbsoluteFill>
  );
};

const Stage: React.FC<{ index: number; title: string; icon: IconName; items: string[]; at: number }> = ({ index, title, icon, items, at }) => {
  const p = useReveal(at, 0.8);
  return (
    <div
      style={{
        width: 393,
        height: 560,
        borderRadius: 30,
        background: index % 2 ? C.cream : C.ivory,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        opacity: p,
        translate: `0px ${mix(p, 50, 0)}px`,
        position: "relative",
        boxShadow: "0 22px 50px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: C.forest, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={40} color={C.goldSoft} />
        </div>
        <div style={{ fontFamily: F.serif, fontSize: 60, color: C.gold, opacity: 0.6 }}>{String(index + 1).padStart(2, "0")}</div>
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 48, color: C.ink }}>{title}</div>
      <GoldRule width={80} at={at + 0.3} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 6 }}>
        {items.map((it, k) => (
          <Reveal key={it} at={at + 0.4 + k * 0.35} x={14} y={0}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Icon name="check" size={24} color={C.forest} style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontFamily: F.sans, fontSize: 23, color: C.ink, lineHeight: 1.3 }}>{it}</span>
            </div>
          </Reveal>
        ))}
      </div>
      {index < 3 ? (
        <div style={{ position: "absolute", right: -30, top: 250, width: 24, height: 24, borderRadius: 12, background: C.gold, opacity: p, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `9px solid ${C.charcoal}`, marginLeft: 3 }} />
        </div>
      ) : null}
    </div>
  );
};

/* ================================================================ S20 — Closing */

export const S20Closing: React.FC = () => {
  const cue = useCues();
  const { t } = useSceneTime();
  const kb = useKenBurns(1.0, 1.1);
  const outro = interpolate(t, [18.6, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const points: { label: string; at: number }[] = [
    { label: "Tropical social escape", at: cue("appeal", 0.75) + 0.6 },
    { label: "Guests 21–35", at: cue("appeal", 0.75) + 2.2 },
    { label: "Tight numbers", at: cue("numbers", 6) + 0.3 },
    { label: "Validate · control costs", at: cue("control", 10) },
  ];
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <AbsoluteFill style={{ scale: String(kb) }}>
        <Visual slot="hero">
          <HeroScene night />
        </Visual>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(14,18,16,0.55) 0%, rgba(14,18,16,0.82) 70%)" }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, top: -30 }}>
        <Reveal at={0.3}>
          <div style={{ fontFamily: F.serif, fontSize: 130, color: C.ivory, lineHeight: 1 }}>Tiki Tiki</div>
        </Reveal>
        <Reveal at={0.7}>
          <div style={{ fontFamily: F.serif, fontSize: 44, letterSpacing: "0.32em", color: C.ivory, marginTop: 16 }}>LOUNGE &amp; BAR</div>
        </Reveal>
        <div style={{ height: 30 }} />
        <GoldRule width={340} at={1} align="center" />
        <div style={{ height: 44 }} />
        <div style={{ display: "flex", gap: 22 }}>
          {points.map((p) => (
            <Reveal key={p.label} at={p.at} y={14} scaleFrom={0.92}>
              <div style={{ padding: "14px 28px", borderRadius: 999, border: `1.5px solid ${C.goldSoft}`, background: "rgba(14,18,16,0.55)", fontFamily: F.sans, fontWeight: 600, fontSize: 23, color: C.ivory }}>
                {p.label}
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ height: 60 }} />
        <Reveal at={cue("thanks", 15)}>
          <div style={{ fontFamily: F.script, fontSize: 120, color: C.goldSoft, lineHeight: 1 }}>Mahalo</div>
        </Reveal>
        <Reveal at={cue("thanks", 15) + 0.6}>
          <Eyebrow at={cue("thanks", 15) + 0.6} color={C.ivory}>
            Thank you · Pacific Beach, San Diego
          </Eyebrow>
        </Reveal>
      </AbsoluteFill>
      <FilmFinish vignette={0.4} />
      <AbsoluteFill style={{ background: C.charcoal, opacity: outro }} />
    </AbsoluteFill>
  );
};
