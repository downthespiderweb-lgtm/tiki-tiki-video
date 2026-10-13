/**
 * Scene timing in SECONDS. Edit these to change the video's length —
 * the composition duration is derived automatically.
 */
export const TIMELINE = {
  intro: 3.6,
  pillars: 3.8,
  stats: 3.6,
  outro: 3.6,
  /** Overlap between consecutive scenes during a transition. */
  overlap: 0.7,
} as const;

const SCENE_COUNT = 4;

/** Total duration in frames for a given fps (transitions overlap scenes). */
export const getShowcaseDuration = (fps: number) => {
  const { overlap, ...scenes } = TIMELINE;
  const sceneFrames = Object.values(scenes).reduce(
    (sum, s) => sum + Math.round(s * fps),
    0,
  );
  return sceneFrames - (SCENE_COUNT - 1) * Math.round(overlap * fps);
};
