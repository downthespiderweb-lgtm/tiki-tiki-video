import React from "react";
import { Composition } from "remotion";
import {
  getShowcaseDuration,
  Showcase,
  showcaseSchema,
} from "./compositions/Showcase";
import { VIDEO } from "./config/video";
import { fontsLoaded } from "./fonts";
// new-composition:imports (`npm run new` inserts imports above this line)

// Start loading bundled fonts as soon as the bundle is evaluated.
void fontsLoaded;

/**
 * Every composition shown in Studio / renderable by ID is registered here.
 *
 * Keep <Composition> elements directly in this file with inline-literal
 * `defaultProps` — Remotion Studio can then save prop edits back to code.
 *
 * - Resolution / fps: src/config/video.ts (or e.g. {...PRESETS.vertical1080})
 * - Duration: derived from each composition's timeline (seconds × fps)
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Showcase"
        component={Showcase}
        schema={showcaseSchema}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={VIDEO.fps}
        durationInFrames={getShowcaseDuration(VIDEO.fps)}
        defaultProps={{
          title: "Tiki Tiki Lounge",
          tagline: "Island hospitality, reimagined",
          pillars: [
            {
              label: "Craft Cocktails",
              caption: "Fresh-pressed, rum-forward classics",
            },
            {
              label: "Island Kitchen",
              caption: "Shareable plates from the Pacific Rim",
            },
            {
              label: "Live Music",
              caption: "Exotica, surf & steel drum nights",
            },
          ],
          stats: [
            { value: 120, suffix: "", label: "Lounge seats" },
            { value: 40, suffix: "+", label: "Signature drinks" },
            { value: 7, suffix: "", label: "Nights a week" },
          ],
          cta: "Reserve your table",
          accent: "#ff7a45",
          audioSrc: "",
        }}
      />
      {/* new-composition:register (`npm run new` inserts compositions above this line) */}
    </>
  );
};
