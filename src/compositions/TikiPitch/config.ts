import { VIDEO } from "../../config/video";

/**
 * PechaKucha timing: 20 scenes × 20 seconds = 400 seconds.
 * Change SCENE_SECONDS / SCENE_COUNT / VIDEO.fps here — everything else derives from it.
 */
export const PITCH = {
  width: VIDEO.width,
  height: VIDEO.height,
  fps: VIDEO.fps,
  sceneSeconds: 20,
  sceneCount: 20,
  /**
   * Transitions are centred on each 20-second boundary: half of the overlap
   * happens before the boundary and half after, so every scene still owns
   * exactly sceneSeconds × fps frames and boundaries land on exact multiples.
   */
  transitionFrames: 20,
} as const;

export const SCENE_FRAMES = PITCH.sceneSeconds * PITCH.fps; // 600
export const TOTAL_FRAMES = SCENE_FRAMES * PITCH.sceneCount; // 12,000
const HALF = PITCH.transitionFrames / 2;

/** Sequence length inside <TransitionSeries> so boundaries stay on exact 20 s marks. */
export const sequenceFrames = (index: number) => {
  const first = index === 0;
  const last = index === PITCH.sceneCount - 1;
  return SCENE_FRAMES + (first ? 0 : HALF) + (last ? 0 : HALF);
};

/** Frames between a scene's sequence start and its true 20-second boundary. */
export const sceneLeadFrames = (index: number) => (index === 0 ? 0 : HALF);
