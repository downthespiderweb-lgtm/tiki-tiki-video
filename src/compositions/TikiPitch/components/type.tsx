import React from "react";
import { mix } from "../../../utils/animation";
import { C, F, T } from "../brand";
import { useReveal, useSceneTime } from "./scene";

/**
 * Editorial heading: a short decorative script word paired with a serif title,
 * e.g. <Heading script="Signature" serif="Cocktails" />.
 */
export const Heading: React.FC<{
  script?: string;
  serif: string;
  at?: number;
  color?: string;
  scriptColor?: string;
  size?: number;
  align?: "left" | "center" | "right";
  stacked?: boolean;
}> = ({ script, serif, at = 0.2, color = C.ink, scriptColor = C.gold, size = T.h1, align = "left", stacked = false }) => {
  const ps = useReveal(at, 1.0);
  const pt = useReveal(at + 0.25, 1.0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: stacked ? (align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start") : "baseline",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: stacked ? 0 : size * 0.22,
        lineHeight: 1,
      }}
    >
      {script ? (
        <span
          style={{
            fontFamily: F.script,
            fontSize: size * 0.95,
            color: scriptColor,
            opacity: ps,
            translate: `${mix(ps, -24, 0)}px 0px`,
            marginBottom: stacked ? -size * 0.18 : 0,
            paddingRight: 8,
          }}
        >
          {script}
        </span>
      ) : null}
      <span
        style={{
          fontFamily: F.serif,
          fontWeight: 400,
          fontSize: size,
          color,
          letterSpacing: "0.01em",
          opacity: pt,
          translate: `0px ${mix(pt, 24, 0)}px`,
        }}
      >
        {serif}
      </span>
    </div>
  );
};

/** Small-caps label (e.g. "SHAREABLE · COASTAL · FRESH"). */
export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string; at?: number; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.gold,
  at = 0.4,
  size = T.label,
  style,
}) => {
  const p = useReveal(at, 0.9);
  return (
    <div
      style={{
        fontFamily: F.sans,
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
        opacity: p,
        translate: `0px ${mix(p, 12, 0)}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Amber band carrying a tagline — the reference's signature divider, used sparingly. */
export const TaglineBand: React.FC<{
  words: string[];
  at?: number;
  width?: number | string;
  color?: string;
  textColor?: string;
  align?: "left" | "center";
  height?: number;
}> = ({ words, at = 0.5, width = "100%", color = C.amber, textColor = C.charcoal, align = "left", height = 64 }) => {
  const p = useReveal(at, 1.0);
  const pt = useReveal(at + 0.35, 0.8);
  return (
    <div
      style={{
        width,
        height,
        background: color,
        clipPath: `inset(0 ${100 - p * 100}% 0 0)`,
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        paddingLeft: align === "left" ? 48 : 0,
      }}
    >
      <div
        style={{
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: "0.26em",
          color: textColor,
          opacity: pt,
          whiteSpace: "nowrap",
        }}
      >
        {words.join("   ·   ")}
      </div>
    </div>
  );
};

/** Thin gold divider that draws itself. */
export const GoldRule: React.FC<{ width: number; at?: number; color?: string; thickness?: number; align?: "left" | "center" }> = ({
  width,
  at = 0.6,
  color = C.gold,
  thickness = 2,
  align = "left",
}) => {
  const p = useReveal(at, 1.1);
  return (
    <div
      style={{
        width,
        height: thickness,
        background: color,
        transformOrigin: align === "center" ? "50% 50%" : "0% 50%",
        scale: `${p} 1`,
      }}
    />
  );
};

/** Menu line with dotted leader: "Name ........ $16" + optional italic note. */
export const MenuRow: React.FC<{
  name: string;
  price: string;
  note?: string;
  at: number;
  color?: string;
  noteColor?: string;
  size?: number;
  active?: boolean;
}> = ({ name, price, note, at, color = C.ink, noteColor = C.muted, size = 36, active = false }) => {
  const p = useReveal(at, 0.7);
  return (
    <div style={{ opacity: p, translate: `${mix(p, 30, 0)}px 0px` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: F.serif, fontSize: size, color }}>
        <span style={{ fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>{name}</span>
        <span
          style={{
            flex: 1,
            borderBottom: `3px dotted ${active ? C.gold : "currentColor"}`,
            opacity: active ? 0.9 : 0.35,
            translate: "0px -8px",
          }}
        />
        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: size * 0.86, fontVariantNumeric: "tabular-nums", color: active ? C.gold : color }}>
          {price}
        </span>
      </div>
      {note ? (
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: size * 0.62, color: noteColor, marginTop: 4 }}>{note}</div>
      ) : null}
    </div>
  );
};

/** Dark pill price badge. */
export const PricePill: React.FC<{ children: React.ReactNode; dark?: boolean; size?: number; at?: number }> = ({
  children,
  dark = true,
  size = 30,
  at = 0,
}) => {
  const p = useReveal(at, 0.6);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${size * 0.28}px ${size * 0.8}px`,
        borderRadius: 999,
        background: dark ? C.charcoal : C.ivory,
        color: dark ? C.ivory : C.charcoal,
        fontFamily: F.sans,
        fontWeight: 700,
        fontSize: size,
        fontVariantNumeric: "tabular-nums",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        opacity: p,
        scale: String(mix(p, 0.7, 1)),
      }}
    >
      {children}
    </div>
  );
};

/** Chapter marker shown top-left: topic number + name, plus slide counter. */
export const Chapter: React.FC<{ topic: string; index: number; light?: boolean; counterLight?: boolean }> = ({
  topic,
  index,
  light = false,
  counterLight,
}) => {
  const { t } = useSceneTime();
  const p = Math.min(1, Math.max(0, (t - 0.2) / 0.8));
  const color = light ? C.ivory : C.ink;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 50,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color,
          opacity: 0.75 * p,
        }}
      >
        <span style={{ width: 36, height: 2, background: C.gold }} />
        {topic}
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 50,
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: "0.2em",
          color: (counterLight ?? light) ? C.ivory : C.ink,
          opacity: 0.6 * p,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(index).padStart(2, "0")} / 20
      </div>
    </>
  );
};

/** Concise disclaimer label (e.g. "Preliminary estimates · not verified"). */
export const Footnote: React.FC<{ children: React.ReactNode; at?: number; light?: boolean; style?: React.CSSProperties }> = ({
  children,
  at = 1,
  light = false,
  style,
}) => {
  const p = useReveal(at, 0.8);
  return (
    <div
      style={{
        fontFamily: F.sans,
        fontSize: 19,
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: light ? "rgba(251,246,236,0.72)" : C.muted,
        opacity: p,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
