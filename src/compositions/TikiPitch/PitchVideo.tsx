import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { EASE_IN_OUT } from "../../utils/animation";
import { C } from "./brand";
import { SceneProvider } from "./components/scene";
import { mask } from "./components/transitions";
import { PITCH, sceneLeadFrames, sequenceFrames } from "./config";
import type { SceneId } from "./data/cues";
import { SCENES } from "./scenes";

export type PitchProps = {
  /** Path inside public/ to the final soundtrack (narration + music + sfx). Empty = silent. */
  audioSrc: string;
};

/**
 * Tiki Tiki Lounge & Bar — PechaKucha food & beverage concept pitch.
 * 20 scenes × 20 s (600 frames at 30 fps) = 12,000 frames.
 */
export const PitchVideo: React.FC<PitchProps> = ({ audioSrc }) => {
  return (
    <AbsoluteFill style={{ background: C.charcoal }}>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const id = `s${String(i + 1).padStart(2, "0")}` as SceneId;
          const Comp = scene.component;
          const items = [
            <TransitionSeries.Sequence key={`seq-${id}`} durationInFrames={sequenceFrames(i)} name={`${id} · ${scene.title}`}>
              <SceneProvider id={id} lead={sceneLeadFrames(i)}>
                <Comp />
              </SceneProvider>
            </TransitionSeries.Sequence>,
          ];
          if (i < SCENES.length - 1) {
            const next = SCENES[i + 1].reveal;
            items.push(
              <TransitionSeries.Transition
                key={`tr-${id}`}
                presentation={mask(next.kind, next.from)}
                timing={linearTiming({ durationInFrames: PITCH.transitionFrames, easing: EASE_IN_OUT })}
              />,
            );
          }
          return items;
        })}
      </TransitionSeries>
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
    </AbsoluteFill>
  );
};
