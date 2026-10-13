import React from "react";
import { EASE_IN_OUT, mix } from "../../../utils/animation";
import { C, CH, F } from "../brand";
import { useReveal } from "./scene";

/** Counts up to `value` starting at `at` (scene seconds). */
export const AnimatedNumber: React.FC<{
  value: number;
  at: number;
  duration?: number;
  format: (n: number) => string;
  style?: React.CSSProperties;
}> = ({ value, at, duration = 1.6, format, style }) => {
  const p = useReveal(at, duration, EASE_IN_OUT);
  const o = useReveal(at - 0.1, 0.4);
  return <span style={{ fontVariantNumeric: "tabular-nums", opacity: o, ...style }}>{format(value * p)}</span>;
};

/** Hero figure: large number + small label underneath. */
export const StatTile: React.FC<{
  value: number;
  format: (n: number) => string;
  label: string;
  at: number;
  size?: number;
  light?: boolean;
  sub?: string;
}> = ({ value, format, label, at, size = 120, light = false, sub }) => {
  const p = useReveal(at, 0.8);
  return (
    <div style={{ opacity: p, translate: `0px ${mix(p, 20, 0)}px` }}>
      <div style={{ fontFamily: F.serif, fontWeight: 400, fontSize: size, lineHeight: 1, color: light ? C.ivory : C.ink }}>
        <AnimatedNumber value={value} at={at} format={format} />
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: light ? C.goldSoft : C.muted,
        }}
      >
        {label}
      </div>
      {sub ? <div style={{ marginTop: 6, fontFamily: F.serif, fontStyle: "italic", fontSize: 24, color: light ? C.mutedLight : C.muted }}>{sub}</div> : null}
    </div>
  );
};

/**
 * Single-series horizontal bar chart (magnitude). One hue, thin bars with a
 * 4px rounded data end, square at the baseline, value at the tip, label at left.
 */
export const HBarChart: React.FC<{
  rows: { label: string; value: number; note?: string; highlight?: boolean }[];
  max: number;
  at: number;
  stagger?: number;
  width: number;
  labelWidth?: number;
  format: (n: number) => string;
  rowHeight?: number;
  color?: string;
  light?: boolean;
}> = ({ rows, max, at, stagger = 0.12, width, labelWidth = 300, format, rowHeight = 62, color = CH.bar, light = false }) => {
  const plotW = width - labelWidth - 190;
  const ink = light ? C.ivory : C.ink;
  const muted = light ? C.mutedLight : C.muted;
  return (
    <div style={{ width, position: "relative" }}>
      {/* baseline */}
      <div style={{ position: "absolute", left: labelWidth, top: 0, bottom: 0, width: 1, background: light ? "rgba(251,246,236,0.2)" : CH.grid }} />
      {rows.map((row, i) => (
        <Row key={row.label} row={row} i={i} at={at + i * stagger} {...{ max, plotW, labelWidth, format, rowHeight, color, ink, muted }} />
      ))}
    </div>
  );
};

const Row: React.FC<{
  row: { label: string; value: number; note?: string; highlight?: boolean };
  i: number;
  at: number;
  max: number;
  plotW: number;
  labelWidth: number;
  format: (n: number) => string;
  rowHeight: number;
  color: string;
  ink: string;
  muted: string;
}> = ({ row, at, max, plotW, labelWidth, format, rowHeight, color, ink, muted }) => {
  const p = useReveal(at, 1.1, EASE_IN_OUT);
  const o = useReveal(at, 0.5);
  const w = Math.max(4, (row.value / max) * plotW * p);
  return (
    <div style={{ height: rowHeight, display: "flex", alignItems: "center", opacity: o }}>
      <div style={{ width: labelWidth - 24, textAlign: "right", paddingRight: 24, lineHeight: 1.1 }}>
        <div style={{ fontFamily: F.sans, fontWeight: row.highlight ? 700 : 500, fontSize: 25, color: ink }}>{row.label}</div>
        {row.note ? <div style={{ fontFamily: F.sans, fontSize: 17, color: muted, marginTop: 3 }}>{row.note}</div> : null}
      </div>
      <div style={{ width: 24 }} />
      <div style={{ width: w, height: 24, background: color, borderRadius: "0 4px 4px 0", opacity: row.highlight ? 1 : 0.88 }} />
      <div style={{ marginLeft: 16, fontFamily: F.sans, fontWeight: 700, fontSize: 25, color: ink, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
        {format(row.value * p)}
      </div>
    </div>
  );
};

/** 100% part-to-whole bar with 2px surface gap and a legend underneath. */
export const SplitBar: React.FC<{
  parts: { label: string; value: number; color: string; detail: string }[];
  at: number;
  width: number;
  height?: number;
  surface?: string;
  light?: boolean;
}> = ({ parts, at, width, height = 56, surface = C.cream, light = false }) => {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const p = useReveal(at, 1.4, EASE_IN_OUT);
  return (
    <div style={{ width }}>
      <div style={{ display: "flex", gap: 2, height, background: surface, clipPath: `inset(0 ${100 - p * 100}% 0 0)` }}>
        {parts.map((part, i) => (
          <div
            key={part.label}
            style={{
              width: `${(part.value / total) * 100}%`,
              background: part.color,
              borderRadius: i === parts.length - 1 ? "0 4px 4px 0" : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.ivory,
              fontFamily: F.sans,
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {Math.round((part.value / total) * 100)}%
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 48, marginTop: 22 }}>
        {parts.map((part, i) => (
          <Legend key={part.label} at={at + 0.6 + i * 0.2} color={part.color} label={part.label} detail={part.detail} light={light} />
        ))}
      </div>
    </div>
  );
};

const Legend: React.FC<{ at: number; color: string; label: string; detail: string; light: boolean }> = ({ at, color, label, detail, light }) => {
  const o = useReveal(at, 0.6);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, opacity: o }}>
      <div style={{ width: 18, height: 18, borderRadius: 4, background: color, marginTop: 6 }} />
      <div>
        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: light ? C.ivory : C.ink }}>{label}</div>
        <div style={{ fontFamily: F.sans, fontSize: 20, color: light ? C.mutedLight : C.muted, marginTop: 2 }}>{detail}</div>
      </div>
    </div>
  );
};
