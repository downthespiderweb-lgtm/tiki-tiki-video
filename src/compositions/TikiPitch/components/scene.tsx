import React, { createContext, useContext } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_OUT, mix, progress } from "../../../utils/animation";
import { C } from "../brand";
import { CUES, SceneId } from "../data/cues";

/* ------------------------------------------------------------------ scene time */

type SceneCtx = { id: SceneId; lead: number };
const SceneContext = createContext<SceneCtx>({ id: "s01", lead: 0 });

/** Wraps a scene so children can read time relative to the scene's true 20 s boundary. */
export const SceneProvider: React.FC<{ id: SceneId; lead: number; children: React.ReactNode }> = ({
  id,
  lead,
  children,
}) => <SceneContext.Provider value={{ id, lead }}>{children}</SceneContext.Provider>;

/** Seconds since this scene's boundary (negative during the incoming transition). */
export const useSceneTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { lead } = useContext(SceneContext);
  return { t: (frame - lead) / fps, frame: frame - lead, fps };
};

/** Narration cue times for the current scene. Missing cues fall back to `fallback`. */
export const useCues = () => {
  const { id } = useContext(SceneContext);
  const cues = CUES[id] ?? {};
  return (name: string, fallback = 0) => cues[name] ?? fallback;
};

/** 0 → 1 eased progress starting at `at` seconds (scene time). */
export const useReveal = (at: number, duration = 0.8, easing = EASE_OUT) => {
  const { frame, fps } = useSceneTime();
  return progress(frame, fps, { delay: at, duration, easing });
};

/* ------------------------------------------------------------------ reveal wrappers */

type RevealProps = {
  at: number;
  duration?: number;
  /** Rise distance in px. */
  y?: number;
  x?: number;
  scaleFrom?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Fade + rise (or slide) entrance timed in scene seconds. */
export const Reveal: React.FC<RevealProps> = ({ at, duration = 0.8, y = 28, x = 0, scaleFrom = 1, style, children }) => {
  const p = useReveal(at, duration);
  return (
    <div
      style={{
        opacity: p,
        translate: `${mix(p, x, 0)}px ${mix(p, y, 0)}px`,
        scale: String(mix(p, scaleFrom, 1)),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Horizontal wipe reveal (clip from left), good for headings and rules. */
export const WipeReveal: React.FC<{ at: number; duration?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at,
  duration = 0.9,
  style,
  children,
}) => {
  const p = useReveal(at, duration);
  return <div style={{ clipPath: `inset(-20% ${100 - p * 100}% -20% 0)`, ...style }}>{children}</div>;
};

/* ------------------------------------------------------------------ backgrounds */

export const Texture: React.FC<{ kind: "paper" | "wood" | "slate"; style?: React.CSSProperties; tint?: string }> = ({
  kind,
  style,
  tint,
}) => (
  <AbsoluteFill style={style}>
    <Img src={staticFile(`textures/${kind}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {tint ? <AbsoluteFill style={{ background: tint }} /> : null}
  </AbsoluteFill>
);

/** Subtle film grain + vignette applied over every scene for a cohesive photographic finish. */
export const FilmFinish: React.FC<{ vignette?: number }> = ({ vignette = 0.28 }) => {
  const { frame } = useSceneTime();
  // shift the grain plate every 2 frames so it shimmers subtly
  const ox = -(((frame >> 1) * 37) % 190);
  const oy = -(((frame >> 1) * 53) % 190);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <Img
        src={staticFile("textures/grain.jpg")}
        style={{ position: "absolute", left: ox, top: oy, width: 2112, height: 1272, mixBlendMode: "overlay", opacity: 0.09 }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(10,12,10,${vignette}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Slow Ken Burns push for imagery. */
export const useKenBurns = (from = 1.0, to = 1.07) => {
  const { frame, fps } = useSceneTime();
  return mix(Math.min(1, Math.max(0, (frame + fps) / (21 * fps))), from, to);
};

/* ------------------------------------------------------------------ framed visuals */

type FrameProps = {
  width: number;
  height: number;
  radius?: number;
  border?: string;
  /** Reveal time (scene s). The frame grows open with a rounded mask. */
  at?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
  zoom?: boolean;
  children: React.ReactNode;
};

/** Rounded "squircle" image frame with thin cream border, soft shadow and a gentle zoom. */
export const ImageFrame: React.FC<FrameProps> = ({
  width,
  height,
  radius = 48,
  border = C.ivory,
  at = 0,
  shadow = true,
  style,
  zoom = true,
  children,
}) => {
  const p = useReveal(at, 1.1);
  const kb = useKenBurns();
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        padding: 6,
        background: border,
        boxShadow: shadow ? "0 30px 70px rgba(10,14,12,0.35), 0 6px 18px rgba(10,14,12,0.25)" : undefined,
        opacity: Math.min(1, p * 2),
        clipPath: `inset(${mix(p, 50, 0)}% ${mix(p, 50, 0)}% ${mix(p, 50, 0)}% ${mix(p, 50, 0)}% round ${radius}px)`,
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: radius - 6, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, scale: String(zoom ? kb * mix(p, 1.12, 1) : 1) }}>{children}</div>
      </div>
    </div>
  );
};
