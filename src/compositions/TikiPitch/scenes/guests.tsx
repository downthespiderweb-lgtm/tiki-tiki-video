import React from "react";
import { AbsoluteFill } from "remotion";
import { mix } from "../../../utils/animation";
import { C, F, M } from "../brand";
import { Icon, IconName } from "../components/icons";
import { ArcPanel, Visual } from "../components/layout";
import { FilmFinish, ImageFrame, Reveal, Texture, useCues, useReveal, WipeReveal } from "../components/scene";
import { Chapter, Eyebrow, Footnote, GoldRule, Heading } from "../components/type";
import { HeroScene } from "../illustrations/venue";

/* ================================================================ S04 — Demographics */

const SEGMENTS: { icon: IconName; label: string }[] = [
  { icon: "cap", label: "College students & young adults" },
  { icon: "briefcase", label: "Young professionals" },
  { icon: "heart", label: "Couples on dates" },
  { icon: "users", label: "Groups of friends" },
  { icon: "home", label: "Local San Diego residents" },
  { icon: "plane", label: "Tourists & visitors" },
];

const SegmentCard: React.FC<{ icon: IconName; label: string; at: number }> = ({ icon, label, at }) => {
  const p = useReveal(at, 0.8);
  return (
    <div
      style={{
        width: 300,
        height: 230,
        borderRadius: 28,
        background: C.ivory,
        boxShadow: "0 14px 34px rgba(20,24,22,0.12)",
        borderTop: `4px solid ${C.gold}`,
        padding: "34px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: p,
        translate: `0px ${mix(p, 40, 0)}px`,
        scale: String(mix(p, 0.94, 1)),
      }}
    >
      <div style={{ width: 76, height: 76, borderRadius: 38, background: C.forest, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={40} color={C.goldSoft} />
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 31, lineHeight: 1.2, color: C.ink }}>{label}</div>
    </div>
  );
};

export const S04Demographics: React.FC = () => {
  const cue = useCues();
  const s1 = cue("seg1", 4);
  const s2 = cue("seg2", 9);
  return (
    <AbsoluteFill>
      <Texture kind="paper" />
      <ArcPanel side="left" width={0.4} color={C.forest} at={0} shape="arc">
        <Texture kind="slate" tint="rgba(29,59,48,0.55)" />
      </ArcPanel>
      <AbsoluteFill style={{ left: M.x, top: 200, width: 600 }}>
        <Heading script="Our" serif="Guests" color={C.ivory} scriptColor={C.goldSoft} at={0.2} />
        <div style={{ height: 70 }} />
        <Eyebrow at={cue("age", 0.75)} color={C.goldSoft}>
          Primary target · Adults
        </Eyebrow>
        <div style={{ height: 14 }} />
        <WipeReveal at={cue("age", 0.75) + 0.2} duration={1.3}>
          <div style={{ fontFamily: F.serif, fontSize: 210, lineHeight: 1, color: C.ivory, letterSpacing: "-0.01em" }}>21–35</div>
        </WipeReveal>
        <div style={{ height: 40 }} />
        <GoldRule width={300} at={cue("age", 0.75) + 1} />
        <div style={{ height: 34 }} />
        <Reveal at={cue("assumption", 14)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Students & professionals", "Individuals · couples · groups", "Locals & visitors"].map((x) => (
              <div key={x} style={{ fontFamily: F.sans, fontSize: 25, color: C.ivory, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: C.gold }} />
                {x}
              </div>
            ))}
          </div>
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: 880, top: 190, width: 940 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
          {SEGMENTS.map((s, i) => (
            <SegmentCard key={s.label} icon={s.icon} label={s.label} at={(i < 3 ? s1 : s2) + (i % 3) * 0.7} />
          ))}
        </div>
        <div style={{ height: 40 }} />
        <Footnote at={cue("assumption", 14)}>Target-market assumptions — not verified demographic statistics.</Footnote>
      </AbsoluteFill>
      <Chapter topic="Guest Demographics" index={4} light counterLight={false} />
      <FilmFinish vignette={0.18} />
    </AbsoluteFill>
  );
};

/* ================================================================ S05 — Psychographics */

const MOTIVES: { icon: IconName; label: string }[] = [
  { icon: "chat", label: "Socializing with friends" },
  { icon: "sun", label: "Tropical surroundings" },
  { icon: "sparkle", label: "Memorable nights out" },
  { icon: "cocktail", label: "Creative drinks & food" },
  { icon: "music", label: "Live music & patio" },
  { icon: "share", label: "Places worth sharing" },
];

const Motive: React.FC<{ icon: IconName; label: string; at: number }> = ({ icon, label, at }) => {
  const p = useReveal(at, 0.7);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, width: 470, opacity: p, translate: `${mix(p, 30, 0)}px 0px` }}>
      <div style={{ width: 74, height: 74, flexShrink: 0, borderRadius: 37, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={38} color={C.goldSoft} />
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 33, color: C.ivory, lineHeight: 1.15 }}>{label}</div>
    </div>
  );
};

export const S05Psychographics: React.FC = () => {
  const cue = useCues();
  const m1 = cue("m1", 0.75);
  const m2 = cue("m2", 6);
  const occasions = ["Casual gatherings", "Date nights", "Nights out"];
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <Texture kind="slate" />
      <div style={{ position: "absolute", left: M.x, top: 170 }}>
        <ImageFrame width={600} height={740} radius={300} at={0.2}>
          <Visual slot="hero">
            <div style={{ position: "absolute", width: 1920, height: 1080, left: -820, top: -170, scale: "0.95" }}>
              <HeroScene night />
            </div>
          </Visual>
        </ImageFrame>
      </div>
      <AbsoluteFill style={{ left: 840, top: 150, width: 980 }}>
        <Heading script="What" serif="Moves Them" color={C.ivory} scriptColor={C.goldSoft} at={0.2} size={88} />
        <div style={{ height: 46 }} />
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 40, rowGap: 30 }}>
          {MOTIVES.map((m, i) => (
            <Motive key={m.label} icon={m.icon} label={m.label} at={(i < 3 ? m1 : m2) + (i % 3) * 0.6} />
          ))}
        </div>
        <div style={{ height: 50 }} />
        <Eyebrow at={cue("occasions", 12)} color={C.goldSoft}>
          Occasions
        </Eyebrow>
        <div style={{ height: 16 }} />
        <div style={{ display: "flex", gap: 20 }}>
          {occasions.map((o, i) => (
            <Reveal key={o} at={cue("occasions", 12) + 0.2 + i * 0.35} y={14} scaleFrom={0.9}>
              <div style={{ padding: "14px 30px", borderRadius: 999, background: C.amber, fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: C.charcoal }}>{o}</div>
            </Reveal>
          ))}
        </div>
        <div style={{ height: 34 }} />
        <Reveal at={cue("why", 15)}>
          <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 40, color: C.ivory }}>
            Space, menu &amp; drinks — built for time together.
          </div>
        </Reveal>
      </AbsoluteFill>
      <Chapter topic="Guest Psychographics" index={5} light />
      <FilmFinish />
    </AbsoluteFill>
  );
};

