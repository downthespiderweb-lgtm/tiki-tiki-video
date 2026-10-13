import React from "react";
import { AbsoluteFill, Img, random, staticFile } from "remotion";
import { mix } from "../../../utils/animation";
import { C, F } from "../brand";
import { PHOTOS } from "../photos";
import { ImageFrame, Texture, useReveal, useSceneTime } from "./scene";

/* ------------------------------------------------------------------ photo slots */

/** Uses a licensed photo when one is mapped in photos.ts, otherwise the original illustration. */
export const Visual: React.FC<{ slot: string; children: React.ReactNode }> = ({ slot, children }) => {
  const file = PHOTOS[slot];
  if (file) {
    return <Img src={staticFile(`images/${file}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return <>{children}</>;
};

/* ------------------------------------------------------------------ curved / diagonal panels */

/**
 * A full-height colour panel whose inner edge is a sweeping arc (or diagonal),
 * echoing the reference's curved photo/panel boundaries. `at` animates it in.
 */
export const ArcPanel: React.FC<{
  side: "left" | "right";
  /** fraction of the frame width the panel covers at its widest */
  width: number;
  color?: string;
  texture?: "paper" | "slate";
  shape?: "arc" | "diagonal";
  at?: number;
  goldEdge?: boolean;
  children?: React.ReactNode;
}> = ({ side, width, color = C.cream, texture, shape = "arc", at = 0, goldEdge = true, children }) => {
  const p = useReveal(at, 1.2);
  const W = 1920;
  const H = 1080;
  const w = W * width * mix(p, 0.6, 1);
  const bulge = 150;
  const d =
    side === "left"
      ? shape === "arc"
        ? `M 0 0 L ${w - bulge} 0 Q ${w + bulge} ${H / 2} ${w - bulge} ${H} L 0 ${H} Z`
        : `M 0 0 L ${w} 0 L ${w - 260} ${H} L 0 ${H} Z`
      : shape === "arc"
        ? `M ${W} 0 L ${W - w + bulge} 0 Q ${W - w - bulge} ${H / 2} ${W - w + bulge} ${H} L ${W} ${H} Z`
        : `M ${W} 0 L ${W - w} 0 L ${W - w + 260} ${H} L ${W} ${H} Z`;
  const edge =
    side === "left"
      ? shape === "arc"
        ? `M ${w - bulge} 0 Q ${w + bulge} ${H / 2} ${w - bulge} ${H}`
        : `M ${w} 0 L ${w - 260} ${H}`
      : shape === "arc"
        ? `M ${W - w + bulge} 0 Q ${W - w - bulge} ${H / 2} ${W - w + bulge} ${H}`
        : `M ${W - w} 0 L ${W - w + 260} ${H}`;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, p * 1.6) }}>
      <AbsoluteFill style={{ clipPath: `path('${d}')` }}>
        {texture ? <Texture kind={texture} /> : <AbsoluteFill style={{ background: color }} />}
        {children}
      </AbsoluteFill>
      {goldEdge ? (
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <path d={edge} stroke={C.gold} strokeWidth={3} fill="none" strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)} />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ ambience */

/** Warm out-of-focus bar lights for drink "photography". */
export const Bokeh: React.FC<{ seed: string; n?: number; color?: string; opacity?: number }> = ({
  seed,
  n = 14,
  color = "255,196,120",
  opacity = 0.5,
}) => {
  const { t } = useSceneTime();
  return (
    <AbsoluteFill>
      {Array.from({ length: n }).map((_, i) => {
        const size = 60 + random(`${seed}s${i}`) * 180;
        const x = random(`${seed}x${i}`) * 100;
        const y = random(`${seed}y${i}`) * 70;
        const drift = Math.sin(t * 0.3 + i) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              translate: `${drift}px 0px`,
              background: `radial-gradient(circle, rgba(${color},${opacity}) 0%, rgba(${color},${opacity * 0.5}) 45%, rgba(${color},0) 70%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ cards */

/** Framed dish on a wood surface. */
export const DishFrame: React.FC<{
  width: number;
  height: number;
  at: number;
  radius?: number;
  slot: string;
  children: React.ReactNode;
  dishScale?: number;
  style?: React.CSSProperties;
}> = ({ width, height, at, radius = 44, slot, children, dishScale = 0.9, style }) => (
  <ImageFrame width={width} height={height} at={at} radius={radius} style={style}>
    <Visual slot={slot}>
      <AbsoluteFill>
        <Texture kind="wood" style={{ scale: "1.4" }} />
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 40% 30%, rgba(255,214,150,0.25), rgba(0,0,0,0.25) 80%)" }} />
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: Math.min(width, height) * dishScale, height: Math.min(width, height) * dishScale }}>{children}</div>
        </AbsoluteFill>
      </AbsoluteFill>
    </Visual>
  </ImageFrame>
);

/** Framed drink on a dark slate bar surface with warm bokeh. */
export const DrinkFrame: React.FC<{
  width: number;
  height: number;
  at: number;
  radius?: number;
  slot: string;
  children: React.ReactNode;
  seed?: string;
  scale?: number;
  style?: React.CSSProperties;
}> = ({ width, height, at, radius = 44, slot, children, seed = "bk", scale = 0.86, style }) => (
  <ImageFrame width={width} height={height} at={at} radius={radius} style={style}>
    <Visual slot={slot}>
      <AbsoluteFill>
        <Texture kind="slate" />
        <Bokeh seed={seed} n={10} />
        <AbsoluteFill style={{ top: "72%", background: "linear-gradient(#5A3822, #2A1A10)" }} />
        <AbsoluteFill style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: height * 0.05 }}>
          <div style={{ height: height * scale, width: height * scale * (300 / 440) }}>{children}</div>
        </AbsoluteFill>
      </AbsoluteFill>
    </Visual>
  </ImageFrame>
);

/** Name + price caption used under gallery images. */
export const Caption: React.FC<{
  name: string;
  price?: string;
  sub?: string;
  at: number;
  light?: boolean;
  size?: number;
  align?: "left" | "center";
}> = ({ name, price, sub, at, light = false, size = 32, align = "center" }) => {
  const p = useReveal(at, 0.7);
  return (
    <div
      style={{
        textAlign: align,
        opacity: p,
        translate: `0px ${mix(p, 16, 0)}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 8,
      }}
    >
      <div style={{ fontFamily: F.serif, fontSize: size, color: light ? C.ivory : C.ink, lineHeight: 1.15 }}>{name}</div>
      {sub ? (
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: size * 0.62, color: light ? C.goldSoft : C.muted }}>{sub}</div>
      ) : null}
      {price ? (
        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: size * 0.9, color: C.gold, fontVariantNumeric: "tabular-nums" }}>
          {price}
        </div>
      ) : null}
    </div>
  );
};
