/**
 * Audio-sync helpers. Remotion has no audio clock — you sync by computing
 * the frame where something should happen and placing it there with
 * <Sequence from={frame}> or by feeding the frame into interpolate().
 */

/** Frame at which a given beat (0-based) lands for a track of `bpm`. */
export const beatToFrame = (
  beat: number,
  bpm: number,
  fps: number,
  offsetSeconds = 0,
) => Math.round((offsetSeconds + (beat * 60) / bpm) * fps);

/** Index of the beat currently playing at `frame` (fractional). */
export const frameToBeat = (
  frame: number,
  bpm: number,
  fps: number,
  offsetSeconds = 0,
) => ((frame / fps - offsetSeconds) * bpm) / 60;

/**
 * 1 → 0 decay pulse on every beat; use for scale "kicks" or flashes.
 * `decay` = how many beats the pulse lasts (0..1).
 */
export const beatPulse = (
  frame: number,
  bpm: number,
  fps: number,
  decay = 0.35,
  offsetSeconds = 0,
) => {
  const beat = frameToBeat(frame, bpm, fps, offsetSeconds);
  if (beat < 0) return 0;
  const phase = beat - Math.floor(beat);
  return phase < decay ? 1 - phase / decay : 0;
};

/** Timestamp list (seconds, e.g. from a voiceover script) → frames. */
export const cueFrames = (cuesInSeconds: number[], fps: number) =>
  cuesInSeconds.map((s) => Math.round(s * fps));
