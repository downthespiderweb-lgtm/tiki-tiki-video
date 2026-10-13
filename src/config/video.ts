/**
 * Global video settings. Change these to re-target every composition that
 * uses the defaults (e.g. 4K, 60 fps or a vertical 1080×1920 cut).
 *
 * Animations are authored in SECONDS and converted with the current fps,
 * so changing FPS keeps timing identical — only smoothness changes.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** Common presets you can spread into a <Composition>. */
export const PRESETS = {
  landscape1080: { width: 1920, height: 1080 },
  landscape4k: { width: 3840, height: 2160 },
  vertical1080: { width: 1080, height: 1920 },
  square1080: { width: 1080, height: 1080 },
} as const;
