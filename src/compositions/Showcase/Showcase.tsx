import { Audio } from "@remotion/media";
import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { COLORS } from "../../config/theme";
import { sec } from "../../utils/animation";
import { ShowcaseProps } from "./schema";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { PillarsScene } from "./scenes/PillarsScene";
import { StatsScene } from "./scenes/StatsScene";
import { TIMELINE } from "./timeline";

export const Showcase: React.FC<ShowcaseProps> = (props) => {
  const { fps } = useVideoConfig();
  const t = sec(TIMELINE.overlap, fps);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={sec(TIMELINE.intro, fps)}
          premountFor={fps}
        >
          <IntroScene
            title={props.title}
            tagline={props.tagline}
            accent={props.accent}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: t,
          })}
        />
        <TransitionSeries.Sequence
          durationInFrames={sec(TIMELINE.pillars, fps)}
          premountFor={fps}
        >
          <PillarsScene pillars={props.pillars} accent={props.accent} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-left" })}
          timing={linearTiming({ durationInFrames: t })}
        />
        <TransitionSeries.Sequence
          durationInFrames={sec(TIMELINE.stats, fps)}
          premountFor={fps}
        >
          <StatsScene stats={props.stats} accent={props.accent} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: t })}
        />
        <TransitionSeries.Sequence
          durationInFrames={sec(TIMELINE.outro, fps)}
          premountFor={fps}
        >
          <OutroScene
            title={props.title}
            cta={props.cta}
            accent={props.accent}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {props.audioSrc ? <Audio src={staticFile(props.audioSrc)} /> : null}
    </AbsoluteFill>
  );
};
