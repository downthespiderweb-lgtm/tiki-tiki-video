import { Easing, interpolate, spring } from "remotion";

/**
 * Animation helpers. Author timing in seconds, convert with `sec(s, fps)`.
 * Every helper is a pure function of `frame` — never use CSS transitions,
 * setTimeout or requestAnimationFrame in Remotion (they don't render).
 */

/** Seconds → frames (rounded) for the given fps. */
export const sec = (seconds: number, fps: number) => Math.round(seconds * fps);

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Smooth "ease-out-expo"-like curve; good default for entrances. */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Symmetric ease for moves between two states. */
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
/** Ease-in for exits. */
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

/**
 * 0 → 1 progress starting at `delay` seconds and lasting `duration` seconds.
 * Clamped, eased. The building block for most animations.
 */
export const progress = (
  frame: number,
  fps: number,
  {
    delay = 0,
    duration = 0.6,
    easing = EASE_OUT,
  }: { delay?: number; duration?: number; easing?: (t: number) => number } = {},
) => {
  const start = delay * fps;
  return interpolate(frame, [start, start + duration * fps], [0, 1], {
    ...clamp,
    easing,
  });
};

/** Physically-based 0 → ~1 spring that starts after `delay` seconds. */
export const springIn = (
  frame: number,
  fps: number,
  {
    delay = 0,
    damping = 14,
    stiffness = 120,
    mass = 0.8,
  }: {
    delay?: number;
    damping?: number;
    stiffness?: number;
    mass?: number;
  } = {},
) =>
  spring({
    frame: frame - delay * fps,
    fps,
    config: { damping, stiffness, mass },
  });

/** Map 0..1 progress onto any numeric range. */
export const mix = (p: number, from: number, to: number) =>
  from + (to - from) * p;

/**
 * Fade + rise entrance styles. Spread into `style`.
 * `distance` is in px at the composition's resolution.
 */
export const fadeUp = (p: number, distance = 40) => ({
  opacity: p,
  translate: `0px ${mix(p, distance, 0)}px`,
});

/** Fade-out for the last `duration` seconds of a scene of `total` seconds. */
export const exitProgress = (
  frame: number,
  fps: number,
  total: number,
  duration = 0.4,
) =>
  progress(frame, fps, { delay: total - duration, duration, easing: EASE_IN });

/** Gentle looping float (−1..1) for ambient motion. `period` in seconds. */
export const wave = (frame: number, fps: number, period = 4, offset = 0) =>
  Math.sin(((frame / fps + offset) / period) * Math.PI * 2);

/** Animated number for counters. */
export const countUp = (p: number, to: number, decimals = 0) =>
  (to * p).toFixed(decimals);
