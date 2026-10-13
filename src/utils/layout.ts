import { useVideoConfig } from "remotion";

/**
 * Resolution-independent sizing. Design at 1920×1080, and `u(px)` scales
 * values so the same scene looks right at 4K, 720p or vertical formats.
 */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;
  // Scale against the shorter side so vertical & square cuts still fit.
  const scale = Math.min(width, height) / 1080;
  const u = (px: number) => px * scale;
  return { width, height, isPortrait, scale, u };
};
