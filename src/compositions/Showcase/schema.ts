import { zColor } from "@remotion/zod-types";
import { z } from "zod";

/**
 * Props editable live in Remotion Studio (right-hand "Props" panel) and
 * overridable at render time with --props='{"title":"..."}'.
 */
export const showcaseSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  pillars: z
    .array(z.object({ label: z.string(), caption: z.string() }))
    .length(3),
  stats: z
    .array(
      z.object({ value: z.number(), suffix: z.string(), label: z.string() }),
    )
    .length(3),
  cta: z.string(),
  accent: zColor(),
  /** Path inside public/, e.g. "audio/music.mp3". Empty = silent. */
  audioSrc: z.string(),
});

export type ShowcaseProps = z.infer<typeof showcaseSchema>;
